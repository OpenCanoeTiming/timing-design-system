# Timing Design System - Plán implementace

## Status: 🟢 Fáze 2 - Komponenty (základní hotovy)

---

## Přehled

Design systém pro vodáckou časomíru s podporou:
- **Dark theme** pro admin nástroje (c123-server)
- **Light theme** pro uživatelské nástroje (c123-xml-tools)
- **Vanilla CSS** i **React komponenty**

---

## Fáze 1: Základy (tokens + base CSS)

### 1.1 Projekt setup
- [x] Vytvořit CLAUDE.md
- [x] Vytvořit PLAN.md
- [x] Inicializovat package.json
- [x] Vytvořit adresářovou strukturu
- [x] Nastavit .editorconfig

### 1.2 Design tokens
- [x] Extrahovat barvy z c123-server/admin-ui/styles.css
- [x] Definovat light theme variantu
- [x] Typography tokens (font sizes, weights, line heights)
- [x] Spacing scale (4px base)
- [x] Border radius tokens
- [x] Shadow tokens

### 1.3 Base CSS
- [x] CSS reset (normalize)
- [x] Základní typografie
- [x] Theme switching logika (`prefers-color-scheme` + class override)

### 1.4 Fonty
- [ ] Zkopírovat Inter + JetBrains Mono woff2 z c123-server
- [ ] Font-face deklarace

---

## Fáze 2: Komponenty

### 2.1 Základní komponenty
- [x] Buttons (primary, secondary, ghost, danger)
- [x] Form inputs (text, select, checkbox, radio, switch)
- [x] Cards (basic, elevated, interactive)
- [x] Status badges (success, warning, error, info)

### 2.2 Layout komponenty
- [x] Container
- [x] Grid system
- [x] Flex utilities
- [x] Spacing utilities (.m-*, .p-*)

### 2.3 Komplexní komponenty
- [x] Tables (striped, hover)
- [ ] Modals
- [ ] Toasts/Notifications
- [ ] Tabs

---

## Fáze 3: Playbooks

### 3.1 Demo stránky
- [x] Index - katalog všech komponent (základní verze)
- [ ] Dark theme showcase
- [ ] Light theme showcase
- [ ] Forms demo
- [ ] Tables demo

### 3.2 Dokumentace
- [ ] README s příklady použití
- [ ] Inline komentáře v CSS

---

## Fáze 4: React komponenty

### 4.1 Setup
- [ ] TypeScript konfigurace
- [ ] React peer dependency

### 4.2 Komponenty
- [ ] Button
- [ ] Card
- [ ] Input, Select, Checkbox
- [ ] Badge
- [ ] Table
- [ ] Modal
- [ ] Toast

---

## Fáze 5: Integrace

### 5.1 Build
- [ ] CSS concatenation script (cat → timing.css)
- [ ] Minifikace (optional)

### 5.2 Testování
- [ ] Integrace do c123-server (ověření kompatibility)
- [ ] Integrace do c123-xml-tools
- [ ] Vizuální regresní testy (screenshot comparison)

---

## Deník vývoje

### 2026-01-15
- Založen projekt
- Vytvořeny CLAUDE.md a PLAN.md
- Definována architektura a workflow
- Vytvořeny design tokens (colors, typography, spacing)
- Vytvořeny základní CSS komponenty (buttons, forms, cards, tables, status, layout)
- Vytvořen playbook index.html s ukázkami všech komponent
- Implementován dual-theme systém (light/dark)
