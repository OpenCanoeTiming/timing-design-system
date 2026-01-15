import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  type DragEvent,
  type ChangeEvent,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

export type DropZoneSize = 'sm' | 'md' | 'lg';

export interface FileInfo {
  /** File object */
  file: File;
  /** Display name */
  name: string;
  /** File size in bytes */
  size: number;
}

export interface DropZoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  /** Accepted file types (e.g., ".xml,.json" or "image/*") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Size variant */
  size?: DropZoneSize;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Main title text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Hint text (e.g., file type restrictions) */
  hint?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Currently selected files */
  files?: FileInfo[];
  /** Called when files are dropped or selected */
  onDrop?: (files: File[]) => void;
  /** Called when a file is removed */
  onRemove?: (file: FileInfo) => void;
  /** Children (for fully custom content) */
  children?: ReactNode;
}

export interface DropZoneFileProps extends HTMLAttributes<HTMLDivElement> {
  /** File info */
  file: FileInfo;
  /** Remove handler */
  onRemove?: () => void;
  /** Custom file icon */
  icon?: ReactNode;
}

/**
 * Format file size to human-readable string
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Default upload icon
 */
function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M12 15V3m0 0l-4 4m4-4l4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Default file icon
 */
function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

/**
 * Close/remove icon
 */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * DropZone component for drag & drop file uploads.
 *
 * @example
 * const [files, setFiles] = useState<FileInfo[]>([]);
 *
 * <DropZone
 *   accept=".xml,.json"
 *   title="Drop XML or JSON file"
 *   subtitle="or click to browse"
 *   hint="Max file size: 10MB"
 *   files={files}
 *   onDrop={(newFiles) => setFiles(newFiles.map(f => ({ file: f, name: f.name, size: f.size })))}
 *   onRemove={(file) => setFiles(files.filter(f => f.name !== file.name))}
 * />
 */
export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  (
    {
      accept,
      multiple = false,
      size,
      disabled = false,
      error,
      title = 'Drop file here',
      subtitle = 'or click to browse',
      hint,
      icon,
      files = [],
      onDrop,
      onRemove,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const hasFiles = files.length > 0;

    const handleDragEnter = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      // Only set to false if leaving the dropzone (not entering a child)
      if (e.currentTarget === e.target) {
        setIsDragOver(false);
      }
    }, []);

    const handleDragOver = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled]
    );

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (disabled) return;

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
          onDrop?.(multiple ? droppedFiles : [droppedFiles[0]]);
        }
      },
      [disabled, multiple, onDrop]
    );

    const handleInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        if (selectedFiles.length > 0) {
          onDrop?.(selectedFiles);
        }
        // Reset input value to allow selecting the same file again
        e.target.value = '';
      },
      [onDrop]
    );

    const handleClick = useCallback(() => {
      if (!disabled) {
        inputRef.current?.click();
      }
    }, [disabled]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          inputRef.current?.click();
        }
      },
      [disabled]
    );

    const sizeClass = size ? `dropzone-${size}` : '';
    const classes = [
      'dropzone',
      sizeClass,
      isDragOver ? 'drag-over' : '',
      hasFiles ? 'has-file' : '',
      error ? 'has-error' : '',
      disabled ? 'disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-describedby={error ? 'dropzone-error' : undefined}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          className="dropzone-input"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          tabIndex={-1}
          aria-hidden="true"
        />

        {children ? (
          children
        ) : hasFiles ? (
          // Show selected files
          <div className={multiple ? 'dropzone-files' : ''}>
            {files.map((file, index) => (
              <DropZoneFile
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => onRemove?.(file)}
              />
            ))}
          </div>
        ) : (
          // Show drop prompt
          <>
            {icon || <UploadIcon className="dropzone-icon" />}
            <div className="dropzone-text">
              <p className="dropzone-title">{title}</p>
              {subtitle && <p className="dropzone-subtitle">{subtitle}</p>}
              {hint && <p className="dropzone-hint">{hint}</p>}
            </div>
          </>
        )}

        {error && (
          <p id="dropzone-error" className="dropzone-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DropZone.displayName = 'DropZone';

/**
 * File display component for DropZone.
 *
 * @example
 * <DropZoneFile
 *   file={{ file: new File([], 'test.xml'), name: 'test.xml', size: 1234 }}
 *   onRemove={() => handleRemove()}
 * />
 */
export const DropZoneFile = forwardRef<HTMLDivElement, DropZoneFileProps>(
  ({ file, onRemove, icon, className = '', ...props }, ref) => {
    const classes = ['dropzone-file', className].filter(Boolean).join(' ');

    const handleRemoveClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove?.();
      },
      [onRemove]
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {icon || <FileIcon className="dropzone-file-icon" />}
        <div className="dropzone-file-info">
          <p className="dropzone-file-name">{file.name}</p>
          <p className="dropzone-file-size">{formatFileSize(file.size)}</p>
        </div>
        {onRemove && (
          <button
            type="button"
            className="dropzone-file-remove"
            onClick={handleRemoveClick}
            aria-label={`Remove ${file.name}`}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

DropZoneFile.displayName = 'DropZoneFile';
