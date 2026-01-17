import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

export type MenuPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type MenuItemVariant = 'default' | 'danger';

interface MenuContextValue {
  isOpen: boolean;
  close: () => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a Menu provider');
  }
  return context;
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Menu content (MenuTrigger and MenuContent) */
  children: ReactNode;
}

export interface MenuTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  /** Whether the trigger should be rendered as a child element */
  asChild?: boolean;
  /** Trigger content */
  children: ReactNode;
}

export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Position relative to trigger */
  position?: MenuPosition;
  /** Minimum width (defaults to trigger width) */
  minWidth?: number | string;
  /** Menu items */
  children: ReactNode;
}

export interface MenuItemProps extends HTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: MenuItemVariant;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  icon?: ReactNode;
  /** Keyboard shortcut hint */
  shortcut?: string;
  /** Item content */
  children: ReactNode;
}

export interface MenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface MenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Context menu / dropdown menu component.
 *
 * @example
 * <Menu>
 *   <MenuTrigger>Open menu</MenuTrigger>
 *   <MenuContent>
 *     <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
 *     <MenuItem onClick={() => console.log('Copy')}>Copy</MenuItem>
 *     <MenuSeparator />
 *     <MenuItem variant="danger" onClick={() => console.log('Delete')}>Delete</MenuItem>
 *   </MenuContent>
 * </Menu>
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ className = '', children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
    }, []);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: globalThis.MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          close();
        }
      };

      const handleEscape = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') {
          close();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [isOpen, close]);

    const classes = ['menu', className].filter(Boolean).join(' ');

    const handleTriggerClick = () => {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setFocusedIndex(0);
      }
    };

    return (
      <MenuContext.Provider value={{ isOpen, close, focusedIndex, setFocusedIndex }}>
        <div
          ref={(node) => {
            (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={classes}
          data-state={isOpen ? 'open' : 'closed'}
          {...props}
        >
          {/* Clone children to pass handlers */}
          {Array.isArray(children)
            ? children.map((child, index) => {
                if (index === 0 && child?.type === MenuTrigger) {
                  return (
                    <child.type
                      key={index}
                      {...child.props}
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        handleTriggerClick();
                        child.props.onClick?.(e);
                      }}
                    />
                  );
                }
                return child;
              })
            : children}
        </div>
      </MenuContext.Provider>
    );
  }
);

Menu.displayName = 'Menu';

/**
 * Menu trigger button.
 */
export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['menu-trigger', className].filter(Boolean).join(' ');

    return (
      <button ref={ref} type="button" className={classes} {...props}>
        {children}
      </button>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';

/**
 * Menu content container.
 */
export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  (
    { position = 'bottom-start', minWidth, className = '', children, ...props },
    ref
  ) => {
    const { isOpen, focusedIndex, setFocusedIndex, close } = useMenuContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLButtonElement[]>([]);

    // Focus management
    useEffect(() => {
      if (isOpen && focusedIndex >= 0 && itemsRef.current[focusedIndex]) {
        itemsRef.current[focusedIndex].focus();
      }
    }, [isOpen, focusedIndex]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const items = itemsRef.current.filter((item) => item && !item.disabled);
      const currentIndex = items.findIndex(
        (item) => item === document.activeElement
      );

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(
            currentIndex < items.length - 1 ? currentIndex + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(
            currentIndex > 0 ? currentIndex - 1 : items.length - 1
          );
          break;
        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setFocusedIndex(items.length - 1);
          break;
        case 'Tab':
          close();
          break;
      }
    };

    if (!isOpen) return null;

    const positionClass = `menu-content-${position}`;
    const classes = ['menu-content', positionClass, className]
      .filter(Boolean)
      .join(' ');

    const style = minWidth ? { minWidth } : undefined;

    return (
      <div
        ref={(node) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={classes}
        role="menu"
        style={style}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Register item refs */}
        {Array.isArray(children)
          ? children.map((child, index) => {
              if (child?.type === MenuItem) {
                return (
                  <child.type
                    key={index}
                    {...child.props}
                    ref={(el: HTMLButtonElement) => {
                      itemsRef.current[index] = el;
                    }}
                  />
                );
              }
              return child;
            })
          : children}
      </div>
    );
  }
);

MenuContent.displayName = 'MenuContent';

/**
 * Menu item button.
 */
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      variant = 'default',
      disabled = false,
      icon,
      shortcut,
      className = '',
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { close } = useMenuContext();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(event);
        close();
      }
    };

    const variantClass = variant !== 'default' ? `menu-item-${variant}` : '';
    const classes = ['menu-item', variantClass, className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        className={classes}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="menu-item-icon">{icon}</span>}
        <span className="menu-item-label">{children}</span>
        {shortcut && <span className="menu-item-shortcut">{shortcut}</span>}
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';

/**
 * Menu separator line.
 */
export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className = '', ...props }, ref) => {
    const classes = ['menu-separator', className].filter(Boolean).join(' ');

    return <div ref={ref} role="separator" className={classes} {...props} />;
  }
);

MenuSeparator.displayName = 'MenuSeparator';

/**
 * Menu label/header.
 */
export const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['menu-label', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

MenuLabel.displayName = 'MenuLabel';
