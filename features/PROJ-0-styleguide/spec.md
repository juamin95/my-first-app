# PROJ-0 – Design System & Styleguide

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-0`
> bindet es richtig in die Kette ein.

> Referenzdokument für alle Design-Entscheidungen. Wird bei jeder Änderung am Design aktualisiert.

---

## Farbpalette

### Brand-Tokens (Tailwind)

| Token                       | Hex       | Verwendung                                      |
|-----------------------------|-----------|--------------------------------------------------|
| `brand-green-light`         | `#eef6e8` | Heller Hintergrund, Gradient-Start               |
| `brand-green-mid`           | `#f4f7f2` | Neutraler Grün-Hintergrund, Leer-State           |
| `brand-green-muted`         | `#ddebd5` | Gedämpfter Grün-Akzent, Gradient-End             |
| `brand-green-accent`        | `#d5e8cb` | Gradient-End (Pflege-Abo-Section, leicht dunkler)|
| `brand-green-soft`          | `#90d170` | Helles Grün (Hero-Gradient-Text, Karten-Placeholder) |
| `brand-green-pale`          | `#c8f0a8` | Sehr helles Grün (Hero-Gradient-Text-End)        |
| `brand-green-deep`          | `#3a632b` | Gradient-Text Startfarbe (dunkel)                |
| `brand-green-vivid`         | `#6db33f` | Gradient-Text Endfarbe (hell/kräftig)            |
| `brand-stone-light`         | `#f5f3ee` | Heller Stein-Hintergrund                         |
| `brand-stone-mid`           | `#ede9e2` | Mittlerer Stein-Hintergrund                      |
| `brand-stone-muted`         | `#e0dbd1` | Gedämpfter Stein-Akzent                          |
| `brand-image-placeholder`   | `#e8f0e4` | Bild-Placeholder in Karten (wenn kein Bild)      |

### CSS-Variablen (shadcn/ui)

Alle shadcn-Farben laufen über CSS-Variablen (`--primary`, `--foreground`, etc.) in `globals.css`. Primärfarbe ist das Dunkelgrün.

---

## Typografie

### Schriftarten

| Rolle        | Font      | Tailwind     | CSS-Variable   | Verwendung                            |
|--------------|-----------|--------------|----------------|---------------------------------------|
| **Headline** | Spectral  | `font-serif` | `--font-serif` | Alle h1–h6 (global via `globals.css`) |
| **Body**     | Inter     | `font-sans`  | `--font-sans`  | Body-Default, Buttons, Nav, Labels    |

Einbindung: `next/font/google` in `src/app/layout.tsx` — kein CDN, font-display: swap.
Spectral: weights `400 · 600 · 700 · 800`, normal + italic.

### Text-Klassen

| Rolle                 | Klassen                                      |
|-----------------------|----------------------------------------------|
| Section-Badge         | `text-sm font-semibold uppercase tracking-widest text-primary` |
| Section-H2 (Standard) | `mt-3 text-3xl font-bold tracking-tight sm:text-4xl` |
| Section-Beschreibung  | `mt-4 text-muted-foreground` + `max-w-xl` (center) / `max-w-3xl` (left) |
| Hero-H1               | `text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl` |
| Gradient-Text         | `bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text text-transparent` |
| Karten-Titel          | `text-lg font-bold tracking-tight` |

---

## Gradient-Hintergründe

| Name             | Klasse                                                                 | Verwendung               |
|------------------|------------------------------------------------------------------------|--------------------------|
| Grün Standard    | `bg-gradient-to-br from-brand-green-light via-brand-green-mid to-brand-green-muted` | Vorteile, KPI (Über uns) |
| Grün Reversed    | `bg-gradient-to-tr from-brand-green-muted via-brand-green-mid to-brand-green-light` | Werte-Section (Über uns) |
| Grün Vorschau    | `bg-gradient-to-tl from-brand-green-light via-brand-green-mid to-brand-green-muted` | Über-uns-Vorschau (Home) |
| Stein Standard   | `bg-gradient-to-br from-brand-stone-light via-brand-stone-mid to-brand-stone-muted` | Bauleistungen            |

---

## Section-Pattern

### Layer-Effekt (Overlap)
Jede Section, die optisch über die vorherige "schiebt":
```tsx
className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] ..."
```
Erste Section nach PageHero:
```tsx
className="relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] ..."
```

### Abstände
- Standard: `py-20 sm:py-24`
- Groß: `py-24`
- Desktop-Groß: `.section-py` = `py-20 lg:py-36` (für Seiten mit wenigen, gewichtigen Sections)
- CTA: `py-20` (über CTASection-Komponente geregelt)

---

## Shared Components

### `<SectionHeader />`
**Datei:** `src/components/ui/section-header.tsx`

```tsx
<SectionHeader
  badge="Kurzer Obertitel"
  title="Hauptüberschrift der Section"
  description="Optionaler Beschreibungstext."
  align="center"   // "center" (default) | "left"
  className="mb-12"
/>
```

- Wraps intern in `<FadeIn>` — **kein zusätzlicher FadeIn-Wrapper nötig**
- `align="left"`: kein `text-center`, Description bekommt `max-w-3xl`
- `align="center"`: `text-center`, Description bekommt `mx-auto max-w-xl`

**Nicht verwenden wenn:** Der Header zusammen mit anderen Elementen in einem einzigen FadeIn animiert werden muss (z.B. Badge + Google-Rating nebeneinander).

---

### `<CTASection />`
**Datei:** `src/components/cta-section.tsx`

```tsx
<CTASection
  title="Bereit für Ihr Projekt?"
  subtitle="Beschreibungstext..."
  primaryLabel="Jetzt Angebot anfragen"   // optional, das ist der Default
  badge="Überzeugt?"                       // optional
/>
```

- Immer mit `/images/cta-bg.jpg` als Hintergrund
- Immer mit Telefon-Button (`+4915168452004`)
- Zwei Trust-Badges: "Unverbindliches Angebot" + "Persönliche Beratung vor Ort"
- Wraps intern in `<FadeIn>`

---

### `<PageHero />`
**Datei:** `src/components/ui/page-hero.tsx`

```tsx
<PageHero
  badge="Über uns"
  title="Seitentitel"
  subtitle="Beschreibung..."
  imageSrc="/images/..."
  imageAlt="Bildbeschreibung"
  overlayOpacity={0.45}        // optional, default 0.55
  objectPosition="object-top"  // optional
/>
```

---

## Icons

- Bibliothek: `lucide-react`
- Standardgröße in Karten/Listen: `h-6 w-6` (Icon-Container: `h-12 w-12`)
- `strokeWidth={1.5}` für größere Icons in Karten
- Standardgröße in Buttons/Inline: `h-4 w-4`

---

## Glass Card Pattern

Einheitliches Kartenmuster für alle Inhalts-Karten auf farbigen Hintergründen:

```tsx
// Standard (p-6): ReviewCard, KPI-Home, Ablauf-Steps, Projekt-Cards
className="rounded-2xl border border-primary/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm"

// Large (p-8): KPI- und Werte-Karten auf dedizierten Unterseiten (mehr Atemraum)
className="rounded-2xl border border-primary/10 bg-white/60 p-8 shadow-sm backdrop-blur-sm"
```

**Glass Button** (outline-Variante auf farbigem Hintergrund):
```tsx
<Button variant="outline" className="bg-white/60 backdrop-blur-sm border-primary/20 hover:bg-white/80">
```

**Ausnahmen (bewusst anders):**
- Highlight-Paket in Pflege-Abo: `bg-primary text-primary-foreground` (CTR-Farbe)
- CTA-Karte in Kontakt-Sidebar: `bg-primary` (Call-to-Action Sichtbarkeit)
- Empty State Projekt-Galerie: `bg-brand-green-mid border-dashed` (leerer Zustand)
- Sections mit horizontalem Scroll (Rezensionen, Pflege-Abo): kein `overflow-hidden` auf dem Section-Wrapper, da es die negative-margin-Technik für den Scroll-Rand clippt

---

## Bewusste Entscheidungen

- **Section-Padding variiert** (py-16, py-20, py-24): bewusst je nach visueller Gewichtung der Section
- **Bewertungen-Section-Header** auf Home bleibt inline: Badge und Google-Rating-Logo teilen sich einen FadeIn-Wrapper

---
