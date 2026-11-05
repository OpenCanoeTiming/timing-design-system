import { forwardRef, useEffect, useRef, type ChangeEvent, type DragEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './util';

/* ---------------------------------------------------------------- Spinner */

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(({ size = 'md', label = 'Loading', className, ...rest }, ref) => (
  <span ref={ref} className={cx('spinner', size !== 'md' && `spinner-${size}`, className)} role="status" aria-label={label} {...rest} />
));
Spinner.displayName = 'Spinner';

/* ---------------------------------------------------------------- Progress */

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100; omit for indeterminate */
  value?: number;
  tone?: 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  /** Text left of the percentage */
  label?: ReactNode;
  showValue?: boolean;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, tone = 'accent', size = 'md', label, showValue, className, ...rest }, ref) => {
    const v = value === undefined ? undefined : Math.max(0, Math.min(100, value));
    return (
      <div ref={ref} className={className} {...rest}>
        {(label || (showValue && v !== undefined)) && (
          <div className="progress-row">
            <span className="progress-text">{label}</span>
            {showValue && v !== undefined && <span className="progress-value">{Math.round(v)} %</span>}
          </div>
        )}
        <div
          className={cx('progress', tone !== 'accent' && `progress-${tone}`, size === 'sm' && 'progress-sm', v === undefined && 'progress-indeterminate')}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={v}
        >
          <div className="progress-bar" style={v === undefined ? undefined : { width: `${v}%` }} />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';

/* ---------------------------------------------------------------- DropZone */

export interface DropZoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop' | 'title'> {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  title?: ReactNode;
  hint?: ReactNode;
  state?: 'idle' | 'has-file' | 'error';
  compact?: boolean;
  icon?: ReactNode;
}

export function DropZone({ onFiles, accept, multiple, disabled, title = 'Drop a file here or click to browse', hint, state = 'idle', compact, icon, className, ...rest }: DropZoneProps) {
  const input = useRef<HTMLInputElement>(null);
  const over = useRef(false);
  const el = useRef<HTMLDivElement>(null);

  const setOver = (v: boolean) => {
    over.current = v;
    el.current?.classList.toggle('drag-over', v);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOver(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFiles(files);
    e.target.value = '';
  };

  return (
    <div
      ref={el}
      className={cx('dropzone', compact && 'dropzone-compact', state === 'has-file' && 'has-file', state === 'error' && 'has-error', disabled && 'is-disabled', className)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => input.current?.click()}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        if (!over.current) setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      {...rest}
    >
      {icon && <span className="dropzone-icon">{icon}</span>}
      <div>
        <div className="dropzone-title">{title}</div>
        {hint && <div className="dropzone-hint">{hint}</div>}
      </div>
      <input ref={input} type="file" className="dropzone-input" accept={accept} multiple={multiple} disabled={disabled} onChange={onChange} tabIndex={-1} />
    </div>
  );
}

/* --------------------------------------------------------------------- Log */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntryData {
  id: string | number;
  timestamp: Date | string;
  level: LogLevel;
  component?: string;
  message: string;
}

export interface LogViewerProps extends HTMLAttributes<HTMLDivElement> {
  entries: LogEntryData[];
  /** Header slot: title, filters, actions */
  header?: ReactNode;
  autoScroll?: boolean;
  fullHeight?: boolean;
  emptyMessage?: ReactNode;
  formatTime?: (t: Date | string) => string;
}

const defaultFormatTime = (t: Date | string) => {
  const d = typeof t === 'string' ? new Date(t) : t;
  const p = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
};

export function LogViewer({ entries, header, autoScroll = true, fullHeight, emptyMessage = 'No log entries', formatTime = defaultFormatTime, className, ...rest }: LogViewerProps) {
  const list = useRef<HTMLDivElement>(null);
  const prev = useRef(entries.length);

  useEffect(() => {
    const el = list.current;
    if (autoScroll && el && entries.length > prev.current) el.scrollTop = el.scrollHeight;
    prev.current = entries.length;
  }, [entries.length, autoScroll]);

  return (
    <div className={cx('log-container', fullHeight && 'log-fullheight', className)} {...rest}>
      {header && <div className="log-header">{header}</div>}
      {entries.length === 0 ? (
        <div className="log-empty">{emptyMessage}</div>
      ) : (
        <div ref={list} className="log-entries" role="log" aria-live="polite">
          {entries.map((e) => (
            <div key={e.id} className="log-entry" data-level={e.level}>
              <span className="log-time">{formatTime(e.timestamp)}</span>
              <span className={cx('log-level', `log-level-${e.level}`)}>{e.level}</span>
              <span className="log-component">{e.component}</span>
              <span className="log-message">{e.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export interface LogFilterProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
  children: ReactNode;
}

export const LogFilter = forwardRef<HTMLButtonElement, LogFilterProps>(({ active, count, className, children, ...rest }, ref) => (
  <button ref={ref} type="button" className={cx('log-filter', active && 'active', className)} aria-pressed={active} {...rest}>
    {children}
    {count !== undefined && <span className="log-filter-count">{count}</span>}
  </button>
));
LogFilter.displayName = 'LogFilter';
