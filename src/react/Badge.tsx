import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge color variant */
  variant?: BadgeVariant;
  /** Badge content */
  children: ReactNode;
}

/**
 * Badge component for status indicators and labels.
 *
 * @example
 * <Badge variant="success">Online</Badge>
 * <Badge variant="error">Offline</Badge>
 * <Badge variant="warning">Pending</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', className = '', children, ...props }, ref) => {
    const variantClass = `badge-${variant}`;

    const classes = ['badge', variantClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
