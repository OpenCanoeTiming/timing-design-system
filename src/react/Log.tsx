import {
  forwardRef,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogSize = 'sm' | 'md' | 'lg' | 'fullheight';

export interface LogEntry {
  /** Unique identifier for the log entry */
  id: string | number;
  /** Timestamp of the log entry */
  timestamp: Date | string;
  /** Log level */
  level: LogLevel;
  /** Component/source that generated the log */
  component?: string;
  /** Log message */
  message: string;
}

export interface LogContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Log entries to display */
  entries?: LogEntry[];
  /** Container size variant */
  size?: LogSize;
  /** Compact display mode */
  compact?: boolean;
  /** Auto-scroll to bottom on new entries */
  autoScroll?: boolean;
  /** Show timestamp column */
  showTimestamp?: boolean;
  /** Show component column */
  showComponent?: boolean;
  /** Format timestamp function */
  formatTimestamp?: (date: Date | string) => string;
  /** Empty state message */
  emptyMessage?: string;
  /** Children (for custom rendering) */
  children?: ReactNode;
}

export interface LogEntryProps extends HTMLAttributes<HTMLDivElement> {
  /** Log entry data */
  entry?: LogEntry;
  /** Show timestamp */
  showTimestamp?: boolean;
  /** Show component */
  showComponent?: boolean;
  /** Format timestamp function */
  formatTimestamp?: (date: Date | string) => string;
  /** Log level (if not using entry prop) */
  level?: LogLevel;
  /** Timestamp (if not using entry prop) */
  timestamp?: Date | string;
  /** Component name (if not using entry prop) */
  component?: string;
  /** Message (if not using entry prop) */
  message?: ReactNode;
  /** Children as message content */
  children?: ReactNode;
}

export interface LogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Header title */
  title?: string;
  /** Show live indicator */
  showLive?: boolean;
  /** Children (actions) */
  children?: ReactNode;
}

export interface LogFilterProps extends HTMLAttributes<HTMLButtonElement> {
  /** Filter level */
  level: LogLevel;
  /** Whether filter is active */
  active?: boolean;
  /** Count to display */
  count?: number;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Default timestamp formatter (HH:MM:SS.mmm)
 */
function defaultFormatTimestamp(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');
  const ms = d.getMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${ms}`;
}

/**
 * Log container component for displaying application logs.
 *
 * @example
 * const logs = [
 *   { id: 1, timestamp: new Date(), level: 'info', component: 'TCP', message: 'Connected' },
 *   { id: 2, timestamp: new Date(), level: 'error', component: 'UDP', message: 'Connection failed' },
 * ];
 *
 * <LogContainer entries={logs} size="md" autoScroll />
 */
export const LogContainer = forwardRef<HTMLDivElement, LogContainerProps>(
  (
    {
      entries = [],
      size,
      compact = false,
      autoScroll = true,
      showTimestamp = true,
      showComponent = true,
      formatTimestamp = defaultFormatTimestamp,
      emptyMessage = 'No log entries',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const prevEntriesLength = useRef(entries.length);

    // Auto-scroll to bottom when new entries are added
    useEffect(() => {
      if (autoScroll && containerRef.current && entries.length > prevEntriesLength.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
      prevEntriesLength.current = entries.length;
    }, [entries.length, autoScroll]);

    const sizeClass = size ? `log-${size}` : '';
    const classes = [
      'log-container',
      sizeClass,
      compact ? 'log-compact' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Merge refs
    const setRefs = (element: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    // If children are provided, render them directly
    if (children) {
      return (
        <div ref={setRefs} className={classes} role="log" aria-live="polite" {...props}>
          {children}
        </div>
      );
    }

    // Otherwise, render entries
    return (
      <div ref={setRefs} className={classes} role="log" aria-live="polite" {...props}>
        {entries.length === 0 ? (
          <div className="log-empty">
            <svg
              className="log-empty-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M9 12h6M12 9v6" />
              <rect x="3" y="4" width="18" height="16" rx="2" />
            </svg>
            <span className="log-empty-text">{emptyMessage}</span>
          </div>
        ) : (
          entries.map((entry) => (
            <LogEntry
              key={entry.id}
              entry={entry}
              showTimestamp={showTimestamp}
              showComponent={showComponent}
              formatTimestamp={formatTimestamp}
            />
          ))
        )}
      </div>
    );
  }
);

LogContainer.displayName = 'LogContainer';

/**
 * Individual log entry component.
 *
 * @example
 * <LogEntry
 *   level="info"
 *   timestamp={new Date()}
 *   component="TCP"
 *   message="Client connected from 192.168.1.1"
 * />
 */
export const LogEntry = forwardRef<HTMLDivElement, LogEntryProps>(
  (
    {
      entry,
      showTimestamp = true,
      showComponent = true,
      formatTimestamp = defaultFormatTimestamp,
      level: levelProp,
      timestamp: timestampProp,
      component: componentProp,
      message: messageProp,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Use entry prop or individual props
    const level = entry?.level ?? levelProp ?? 'info';
    const timestamp = entry?.timestamp ?? timestampProp;
    const component = entry?.component ?? componentProp;
    const message = children ?? messageProp ?? entry?.message;

    const entryClass = level === 'error' || level === 'warn' ? `log-entry-${level}` : '';
    const classes = ['log-entry', entryClass, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {showTimestamp && timestamp && (
          <span className="log-timestamp">{formatTimestamp(timestamp)}</span>
        )}
        <span className={`log-level log-level-${level}`}>{level}</span>
        {showComponent && component && (
          <span className="log-component">[{component}]</span>
        )}
        <span className="log-message">{message}</span>
      </div>
    );
  }
);

LogEntry.displayName = 'LogEntry';

/**
 * Log header with title and actions.
 *
 * @example
 * <LogHeader title="Application Logs" showLive>
 *   <LogFilter level="error" active count={3} onClick={() => toggleFilter('error')} />
 * </LogHeader>
 */
export const LogHeader = forwardRef<HTMLDivElement, LogHeaderProps>(
  ({ title = 'Logs', showLive = false, className = '', children, ...props }, ref) => {
    const classes = ['log-header', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="log-header-title">
          {title}
          {showLive && (
            <span className="log-live-indicator" style={{ marginLeft: '8px' }}>
              LIVE
            </span>
          )}
        </div>
        {children && <div className="log-header-actions">{children}</div>}
      </div>
    );
  }
);

LogHeader.displayName = 'LogHeader';

/**
 * Filter button for log levels.
 *
 * @example
 * <LogFilter level="error" active={filters.error} count={errorCount} onClick={toggleErrorFilter} />
 */
export const LogFilter = forwardRef<HTMLButtonElement, LogFilterProps>(
  ({ level, active = false, count, className = '', onClick, ...props }, ref) => {
    const classes = ['log-filter', active ? 'active' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type="button" className={classes} onClick={onClick} {...props}>
        <span>{level}</span>
        {count !== undefined && <span className="log-filter-count">{count}</span>}
      </button>
    );
  }
);

LogFilter.displayName = 'LogFilter';
