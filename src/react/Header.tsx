import React from 'react';

// =============================================================================
// HEADER COMPONENTS
// =============================================================================

export interface HeaderProps {
  children: React.ReactNode;
  variant?: 'default' | 'compact' | 'plain' | 'elevated';
  className?: string;
}

export function Header({ children, variant = 'default', className = '' }: HeaderProps) {
  const variantClass = variant !== 'default' ? `header-${variant}` : '';
  return (
    <header className={`app-header ${variantClass} ${className}`.trim()}>
      {children}
    </header>
  );
}

// =============================================================================
// HEADER SUB-COMPONENTS
// =============================================================================

export interface HeaderBrandProps {
  children: React.ReactNode;
  className?: string;
}

export function HeaderBrand({ children, className = '' }: HeaderBrandProps) {
  return <div className={`header-brand ${className}`.trim()}>{children}</div>;
}

export interface HeaderTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function HeaderTitle({ children, subtitle, className = '' }: HeaderTitleProps) {
  return (
    <div className={className}>
      <h1 className="header-title">{children}</h1>
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </div>
  );
}

export interface HeaderNavProps {
  children: React.ReactNode;
  className?: string;
}

export function HeaderNav({ children, className = '' }: HeaderNavProps) {
  return <nav className={`header-nav ${className}`.trim()}>{children}</nav>;
}

export interface HeaderActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function HeaderActions({ children, className = '' }: HeaderActionsProps) {
  return <div className={`header-actions ${className}`.trim()}>{children}</div>;
}

// =============================================================================
// STATUS INDICATOR
// =============================================================================

export interface StatusIndicatorProps {
  label: string;
  status: 'connected' | 'connecting' | 'disconnected';
  className?: string;
}

export function StatusIndicator({ label, status, className = '' }: StatusIndicatorProps) {
  return (
    <div className={`status-indicator ${status} ${className}`.trim()}>
      <span className="status-indicator-dot" />
      <span>{label}</span>
    </div>
  );
}

export interface HeaderStatusProps {
  children: React.ReactNode;
  className?: string;
}

export function HeaderStatus({ children, className = '' }: HeaderStatusProps) {
  return <div className={`header-status ${className}`.trim()}>{children}</div>;
}

// =============================================================================
// LIVE BADGE
// =============================================================================

export interface LiveBadgeProps {
  className?: string;
}

export function LiveBadge({ className = '' }: LiveBadgeProps) {
  return (
    <span className={`badge-live ${className}`.trim()} role="status" aria-live="polite">
      LIVE
    </span>
  );
}
