import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Show error state */
  error?: boolean;
  /** Size variant (visual size, not HTML size attribute) */
  size?: SelectSize;
  /** Select options */
  children: ReactNode;
}

/**
 * Select dropdown component.
 *
 * @example
 * <Select>
 *   <option value="">Choose...</option>
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 * </Select>
 *
 * @example
 * <Select size="sm">...</Select>  // Compact
 * <Select size="lg">...</Select>  // Large
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error = false, size = 'md', className = '', children, ...props }, ref) => {
    const sizeClass = size !== 'md' ? `select-${size}` : '';
    const classes = ['input', 'select', sizeClass, error ? 'input-error' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <select ref={ref} className={classes} {...props}>
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';
