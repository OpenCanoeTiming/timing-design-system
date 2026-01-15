import {
  forwardRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';

export type ModalSize = 'sm' | 'default' | 'lg' | 'xl' | 'fullscreen';
export type ModalFooterAlign = 'left' | 'center' | 'right' | 'between';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal size variant */
  size?: ModalSize;
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;
  /** Modal content */
  children: ReactNode;
}

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (h1-h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}

export interface ModalCloseProps extends HTMLAttributes<HTMLButtonElement> {
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Footer content alignment */
  align?: ModalFooterAlign;
  children: ReactNode;
}

/**
 * Modal component for accessible dialog overlays.
 *
 * @example
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
 *   <ModalHeader>
 *     <ModalTitle>Dialog Title</ModalTitle>
 *     <ModalClose onClick={() => setIsOpen(false)} />
 *   </ModalHeader>
 *   <ModalBody>Modal content here</ModalBody>
 *   <ModalFooter>
 *     <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </ModalFooter>
 * </Modal>
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = 'default',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Handle Escape key
    const handleKeyDown = useCallback(
      (event: globalThis.KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape') {
          onClose();
        }
      },
      [closeOnEscape, onClose]
    );

    // Add/remove body scroll lock and keyboard listener
    useEffect(() => {
      if (open) {
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', handleKeyDown);
      } else {
        document.body.classList.remove('modal-open');
      }

      return () => {
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [open, handleKeyDown]);

    // Handle backdrop click
    const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    const backdropClasses = ['modal-backdrop', open ? 'open' : ''].filter(Boolean).join(' ');

    const sizeClass = size !== 'default' ? `modal-${size}` : '';
    const modalClasses = ['modal', sizeClass, className].filter(Boolean).join(' ');

    return (
      <div
        className={backdropClasses}
        onClick={handleBackdropClick}
        role="presentation"
        aria-hidden={!open}
      >
        <div
          ref={ref}
          className={modalClasses}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

/**
 * Modal header section with bottom border.
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['modal-header', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

/**
 * Modal title heading.
 */
export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ as: Component = 'h2', className = '', children, ...props }, ref) => {
    const classes = ['modal-title', className].filter(Boolean).join(' ');

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

ModalTitle.displayName = 'ModalTitle';

/**
 * Modal close button.
 */
export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className = '', 'aria-label': ariaLabel = 'Close modal', ...props }, ref) => {
    const classes = ['modal-close', className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        aria-label={ariaLabel}
        {...props}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    );
  }
);

ModalClose.displayName = 'ModalClose';

/**
 * Modal body section for main content.
 */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['modal-body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

/**
 * Modal footer section with top border.
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ align = 'right', className = '', children, ...props }, ref) => {
    const alignClass = align !== 'right' ? `modal-footer-${align}` : '';
    const classes = ['modal-footer', alignClass, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';
