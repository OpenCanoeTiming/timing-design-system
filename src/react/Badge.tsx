import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type StatusDotVariant = 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge color variant */
  variant?: BadgeVariant;
  /** Badge content */
  children: ReactNode;
}

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  /** Status dot color variant */
  variant: StatusDotVariant;
  /** Whether to show pulsing animation */
  pulse?: boolean;
  /** Whether to show glow effect */
  glow?: boolean;
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

/**
 * StatusDot component for compact status indicators.
 *
 * @example
 * <StatusDot variant="success" />
 * <StatusDot variant="error" pulse />
 * <StatusDot variant="warning" glow />
 */
export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ variant, pulse, glow, className = '', ...props }, ref) => {
    const variantClass = `status-dot-${variant}`;
    const pulseClass = pulse ? 'status-dot-pulse' : '';
    const glowClass = glow ? 'status-dot-glow' : '';

    const classes = ['status-dot', variantClass, pulseClass, glowClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props} />
    );
  }
);

StatusDot.displayName = 'StatusDot';
