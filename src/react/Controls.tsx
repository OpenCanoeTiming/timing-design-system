import {
  forwardRef,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from './util';

/* ----------------------------------------------------------------- Button */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Square, icon-only button */
  icon?: boolean;
  /** Shows a spinner and blocks interaction; keeps width */
  loading?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', icon, loading, className, type = 'button', children, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx('btn', `btn-${variant}`, size === 'sm' && 'btn-sm', icon && 'btn-icon', loading && 'is-loading', className)}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';

/* --------------------------------------------------------------- FormField */

export interface FormFieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

/** Label + control + hint/error. Pass the control as children. */
export function FormField({ label, hint, error, required, htmlFor, className, children }: FormFieldProps) {
  return (
    <div className={cx('form-group', className)}>
      {label && (
        <label className="form-label" htmlFor={htmlFor}>
          {label}
          {required && <span className="required"> *</span>}
        </label>
      )}
      {children}
      {error ? <div className="form-error">{error}</div> : hint ? <div className="form-hint">{hint}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------------- Input */

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md';
  invalid?: boolean;
  mono?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', invalid, mono, className, ...rest }, ref) => (
    <input
      ref={ref}
      className={cx('input', size === 'sm' && 'input-sm', invalid && 'input-error', mono && 'input-mono', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
);
Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ invalid, className, ...rest }, ref) => (
  <textarea ref={ref} className={cx('textarea', invalid && 'input-error', className)} aria-invalid={invalid || undefined} {...rest} />
));
Textarea.displayName = 'Textarea';

/* ------------------------------------------------------------------ Select */

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md';
  invalid?: boolean;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = 'md', invalid, options, placeholder, className, children, ...rest }, ref) => (
    <select
      ref={ref}
      className={cx('select', size === 'sm' && 'select-sm', invalid && 'input-error', className)}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options?.map((o) => (
        <option key={o.value} value={o.value} disabled={o.disabled}>
          {o.label}
        </option>
      ))}
      {children}
    </select>
  )
);
Select.displayName = 'Select';

/* ------------------------------------------------------ Checkbox / Radio */

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...rest }, ref) => (
  <label className={cx('checkbox', className)}>
    <input ref={ref} type="checkbox" {...rest} />
    {label && <span>{label}</span>}
  </label>
));
Checkbox.displayName = 'Checkbox';

export type RadioProps = CheckboxProps;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, className, ...rest }, ref) => (
  <label className={cx('radio', className)}>
    <input ref={ref} type="radio" {...rest} />
    {label && <span>{label}</span>}
  </label>
));
Radio.displayName = 'Radio';

export const Switch = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...rest }, ref) => (
  <label className={cx('switch', className)}>
    <input ref={ref} type="checkbox" className="switch-input" role="switch" {...rest} />
    <span className="switch-slider" aria-hidden="true" />
    {label && <span>{label}</span>}
  </label>
));
Switch.displayName = 'Switch';
