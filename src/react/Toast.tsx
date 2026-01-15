import {
  forwardRef,
  useEffect,
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Position of the toast container */
  position?: ToastPosition;
  /** Container content (Toast components) */
  children: ReactNode;
}

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Toast variant */
  variant?: ToastVariant;
  /** Toast title */
  title?: string;
  /** Toast message (can also be passed as children) */
  message?: ReactNode;
  /** Whether toast is dismissible */
  dismissible?: boolean;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Auto-dismiss duration in milliseconds (0 to disable) */
  duration?: number;
  /** Show progress bar for auto-dismiss */
  showProgress?: boolean;
  /** Icon element to display */
  icon?: ReactNode;
  /** Action button/element */
  action?: ReactNode;
  /** Toast content */
  children?: ReactNode;
}

/**
 * Toast container that positions toasts on the screen.
 *
 * @example
 * <ToastContainer position="top-right">
 *   <Toast variant="success" title="Success!" message="Your changes have been saved." />
 * </ToastContainer>
 */
export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ position = 'top-right', className = '', children, ...props }, ref) => {
    const positionClass = `toast-container-${position}`;
    const classes = ['toast-container', positionClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastContainer.displayName = 'ToastContainer';

// Default icons for each variant
const defaultIcons: Record<ToastVariant, ReactNode> = {
  success: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16.667 5L7.5 14.167 3.333 10" />
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 7v4M10 14h.01" />
      <path d="M8.57 3.316L1.745 15.276a1.667 1.667 0 001.43 2.52h13.65a1.667 1.667 0 001.43-2.52L11.43 3.316a1.667 1.667 0 00-2.86 0z" />
    </svg>
  ),
  error: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M12.5 7.5l-5 5M7.5 7.5l5 5" />
    </svg>
  ),
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 14v-4M10 6h.01" />
    </svg>
  ),
};

/**
 * Toast component for non-blocking notifications.
 *
 * @example
 * // Basic toast
 * <Toast variant="success" title="Saved" message="Your changes have been saved." />
 *
 * // Dismissible toast
 * <Toast
 *   variant="error"
 *   title="Error"
 *   message="Something went wrong."
 *   dismissible
 *   onDismiss={() => setShow(false)}
 * />
 *
 * // Auto-dismiss with progress bar
 * <Toast
 *   variant="info"
 *   title="Info"
 *   message="This will auto-dismiss in 5 seconds."
 *   duration={5000}
 *   showProgress
 *   onDismiss={() => setShow(false)}
 * />
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      message,
      dismissible = false,
      onDismiss,
      duration = 0,
      showProgress = false,
      icon,
      action,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [isExiting, setIsExiting] = useState(false);

    // Handle auto-dismiss
    const handleDismiss = useCallback(() => {
      setIsExiting(true);
      // Wait for exit animation before calling onDismiss
      setTimeout(() => {
        onDismiss?.();
      }, 200); // Match the CSS animation duration
    }, [onDismiss]);

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(handleDismiss, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, handleDismiss]);

    const variantClass = `toast-${variant}`;
    const classes = [
      'toast',
      variantClass,
      isExiting ? 'toast-exiting' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Use provided icon or default for variant
    const displayIcon = icon !== undefined ? icon : defaultIcons[variant];

    // Use children or message prop
    const content = children || message;

    return (
      <div ref={ref} className={classes} role="alert" {...props}>
        {displayIcon && <span className="toast-icon">{displayIcon}</span>}

        <div className="toast-content">
          {title && <div className="toast-title">{title}</div>}
          {content && <div className="toast-message">{content}</div>}
          {action && <div className="toast-action">{action}</div>}
        </div>

        {dismissible && (
          <button
            type="button"
            className="toast-close"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 3l8 8M11 3l-8 8" />
            </svg>
          </button>
        )}

        {showProgress && duration > 0 && (
          <div className="toast-progress">
            <div
              className="toast-progress-bar"
              style={{ animationDuration: `${duration}ms` }}
            />
          </div>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
