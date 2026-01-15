# Timing Design System - Deník vývoje

## 2026-01-15

### Inicializace projektu

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

**Poznámky:**
- Light theme jako default (pro uživatelské nástroje)
- Dark theme přes `.theme-dark` class nebo `prefers-color-scheme`
- Zatím bez fontů (nutno zkopírovat z c123-server)
