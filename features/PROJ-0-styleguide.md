# PROJ-0 – Design System & Styleguide

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

## QA Test Results

**Tested:** 2026-03-22
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)

### 1. Brand Color Tokens (Tailwind Config)

#### TC-1: All 12 brand tokens defined in tailwind.config.ts
- [x] `brand-green-light` = `#eef6e8` -- matches spec
- [x] `brand-green-mid` = `#f4f7f2` -- matches spec
- [x] `brand-green-muted` = `#ddebd5` -- matches spec
- [x] `brand-green-accent` = `#d5e8cb` -- matches spec
- [x] `brand-green-soft` = `#90d170` -- matches spec
- [x] `brand-green-pale` = `#c8f0a8` -- matches spec
- [x] `brand-green-deep` = `#3a632b` -- matches spec
- [x] `brand-green-vivid` = `#6db33f` -- matches spec
- [x] `brand-stone-light` = `#f5f3ee` -- matches spec
- [x] `brand-stone-mid` = `#ede9e2` -- matches spec
- [x] `brand-stone-muted` = `#e0dbd1` -- matches spec
- [x] `brand-image-placeholder` = `#e8f0e4` -- matches spec

#### TC-2: CSS Variables (shadcn/ui) defined in globals.css
- [x] All shadcn CSS variables present (--primary, --foreground, --background, etc.)
- [x] Primary color is dark green (HSL 104 39% 28%)
- [x] Light and dark themes both defined

### 2. Typography Classes

#### TC-3: Typography patterns match spec
- [x] Section-Badge: `text-sm font-semibold uppercase tracking-widest text-primary` -- used in SectionHeader and inline in 4+ files
- [x] Section-H2: `mt-3 text-3xl font-bold tracking-tight sm:text-4xl` -- matches SectionHeader component
- [x] Section-Beschreibung: `mt-4 text-muted-foreground` with correct max-width per align -- matches SectionHeader
- [ ] BUG: Hero-H1 spec says `font-extrabold` but PageHero implementation uses `font-bold` (see BUG-1)
- [x] Gradient-Text: `bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text text-transparent` -- used in page.tsx, ueber-uns/page.tsx
- [x] Karten-Titel: `text-lg font-bold tracking-tight` -- verified in card components

### 3. Gradient Backgrounds

#### TC-4: All four gradient patterns used correctly
- [x] Grun Standard (`bg-gradient-to-br from-brand-green-light via-brand-green-mid to-brand-green-muted`) -- used in page.tsx, ueber-uns/page.tsx
- [x] Grun Reversed (`bg-gradient-to-tr from-brand-green-muted via-brand-green-mid to-brand-green-light`) -- used in ueber-uns/page.tsx
- [x] Grun Vorschau (`bg-gradient-to-tl from-brand-green-light via-brand-green-mid to-brand-green-muted`) -- used in page.tsx
- [x] Stein Standard (`bg-gradient-to-br from-brand-stone-light via-brand-stone-mid to-brand-stone-muted`) -- used in leistungen/page.tsx

### 4. Section Pattern (Layer-Effekt)

#### TC-5: Overlap pattern applied consistently
- [x] Standard sections use `relative -mt-8 overflow-hidden rounded-t-[2.5rem]` -- verified across 15+ sections
- [x] First sections after PageHero use `relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem]` -- verified in kontakt, leistungen, ueber-uns, projekte

### 5. Shared Components

#### TC-6: SectionHeader component
- [x] File exists at `src/components/ui/section-header.tsx`
- [x] Props: badge (required), title (required), description (optional), align (optional, default "center"), className (optional)
- [x] Wraps in `<FadeIn>` internally
- [x] align="left": no text-center, description gets `max-w-3xl`
- [x] align="center": text-center, description gets `mx-auto max-w-xl`
- [x] Used in: page.tsx, ueber-uns/page.tsx, leistungen/page.tsx

#### TC-7: CTASection component
- [x] File exists at `src/components/cta-section.tsx`
- [x] Uses `/images/cta-bg.jpg` as background (file exists)
- [x] Phone button with `+4915168452004`
- [x] Two trust badges: "Unverbindliches Angebot" + "Persönliche Beratung vor Ort"
- [x] Wraps in `<FadeIn>` internally
- [x] Default primaryLabel = "Jetzt Angebot anfragen"
- [x] Used in: page.tsx, ueber-uns/page.tsx, leistungen/page.tsx

#### TC-8: PageHero component
- [x] File exists at `src/components/ui/page-hero.tsx`
- [x] Props: badge, title, subtitle, imageSrc, imageAlt, overlayOpacity, objectPosition
- [ ] BUG: overlayOpacity default is 0.55, spec documents default as 0.5 (see BUG-2)
- [x] Uses FadeIn for staggered animations (badge, title, subtitle)
- [x] Used in: projekte, ueber-uns, leistungen, kontakt pages

### 6. Icons

#### TC-9: Icon conventions
- [x] Uses `lucide-react` as icon library (verified in imports across components)
- [x] Button/inline icons use `h-4 w-4` (e.g., Phone icon in CTASection)

### 7. Build & Lint

#### TC-10: Production build
- [x] `npm run build` completes without errors

#### TC-11: ESLint
- [ ] BUG: 3 ESLint errors in `src/app/datenschutz/page.tsx` -- unescaped quote entities (see BUG-3)
- [ ] BUG: 1 ESLint warning in `src/lib/projekte-service.ts` -- unused eslint-disable directive (see BUG-4)

### 8. Security Audit

#### SEC-1: Security Headers (next.config.ts)
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Strict-Transport-Security with includeSubDomains and preload
- [x] Permissions-Policy: camera, microphone, geolocation denied
- [x] Content-Security-Policy: frame-ancestors 'none', script/style/img/connect sources restricted
- [x] Referrer-Policy: `strict-origin-when-cross-origin` (more restrictive than spec's `origin-when-cross-origin` -- acceptable)
- [ ] BUG: CSP allows `unsafe-inline` and `unsafe-eval` for scripts (see BUG-5)

#### SEC-2: Secrets Management
- [x] `.env.local` is in `.gitignore` (via `.env*.local` pattern)
- [x] `.env.local.example` uses dummy values, no real keys
- [x] `SUPABASE_SERVICE_ROLE_KEY` is server-only (no `NEXT_PUBLIC_` prefix)
- [x] Server client (`supabase-server.ts`) only used in API route, never in client components

#### SEC-3: Contact API Security
- [x] Zod validation on all form inputs server-side
- [x] HTML tag stripping via `sanitize()` function
- [x] Honeypot field (`website`) for bot detection
- [x] Rate limiting: 3 requests per 10 minutes per IP (Supabase-based, persistent)
- [x] IP resolution from multiple headers (cf-connecting-ip, x-real-ip, x-forwarded-for)
- [x] Error responses do not leak internal details

#### SEC-4: Accessibility
- [x] `prefers-reduced-motion` media query in globals.css disables animations
- [x] Sections have `aria-label` attributes

### Bugs Found

#### BUG-1: Hero-H1 Typography Mismatch -- Spec vs Implementation
- **Severity:** Low
- **Steps to Reproduce:**
  1. Read styleguide: Hero-H1 specifies `text-4xl font-extrabold sm:text-5xl lg:text-6xl`
  2. Read `src/components/ui/page-hero.tsx` line 47: uses `font-bold` instead of `font-extrabold`
  3. Expected: `font-extrabold` per styleguide
  4. Actual: `font-bold` in implementation
- **Priority:** Nice to have -- either update the spec to document the intentional deviation, or update the component to match the spec

#### BUG-2: PageHero overlayOpacity Default Mismatch -- Spec vs Implementation
- **Severity:** Low
- **Steps to Reproduce:**
  1. Read styleguide line 127: documents `overlayOpacity` default as `0.5`
  2. Read `src/components/ui/page-hero.tsx` line 22: actual default is `0.55`
  3. JSDoc comment on line 11 also says `0.55`
  4. Expected: Spec and implementation should agree
  5. Actual: Spec says 0.5, implementation says 0.55
- **Priority:** Nice to have -- update the spec to reflect the actual default of 0.55

#### BUG-3: ESLint Errors in Datenschutz Page
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Run `npm run lint`
  2. See 3 errors in `src/app/datenschutz/page.tsx` (lines 29, 87) for unescaped `"` characters
  3. Expected: No lint errors
  4. Actual: `react/no-unescaped-entities` rule violated
- **Priority:** Fix before deployment -- lint errors will block CI pipelines

#### BUG-4: Unused ESLint-Disable Directive in projekte-service.ts
- **Severity:** Low
- **Steps to Reproduce:**
  1. Run `npm run lint`
  2. See warning in `src/lib/projekte-service.ts` line 4: unused eslint-disable directive
  3. Expected: No unnecessary suppression comments
  4. Actual: Stale eslint-disable for `@typescript-eslint/no-explicit-any`
- **Priority:** Nice to have

#### BUG-5: CSP Allows unsafe-inline and unsafe-eval for Scripts
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Read `next.config.ts` line 16: `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
  2. Expected: Strict CSP without unsafe-inline/unsafe-eval, using nonces instead
  3. Actual: Both `unsafe-inline` and `unsafe-eval` are permitted, which weakens XSS protection
- **Note:** This is common with Next.js due to how it injects scripts. Implementing nonce-based CSP with Next.js requires additional setup. Acceptable for MVP but should be hardened post-launch.
- **Priority:** Fix in next sprint

### Summary
- **Design Token Accuracy:** 12/12 tokens match (100%)
- **Component Compliance:** 3/3 shared components exist and follow documented API
- **Gradient Patterns:** 4/4 patterns used correctly
- **Section Patterns:** Consistent across all pages
- **Build:** Passes without errors
- **Lint:** 3 errors + 1 warning (must fix errors before deployment)
- **Bugs Found:** 5 total (0 critical, 0 high, 2 medium, 3 low)
- **Security:** Solid posture -- headers, validation, rate limiting, secrets all properly handled. CSP could be tightened post-MVP.
- **Production Ready:** NO -- ESLint errors (BUG-3) must be fixed first
- **Recommendation:** Fix BUG-3 (ESLint errors in datenschutz page), then re-run QA. BUG-5 (CSP) should be addressed in a follow-up sprint. BUG-1 and BUG-2 are documentation mismatches that should be resolved to keep the styleguide accurate.
