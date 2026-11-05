# Timing Design System

CSS design system (plus thin React wrappers) for the OpenCanoeTiming tools: c123-server admin, penalty check, XML tools and the 2026/27 rebuild clients.

**[Components](https://opencanoetiming.github.io/timing-design-system/playbooks/)** · [Admin specimen](https://opencanoetiming.github.io/timing-design-system/playbooks/specimen-admin.html) · [User-tool specimen](https://opencanoetiming.github.io/timing-design-system/playbooks/specimen-user.html)

## What 1.0 is

- **Quiet operator UI.** Cool-tinted neutrals, off-white text on dark, one accent, hairline borders, no decoration. Built for long sessions at a finish line.
- **Two themes, one token surface.** `.theme-light` (user tools) and `.theme-dark` (admin), or `prefers-color-scheme` when no class is set. Every color is a CSS custom property; WCAG AA checked for both themes.
- **Three status primitives.** `status-dot`, `badge`, `alert` share one modifier set: `success | warning | error | info | neutral` and the result marks `provisional | review | stale | pending | live`.
- **Dense, legible tables.** Fixed row height, sticky header, tabular figures everywhere, `col-time` / `col-bib` / `col-num` helpers.
- **Scope from usage.** 1.0 ships what the three consumers actually use; everything else was removed (see Migration).

## Install

The package is on GitHub Packages, which needs a token even for public packages.

```
# ~/.npmrc or ./.npmrc
@opencanoetiming:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
npm install @opencanoetiming/timing-design-system
```

```js
import '@opencanoetiming/timing-design-system/css';        // dist/timing.css
// or the sources, if your bundler resolves CSS imports:
import '@opencanoetiming/timing-design-system/src/tokens/index.css';
import '@opencanoetiming/timing-design-system/src/css/index.css';
```

Static pages can link the built file from GitHub Pages. Pin the major:

```html
<link rel="stylesheet" href="https://opencanoetiming.github.io/timing-design-system/v1/timing.min.css">
```

`v0.9/timing.min.css` keeps serving the legacy line.

## Quick start

```html
<html class="theme-dark">            <!-- or theme-light, or nothing for auto -->
<link rel="stylesheet" href="timing.css">

<header class="app-header">
  <div class="header-brand"><span class="header-title">C123-SERVER</span></div>
  <div class="header-status">
    <span class="header-status-item"><span class="status-dot status-dot-success"></span>TCP</span>
    <span class="badge badge-live"><span class="status-dot status-dot-live"></span>LIVE</span>
  </div>
</header>

<table class="table table-hover">
  <tr><td class="col-bib">24</td><td>Petr Svoboda</td>
      <td class="col-time mark mark-provisional">1:38.52</td>
      <td><span class="badge badge-provisional">Provisional</span></td></tr>
</table>
```

## Components

| Component | Classes | React |
|---|---|---|
| Buttons | `btn`, `btn-primary` / `-secondary` / `-ghost` / `-danger`, `btn-sm`, `btn-icon`, `is-loading` | `Button` |
| Forms | `form-group`, `form-label`, `form-hint`, `form-error`, `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `input-group`, `input-addon` | `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch` |
| Status | `status-dot-*`, `status-item`, `badge-*`, `badge-sm`, `badge-mono`, `alert-*`, `alert-tinted`, `mark-*` | `StatusDot`, `StatusItem`, `Badge`, `Alert`, `MarkedValue` |
| Cards | `card`, `card-header`, `card-title`, `card-body`, `card-body-flush`, `card-footer`, `card-compact`, `card-interactive`, `card-selected`, `card-grid` | `Card`, `CardHeader`, `CardBody`, `CardFooter` |
| Tables | `table`, `table-striped`, `table-hover`, `table-compact`, `table-responsive`, `col-*`, `is-selected`, `is-dimmed`, `table-empty` | `Table`, `TableRow`, `TableCell`, `TableHeaderCell`, `TableEmpty` |
| Tabs | `tabs`, `tab-list`, `tab`, `tab-badge`, `tab-panels`, `tab-panel` | `Tabs` |
| Header | `app-header`, `header-brand`, `header-title`, `header-context`, `header-status`, `header-status-item`, `header-port`, `header-actions`, `page-banner-*` | `AppHeader`, `PageBanner` |
| Modal | `modal`, `modal-content`, `modal-header`, `modal-title`, `modal-close`, `modal-body`, `modal-footer`, `modal-lg`, `modal-fullscreen` | `Modal` |
| Toast | `toast-container`, `toast-*`, `toast-title`, `toast-message`, `toast-close` | `Toast`, `ToastContainer` |
| Menu | `menu`, `menu-content-*`, `menu-item`, `menu-item-danger`, `menu-separator`, `menu-label` | `Menu` |
| Log | `log-container`, `log-header`, `log-filter`, `log-entries`, `log-entry`, `log-time`, `log-level-*`, `log-component`, `log-message` | `LogViewer`, `LogFilter` |
| Dropzone | `dropzone`, `dropzone-compact`, `drag-over`, `has-file`, `has-error`, `dropzone-title`, `dropzone-hint`, `dropzone-files` | `DropZone` |
| Progress | `progress`, `progress-bar`, `progress-*`, `progress-row`, `progress-indeterminate`, `spinner`, `loading-overlay` | `ProgressBar`, `Spinner` |
| Layout | `container`, `page-main`, `section-head`, `stat-row`, `kv`, `flex`, `grid`, `grid-cols-*`, `gap-*`, `hidden`, `truncate` | — |

The playbook shows every class in both themes.

## Tokens

```
--color-bg-body | -surface | -elevated | -input | -overlay
--color-border | -border-strong | -border-focus
--color-text-primary | -secondary | -muted | -on-accent
--color-accent | -accent-hover | -accent-active | -accent-subtle | -accent-text
--color-{success|warning|error|info|neutral} | -subtle | -text
--color-mark-{provisional|review|stale|pending|live} | -subtle
--space-1…12  --radius-sm…xl  --shadow-sm…lg  --focus-ring
--control-h-sm | --control-h | --control-h-lg   --row-h | --row-h-compact
--font-sans | --font-mono   --text-xs…3xl   --font-normal…bold
```

Put the theme class on `<html>`, not on `<body>`: derived custom properties resolve where they are declared, so a theme class deeper in the tree mixes themes.

## Migration from 0.9

Breaking. Consumers migrate in their own issue: c123-server#221, c123-penalty-check#172, c123-xml-tools#7.

**Removed, no replacement:** `canoe.css` tokens (`--pattern-wave*`, `--glow-*`, `--color-gate-*`, `--header-bar-*`), `gate-pole-*`, `line-wave`, `card-canoe`, `card-elevated`, `card-status-*`, glow cards, `status-dot-glow`, `connection-status`, `status-indicator`, `kbd*`, `dots-*`, `spinner-{md,accent,success,warning,error,white}`, `toast-container-*` positions, `toast-progress*`, `tabs-{pills,bordered,full,sm,lg}`, `tab-icon`, `modal-{sm,xl}`, `modal-backdrop`, `modal-confirm`, `modal-footer-{left,center}`, `btn-lg`, `card-spacious`, `header-title-lg`, `header-subtitle` (kept, but no size variant), `container-{sm,md,lg,xl}`, `grid-cols-{1,4}`, the spacing/typography utility ladder (`m-*`, `p-*`, `mt-*`, `mb-*`, `gap-{6,8}`, `text-{base,lg,xl,2xl,left}`, `font-{normal,bold,mono}`, `inline*`, `h-full`, `min-h-screen`, `flex-{row,auto,none}`, `items-end`, `justify-{start,center}`).

**Renamed / reshaped:**

| 0.9 | 1.0 |
|---|---|
| `.header` with 4px bar + glow | `.app-header` (`.header` still matches, bar is gone) |
| `.badge-live` with slalom stripes | `.badge-live` = green badge; add `<span class="status-dot status-dot-live">` for the heartbeat |
| `.status-dot-pulse` | still works; prefer `status-dot-live` |
| `.modal-backdrop > .modal` | `.modal > .modal-content` (matches c123-server markup) |
| `.log-container > .log-entry` | `.log-container > .log-entries > .log-entry`; `.log-timestamp` → `.log-time` |
| `.progress-label` inside bar | `.progress-row` above the track |
| `.select-lg`, `.input` 16px | one control height; `-sm` variant only |
| `--font-weight-*` (never existed) | `--font-*` — 0.9 declarations using the former silently fell back to normal weight |
| `--shadow-*` only under `.theme-dark` | also under `prefers-color-scheme: dark` |

**React:** the wrapper set is smaller and props changed (`variant` → `tone` on status components, slot props on `CardHeader` / `Modal` / `AppHeader`). See `src/react/index.ts`.

## Development

```bash
npm run dev        # serve playbooks on :3000
npm run build      # dist/timing.css + timing.min.css + fonts
npm run typecheck  # React wrappers
```

Conventional commits; Release Please owns versions and CHANGELOG. `legacy/2026` takes `fix:` only.

## License

MIT
