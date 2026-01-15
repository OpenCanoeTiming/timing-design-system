# Canoe Timing Design System - Plán implementace

## Status: 🟡 Fáze 6 - Canoe branding + nové komponenty (probíhá)

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
- [x] Stáhnout Inter + JetBrains Mono woff2 (latin subset, z Fontsource CDN)
- [x] Font-face deklarace (src/tokens/fonts.css)

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
- [x] Modals
- [x] Toasts/Notifications
- [x] Tabs

---

## Fáze 3: Playbooks

### 3.1 Demo stránky
- [x] Index - katalog všech komponent (základní verze)
- [x] Dark theme showcase
- [x] Light theme showcase
- [x] Forms demo
- [x] Tables demo

### 3.2 Dokumentace
- [x] README s příklady použití
- [x] Inline komentáře v CSS

---

## Fáze 4: React komponenty

### 4.1 Setup
- [x] TypeScript konfigurace
- [x] React peer dependency (již bylo)

### 4.2 Komponenty
- [x] Button
- [x] Card
- [x] Input, Select, Checkbox, Radio
- [x] Badge
- [x] Table
- [x] Modal
- [x] Toast

---

## Fáze 5: Integrace

### 5.1 Build
- [x] CSS concatenation script (scripts/build-css.js)
- [x] Minifikace (dist/timing.min.css)
- [x] Kopírování fontů do dist/fonts/
- [x] Bundle test playbook (bundle-test.html)

### 5.2 Testování - jeste nedelat!!
- Integrace do c123-server (ověření kompatibility)
- Integrace do c123-xml-tools
- Vizuální regresní testy (screenshot comparison)

---

## Fáze 6: Canoe branding + BMW M Line styl

### 6.0 Oprava navigace
- [x] Přidat chybějící odkazy na modal.html a toast.html v playbook index

### 6.1 Rebranding
- [x] Přejmenovat na "Canoe Timing Design System" (package.json, README, CLAUDE.md)
- [x] Aktualizovat titulky ve všech playbook stránkách
- [x] Vytvořit vodácké tokeny (src/tokens/canoe.css)
  - gate-green/gate-red (slalomové barvy)
  - glow efekty
  - wave pattern SVG

### 6.2 Header komponenta (BMW M Line styl)
- [x] CSS: src/css/header.css
  - app-header s 4px barevným barem vlevo + glow
  - status indikátory (connected/connecting/disconnected)
  - badge-live se slalomovými pruhy
- [x] React: src/react/Header.tsx
- [x] Playbook: src/playbooks/header.html

### 6.3 Log komponenta
- [ ] CSS: src/css/log.css
  - log-container, log-entry
  - barevné level badges (debug/info/warn/error)
  - component highlighting
- [ ] React: src/react/Log.tsx
- [ ] Playbook: src/playbooks/log.html

### 6.4 DropZone komponenta
- [ ] CSS: src/css/dropzone.css
  - dashed border, hover glow
  - drag-over animované pruhy
  - has-file state
- [ ] React: src/react/DropZone.tsx
- [ ] Playbook: src/playbooks/dropzone.html

### 6.5 Rozšíření existujících komponent
- [ ] cards.css: card-canoe (wavy border), card-status-*
- [ ] status.css: status-dot-glow
- [ ] modal.css: backdrop-filter blur

### 6.6 Finalizace
- [ ] Aktualizovat build script pro nové CSS
- [ ] Aktualizovat React exporty
- [ ] Rebuild dist/

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
- Přidány self-hosted fonty Inter (400-700) a JetBrains Mono (400, 500, 700)
- Přidána Modal komponenta (backdrop, velikosti, confirmation variant, a11y)
- Přidána Toast/Notification komponenta (všechny varianty, 6 pozic, progress bar, animace, a11y)
- Přidána Tabs komponenta (základní, pills, bordered varianty, velikosti sm/lg, full-width, badge, a11y)
- Přidána dark.html showcase stránka (barevná paleta, admin panel demo, timing display, ovládací prvky, status indikátory)
- Přidána light.html showcase stránka (výsledková tabule, stupně vítězů, barevná paleta, ovládací prvky, status indikátory)
- Přidána forms.html demo stránka (všechny input typy, select, textarea, checkbox/radio, switch, praktické formuláře, validace)
- Přidána tables.html demo stránka (základní, striped, hover, bordered, compact varianty, responzivní tabulka, praktické příklady - výsledky, startovní listina, admin panel)
- Přidán README.md s dokumentací a příklady použití všech komponent
- Přidána readme-test.html pro vizuální testování příkladů z README
- TypeScript konfigurace pro React komponenty (tsconfig.json)
- První React komponenta: Button (variant, size, icon props)
- React komponenta: Card (Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle)
- React komponenty pro formuláře: Input, Select, Checkbox, Radio
- React komponenta Badge (status indikátor)
- React komponenta Table (Table, TableHead, TableBody, TableFoot, TableRow, TableCell, TableHeaderCell)
- React komponenta Modal (Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter) s a11y, velikostmi a demo stránkou
- React komponenta Toast (Toast, ToastContainer) s variantami, pozicemi, progress bar, auto-dismiss a demo stránkou toast.html
- Build script (scripts/build-css.js) - concatenation, minifikace, kopírování fontů
- dist/timing.css (50 KB) a dist/timing.min.css (28 KB, 44% menší)
- bundle-test.html playbook pro testování standalone CSS bundle
- Ověřeno, že všechny CSS soubory mají adekvátní inline komentáře (hlavičky, sekce, inline poznámky)
