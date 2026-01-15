# Timing Design System

Design systém pro vodáckou časomíru (canoe slalom timing). Extrahováno z c123-server pro použití napříč projekty.

## Instalace

### Jako NPM balíček

```bash
npm install timing-design-system
```

### Přímé kopírování

Stáhněte `dist/timing.css` a vložte do projektu:

```html
<link rel="stylesheet" href="timing.css">
```

## Použití

### Základní setup

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="timing.css">
</head>
<body>
  <!-- Light theme (default) -->
  <div class="theme-light">...</div>

  <!-- Dark theme -->
  <div class="theme-dark">...</div>
</body>
</html>
```

### Theme switching

Systém podporuje 3 režimy:

1. **Automatický** - podle `prefers-color-scheme`
2. **Light** - class `.theme-light` na kontejneru
3. **Dark** - class `.theme-dark` na kontejneru

```html
<!-- Automaticky podle systému -->
<body>...</body>

<!-- Vynucený dark mode -->
<body class="theme-dark">...</body>

<!-- Vynucený light mode -->
<body class="theme-light">...</body>
```

## Komponenty

### Buttons

```html
<!-- Varianty -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Danger</button>

<!-- Velikosti -->
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- Icon button -->
<button class="btn btn-secondary btn-icon">✕</button>
```

### Cards

```html
<!-- Základní karta -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Název</h3>
    <p class="card-subtitle">Popis</p>
  </div>
  <div class="card-body">
    Obsah karty...
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Akce</button>
  </div>
</div>

<!-- Elevated karta (se stínem) -->
<div class="card card-elevated">...</div>

<!-- Interaktivní karta (hover efekt) -->
<div class="card card-interactive">...</div>

<!-- Kompaktní padding -->
<div class="card card-compact">...</div>
```

### Forms

```html
<!-- Text input -->
<div class="form-group">
  <label class="form-label">Jméno závodníka</label>
  <input type="text" class="input" placeholder="Jan Novák">
  <span class="form-hint">Zadejte celé jméno</span>
</div>

<!-- Input s chybou -->
<input type="text" class="input input-error">

<!-- Select -->
<select class="input select">
  <option>Vyberte kategorii</option>
  <option>K1 muži</option>
  <option>C1 ženy</option>
</select>

<!-- Checkbox -->
<label class="checkbox">
  <input type="checkbox">
  <span>Přihlášen</span>
</label>

<!-- Radio -->
<label class="radio">
  <input type="radio" name="status">
  <span>DNS</span>
</label>

<!-- Switch -->
<label class="switch">
  <input type="checkbox" class="switch-input">
  <span class="switch-slider"></span>
  <span>Aktivní</span>
</label>
```

### Tables

```html
<!-- Základní tabulka -->
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Závodník</th>
      <th class="cell-numeric">Čas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Jan Novák</td>
      <td class="cell-numeric">93.42</td>
    </tr>
  </tbody>
</table>

<!-- Varianty -->
<table class="table table-striped">...</table>
<table class="table table-hover">...</table>
<table class="table table-bordered">...</table>
<table class="table table-compact">...</table>

<!-- Responzivní wrapper -->
<div class="table-responsive">
  <table class="table">...</table>
</div>
```

### Status komponenty

```html
<!-- Badges -->
<span class="badge badge-success">Hotovo</span>
<span class="badge badge-warning">Čeká</span>
<span class="badge badge-error">Chyba</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-neutral">Draft</span>

<!-- Status dot -->
<span class="status-dot status-dot-success"></span>
<span class="status-dot status-dot-warning status-dot-pulse"></span>

<!-- Alert -->
<div class="alert alert-success">
  <div class="alert-content">
    <div class="alert-title">Úspěch</div>
    <p>Čas byl uložen.</p>
  </div>
</div>

<!-- Connection status -->
<span class="connection-status connected">
  <span class="status-dot status-dot-success status-dot-pulse"></span>
  Připojeno
</span>
```

### Modal

```html
<!-- Backdrop + modal -->
<div class="modal-backdrop open">
  <div class="modal" role="dialog" aria-modal="true">
    <div class="modal-header">
      <h2 class="modal-title">Potvrdit akci</h2>
      <button class="modal-close" aria-label="Zavřít">&times;</button>
    </div>
    <div class="modal-body">
      <p>Opravdu chcete smazat tento záznam?</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary">Zrušit</button>
      <button class="btn btn-danger">Smazat</button>
    </div>
  </div>
</div>

<!-- Velikosti: modal-sm, modal-lg -->
<div class="modal modal-sm">...</div>
```

### Toast / Notifications

```html
<!-- Toast container (pozice) -->
<div class="toast-container toast-container-top-right">
  <div class="toast toast-success">
    <div class="toast-content">
      <div class="toast-title">Uloženo</div>
      <div class="toast-message">Změny byly uloženy.</div>
    </div>
    <button class="toast-close">&times;</button>
    <div class="toast-progress">
      <div class="toast-progress-bar"></div>
    </div>
  </div>
</div>

<!-- Varianty: toast-success, toast-warning, toast-error, toast-info -->
<!-- Pozice: toast-container-top-left, toast-container-top-center, toast-container-top-right,
             toast-container-bottom-left, toast-container-bottom-center, toast-container-bottom-right -->
```

### Tabs

```html
<!-- Základní tabs -->
<div class="tabs">
  <button class="tab active" aria-selected="true">Výsledky</button>
  <button class="tab">Startovka</button>
  <button class="tab" disabled>Archiv</button>
</div>

<!-- Pills varianta -->
<div class="tabs tabs-pills">...</div>

<!-- Bordered varianta -->
<div class="tabs tabs-bordered">...</div>

<!-- Full width -->
<div class="tabs tabs-full">...</div>

<!-- S badge -->
<button class="tab">
  Závodníci <span class="tab-badge">24</span>
</button>
```

### Layout utilities

```html
<!-- Container -->
<div class="container">...</div>

<!-- Grid -->
<div class="grid grid-cols-2">...</div>
<div class="grid grid-cols-3">...</div>
<div class="grid grid-cols-4">...</div>

<!-- Flex -->
<div class="flex items-center justify-between gap-4">...</div>

<!-- Spacing (margin/padding) -->
<div class="m-4 p-2">...</div>
<div class="mt-2 mb-4 p-3">...</div>
```

## CSS Custom Properties

Všechny hodnoty jsou definovány jako CSS variables pro snadnou customizaci:

```css
/* Přepsání accent barvy */
:root {
  --color-accent: #ff6600;
  --color-accent-hover: #cc5200;
}
```

### Hlavní proměnné

| Proměnná | Light | Dark |
|----------|-------|------|
| `--color-bg-body` | #f5f5f5 | #0a0a0a |
| `--color-bg-surface` | #ffffff | #141414 |
| `--color-text-primary` | #1a1a1a | #ffffff |
| `--color-accent` | #0066cc | #0088ff |
| `--color-success` | #059669 | #00d26a |
| `--color-warning` | #d97706 | #ff9500 |
| `--color-error` | #dc2626 | #ff3b30 |

## Fonty

Systém používá self-hosted fonty:

- **Inter** - primární sans-serif font
- **JetBrains Mono** - monospace pro čísla a kód

Fonty jsou součástí balíčku v `src/fonts/`.

## Vývoj

```bash
# Spustit dev server s playbook demo stránkami
npm run dev

# Build CSS do dist/
npm run build
```

## Playbook stránky

Demo stránky s ukázkami všech komponent:

- `src/playbooks/index.html` - katalog všech komponent
- `src/playbooks/dark.html` - dark theme showcase
- `src/playbooks/light.html` - light theme showcase
- `src/playbooks/forms.html` - formuláře a inputy
- `src/playbooks/tables.html` - tabulky a data

## Licence

MIT
