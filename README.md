# Canoe Timing Design System

Design system for canoe slalom timing applications. Professional, elegant UI components with a paddling touch.

**[Live Demo & Component Playground](https://opencanoetiming.github.io/timing-design-system/playbooks/)**

## Features

- Dual theme support (light/dark) with automatic system detection
- Self-hosted Inter & JetBrains Mono fonts
- CSS-only components (no JavaScript required)
- Optional React components
- Accessible (WCAG AA compliant)
- Canoe-specific styling: wave patterns, gate pole indicators, LIVE badges

## Installation

### From npm

```bash
npm install @opencanoetiming/timing-design-system
```

The package is automatically published to npmjs.com when changes are pushed to main.

### Direct Download

Download `dist/timing.css` from the [latest release](https://github.com/OpenCanoeTiming/timing-design-system/releases) and include it in your project:

```html
<link rel="stylesheet" href="timing.css">
```

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/timing.css">
</head>
<body>
  <!-- Automatic theme based on system preference -->
  <button class="btn btn-primary">Start Race</button>

  <!-- Or force a specific theme -->
  <div class="theme-dark">
    <span class="badge-live">LIVE</span>
  </div>
</body>
</html>
```

## Components

### Buttons

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Danger</button>

<!-- Sizes -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
```

### Cards

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Race Results</h3>
  </div>
  <div class="card-body">Content here</div>
</div>

<!-- Variants -->
<div class="card card-elevated">With shadow</div>
<div class="card card-interactive">Hover effect</div>
<div class="card card-canoe">Wavy top border</div>
```

### Status Indicators

```html
<!-- Badges -->
<span class="badge badge-success">Finished</span>
<span class="badge badge-warning">On Course</span>
<span class="badge badge-error">DNS</span>

<!-- Status dots -->
<span class="status-dot status-dot-success"></span>
<span class="status-dot status-dot-success status-dot-pulse"></span>
<span class="status-dot status-dot-success status-dot-glow"></span>

<!-- Alerts -->
<div class="alert alert-success">
  <div class="alert-title">Success</div>
  Time saved successfully.
</div>
```

### Forms

```html
<div class="form-group">
  <label class="form-label">Competitor Name</label>
  <input type="text" class="input" placeholder="Enter name">
  <span class="form-hint">Full name as on registration</span>
</div>

<select class="input select">
  <option>K1 Men</option>
  <option>C1 Women</option>
</select>

<label class="switch">
  <input type="checkbox" class="switch-input">
  <span class="switch-slider"></span>
  <span>Active</span>
</label>
```

### Tables

```html
<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th class="cell-numeric">Time</th>
        <th class="cell-status">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="cell-numeric">1</td>
        <td>Jan Novak</td>
        <td class="cell-numeric">94.32</td>
        <td class="cell-status"><span class="badge badge-success">FIN</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

### Modal

```html
<div class="modal-backdrop open">
  <div class="modal" role="dialog">
    <div class="modal-header">
      <h3 class="modal-title">Confirm Action</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">Are you sure?</div>
    <div class="modal-footer">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </div>
  </div>
</div>

<!-- Sizes: modal-sm, modal-lg, modal-xl -->
```

### Toast Notifications

```html
<div class="toast-container toast-container-top-right">
  <div class="toast toast-success">
    <div class="toast-content">
      <div class="toast-title">Saved</div>
      <div class="toast-message">Changes saved successfully.</div>
    </div>
    <div class="toast-progress">
      <div class="toast-progress-bar"></div>
    </div>
  </div>
</div>
```

### Tabs

```html
<div class="tabs">
  <div class="tab-list">
    <button class="tab active">Results</button>
    <button class="tab">Start List</button>
    <button class="tab">
      Competitors <span class="tab-badge">24</span>
    </button>
  </div>
</div>

<!-- Variants: tabs-pills, tabs-full -->
```

### Canoe-Specific Components

#### App Header

The header is designed to be the unifying visual element across timing tools. It features a 4px accent bar on the left with a glow effect, and supports multiple layout patterns.

**Admin Dashboard Style** (c123-server inspired):

```html
<header class="app-header">
  <div class="header-brand">
    <h1 class="header-title header-title-lg">C123-SERVER</h1>
  </div>
  <div class="header-status">
    <span class="header-port">:27123</span>
    <span class="header-status-item">
      <span class="status-dot status-dot-success"></span>
      <span>TCP</span>
    </span>
    <span class="header-status-item">
      <span class="status-dot status-dot-warning status-dot-pulse"></span>
      <span>UDP</span>
    </span>
    <span class="header-status-item">
      <span class="status-dot status-dot-error"></span>
      <span>XML</span>
    </span>
    <span class="badge-live">LIVE</span>
  </div>
</header>
```

**Badge-style Status Indicators** (alternative):

```html
<header class="app-header">
  <div class="header-brand">
    <h1 class="header-title">Canoe Timing</h1>
  </div>
  <div class="header-status">
    <div class="status-indicator connected">
      <span class="status-indicator-dot"></span>
      <span>TCP</span>
    </div>
  </div>
  <div class="header-actions">
    <span class="badge-live">LIVE</span>
  </div>
</header>
```

#### Header Components

| Class | Description |
|-------|-------------|
| `.app-header` | Main header container with accent bar |
| `.header-brand` | Logo/title area |
| `.header-title` | Main heading (H1) |
| `.header-title-lg` | Larger title variant (text-2xl, bold) |
| `.header-status` | Status indicators container (right-aligned) |
| `.header-status-item` | Minimal status: dot + label, monospace |
| `.header-port` | Server port display (`:27123`) |
| `.header-actions` | Action buttons area |
| `.status-indicator` | Badge-style status with border |
| `.badge-live` | LIVE badge with gate pole animation |
| `.header-live` | Simple LIVE indicator (dot + text) |

#### Header Variants

| Class | Effect |
|-------|--------|
| `.header-compact` | Smaller 44px height |
| `.header-plain` | No accent bar |
| `.header-elevated` | With shadow |

#### LIVE Badge Variants

```html
<!-- Default: with gate pole animation (paddling flair) -->
<span class="badge-live">LIVE</span>

<!-- Simple: just dot + text (for simpler tools) -->
<span class="header-live">
  <span class="status-dot status-dot-success"></span>
  LIVE
</span>
```

#### Gate Pole Indicators

```html
<span class="gate-pole gate-pole-success"></span>
<span class="gate-pole gate-pole-warning"></span>
<span class="gate-pole gate-pole-error"></span>
```

#### Log Viewer

```html
<div class="log-container">
  <div class="log-entry">
    <span class="log-timestamp">14:23:45.123</span>
    <span class="log-level log-level-info">info</span>
    <span class="log-component">TCP</span>
    <span class="log-message">Connected to server</span>
  </div>
</div>
```

#### Drop Zone

```html
<div class="dropzone">
  <span class="dropzone-label">Drop file here</span>
  <span class="dropzone-hint">or click to browse</span>
</div>
```

## Theming

### Automatic Theme Detection

By default, the system respects `prefers-color-scheme`. Override with classes:

```html
<body class="theme-dark">Dark mode forced</body>
<body class="theme-light">Light mode forced</body>
```

### CSS Custom Properties

All values are CSS variables for easy customization:

```css
:root {
  --color-accent: #ff6600;
  --color-accent-hover: #cc5200;
}
```

| Variable | Light | Dark |
|----------|-------|------|
| `--color-bg-body` | #f5f5f5 | #0a0a0a |
| `--color-bg-surface` | #ffffff | #141414 |
| `--color-text-primary` | #1a1a1a | #ffffff |
| `--color-accent` | #0066cc | #0088ff |
| `--color-success` | #059669 | #00d26a |
| `--color-warning` | #d97706 | #ff9500 |
| `--color-error` | #dc2626 | #ff3b30 |

## React Components

React components are available in `src/react/`:

```tsx
import {
  Button, Card, Badge, Modal, Toast,
  Header, HeaderBrand, HeaderTitle, HeaderStatus,
  HeaderPort, HeaderStatusItem, LiveBadge
} from '@opencanoetiming/timing-design-system/react';

function App() {
  return (
    <Card variant="canoe">
      <Badge variant="success">Live</Badge>
      <Button variant="primary">Start</Button>
    </Card>
  );
}
```

### Header Components (React)

```tsx
import {
  Header, HeaderBrand, HeaderTitle, HeaderStatus,
  HeaderPort, HeaderStatusItem, LiveBadge
} from '@opencanoetiming/timing-design-system/react';

// Admin dashboard style
function AdminHeader() {
  return (
    <Header>
      <HeaderBrand>
        <HeaderTitle className="header-title-lg">C123-SERVER</HeaderTitle>
      </HeaderBrand>
      <HeaderStatus>
        <HeaderPort port={27123} />
        <HeaderStatusItem label="TCP" status="connected" />
        <HeaderStatusItem label="UDP" status="connecting" />
        <HeaderStatusItem label="XML" status="disconnected" />
        <LiveBadge />  {/* default: with gate pole */}
      </HeaderStatus>
    </Header>
  );
}

// Simple app header
function SimpleHeader() {
  return (
    <Header>
      <HeaderBrand>
        <HeaderTitle>My App</HeaderTitle>
      </HeaderBrand>
      <HeaderStatus>
        <LiveBadge variant="simple" />  {/* simple: just dot + text */}
      </HeaderStatus>
    </Header>
  );
}
```

## Development

```bash
# Install dependencies
npm install

# Start dev server with playbook demos
npm run dev

# Build CSS bundle
npm run build
```

## Project Structure

```
src/
├── tokens/          # Design tokens (colors, typography, spacing)
├── css/             # CSS components
├── fonts/           # Self-hosted woff2 fonts
├── react/           # React components
└── playbooks/       # Demo pages
dist/
├── timing.css       # Combined CSS bundle
└── timing.min.css   # Minified bundle
```

## Related Projects

- [c123-server](https://github.com/OpenCanoeTiming/c123-server) - WebSocket bridge to Canoe123
- [c123-scoreboard](https://github.com/OpenCanoeTiming/c123-scoreboard) - Live results display
- [c123-scoring](https://github.com/OpenCanoeTiming/c123-scoring) - Penalty entry application

## License

MIT
