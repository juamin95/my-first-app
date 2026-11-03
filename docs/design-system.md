Gestaltungsregeln: siehe .claude/rules/design-system.md (maßgeblich)

# Design-System — Tokens, Bausteine, Schriften

_Von `/init` am 2026-11-03 aus dem Code gelesen (über `docs/codebase/architecture.md` → Design system, Stand Commit `3dbba84`). Diese Datei hält nur fest, was im Code steht; sie enthält keine Gestaltungsregeln. Korrekturen sind willkommen._

## Farb-Tokens (CSS-Variablen, HSL)

Quelle: `src/app/globals.css` (`:root` und `.dark`).

| Token | Hell (`:root`) | Dunkel (`.dark`) |
|-------|----------------|------------------|
| `--background` | `0 0% 100%` | `240 10% 3.9%` |
| `--foreground` | `240 10% 3.9%` | `0 0% 98%` |
| `--primary` | `104 39% 28%` | `0 0% 98%` |
| `--primary-foreground` | `0 0% 100%` | `240 5.9% 10%` |
| `--secondary` | `240 4.8% 95.9%` | `240 3.7% 15.9%` |
| `--muted` | `240 4.8% 95.9%` | `240 3.7% 15.9%` |
| `--muted-foreground` | `240 3.8% 32%` | `240 5% 64.9%` |
| `--accent` | `240 4.8% 95.9%` | `240 3.7% 15.9%` |
| `--destructive` | `0 84.2% 60.2%` | `0 62.8% 30.6%` |
| `--border` / `--input` | `240 5.9% 90%` | `240 3.7% 15.9%` |
| `--ring` | `104 39% 28%` | `240 4.9% 83.9%` |
| `--radius` | `0.5rem` | — |

Weitere Variablen in derselben Datei: `--card*`, `--popover*`, `--chart-1` bis `--chart-5`, `--sidebar-*` (shadcn-Standard).

## Marken-Farben (Tailwind)

Quelle: `tailwind.config.ts` → `theme.extend.colors`.

| Name | Wert | Kommentar im Code |
|------|------|-------------------|
| `brand-green-light` | `#eef6e8` | |
| `brand-green-mid` | `#f4f7f2` | |
| `brand-green-muted` | `#ddebd5` | |
| `brand-green-accent` | `#d5e8cb` | |
| `brand-green-soft` | `#90d170` | |
| `brand-green-pale` | `#c8f0a8` | |
| `brand-green-deep` | `#3a632b` | |
| `brand-green-vivid` | `#6db33f` | |
| `brand-green-cta` | `#4f802e` | „CTA-Buttons: WCAG AA mit weißem Text (#4f802e = 4.71:1)“ |
| `brand-green-cta-hover` | `#3d6624` | |
| `brand-amber` | `#D97706` | „Amber-Akzent für Sterne, Zahlen-Highlights“ |
| `brand-stone-light` | `#f5f3ee` | |
| `brand-stone-mid` | `#ede9e2` | |
| `brand-stone-muted` | `#e0dbd1` | |
| `brand-image-placeholder` | `#e8f0e4` | |

Dunkelmodus: `darkMode: ["class"]` (`tailwind.config.ts`).

## Radius, Ebenen, Animation

- **Radius:** `lg` = `var(--radius)`, `md` = `calc(var(--radius) - 2px)`, `sm` = `calc(var(--radius) - 4px)` (`tailwind.config.ts` → `borderRadius`).
- **z-index:** `base` 10, `whatsapp` 40, `header` 50, `overlay` 60 (`tailwind.config.ts` → `zIndex`).
- **Animationen:** `accordion-down`/`accordion-up` (0,2 s), `scroll-left` (28 s, endlos) (`tailwind.config.ts`); Framer Motion in Komponenten (`package.json` → `framer-motion`).
- **Reduzierte Bewegung:** `@media (prefers-reduced-motion: reduce)` in `src/app/globals.css`.

## Schriften

Quelle: `src/app/layout.tsx:9-22`, `tailwind.config.ts` → `fontFamily`.

| Rolle | Schrift | Variable | Tailwind | Einstellungen |
|-------|---------|----------|----------|---------------|
| Serif | Spectral | `--font-serif` | `font-serif` | Gewichte 400, 600, 700, 800; normal und kursiv; `display: swap` |
| Sans | Inter | `--font-sans` | `font-sans` | `display: swap` |

In `src/app/globals.css` ist `font-family: var(--font-serif)` gesetzt (Basis-Layer).

## Bausteine

- **shadcn/ui:** `components.json` — style `default`, `rsc: true`, `tsx: true`, baseColor `slate`, `cssVariables: true`, kein Präfix, Aliase `@/components` und `@/lib/utils`.
- **Verzeichnis:** `src/components/ui/` (41 Dateien). shadcn-Komponenten: accordion, alert-dialog, alert, avatar, badge, breadcrumb, button, card, checkbox, collapsible, command, dialog, dropdown-menu, form, input, label, navigation-menu, pagination, popover, progress, radio-group, scroll-area, select, separator, sheet, sidebar, skeleton, sonner, switch, table, tabs, textarea, toast, toaster, tooltip.
- **Projekteigene Bausteine im selben Ordner:** `animated-counter.tsx`, `fade-in.tsx`, `page-hero.tsx`, `review-card.tsx`, `section-header.tsx`, `section-wrapper.tsx`.
- **Icons:** `lucide-react` (`package.json`).
