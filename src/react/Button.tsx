import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Icon-only button (square aspect ratio) */
  icon?: boolean;
  /** Button content */
  children: ReactNode;
}

/**
 * Button component with multiple variants and sizes.
 *
 * @example
 * <Button variant="primary">Click me</Button>
 * <Button variant="danger" size="sm">Delete</Button>
 * <Button variant="ghost" icon><IconMenu /></Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon = false, className = '', children, ...props }, ref) => {
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';
    const iconClass = icon ? 'btn-icon' : '';

    const classes = ['btn', variantClass, sizeClass, iconClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
