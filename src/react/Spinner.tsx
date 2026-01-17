import { forwardRef, type HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'accent' | 'success' | 'warning' | 'error' | 'white';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Spinner size */
  size?: SpinnerSize;
  /** Color variant */
  variant?: SpinnerVariant;
  /** Accessible label for screen readers */
  label?: string;
}

export interface DotsProps extends HTMLAttributes<HTMLSpanElement> {
  /** Dots size */
  size?: SpinnerSize;
  /** Whether to use accent color (otherwise inherits) */
  accent?: boolean;
  /** Whether to use muted color */
  muted?: boolean;
  /** Accessible label for screen readers */
  label?: string;
}

/**
 * Spinner component for loading states.
 *
 * @example
 * <Spinner />
 * <Spinner size="lg" variant="success" />
 * <Button disabled><Spinner size="sm" variant="white" /> Loading</Button>
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 'md', variant = 'accent', label = 'Loading', className = '', ...props }, ref) => {
    const sizeClass = `spinner-${size}`;
    const variantClass = `spinner-${variant}`;

    const classes = ['spinner', sizeClass, variantClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        role="status"
        aria-label={label}
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

/**
 * Dots component for inline loading indicators.
 *
 * @example
 * <Dots />
 * <span>Loading<Dots /></span>
 * <Dots size="lg" accent />
 */
export const Dots = forwardRef<HTMLSpanElement, DotsProps>(
  ({ size = 'md', accent, muted, label = 'Loading', className = '', ...props }, ref) => {
    const sizeClass = `dots-${size}`;
    const accentClass = accent ? 'dots-accent' : '';
    const mutedClass = muted ? 'dots-muted' : '';

    const classes = ['dots', sizeClass, accentClass, mutedClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        role="status"
        aria-label={label}
        {...props}
      >
        <span className="dots-dot" aria-hidden="true" />
        <span className="dots-dot" aria-hidden="true" />
        <span className="dots-dot" aria-hidden="true" />
      </span>
    );
  }
);

Dots.displayName = 'Dots';
