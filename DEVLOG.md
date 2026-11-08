# Timing Design System - Development Log

## 2026-01-15

### Phase 1: Project Initialization

Design system created, extracted from c123-server for use in canoe timing tools.

**Created:**
- CLAUDE.md - workflow and rules
- PLAN.md - implementation plan with checklists
- package.json - NPM configuration
- .editorconfig

**Design tokens:**
- colors.css - dual theme (light default + dark)
- typography.css - Inter + JetBrains Mono, font scale
- spacing.css - 4px base scale, shadows, transitions

**CSS components:**
- base.css - reset, typography, accessibility
- buttons.css - primary, secondary, ghost, danger
- forms.css - input, select, checkbox, radio, switch
- cards.css - basic, elevated, interactive
- tables.css - striped, hover, responsive
- status.css - badges, alerts, connection status
- layout.css - container, grid, flex, spacing utilities

**Playbook:**
- index.html - demo of all components with theme switcher

---

### Phase 2: Fonts and Complex Components

**Self-hosted fonts:**
- Inter (400, 500, 600, 700) - primary sans-serif
- JetBrains Mono (400, 500, 700) - monospace for numbers and code
- fonts.css - @font-face declarations

**Complex CSS components:**
- Modal - backdrop, sizes (sm/md/lg), confirmation variant, a11y (focus trap, escape)
- Toast/Notification - 4 variants (success/error/warning/info), 6 positions, progress bar, auto-dismiss
- Tabs - basic, pills, bordered variants, sizes, full-width, badge support

---

### Phase 3: Playbooks and Documentation

**Demo pages:**
- dark.html - admin panel demo, color palette, timing display
- light.html - results table, podium, user interface
- forms.html - all input types, validation, practical forms
- tables.html - variants (striped, hover, compact), responsive, practical examples
- modal.html - interactive modal demo
- toast.html - interactive notification demo

**Documentation:**
- README.md - complete documentation with usage examples
- readme-test.html - visual test of README examples
- Inline comments in all CSS files

---

### Phase 4: React Components

**TypeScript setup:**
- tsconfig.json - strict mode, React JSX

**Components:**
- Button - variant, size, icon, loading, disabled
- Card - Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle
- Input - all HTML input types, label, error state
- Select - options, label, error state
- Checkbox - label, checked, disabled
- Radio - name groups, label
- Badge - variant (success/error/warning/info), size
- Table - Table, TableHead, TableBody, TableFoot, TableRow, TableCell, TableHeaderCell
- Modal - Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter (a11y, sizes)
- Toast - Toast, ToastContainer (variants, positions, progress bar, auto-dismiss)

---

### Phase 5: Build

**Build script (scripts/build-css.js):**
- Concatenation of all CSS files in correct order
- Minification (44% savings)
- Copy fonts to dist/fonts/

**Outputs:**
- dist/timing.css (50.2 KB) - full version
- dist/timing.min.css (28.2 KB) - minified
- dist/fonts/ - 7 font files

**Test:**
- bundle-test.html - verification of standalone CSS bundle

---

### Status

✅ All implementation phases complete
✅ Build: OK (npm run build)
✅ TypeCheck: OK (npm run typecheck)

**Notes:**
- Light theme as default (for user tools)
- Dark theme via `.theme-dark` class or `prefers-color-scheme`
- Ready for integration into c123-server and c123-xml-tools

## 2026-11-05 — 1.0: scope from measured usage

**Problem:** #26 asked for a "refactor" with no scope. 0.9 defined 302 classes; nobody knew which ones mattered, and the canoe identity (gate poles, LIVE stripes, wave, glow) competed with legibility.
**Attempted:** Grepped every class name against the HTML/JS/TSX of c123-server, c123-penalty-check and c123-xml-tools. 226 of 302 classes had no consumer. c123-server's `styles.css` (2 864 lines) overrode 48 DS classes and aliased the tokens, so DS changes never reached the admin anyway.
**Solution:** 1.0 keeps the measured set, collapses status into three primitives with one modifier set, adds the rebuild's result marks, drops the identity. Dark primary buttons use dark text on the accent because white on `#3b8bff` is 3.3:1. Pages now publishes `/v1/` and `/v0.9/`; `/dist/` stays 0.9 until c123-xml-tools pins (it linked the unversioned URL).
**Lesson:** `var(--font-weight-semibold)` had been silently falling back to normal weight in header/log/dropzone since the files were written — a token name that doesn't exist fails without a warning. Grep `var(--` against the token files before every release (`comm -23 used defined`).

## 2026-11-08 — Publish dispatch failed: gh without a checkout

**Problem:** 1.1.0 was released but not published. The new "Trigger package publish" step (#30) failed with `failed to run git: fatal: not a git repository`.
**Attempted:** —
**Solution:** The job has no `actions/checkout`, so `gh` cannot infer the repo from a git remote. Pass `--repo "${{ github.repository }}"`. 1.1.0 was published by running the Publish workflow by hand.
**Lesson:** `gh` in a workflow without checkout always needs `--repo` (or `GH_REPO`). A CI change that only fires on a release can't be tested by the PR that adds it — dry-run such steps with a `workflow_dispatch` trigger first.
