import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from './util';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ------------------------------------------------------------------ Modal */

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg' | 'fullscreen';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  /** Element to focus on open; defaults to the first focusable in the body, else the panel */
  initialFocus?: React.RefObject<HTMLElement>;
  children?: ReactNode;
}

/**
 * Overlay + panel. Header/footer are slots; body is children.
 * Traps focus, restores it on close, closes on Escape (only when the event
 * was not handled by something inside, e.g. a Menu).
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, footer, size = 'md', closeOnBackdrop = true, closeOnEscape = true, initialFocus, className, children, ...rest }, ref) => {
    const panel = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const restoreTo = useRef<HTMLElement | null>(null);

    const setRefs = (el: HTMLDivElement | null) => {
      panel.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    };

    useEffect(() => {
      if (!open) return;
      restoreTo.current = document.activeElement as HTMLElement | null;
      document.body.classList.add('modal-open');
      const target = initialFocus?.current ?? (panel.current?.querySelector<HTMLElement>('.modal-body ' + FOCUSABLE) || panel.current);
      target?.focus({ preventScroll: true });
      return () => {
        document.body.classList.remove('modal-open');
        restoreTo.current?.focus?.({ preventScroll: true });
      };
    }, [open, initialFocus]);

    if (!open) return null;

    const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdrop && e.target === e.currentTarget) onClose();
    };

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && closeOnEscape && !e.defaultPrevented) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      const nodes = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    return (
      <div
        className={cx('modal', size === 'lg' && 'modal-lg', size === 'fullscreen' && 'modal-fullscreen')}
        onClick={onBackdrop}
        onKeyDown={onKeyDown}
        role="presentation"
      >
        <div
          ref={setRefs}
          className={cx('modal-content', className)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title !== undefined ? titleId : undefined}
          tabIndex={-1}
          {...rest}
        >
          {title !== undefined && (
            <div className="modal-header">
              <h3 className="modal-title" id={titleId}>
                {title}
              </h3>
              <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
          )}
          <div className="modal-body">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    );
  }
);
Modal.displayName = 'Modal';

/* ------------------------------------------------------------------ Toast */

export type ToastTone = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: ToastTone;
  title?: ReactNode;
  icon?: ReactNode;
  /** ms until auto-dismiss; 0 disables */
  duration?: number;
  onDismiss?: () => void;
  children?: ReactNode;
}

/** One toast. `onDismiss` fires exactly once, after the leave animation. */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(({ tone = 'neutral', title, icon, duration = 5000, onDismiss, className, children, ...rest }, ref) => {
  const [leaving, setLeaving] = useState(false);
  const dismissed = useRef(false);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  const dismiss = useCallback(() => {
    if (dismissed.current) return;
    dismissed.current = true;
    setLeaving(true);
  }, []);

  // Auto-dismiss timer — depends on duration only, so parent re-renders don't restart it.
  useEffect(() => {
    if (!duration) return;
    const t = window.setTimeout(dismiss, duration);
    return () => window.clearTimeout(t);
  }, [duration, dismiss]);

  // Leave animation, then notify.
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => onDismissRef.current?.(), 180);
    return () => window.clearTimeout(t);
  }, [leaving]);

  return (
    <div ref={ref} className={cx('toast', `toast-${tone}`, leaving && 'is-leaving', className)} role={tone === 'error' ? 'alert' : undefined} {...rest}>
      {icon && <span className="toast-icon">{icon}</span>}
      <div className="toast-content">
        {title && <div className="toast-title">{title}</div>}
        {children && <div className="toast-message">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="toast-close" onClick={dismiss} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
});
Toast.displayName = 'Toast';

/** The live region. Put it once per page; render <Toast> children into it. */
export const ToastContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cx('toast-container', className)} role="status" aria-live="polite" aria-relevant="additions" {...rest} />
));
ToastContainer.displayName = 'ToastContainer';

/* ------------------------------------------------------------------- Menu */

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface MenuItemSpec {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** A single element (usually <Button>); it receives onClick and aria props */
  trigger: ReactElement;
  items: Array<MenuItemSpec | 'separator' | { label: ReactNode }>;
  placement?: MenuPlacement;
}

/**
 * Uncontrolled dropdown. Click or ArrowDown on the trigger opens it and focuses
 * the first item; arrows move; Enter/Space select; Escape or outside click
 * closes and returns focus to the trigger.
 */
export function Menu({ trigger, items, placement = 'bottom-start', className, ...rest }: MenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const itemEls = () => Array.from(list.current?.querySelectorAll<HTMLButtonElement>('.menu-item:not(:disabled)') ?? []);
  const triggerEl = () => root.current?.firstElementChild as HTMLElement | null;

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    if (refocus) triggerEl()?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    itemEls()[0]?.focus();
    const onDoc = (e: globalThis.MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const els = itemEls();
    const i = els.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close(true);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      els[(i + 1) % els.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      els[(i - 1 + els.length) % els.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      els[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      els[els.length - 1]?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  const onTriggerKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
    }
  };

  const only = Children.only(trigger);
  const triggerNode = isValidElement(only)
    ? cloneElement(only as ReactElement<Record<string, unknown>>, {
        onClick: (e: MouseEvent) => {
          (only.props as { onClick?: (e: MouseEvent) => void }).onClick?.(e);
          setOpen((o) => !o);
        },
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
          (only.props as { onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void }).onKeyDown?.(e);
          onTriggerKey(e);
        },
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': open ? menuId : undefined,
      })
    : trigger;

  return (
    <div ref={root} className={cx('menu', className)} {...rest}>
      {triggerNode}
      {open && (
        <div ref={list} id={menuId} className={cx('menu-content', `menu-content-${placement}`)} role="menu" onKeyDown={onListKey}>
          {items.map((it, i) => {
            if (it === 'separator') return <div key={i} className="menu-separator" role="separator" />;
            if (!('key' in it))
              return (
                <div key={i} className="menu-label" role="presentation">
                  {it.label}
                </div>
              );
            return (
              <button
                key={it.key}
                type="button"
                role="menuitem"
                tabIndex={-1}
                className={cx('menu-item', it.danger && 'menu-item-danger')}
                disabled={it.disabled}
                onClick={() => {
                  it.onSelect?.();
                  close(true);
                }}
              >
                {it.icon && <span className="menu-item-icon">{it.icon}</span>}
                <span className="menu-item-label">{it.label}</span>
                {it.shortcut && <span className="menu-item-shortcut">{it.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
