# Canoe Timing Design System - CLAUDE.md

## Project Context

Canoe Timing Design System is a UI component and style library for canoe slalom timing.
Inspired by the c123-server admin dashboard style - professional, elegant look with paddling flair.

**GitHub:** OpenCanoeTiming/timing-design-system | **License:** MIT

Intended for use in:
- c123-server (admin dashboard) - `../c123-server/`
- c123-xml-tools (utility tools) - `../c123-xml-tools/`
- c123-scoreboard (React application) - `../c123-scoreboard/`

## Visual Identity

- **Paddling flair:** Subtle wave pattern + red-green slalom stripes (LIVE badge)
- **Header style:** 4px color bar in header with glow effect, elegant animations
- **Glow effects:** On status indicators, hover states

## Language

- User communication: **Czech**
- Documentation (README, docs): **English**
- Code, comments, commit messages: **English**

## Architecture

```
src/
├── tokens/           # Design tokens (CSS variables)
│   ├── colors.css    # Color palette (dark + light)
│   ├── typography.css
│   ├── spacing.css
│   ├── canoe.css     # Paddling tokens (gate colors, glow, wave pattern)
│   └── index.css     # Aggregator
├── css/              # Vanilla CSS components
│   ├── base.css      # Reset, basic styles
│   ├── buttons.css
│   ├── forms.css
│   ├── cards.css     # + canoe variant with wavy border
│   ├── tables.css
│   ├── status.css    # Status indicators, badges, LIVE badge
│   ├── layout.css    # Grid, flex helpers
│   ├── modal.css     # Modal dialogs
│   ├── toast.css     # Toast notifications
│   ├── tabs.css      # Tab navigation
│   ├── header.css    # App header with color bar
│   ├── log.css       # Log viewer component
│   ├── dropzone.css  # Drag & drop zones
│   └── index.css     # Aggregator
├── react/            # React components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── Header.tsx    # App header
│   ├── Log.tsx       # Log viewer
│   ├── DropZone.tsx  # Drag & drop
│   └── index.ts      # Exports
├── dist/             # Built files
│   ├── timing.css    # Concatenated CSS
│   └── timing.min.css
└── playbooks/        # Demo pages
    ├── index.html    # Overview of all components
    ├── dark.html     # Dark theme demo
    ├── light.html    # Light theme demo
    ├── header.html   # Header demo
    ├── log.html      # Log viewer demo
    └── dropzone.html # DropZone demo
```

## Workflow

1. **Always PLAN.md first** - update status, planned changes
2. **Small steps** - max one logical block of changes at a time
3. **Test in playbook** - every change must be visible in demo page
4. **Commit after each block** - English commit messages
5. **DENIK.md** - record what was done (concise)

!Always maintain strict sync between vanilla JS and React parts, reflect changes in both, test both.

## Design Principles

### Dual-theme System
- **Dark mode** (`.theme-dark`): For admin tools, professional look
- **Light mode** (`.theme-light`): For user tools, friendly look
- Automatic detection: `prefers-color-scheme` media query

### CSS Custom Properties
All values as CSS variables for easy customization:
```css
:root, .theme-light {
  --color-bg-primary: #ffffff;
  --color-text-primary: #1a1a1a;
}
.theme-dark {
  --color-bg-primary: #0a0a0a;
  --color-text-primary: #ffffff;
}
```

### Accessibility
- WCAG AA contrast (min 4.5:1 for text)
- Focus visible styles
- Reduced motion support
- Semantic HTML

## Fonts

- **Sans-serif:** Inter (primary)
- **Monospace:** JetBrains Mono (code, numbers)
- Self-hosted woff2 files (in src/fonts/)

## Ports for Development

- Playbook server: `npx serve src/playbooks` on port 3000

## Commands

```bash
# Development - start demo server
npm run dev

# Build - generate dist/timing.css
npm run build

# Lint CSS
npm run lint
```

## CI/CD and Publishing

### GitHub Actions Workflows

Project uses two automatic workflows (`.github/workflows/`):

1. **Deploy Playbooks** (`pages.yml`)
   - Triggers: on every push to `main`
   - Publishes playbook demo to GitHub Pages
   - URL: https://opencanoetiming.github.io/timing-design-system/playbooks/

2. **Publish to GitHub Packages** (`publish.yml`)
   - Triggers: on push of tag `v*` (e.g., `v0.3.1`)
   - Publishes npm package to GitHub Packages
   - Package: `@opencanoetiming/timing-design-system`

### New Version Release Process

```bash
# 1. Update version in package.json
npm version patch  # or minor/major

# 2. Commit and push
git push

# 3. Create and push tag
git tag -a v0.3.1 -m "Release v0.3.1 - change description"
git push origin v0.3.1
```

After pushing the tag, GitHub Actions automatically publishes the package.

### Usage in Other Projects

**Local development** (recommended for projects in same workspace):
```json
"@opencanoetiming/timing-design-system": "file:../timing-design-system"
```

**From GitHub Packages** (for standalone projects):
```json
"@opencanoetiming/timing-design-system": "^0.3.1"
```

Requires `.npmrc` with GitHub Packages registry configuration.

## Relationship to Other Projects

- **c123-server:** `../c123-server/` - Imports CSS for admin dashboard
- **c123-scoreboard:** `../c123-scoreboard/` - Can use React components
- **c123-xml-tools:** `../c123-xml-tools/` - Standalone CSS bundle (dist/timing.css)
- **New projects:** `npm install @opencanoetiming/timing-design-system`

## Color Palette (from c123-server)

### Dark Theme (admin)
```
--bg-body:       #0a0a0a   /* Pure black */
--bg-surface:    #141414   /* Cards, panels */
--bg-elevated:   #1f1f1f   /* Hover, modals */
--text-primary:  #ffffff
--text-secondary:#999999
--accent:        #0088ff   /* Electric blue */
--success:       #00d26a
--warning:       #ff9500
--error:         #ff3b30
```

### Light Theme (user-friendly)
```
--bg-body:       #f5f5f5   /* Light gray */
--bg-surface:    #ffffff   /* White cards */
--bg-elevated:   #ffffff
--text-primary:  #1a1a1a
--text-secondary:#666666
--accent:        #0066cc   /* Muted blue */
--success:       #059669
--warning:       #d97706
--error:         #dc2626
```
