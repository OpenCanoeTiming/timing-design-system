import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cx } from './util';

/* ------------------------------------------------------------------ Modal */

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  size?: 'md' | 'lg' | 'fullscreen';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
}

/** Overlay + panel. Header/footer are slots; body is children. */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, footer, size = 'md', closeOnBackdrop = true, closeOnEscape = true, className, children, ...rest }, ref) => {
    const onKey = useCallback(
      (e: globalThis.KeyboardEvent) => {
        if (closeOnEscape && e.key === 'Escape') onClose();
      },
      [closeOnEscape, onClose]
    );

    useEffect(() => {
      if (!open) return;
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onKey);
      return () => {
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', onKey);
      };
    }, [open, onKey]);

    if (!open) return null;

    const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdrop && e.target === e.currentTarget) onClose();
    };

    return (
      <div className={cx('modal', size === 'lg' && 'modal-lg', size === 'fullscreen' && 'modal-fullscreen')} onClick={onBackdrop} role="presentation">
        <div ref={ref} className={cx('modal-content', className)} role="dialog" aria-modal="true" {...rest}>
          {title !== undefined && (
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
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

export const Toast = forwardRef<HTMLDivElement, ToastProps>(({ tone = 'neutral', title, icon, duration = 5000, onDismiss, className, children, ...rest }, ref) => {
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const dismiss = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => onDismiss?.(), 180);
  }, [onDismiss]);

  useEffect(() => {
    if (!duration) return;
    timer.current = window.setTimeout(dismiss, duration);
    return () => window.clearTimeout(timer.current);
  }, [duration, dismiss]);

  return (
    <div ref={ref} className={cx('toast', `toast-${tone}`, leaving && 'is-leaving', className)} role={tone === 'error' ? 'alert' : 'status'} {...rest}>
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

export const ToastContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cx('toast-container', className)} aria-live="polite" {...rest} />
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
  /** The trigger element; it receives onClick */
  trigger: ReactNode;
  items: Array<MenuItemSpec | 'separator' | { label: ReactNode }>;
  placement?: MenuPlacement;
}

/** Uncontrolled dropdown: click trigger to open, click outside / Escape / select to close. */
export function Menu({ trigger, items, placement = 'bottom-start', className, ...rest }: MenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: globalThis.MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cx('menu', className)} {...rest}>
      <span onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
        {trigger}
      </span>
      {open && (
        <div className={cx('menu-content', `menu-content-${placement}`)} role="menu">
          {items.map((it, i) => {
            if (it === 'separator') return <div key={i} className="menu-separator" role="separator" />;
            if (!('key' in it))
              return (
                <div key={i} className="menu-label">
                  {it.label}
                </div>
              );
            return (
              <button
                key={it.key}
                type="button"
                role="menuitem"
                className={cx('menu-item', it.danger && 'menu-item-danger')}
                disabled={it.disabled}
                onClick={() => {
                  it.onSelect?.();
                  setOpen(false);
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
