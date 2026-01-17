import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type KbdSize = 'sm' | 'md' | 'lg';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Size variant */
  size?: KbdSize;
  /** Key content */
  children: ReactNode;
}

/**
 * Keyboard key component for displaying keyboard shortcuts.
 *
 * @example
 * <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
 * <Kbd size="sm">Esc</Kbd>
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ size = 'md', className = '', children, ...props }, ref) => {
    const sizeClass = size !== 'md' ? `kbd-${size}` : '';
    const classes = ['kbd', sizeClass, className].filter(Boolean).join(' ');

    return (
      <kbd ref={ref} className={classes} {...props}>
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = 'Kbd';
