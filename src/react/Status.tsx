import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx, type Tone, type Mark as MarkKindT } from './util';

export type { Tone, Semantic } from './util';
export type { Mark as MarkKind } from './util';

/* -------------------------------------------------------------- StatusDot */

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  /** Heartbeat ring (same as tone="live") */
  pulse?: boolean;
  /** Accessible name; the dot is decorative without it */
  label?: string;
}

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(({ tone = 'neutral', pulse, label, className, ...rest }, ref) => (
  <span
    ref={ref}
    className={cx('status-dot', `status-dot-${tone}`, pulse && 'status-dot-pulse', className)}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    {...rest}
  />
));
StatusDot.displayName = 'StatusDot';

/* ------------------------------------------------------------- StatusItem */

export interface StatusItemProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  pulse?: boolean;
  children: ReactNode;
}

/** Dot + label, for headers and table cells. */
export const StatusItem = forwardRef<HTMLSpanElement, StatusItemProps>(({ tone = 'neutral', pulse, className, children, ...rest }, ref) => (
  <span ref={ref} className={cx('status-item', className)} {...rest}>
    <StatusDot tone={tone} pulse={pulse} />
    {children}
  </span>
));
StatusItem.displayName = 'StatusItem';

/* ------------------------------------------------------------------ Badge */

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: 'sm' | 'md';
  mono?: boolean;
  /** Leading dot in the badge's tone */
  dot?: boolean;
  children: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = 'neutral', size = 'md', mono, dot, className, children, ...rest }, ref) => (
    <span ref={ref} className={cx('badge', `badge-${tone}`, size === 'sm' && 'badge-sm', mono && 'badge-mono', className)} {...rest}>
      {dot && <StatusDot tone={tone} pulse={tone === 'live'} />}
      {children}
    </span>
  )
);
Badge.displayName = 'Badge';

/* ------------------------------------------------------------------ Alert */

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: Tone;
  /** Announce to screen readers when it appears (dynamic messages only) */
  live?: boolean;
  title?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  /** Tinted background for page-level banners */
  tinted?: boolean;
  children?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ tone = 'neutral', title, icon, actions, tinted, live, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cx('alert', `alert-${tone}`, tinted && 'alert-tinted', className)}
      role={live ? (tone === 'error' || tone === 'warning' ? 'alert' : 'status') : undefined}
      {...rest}
    >
      {icon && <span className="alert-icon">{icon}</span>}
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        {children}
      </div>
      {actions && <div className="alert-actions">{actions}</div>}
    </div>
  )
);
Alert.displayName = 'Alert';

/* ------------------------------------------------------------------- Mark */

export interface MarkProps extends HTMLAttributes<HTMLSpanElement> {
  mark: MarkKindT;
  children: ReactNode;
}

/** A value (time, rank) that carries a result mark. */
export const Mark = forwardRef<HTMLSpanElement, MarkProps>(({ mark, className, children, ...rest }, ref) => (
  <span ref={ref} className={cx('mark', `mark-${mark}`, className)} {...rest}>
    {children}
  </span>
));
Mark.displayName = 'Mark';
