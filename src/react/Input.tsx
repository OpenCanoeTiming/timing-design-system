import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Show error state */
  error?: boolean;
}

/**
 * Input component for text fields.
 *
 * @example
 * <Input placeholder="Enter name" />
 * <Input type="email" error />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className = '', ...props }, ref) => {
    const classes = ['input', error ? 'input-error' : '', className]
      .filter(Boolean)
      .join(' ');

    return <input ref={ref} className={classes} {...props} />;
  }
);

Input.displayName = 'Input';
