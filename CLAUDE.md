# Canoe Timing Design System - CLAUDE.md

## Kontext projektu

Canoe Timing Design System je knihovna UI komponent a stylů pro vodáckou časomíru (canoe slalom timing).
Inspirováno "BMW M Line" stylem z c123-server admin dashboardu - profesionální, elegantní vzhled s vodáckým šmrncem.

Určeno pro použití v:
- c123-server (admin dashboard)
- c123-xml-tools (one-shot utility nástroje)
- Budoucí React aplikace (scoreboardy)

## Vizuální identita

- **Vodácký šmrnc:** Subtilní vlnkový pattern + červeno-zelené slalomové pruhy (LIVE badge)
- **BMW M Line styl:** 4px barevný bar v headeru s glow efektem, elegantní animace
- **Glow efekty:** Na status indikátorech, hover stavech

## Jazyky

- **Komunikace:** čeština
- **Kód a commity:** angličtina
- **Dokumentace:** čeština s anglickými technickými termíny

## Architektura

```
src/
├── tokens/           # Design tokens (CSS variables)
│   ├── colors.css    # Barevná paleta (dark + light)
│   ├── typography.css
│   ├── spacing.css
│   ├── canoe.css     # Vodácké tokeny (gate colors, glow, wave pattern)
│   └── index.css     # Agregátor
├── css/              # Vanilla CSS komponenty
│   ├── base.css      # Reset, základní styly
│   ├── buttons.css
│   ├── forms.css
│   ├── cards.css     # + canoe varianta s wavy border
│   ├── tables.css
│   ├── status.css    # Status indikátory, badges, LIVE badge
│   ├── layout.css    # Grid, flex helpers
│   ├── modal.css     # Modální dialogy
│   ├── toast.css     # Toast notifikace
│   ├── tabs.css      # Tab navigace
│   ├── header.css    # App header s barevným barem
│   ├── log.css       # Log viewer komponenta
│   ├── dropzone.css  # Drag & drop zóny
│   └── index.css     # Agregátor
├── react/            # React komponenty
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── Header.tsx    # App header
│   ├── Log.tsx       # Log viewer
│   ├── DropZone.tsx  # Drag & drop
│   └── index.ts      # Exporty
├── dist/             # Buildnuté soubory
│   ├── timing.css    # Konkatenované CSS
│   └── timing.min.css
└── playbooks/        # Demo stránky
    ├── index.html    # Přehled všech komponent
    ├── dark.html     # Dark theme demo
    ├── light.html    # Light theme demo
    ├── header.html   # Header demo
    ├── log.html      # Log viewer demo
    └── dropzone.html # DropZone demo
```

## Workflow

1. **Vždy nejdřív PLAN.md** - aktualizovat stav, plánované změny
2. **Malé kroky** - max jeden logický blok změn najednou
3. **Testovat v playbooku** - každá změna musí být viditelná v demo stránce
4. **Commit po každém bloku** - anglické commit messages
5. **DENIK.md** - zapsat co bylo uděláno (česky, stručně)

!Vzdy udrzuj striktne synchronii vanilla js i react casti, zmeny promitej do obou  testuj oboje.

## Design principy

### Dual-theme systém
- **Dark mode** (`.theme-dark`): Pro admin nástroje, profesionální vzhled
- **Light mode** (`.theme-light`): Pro uživatelské nástroje, přívětivý vzhled
- Automatická detekce: `prefers-color-scheme` media query

### CSS Custom Properties
Všechny hodnoty jako CSS variables pro snadnou customizaci:
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

### Accessibility
- WCAG AA contrast (min 4.5:1 pro text)
- Focus visible styly
- Reduced motion support
- Semantic HTML

## Fonty

- **Sans-serif:** Inter (primární)
- **Monospace:** JetBrains Mono (kód, čísla)
- Self-hosted woff2 soubory (v src/fonts/)

## Porty pro vývoj

- Playbook server: `npx serve src/playbooks` na portu 3000

## Příkazy

```bash
# Vývoj - spustit demo server
npm run dev

# Build - generování dist/timing.css
npm run build

# Lint CSS
npm run lint
```

## Vztah k ostatním projektům

- **c123-server:** Importuje CSS z tohoto systému (nebo používá dist/timing.css)
- **c123-xml-tools:** Může použít standalone CSS bundle (dist/timing.css)
- **Nové projekty:** NPM závislost nebo přímé kopírování CSS

## Barevná paleta (z c123-server)

### Dark theme (admin)
```
--bg-body:       #0a0a0a   /* Čistá černá */
--bg-surface:    #141414   /* Karty, panely */
--bg-elevated:   #1f1f1f   /* Hover, modaly */
--text-primary:  #ffffff
--text-secondary:#999999
--accent:        #0088ff   /* Elektrická modrá */
--success:       #00d26a
--warning:       #ff9500
--error:         #ff3b30
```

### Light theme (user-friendly)
```
--bg-body:       #f5f5f5   /* Světle šedá */
--bg-surface:    #ffffff   /* Bílé karty */
--bg-elevated:   #ffffff
--text-primary:  #1a1a1a
--text-secondary:#666666
--accent:        #0066cc   /* Tlumená modrá */
--success:       #059669
--warning:       #d97706
--error:         #dc2626
```
