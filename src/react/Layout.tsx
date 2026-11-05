import { forwardRef, useId, type HTMLAttributes, type KeyboardEvent, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, type ReactNode } from 'react';
import { cx } from './util';

/* ------------------------------------------------------------------- Card */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
  interactive?: boolean;
  selected?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ compact, interactive, selected, className, onClick, onKeyDown, ...rest }, ref) => {
  const keyActivate = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (interactive && onClick && !e.defaultPrevented && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).click();
    }
  };
  return (
    <div
      ref={ref}
      className={cx('card', compact && 'card-compact', interactive && 'card-interactive', selected && 'card-selected', className)}
      role={interactive && onClick ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive && onClick && selected !== undefined ? selected : undefined}
      onClick={onClick}
      onKeyDown={interactive ? keyActivate : onKeyDown}
      {...rest}
    />
  );
});
Card.displayName = 'Card';

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Right-aligned slot (status, buttons) */
  actions?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ title, subtitle, actions, className, children, ...rest }, ref) => (
  <div ref={ref} className={cx('card-header', className)} {...rest}>
    {title !== undefined || subtitle ? (
      <div>
        {title !== undefined && <div className="card-title">{title}</div>}
        {subtitle && <div className="card-subtitle">{subtitle}</div>}
      </div>
    ) : null}
    {children}
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
));
CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** No padding — for tables and logs */
  flush?: boolean;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({ flush, className, ...rest }, ref) => (
  <div ref={ref} className={cx('card-body', flush && 'card-body-flush', className)} {...rest} />
));
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cx('card-footer', className)} {...rest} />
));
CardFooter.displayName = 'CardFooter';

/* ------------------------------------------------------------------ Table */

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hover?: boolean;
  compact?: boolean;
  /** Sticky header — only works inside a scroll container with a max-height */
  sticky?: boolean;
  /** Wrap in a horizontal scroll container (`.table-responsive`) */
  responsive?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(({ striped, hover, compact, sticky, responsive = false, className, ...rest }, ref) => {
  const table = (
    <table
      ref={ref}
      className={cx('table', striped && 'table-striped', hover && 'table-hover', compact && 'table-compact', sticky && 'table-sticky', className)}
      {...rest}
    />
  );
  return responsive ? <div className="table-responsive">{table}</div> : table;
});
Table.displayName = 'Table';

export type ColumnKind = 'num' | 'time' | 'bib' | 'actions' | 'wrap' | 'muted';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  kind?: ColumnKind;
}
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  kind?: ColumnKind;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(({ kind, className, ...rest }, ref) => (
  <td ref={ref} className={cx(kind && `col-${kind}`, className)} {...rest} />
));
TableCell.displayName = 'TableCell';

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(({ kind, className, scope = 'col', ...rest }, ref) => (
  <th ref={ref} scope={scope} className={cx(kind && `col-${kind}`, className)} {...rest} />
));
TableHeaderCell.displayName = 'TableHeaderCell';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  dimmed?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ selected, dimmed, className, ...rest }, ref) => (
  <tr ref={ref} className={cx(selected && 'is-selected', dimmed && 'is-dimmed', className)} data-selected={selected || undefined} {...rest} />
));
TableRow.displayName = 'TableRow';

export interface TableEmptyProps {
  colSpan: number;
  children?: ReactNode;
}
export function TableEmpty({ colSpan, children = 'Nothing to show' }: TableEmptyProps) {
  return (
    <tr className="table-empty">
      <td colSpan={colSpan}>{children}</td>
    </tr>
  );
}

/* ------------------------------------------------------------------- Tabs */

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  tabs: Array<{ value: string; label: ReactNode; badge?: ReactNode; disabled?: boolean }>;
  /** id prefix for aria wiring */
  id?: string;
  children?: ReactNode;
}

/** Controlled tab list; render the active panel as children. Arrow keys move and activate. */
export function Tabs({ value, onChange, tabs, id, className, children, ...rest }: TabsProps) {
  const autoId = useId();
  const base = id ?? autoId;
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = tabs.filter((t) => !t.disabled);
    const i = enabled.findIndex((t) => t.value === value);
    if (i < 0) return;
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % enabled.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(enabled[next].value);
    (e.currentTarget.querySelector(`#${CSS.escape(`${base}-tab-${enabled[next].value}`)}`) as HTMLElement | null)?.focus();
  };
  return (
    <div className={cx('tabs', className)} {...rest}>
      <div className="tab-list" role="tablist" onKeyDown={onKey}>
        {tabs.map((t) => {
          const active = t.value === value;
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              id={`${base}-tab-${t.value}`}
              aria-selected={active}
              aria-controls={active ? `${base}-panel` : undefined}
              tabIndex={active ? 0 : -1}
              className={cx('tab', active && 'active')}
              disabled={t.disabled}
              onClick={() => onChange(t.value)}
            >
              {t.label}
              {t.badge !== undefined && <span className="tab-badge">{t.badge}</span>}
            </button>
          );
        })}
      </div>
      <div className="tab-panels">
        <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${value}`} className="tab-panel active" tabIndex={0}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Header */

export interface AppHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  /** Event / context chip next to the title */
  context?: ReactNode;
  /** Right side: status items, badges */
  status?: ReactNode;
  /** Far right: buttons */
  actions?: ReactNode;
  compact?: boolean;
}

export const AppHeader = forwardRef<HTMLElement, AppHeaderProps>(({ title, context, status, actions, compact, className, children, ...rest }, ref) => (
  <header ref={ref} className={cx('app-header', compact && 'app-header-compact', className)} role="banner" {...rest}>
    <div className="header-brand">
      <span className="header-title">{title}</span>
      {context && <span className="header-context">{context}</span>}
    </div>
    {children}
    {status && <div className="header-status">{status}</div>}
    {actions && <div className="header-actions">{actions}</div>}
  </header>
));
AppHeader.displayName = 'AppHeader';

export interface PageBannerProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'warning' | 'info' | 'error';
  action?: ReactNode;
}

export const PageBanner = forwardRef<HTMLDivElement, PageBannerProps>(({ tone = 'warning', action, className, children, ...rest }, ref) => (
  <div ref={ref} className={cx('page-banner', `page-banner-${tone}`, className)} {...rest}>
    <span>{children}</span>
    {action}
  </div>
));
PageBanner.displayName = 'PageBanner';
