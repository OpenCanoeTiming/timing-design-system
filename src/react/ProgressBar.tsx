import { forwardRef, type HTMLAttributes } from 'react';

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'error' | 'accent';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current value */
  value: number;
  /** Maximum value */
  max?: number;
  /** Visual variant */
  variant?: ProgressBarVariant;
  /** Size variant */
  size?: ProgressBarSize;
  /** Whether to show the label (percentage or value/max) */
  showLabel?: boolean;
  /** Custom label format: 'percentage' or 'fraction' */
  labelFormat?: 'percentage' | 'fraction';
  /** Whether to animate the progress bar */
  animated?: boolean;
  /** Whether to show striped pattern */
  striped?: boolean;
}

/**
 * ProgressBar component for showing completion status.
 *
 * @example
 * <ProgressBar value={75} />
 * <ProgressBar value={5} max={10} variant="success" showLabel />
 * <ProgressBar value={50} striped animated />
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      labelFormat = 'percentage',
      animated = false,
      striped = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const variantClass = variant !== 'default' ? `progress-${variant}` : '';
    const sizeClass = size !== 'md' ? `progress-${size}` : '';
    const stripedClass = striped ? 'progress-striped' : '';
    const animatedClass = animated && striped ? 'progress-animated' : '';

    const containerClasses = [
      'progress',
      variantClass,
      sizeClass,
      stripedClass,
      animatedClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const label =
      labelFormat === 'fraction' ? `${value}/${max}` : `${Math.round(percentage)}%`;

    return (
      <div
        ref={ref}
        className={containerClasses}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${label}`}
        {...props}
      >
        <div className="progress-bar" style={{ width: `${percentage}%` }}>
          {showLabel && <span className="progress-label">{label}</span>}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
