import { forwardRef, type SelectHTMLAttributes, type ReactNode } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Show error state */
  error?: boolean;
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
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error = false, className = '', children, ...props }, ref) => {
    const classes = ['input', 'select', error ? 'input-error' : '', className]
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
