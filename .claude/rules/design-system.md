---
paths:
  - "src/app/**"
  - "src/components/**"
---

# Design System Rules

## Section-Übergangs-Regelset

Diese Regeln gelten für ALLE Seiten. Bei Design-Arbeit immer prüfen.

### Farb-Tokens (Section-Hintergründe)
```
--section-white:       #FFFFFF
--section-sage-light:  #eef6e8
--section-sage:        #ddebd5
--section-beige-light: #f5f3ee
--section-beige:       #ede9e2
```

### Regel 1 – Farbwechsel = Rundung
Wenn eine Section auf eine andersfarbige folgt: `-mt-8 rounded-t-[2.5rem]`
```tsx
<section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white section-py">
```

### Regel 2 – Gleiche Farbe = nahtlos
Sections mit identischer Farbe NIEMALS trennen:
- Kein `border-b`
- Kein `-mt-8 rounded-t-[2.5rem]`
- Kein `section-wave-top`
- Kein `overflow-hidden` ohne `rounded-t-[2.5rem]`

### Regel 3 – Schatten nur auf Karten
`shadow-*` nur auf Cards/Elementen. Nie auf Section-`<section>`-Hintergründen.
Ausnahme: `section-wave-top` (inset) nach Farbwechsel (→ Regel 5).

### Regel 4 – sage-texture bei allen Sage-Sections
Jede Sage-Section bekommt die CSS-Klasse `sage-texture`:
```tsx
className="... sage-texture"
```
Definiert in `globals.css` als Dot-Pattern via `--dot-texture` CSS Custom Property.

### Regel 5 – section-wave-top NUR nach Farbwechsel
`section-wave-top` erzeugt einen inset Schatten am oberen Rand.
Nur anwenden wenn die vorige Section eine ANDERE Farbe hat.
```tsx
// ✅ Richtig: weiß → sage
className="relative -mt-8 rounded-t-[2.5rem] sage-texture section-wave-top"

// ❌ Falsch: sage → sage
className="relative sage-texture section-wave-top"
```

### Regel 6 – Radial-Gradient Akzent bei sage-Sections nach Farbwechsel
Die erste Sage-Section nach einem Farbwechsel bekommt einen subtilen Akzent:
```tsx
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,158,64,0.10),transparent)]" />
```
Der Wrapper darüber muss `relative` haben. Folgende Sage-Sections (same-color) bekommen KEINEN weiteren Akzent.

### Regel 7 – Filmstrip/Marquee fade-masks zur Section-Farbe abstimmen
Fade-Masken links/rechts müssen zur Hintergrundfarbe der umgebenden Section passen:
```tsx
// Beispiel beige Section:
<div className="... bg-gradient-to-r from-[var(--section-beige-light)] to-transparent" />
<div className="... bg-gradient-to-l from-[var(--section-beige)] to-transparent" />
```

### Regel 8 – Inline-gradient Sections: section-wave-top als boxShadow
Sections mit `style={{ backgroundImage: ... }}` können CSS-Klassen nicht für `box-shadow` nutzen (Shorthand überschreibt). Stattdessen direkt im style-Prop:
```tsx
style={{
  backgroundImage: `linear-gradient(to bottom, var(--section-beige-light), var(--section-beige))`,
  boxShadow: "inset 0 6px 24px -4px rgba(100,80,50,0.08)",
}}
```

## Badge-Flanking-Lines
Alle Badges auf allen Seiten bekommen Flanking-Lines:
```tsx
// Linksbündig (alle nicht-zentrierten Badges):
<div className="flex items-center gap-3">
  <div className="h-px w-8 shrink-0 bg-primary/35" />
  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Label</span>
</div>

// Zentriert (SectionHeader align="center", Rezensionen-Header):
<div className="flex items-center justify-center gap-3">
  <div className="h-px w-8 shrink-0 bg-primary/35" />
  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Label</span>
  <div className="h-px w-8 shrink-0 bg-primary/35" />
</div>
```

## Hover-States (Karten)
Konsistenter Standard für alle Projekt-/Leistungskarten:
```tsx
className="... transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
// Bild darin:
className="... transition-transform duration-500 group-hover:scale-105"
```

## Accessibility
- Alle `<section>` haben `aria-label`
- Scroll-Dots in Bewertungskarussells haben `aria-label="Bewertung X von Y"`
- Bilder innerhalb gelabelter `<Link>`-Elemente: `alt=""`
- `--ring` ist auf Primärgrün gesetzt (Fokus-Sichtbarkeit)
