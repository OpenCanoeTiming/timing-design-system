import {
  forwardRef,
  useId,
  type ButtonHTMLAttributes,
  type FieldsetHTMLAttributes,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from './util';

/* ----------------------------------------------------------------- Button */

/** `danger-solid` only for the confirm button of an irreversible action */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid';
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
  ({ variant = 'secondary', size = 'md', icon, loading, className, type = 'button', disabled, children, ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cx('btn', `btn-${variant}`, size === 'sm' && 'btn-sm', icon && 'btn-icon', loading && 'is-loading', className)}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
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
/**
 * Label + control + hint/error. Pass the control as children. When `htmlFor`
 * is given, the hint/error gets `id={htmlFor}-desc`; put that in the control's
 * `aria-describedby` (the `describedBy` helper below returns it).
 */
export function FormField({ label, hint, error, required, htmlFor, className, children }: FormFieldProps) {
  const descId = htmlFor ? `${htmlFor}-desc` : undefined;
  return (
    <div className={cx('form-group', className)}>
      {label && (
        <label className="form-label" htmlFor={htmlFor}>
          {label}
          {required && <span className="required"> *</span>}
        </label>
      )}
      {children}
      {error ? (
        <div className="form-error" id={descId} role="alert">
          {error}
        </div>
      ) : hint ? (
        <div className="form-hint" id={descId}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

/** `aria-describedby` value matching a FormField with the same `htmlFor`. */
export const describedBy = (id: string) => `${id}-desc`;

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
  /** Muted line under the label */
  description?: ReactNode;
}

/**
 * Label text plus an optional hint. With a hint, the input is named by the
 * label alone (aria-labelledby) and described by the hint (aria-describedby);
 * otherwise the wrapping <label> would fold the hint into the accessible name.
 */
function useChoiceIds(description: ReactNode, labelledBy?: string, describedBy?: string) {
  const id = useId();
  if (!description) return { inputAria: {}, labelId: undefined, hintId: undefined };
  const labelId = `${id}-label`;
  const hintId = `${id}-hint`;
  return {
    labelId,
    hintId,
    inputAria: {
      'aria-labelledby': labelledBy ?? labelId,
      'aria-describedby': describedBy ? `${describedBy} ${hintId}` : hintId,
    },
  };
}

function ChoiceText({ label, description, labelId, hintId }: { label?: ReactNode; description?: ReactNode; labelId?: string; hintId?: string }) {
  if (!label && !description) return null;
  if (!description) return <span>{label}</span>;
  return (
    <span>
      <span className="choice-label" id={labelId}>
        {label}
      </span>
      <span className="choice-hint" id={hintId}>
        {description}
      </span>
    </span>
  );
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, description, className, ...rest }, ref) => {
  const { inputAria, labelId, hintId } = useChoiceIds(description, rest['aria-labelledby'], rest['aria-describedby']);
  return (
    <label className={cx('checkbox', className)}>
      <input ref={ref} type="checkbox" {...rest} {...inputAria} />
      <ChoiceText label={label} description={description} labelId={labelId} hintId={hintId} />
    </label>
  );
});
Checkbox.displayName = 'Checkbox';

export type RadioProps = CheckboxProps;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, description, className, ...rest }, ref) => {
  const { inputAria, labelId, hintId } = useChoiceIds(description, rest['aria-labelledby'], rest['aria-describedby']);
  return (
    <label className={cx('radio', className)}>
      <input ref={ref} type="radio" {...rest} {...inputAria} />
      <ChoiceText label={label} description={description} labelId={labelId} hintId={hintId} />
    </label>
  );
});
Radio.displayName = 'Radio';

/* --------------------------------------------------------------- Fieldset */

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: ReactNode;
  /** No border or padding — just the legend as a group heading */
  plain?: boolean;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(({ legend, plain, className, children, ...rest }, ref) => (
  <fieldset ref={ref} className={cx('fieldset', plain && 'fieldset-plain', className)} {...rest}>
    <legend className="fieldset-legend">{legend}</legend>
    {children}
  </fieldset>
));
Fieldset.displayName = 'Fieldset';

export const Switch = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...rest }, ref) => (
  <label className={cx('switch', className)}>
    <input ref={ref} type="checkbox" className="switch-input" role="switch" {...rest} />
    <span className="switch-slider" aria-hidden="true" />
    {label && <span>{label}</span>}
  </label>
));
Switch.displayName = 'Switch';
