# Claude Code Instructions - Canoe Timing Design System

## Project

Canoe Timing Design System — UI component and style library for canoe slalom timing applications. Professional, elegant look with paddling flair.

**GitHub:** OpenCanoeTiming/timing-design-system | **License:** MIT | **Status:** Stable (v0.4.0)

**Package:** `@opencanoetiming/timing-design-system` (GitHub Packages)

Used by: c123-server (admin dashboard), c123-penalty-check, c123-scoreboard, c123-xml-tools

---

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
├── react/            # React components (Button, Card, Badge, Modal, Toast, Header, Log, DropZone)
├── dist/             # Built files (timing.css, timing.min.css)
└── playbooks/        # Demo pages (index, dark, light, header, log, dropzone)
```

---

## Key References

| Purpose | Path |
|---------|------|
| **Playbook demos** | `./src/playbooks/` |
| **Built CSS** | `./dist/timing.css` |
| **GitHub Pages** | https://opencanoetiming.github.io/timing-design-system/playbooks/ |

---

## Important Rules

1. **Dual delivery** — always maintain strict sync between vanilla CSS and React parts, reflect changes in both, test both
2. **Test in playbook** — every change must be visible in a demo page
3. **Dual-theme** — dark mode (`.theme-dark`) for admin tools, light mode (`.theme-light`) for user tools
4. **Accessibility** — WCAG AA contrast (min 4.5:1), focus visible, reduced motion support

---

## Visual Identity

- **Paddling flair:** Subtle wave pattern + red-green slalom stripes (LIVE badge)
- **Header style:** 4px color bar in header with glow effect, elegant animations
- **Glow effects:** On status indicators, hover states
- **Fonts:** Inter (sans-serif), JetBrains Mono (monospace) — self-hosted woff2

---

## Development

```bash
# Development — start demo server
npm run dev

# Build — generate dist/timing.css
npm run build

# Lint CSS
npm run lint
```

---

## CI/CD and Publishing

### GitHub Actions Workflows

1. **Deploy Playbooks** (`pages.yml`) — on push to `main`, publishes to GitHub Pages
2. **Publish to GitHub Packages** (`publish.yml`) — on tag `v*`, publishes npm package

### Release Process

```bash
npm version patch  # or minor/major
git push
git tag -a v0.4.1 -m "Release v0.4.1 - description"
git push origin v0.4.1
```

### Usage in Consumer Projects

**Local development:**
```json
"@opencanoetiming/timing-design-system": "file:../timing-design-system"
```

**From GitHub Packages:**
```json
"@opencanoetiming/timing-design-system": "^0.4.0"
```

Requires `.npmrc` with GitHub Packages registry configuration.

---

## Design Principles

### CSS Custom Properties
All values as CSS variables:
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

### Color Palette

**Dark Theme (admin):**
`--bg-body: #0a0a0a` | `--accent: #0088ff` | `--success: #00d26a` | `--error: #ff3b30`

**Light Theme (user-friendly):**
`--bg-body: #f5f5f5` | `--accent: #0066cc` | `--success: #059669` | `--error: #dc2626`

---

## Workflow

Issue-driven development. Every change starts with a GitHub issue.

### 1. Rozbor (Analysis)
- Comment on issue: restate problem, challenge the idea, define scope, identify risks
- Use `/second-opinion` for non-trivial architectural decisions

### 2. Plan
- Use Claude Code plan mode to design implementation
- Post plan summary to issue: key decisions, files to change, approach
- Get user confirmation before implementation

### 3. Implement
- Branch from main: `feat/{N}-{slug}` or `fix-{N}-{slug}`
- Commit incrementally, push regularly
- Comment on issue with progress updates

### 4. PR & Review
- Every issue → PR with `Closes #N`
- Include test plan in PR description
- Summarize what changed and why

---

## DEVLOG.md

Append-only record of dead ends, surprising problems, and solutions. Never edit existing entries.

```markdown
## YYYY-MM-DD — Short description

**Problem:** What went wrong or didn't work
**Attempted:** What was tried
**Solution:** What actually worked (or: still open)
**Lesson:** What to remember next time
```

---

## Language

- User communication: **Czech**
- Documentation (README, docs): **English**
- Code, comments, commit messages: **English**
