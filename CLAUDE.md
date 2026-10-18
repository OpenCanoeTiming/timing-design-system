# Claude Code Instructions - Canoe Timing Design System

## Project

Canoe Timing Design System — UI component and style library for canoe slalom timing applications. Professional, elegant look with paddling flair.

**GitHub:** OpenCanoeTiming/timing-design-system | **License:** MIT | **Status:** Stable (v0.9.0)

**Package:** `@opencanoetiming/timing-design-system` (GitHub Packages)

Used by: c123-server (admin dashboard), c123-penalty-check (npm), c123-xml-tools (GitHub Pages `dist/timing.min.css`)

---

## Rebuild 2026/27 — read first

- **Design:** c123-server `docs/arch`; this repo is context, not a subject (TEST-ARCHITECTURE §8).
- **Legacy line:** the legacy apps (tag `legacy-2026` in each deployable) pin this package by npm version (`^0.9.0`, resolved 0.9.0). Here tag `legacy-2026` and branch `legacy/2026` mark `main` at the freeze (c123-server `docs/arch/DECISIONS/LOG.md`); `legacy/2026` takes `fix:` commits only.
- **Git:** conventional commits; Release Please owns versions and CHANGELOG; squash merges; `git add <file>`, never commit `.claude/` or `.superpowers/`. Czech with the maintainer, English in code, commits and docs.

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
├── css/              # Vanilla CSS components (see src/css/index.css)
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
│   ├── kbd.css, menu.css, progress.css, spinner.css
│   └── index.css     # Aggregator
├── react/            # React components (see src/react/index.ts)
├── fonts/            # Self-hosted woff2
└── playbooks/        # Demo pages (index, dark, light, header, log, dropzone)
dist/                 # Built files (timing.css, timing.min.css)
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
2. **Release Please** (`release-please.yml`) — on push to `main`, maintains rolling release PR from conventional commits
3. **Publish to GitHub Packages** (`publish.yml`) — on `release: [published]` (fires when a Release Please release is created), publishes npm package

### Usage in Consumer Projects

**Local development:**
```json
"@opencanoetiming/timing-design-system": "file:../timing-design-system"
```

**From GitHub Packages:**
```json
"@opencanoetiming/timing-design-system": "^0.9.0"
```

Requires `.npmrc` with GitHub Packages registry configuration.

---

## Versioning & Releases

This project uses **Release Please** (commit-based) for automatic versioning. **Never manually bump `package.json` version or edit `CHANGELOG.md`** — Release Please owns both via its rolling release PR.

### How it works

1. Every push to `main` runs `release-please.yml`.
2. Release Please keeps a rolling **release PR** open (label `autorelease: pending`) that aggregates pending changes and proposes the next version.
3. Merging the release PR creates:
   - A commit `chore(main): release X.Y.Z` on `main`
   - A git tag `vX.Y.Z`
   - A GitHub Release with generated CHANGELOG
   - Triggers `publish.yml` → publishes `@opencanoetiming/timing-design-system@X.Y.Z` to GitHub Packages

### Commit types and bump rules

| Commit type | Bump | Shown in CHANGELOG |
|---|---|---|
| `feat:` | **minor** (see 0.x note) | ✓ Features |
| `fix:` / `perf:` | **patch** | ✓ Bug Fixes / Performance |
| `feat!:` or `BREAKING CHANGE:` | **minor** (see 0.x note) | ✓ Features |
| `revert:` | none | ✓ Reverts |
| `docs:` | none | hidden |
| `chore:` / `ci:` / `test:` / `style:` / `refactor:` / `build:` | **none** | hidden |
| `chore(deps):` / `chore(deps-dev):` (dependabot) | **none** | hidden |

**0.x series note:** Project is configured with `bump-minor-pre-major: true`. While in 0.x, `feat!:` bumps **minor** instead of major so that breaking changes don't accidentally promote the package to 1.0.0. See "Graduating to 1.0.0" below.

### Rules for agents preparing PRs

1. **Always use conventional commits** (`feat:`, `fix:`, `chore:`...). Release Please reads commit prefixes to decide bumps.
2. **Don't edit `package.json` version or `CHANGELOG.md`** in regular PRs — Release Please owns those.
3. **Don't merge the release PR together with feature PRs** — it must be the last to merge in a release cycle.
4. **PR title should keep the commit prefix** (squash merges — ensure the final merged commit stays conventional).
5. **Never commit skill state** — `.superpowers/` and `.claude/` are local per-session tool state. Prefer `git add <file>` over `git add -A`.
6. **Consumers update separately** — after a new DS version publishes, bumping `^X.Y.0` in consuming projects (c123-server, c123-penalty-check, ...) is a separate `chore:` commit in those repos, not bundled here.

### Graduating to 1.0.0

To force a release to a specific version (e.g., graduating from 0.x to 1.0.0), add this footer to a commit in the next release cycle:

```
Release-As: 1.0.0
```

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

Rebuild 2026/27: the legacy apps pin this package by npm version and `legacy-2026` marks this repo's `main` at the freeze; a breaking change is fine on `main`, and each consumer bumps in its own `chore:` commit (Versioning, agent rule 6).

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
