# Timing Design System - Deník vývoje

## 2026-01-15

### Fáze 1: Inicializace projektu

Založen design systém extrahovaný z c123-server pro použití ve vodáckých časomírových nástrojích.

**Vytvořeno:**
- CLAUDE.md - workflow a pravidla
- PLAN.md - plán implementace s checklisty
- package.json - NPM konfigurace
- .editorconfig

**Design tokens:**
- colors.css - dual theme (light default + dark)
- typography.css - Inter + JetBrains Mono, font scale
- spacing.css - 4px base scale, shadows, transitions

**CSS komponenty:**
- base.css - reset, typografie, accessibility
- buttons.css - primary, secondary, ghost, danger
- forms.css - input, select, checkbox, radio, switch
- cards.css - basic, elevated, interactive
- tables.css - striped, hover, responsive
- status.css - badges, alerts, connection status
- layout.css - container, grid, flex, spacing utilities

**Playbook:**
- index.html - demo všech komponent s theme switcherem

---

### Fáze 2: Fonty a komplexní komponenty

**Self-hosted fonty:**
- Inter (400, 500, 600, 700) - primární sans-serif
- JetBrains Mono (400, 500, 700) - monospace pro čísla a kód
- fonts.css - @font-face deklarace

**Komplexní CSS komponenty:**
- Modal - backdrop, velikosti (sm/md/lg), confirmation variant, a11y (focus trap, escape)
- Toast/Notification - 4 varianty (success/error/warning/info), 6 pozic, progress bar, auto-dismiss
- Tabs - základní, pills, bordered varianty, velikosti, full-width, badge support

---

### Fáze 3: Playbooks a dokumentace

**Demo stránky:**
- dark.html - admin panel demo, barevná paleta, timing display
- light.html - výsledková tabule, stupně vítězů, uživatelské rozhraní
- forms.html - všechny input typy, validace, praktické formuláře
- tables.html - varianty (striped, hover, compact), responzivní, praktické příklady
- modal.html - interaktivní demo modalů
- toast.html - interaktivní demo notifikací

**Dokumentace:**
- README.md - kompletní dokumentace s příklady použití
- readme-test.html - vizuální test příkladů z README
- Inline komentáře ve všech CSS souborech

---

### Fáze 4: React komponenty

**TypeScript setup:**
- tsconfig.json - strict mode, React JSX

**Komponenty:**
- Button - variant, size, icon, loading, disabled
- Card - Card, CardHeader, CardBody, CardFooter, CardTitle, CardSubtitle
- Input - všechny HTML input typy, label, error state
- Select - options, label, error state
- Checkbox - label, checked, disabled
- Radio - name groups, label
- Badge - variant (success/error/warning/info), size
- Table - Table, TableHead, TableBody, TableFoot, TableRow, TableCell, TableHeaderCell
- Modal - Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter (a11y, velikosti)
- Toast - Toast, ToastContainer (varianty, pozice, progress bar, auto-dismiss)

---

### Fáze 5: Build

**Build script (scripts/build-css.js):**
- Concatenation všech CSS souborů v správném pořadí
- Minifikace (44% úspora)
- Kopírování fontů do dist/fonts/

**Výstupy:**
- dist/timing.css (50.2 KB) - plná verze
- dist/timing.min.css (28.2 KB) - minifikovaná
- dist/fonts/ - 7 font souborů

**Test:**
- bundle-test.html - ověření standalone CSS bundle

---

### Status

✅ Všechny implementační fáze dokončeny
✅ Build: OK (npm run build)
✅ TypeCheck: OK (npm run typecheck)

**Poznámky:**
- Light theme jako default (pro uživatelské nástroje)
- Dark theme přes `.theme-dark` class nebo `prefers-color-scheme`
- Připraveno pro integraci do c123-server a c123-xml-tools
