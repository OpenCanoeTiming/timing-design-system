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
// PORT DISPLAY
// =============================================================================

export interface HeaderPortProps {
  port: number | string;
  className?: string;
}

export function HeaderPort({ port, className = '' }: HeaderPortProps) {
  return <span className={`header-port ${className}`.trim()}>:{port}</span>;
}

// =============================================================================
// MINIMAL STATUS ITEM (admin dashboard style)
// =============================================================================

export interface HeaderStatusItemProps {
  label: string;
  status: 'connected' | 'connecting' | 'disconnected';
  className?: string;
}

export function HeaderStatusItem({ label, status, className = '' }: HeaderStatusItemProps) {
  const dotClass =
    status === 'connected'
      ? 'status-dot-success'
      : status === 'connecting'
        ? 'status-dot-warning status-dot-pulse'
        : 'status-dot-error';
  return (
    <span className={`header-status-item ${className}`.trim()}>
      <span className={`status-dot ${dotClass}`} />
      <span>{label}</span>
    </span>
  );
}

// =============================================================================
// LIVE BADGE
// =============================================================================

export interface LiveBadgeProps {
  /** 'default' = s gate pole animací, 'simple' = jen dot + text */
  variant?: 'default' | 'simple';
  className?: string;
}

export function LiveBadge({ variant = 'default', className = '' }: LiveBadgeProps) {
  const badgeClass = variant === 'simple' ? 'header-live' : 'badge-live';
  return (
    <span className={`${badgeClass} ${className}`.trim()} role="status" aria-live="polite">
      {variant === 'simple' && <span className="status-dot status-dot-success" />}
      LIVE
    </span>
  );
}
