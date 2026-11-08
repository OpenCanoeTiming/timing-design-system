# Claude Code Instructions - Canoe Timing Design System

## Project

Timing Design System — CSS component library (plus thin React wrappers) for canoe slalom timing tools. Quiet operator UI: legibility and comfort over decoration.

**GitHub:** OpenCanoeTiming/timing-design-system | **License:** MIT | **Status:** 1.0 line on `main`; 0.9.x on `legacy/2026`

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
├── tokens/           # CSS custom properties
│   ├── fonts.css     # @font-face Inter + JetBrains Mono (self-hosted)
│   ├── colors.css    # light + dark + auto; semantic and result-mark colors
│   ├── typography.css
│   ├── spacing.css   # space, radius, shadow, focus ring, control/row heights (+ touch), motion
│   └── index.css
├── css/              # Components, one file each (order in src/css/index.css)
│   ├── base.css      # reset, document defaults, focus, text helpers
│   ├── layout.css    # container, page scaffold, kv, stat-row, flex/grid helpers
│   ├── buttons.css   forms.css   cards.css   tables.css
│   ├── status.css    # status-dot / badge / alert + result marks (.mark-*)
│   ├── header.css    tabs.css   modal.css   toast.css   menu.css
│   ├── empty-state.css   log.css   dropzone.css   progress.css   spinner.css
│   └── index.css
├── react/            # Thin wrappers over the CSS classes
│   ├── Controls.tsx  # Button, FormField, Input, Textarea, Select, Checkbox, Radio, Switch
│   ├── Status.tsx    # StatusDot, StatusItem, Badge, Alert, Mark
│   ├── Layout.tsx    # Card*, Table*, Tabs, AppHeader, PageBanner
│   ├── Overlays.tsx  # Modal, Toast, ToastContainer, Menu
│   ├── Feedback.tsx  # EmptyState, Spinner, ProgressBar, DropZone, LogViewer, LogFilter
│   └── index.ts
├── fonts/
└── playbooks/        # index.html (every component), specimen-admin.html, specimen-user.html
dist/                 # timing.css, timing.min.css, fonts/ (built, not committed)
```

## Key References

| Purpose | Path |
|---------|------|
| **Playbook** | `./src/playbooks/index.html` (+ `specimen-admin.html`, `specimen-user.html`) |
| **Built CSS** | `./dist/timing.css` |
| **GitHub Pages** | https://opencanoetiming.github.io/timing-design-system/playbooks/ — bundles at `/v1/` (main) and `/v0.9/` (legacy); `/dist/` = 0.9 until consumers pin |

---

## Important Rules

1. **CSS first, React thin** — every look lives in a class; React wrappers only compose classes. Change CSS and the wrapper together.
2. **Test in playbook** — every class appears in `playbooks/index.html`; admin-facing changes also in `specimen-admin.html`, user-tool changes in `specimen-user.html`.
3. **Dual-theme** — dark mode (`.theme-dark`) for admin tools, light mode (`.theme-light`) for user tools; theme class on `<html>`.
4. **Accessibility** — WCAG AA contrast (≥ 4.5:1) for text on its real background (blend `-subtle` over surface when checking), visible focus on every interactive element, reduced motion respected. Verify with a script, not by eye: `comm -23` for undefined `var(--…)`, a contrast table for token pairs.
5. **Scope from usage** — add a class only when a consumer needs it; remove when none does. Check with a grep across c123-server, c123-penalty-check, c123-xml-tools before adding variants.
6. **`animation:` takes `--duration-*`, `transition:` takes `--transition-*`** — the transition tokens include an easing, so `animation: x var(--transition-fast) ease-out` is invalid and silently dropped.

---

## Visual Identity (1.0)

- **Quiet.** Hairline borders, flat cards, no glow, no gradients, no decoration. Elevation only on overlays (menu, toast, modal).
- **Neutrals are tinted, text is not pure.** Dark: `#0f1115` body, `#e8eaee` text. Light: `#f3f4f7` body, `#171a21` text.
- **One accent.** Blue. In dark theme the primary button uses dark text on the accent (AA); in light, white text.
- **Status has three primitives** (`status-dot`, `badge`, `alert`) and one modifier set. Result marks differ in shape, not only color: provisional dashed/hollow, review solid amber, stale struck + dimmed, pending hollow + italic, live green with heartbeat ring.
- **Numbers line up.** `font-variant-numeric: tabular-nums` on `body`; times in JetBrains Mono, right-aligned.
- **Fonts:** Inter (UI), JetBrains Mono (values) — self-hosted woff2.
- Legacy identity (wave, slalom stripes, gate poles) lives only on `legacy/2026`.

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
3. **Publish to GitHub Packages** (`publish.yml`) — dispatched by `release-please.yml` right after it creates a release (the `release: published` event does not fire for releases made with `GITHUB_TOKEN`); also runnable by hand via *Run workflow*. Publishes the npm package.

### Usage in Consumer Projects

**Local development:**
```json
"@opencanoetiming/timing-design-system": "file:../timing-design-system"
```

**From GitHub Packages:**
```json
"@opencanoetiming/timing-design-system": "^1.0.0"   // legacy apps stay on ^0.9.0
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

**1.0 graduation:** the first 1.0 release is forced with a `Release-As: 1.0.0` footer (see below). After that, `feat!:` bumps major as usual; drop `bump-minor-pre-major` from `release-please-config.json` in the same release cycle.

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
All values are CSS variables, declared three times in `colors.css`: `:root, .theme-light`, `.theme-dark`, and `@media (prefers-color-scheme: dark) { :root:not(.theme-light) }`. Keep the three blocks identical in token set; the dark pair must be identical in values. Components set private `--_c / --_bg / --_fg` from the public tokens and never hardcode a color.

### Color Palette

See `src/tokens/colors.css` — it is the source of truth. Do not duplicate values here.

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
