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
- [ ] Inline komentáře v CSS

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
