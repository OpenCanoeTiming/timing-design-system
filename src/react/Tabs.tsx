import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';

export type TabsVariant = 'underline' | 'bordered' | 'pills';
export type TabsSize = 'sm' | 'md' | 'lg';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: TabsVariant;
  size: TabsSize;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The id of the initially active tab */
  defaultTab?: string;
  /** Controlled active tab id */
  activeTab?: string;
  /** Callback when active tab changes */
  onChange?: (tabId: string) => void;
  /** Visual variant */
  variant?: TabsVariant;
  /** Size variant */
  size?: TabsSize;
  /** Whether tabs should fill the container width */
  fullWidth?: boolean;
  /** Children (TabList and TabPanels) */
  children: ReactNode;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Tab buttons */
  children: ReactNode;
}

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  /** Unique identifier for this tab */
  id: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  icon?: ReactNode;
  /** Badge/count to display after the label */
  badge?: ReactNode;
  /** Tab label */
  children: ReactNode;
}

export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
  /** Tab panel contents */
  children: ReactNode;
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** The tab id this panel is associated with */
  tabId: string;
  /** Panel content */
  children: ReactNode;
}

/**
 * Tabs component for switching between content panels.
 *
 * @example
 * <Tabs defaultTab="tab1" onChange={(id) => console.log(id)}>
 *   <TabList>
 *     <Tab id="tab1">First</Tab>
 *     <Tab id="tab2">Second</Tab>
 *     <Tab id="tab3" disabled>Disabled</Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel tabId="tab1">First panel content</TabPanel>
 *     <TabPanel tabId="tab2">Second panel content</TabPanel>
 *     <TabPanel tabId="tab3">Disabled panel content</TabPanel>
 *   </TabPanels>
 * </Tabs>
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultTab,
      activeTab: controlledActiveTab,
      onChange,
      variant = 'underline',
      size = 'md',
      fullWidth = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [internalActiveTab, setInternalActiveTab] = useState(defaultTab ?? '');

    const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

    const setActiveTab = useCallback(
      (id: string) => {
        if (controlledActiveTab === undefined) {
          setInternalActiveTab(id);
        }
        onChange?.(id);
      },
      [controlledActiveTab, onChange]
    );

    const variantClass = variant === 'bordered' ? 'tabs-bordered' : variant === 'pills' ? 'tabs-pills' : '';
    const sizeClass = size !== 'md' ? `tabs-${size}` : '';
    const fullWidthClass = fullWidth ? 'tabs-full' : '';

    const classes = ['tabs', variantClass, sizeClass, fullWidthClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, variant, size }}>
        <div ref={ref} className={classes} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

/**
 * Container for Tab buttons.
 */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['tab-list', className].filter(Boolean).join(' ');

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const tabs = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>('.tab:not([disabled])')
      );
      const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);

      let nextIndex = currentIndex;

      switch (event.key) {
        case 'ArrowLeft':
          nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          event.preventDefault();
          break;
        case 'ArrowRight':
          nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          event.preventDefault();
          break;
        case 'Home':
          nextIndex = 0;
          event.preventDefault();
          break;
        case 'End':
          nextIndex = tabs.length - 1;
          event.preventDefault();
          break;
      }

      if (nextIndex !== currentIndex && tabs[nextIndex]) {
        tabs[nextIndex].focus();
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        className={classes}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

/**
 * Individual tab button.
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ id, disabled = false, icon, badge, className = '', children, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === id;

    const handleClick = () => {
      if (!disabled) {
        setActiveTab(id);
      }
    };

    const classes = ['tab', className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`tab-${id}`}
        aria-selected={isActive}
        aria-controls={`panel-${id}`}
        aria-disabled={disabled}
        disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        className={classes}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="tab-icon">{icon}</span>}
        {children}
        {badge && <span className="tab-badge">{badge}</span>}
      </button>
    );
  }
);

Tab.displayName = 'Tab';

/**
 * Container for TabPanel components.
 */
export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['tab-panels', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

TabPanels.displayName = 'TabPanels';

/**
 * Content panel for a tab.
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ tabId, className = '', children, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === tabId;

    const classes = ['tab-panel', isActive ? 'active' : '', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`panel-${tabId}`}
        aria-labelledby={`tab-${tabId}`}
        aria-hidden={!isActive}
        tabIndex={0}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel';
