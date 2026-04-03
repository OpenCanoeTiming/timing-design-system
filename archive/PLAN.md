# Canoe Timing Design System - Implementation Plan

## Status: 🟢 Phase 6 - Canoe Branding + New Components (Complete)

---

## Overview

Design system for canoe slalom timing with support for:
- **Dark theme** for admin tools (c123-server)
- **Light theme** for user tools (c123-xml-tools)
- **Vanilla CSS** and **React components**

---

## Phase 1: Foundation (Tokens + Base CSS)

### 1.1 Project Setup
- [x] Create CLAUDE.md
- [x] Create PLAN.md
- [x] Initialize package.json
- [x] Create directory structure
- [x] Set up .editorconfig

### 1.2 Design Tokens
- [x] Extract colors from c123-server/admin-ui/styles.css
- [x] Define light theme variant
- [x] Typography tokens (font sizes, weights, line heights)
- [x] Spacing scale (4px base)
- [x] Border radius tokens
- [x] Shadow tokens

### 1.3 Base CSS
- [x] CSS reset (normalize)
- [x] Basic typography
- [x] Theme switching logic (`prefers-color-scheme` + class override)

### 1.4 Fonts
- [x] Download Inter + JetBrains Mono woff2 (latin subset, from Fontsource CDN)
- [x] Font-face declarations (src/tokens/fonts.css)

---

## Phase 2: Components

### 2.1 Basic Components
- [x] Buttons (primary, secondary, ghost, danger)
- [x] Form inputs (text, select, checkbox, radio, switch)
- [x] Cards (basic, elevated, interactive)
- [x] Status badges (success, warning, error, info)

### 2.2 Layout Components
- [x] Container
- [x] Grid system
- [x] Flex utilities
- [x] Spacing utilities (.m-*, .p-*)

### 2.3 Complex Components
- [x] Tables (striped, hover)
- [x] Modals
- [x] Toasts/Notifications
- [x] Tabs

---

## Phase 3: Playbooks

### 3.1 Demo Pages
- [x] Index - catalog of all components (basic version)
- [x] Dark theme showcase
- [x] Light theme showcase
- [x] Forms demo
- [x] Tables demo

### 3.2 Documentation
- [x] README with usage examples
- [x] Inline comments in CSS

---

## Phase 4: React Components

### 4.1 Setup
- [x] TypeScript configuration
- [x] React peer dependency (already was)

### 4.2 Components
- [x] Button
- [x] Card
- [x] Input, Select, Checkbox, Radio
- [x] Badge
- [x] Table
- [x] Modal
- [x] Toast

---

## Phase 5: Integration

### 5.1 Build
- [x] CSS concatenation script (scripts/build-css.js)
- [x] Minification (dist/timing.min.css)
- [x] Copy fonts to dist/fonts/
- [x] Bundle test playbook (bundle-test.html)

### 5.2 Testing - not yet!!
- Integration into c123-server (verify compatibility)
- Integration into c123-xml-tools
- Visual regression tests (screenshot comparison)

---

## Phase 6: Canoe Branding + New Components

### 6.0 Navigation Fix
- [x] Add missing links to modal.html and toast.html in playbook index

### 6.1 Rebranding
- [x] Rename to "Canoe Timing Design System" (package.json, README, CLAUDE.md)
- [x] Update titles in all playbook pages
- [x] Create paddling tokens (src/tokens/canoe.css)
  - gate-green/gate-red (slalom colors)
  - glow effects
  - wave pattern SVG

### 6.2 Header Component
- [x] CSS: src/css/header.css
  - app-header with 4px color bar left + glow
  - status indicators (connected/connecting/disconnected)
  - badge-live with slalom stripes
- [x] React: src/react/Header.tsx
- [x] Playbook: src/playbooks/header.html

### 6.3 Log Component
- [x] CSS: src/css/log.css
  - log-container, log-entry
  - colored level badges (debug/info/warn/error)
  - component highlighting
- [x] React: src/react/Log.tsx
- [x] Playbook: src/playbooks/log.html

### 6.4 DropZone Component
- [x] CSS: src/css/dropzone.css
  - dashed border, hover glow
  - drag-over animated stripes
  - has-file state
- [x] React: src/react/DropZone.tsx
- [x] Playbook: src/playbooks/dropzone.html

### 6.5 Extending Existing Components
- [x] cards.css: card-canoe (wavy border), card-status-*
- [x] status.css: status-dot-glow
- [x] modal.css: backdrop-filter blur

### 6.6 Finalization
- [x] Update build script for new CSS
- [x] Update React exports
- [x] Rebuild dist/

---

## Development Log

### 2026-01-15
- Project created
- Created CLAUDE.md and PLAN.md
- Defined architecture and workflow
- Created design tokens (colors, typography, spacing)
- Created basic CSS components (buttons, forms, cards, tables, status, layout)
- Created playbook index.html with examples of all components
- Implemented dual-theme system (light/dark)
- Added self-hosted fonts Inter (400-700) and JetBrains Mono (400, 500, 700)
- Added Modal component (backdrop, sizes, confirmation variant, a11y)
- Added Toast/Notification component (all variants, 6 positions, progress bar, animations, a11y)
- Added Tabs component (basic, pills, bordered variants, sizes sm/lg, full-width, badge, a11y)
- Added dark.html showcase page (color palette, admin panel demo, timing display, controls, status indicators)
- Added light.html showcase page (results table, podium, color palette, controls, status indicators)
- Added forms.html demo page (all input types, select, textarea, checkbox/radio, switch, practical forms, validation)
- Added tables.html demo page (basic, striped, hover, bordered, compact variants, responsive table, practical examples - results, start list, admin panel)
- Added README.md with documentation and usage examples for all components
- Added readme-test.html for visual testing of README examples
- TypeScript configuration for React components (tsconfig.json)
- First React component: Button (variant, size, icon props)
- React component: Card (Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle)
- React components for forms: Input, Select, Checkbox, Radio
- React component Badge (status indicator)
- React component Table (Table, TableHead, TableBody, TableFoot, TableRow, TableCell, TableHeaderCell)
- React component Modal (Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter) with a11y, sizes and demo page
- React component Toast (Toast, ToastContainer) with variants, positions, progress bar, auto-dismiss and demo page toast.html
- Build script (scripts/build-css.js) - concatenation, minification, font copying
- dist/timing.css (50 KB) and dist/timing.min.css (28 KB, 44% smaller)
- bundle-test.html playbook for testing standalone CSS bundle
- Verified all CSS files have adequate inline comments (headers, sections, inline notes)
