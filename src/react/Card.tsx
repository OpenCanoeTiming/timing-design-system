import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'interactive';
export type CardPadding = 'default' | 'compact' | 'spacious';
export type CardStatus = 'success' | 'warning' | 'error' | 'info';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card visual style */
  variant?: CardVariant;
  /** Card padding size */
  padding?: CardPadding;
  /** Whether to use canoe variant with wavy border */
  canoe?: boolean;
  /** Card status (left border color) */
  status?: CardStatus;
  /** Whether to show glow effect (requires status) */
  glow?: boolean;
  /** Card content */
  children: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (h1-h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
}

export interface CardSubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

/**
 * Card component with multiple variants and padding options.
 *
 * @example
 * <Card variant="elevated">
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardSubtitle>Subtitle</CardSubtitle>
 *   </CardHeader>
 *   <CardBody>Content here</CardBody>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 *
 * @example
 * // Canoe variant with wavy border
 * <Card canoe>
 *   <CardBody>Canoe themed card</CardBody>
 * </Card>
 *
 * @example
 * // Status card with glow
 * <Card status="success" glow>
 *   <CardBody>Success message</CardBody>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'default', canoe, status, glow, className = '', children, ...props }, ref) => {
    const variantClass = variant !== 'default' ? `card-${variant}` : '';
    const paddingClass = padding !== 'default' ? `card-${padding}` : '';
    const canoeClass = canoe ? 'card-canoe' : '';
    const statusClass = status ? `card-status-${status}` : '';
    const glowClass = glow && status ? 'card-glow' : '';

    const classes = ['card', variantClass, paddingClass, canoeClass, statusClass, glowClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card header section with bottom border.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['card-header', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card body section for main content.
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['card-body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * Card footer section with top border.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['card-footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

/**
 * Card title heading.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Component = 'h3', className = '', children, ...props }, ref) => {
    const classes = ['card-title', className].filter(Boolean).join(' ');

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * Card subtitle text.
 */
export const CardSubtitle = forwardRef<HTMLParagraphElement, CardSubtitleProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['card-subtitle', className].filter(Boolean).join(' ');

    return (
      <p ref={ref} className={classes} {...props}>
        {children}
      </p>
    );
  }
);

CardSubtitle.displayName = 'CardSubtitle';
