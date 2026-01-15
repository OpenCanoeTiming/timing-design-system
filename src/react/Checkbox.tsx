import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Checkbox label */
  children?: ReactNode;
}

/**
 * Checkbox component with optional label.
 *
 * @example
 * <Checkbox>Remember me</Checkbox>
 * <Checkbox checked onChange={handleChange}>I agree to terms</Checkbox>
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <label className={`checkbox ${className}`.trim()}>
        <input ref={ref} type="checkbox" {...props} />
        {children && <span>{children}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Radio label */
  children?: ReactNode;
}

/**
 * Radio button component with optional label.
 *
 * @example
 * <Radio name="choice" value="a">Option A</Radio>
 * <Radio name="choice" value="b">Option B</Radio>
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <label className={`radio ${className}`.trim()}>
        <input ref={ref} type="radio" {...props} />
        {children && <span>{children}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
