# PROJ-4: Über uns Seite

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-20

## Dependencies
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als gewerblicher Kunde möchte ich das Unternehmen und sein Team kennenlernen, damit ich Vertrauen aufbaue bevor ich eine Anfrage stelle
- Als Hausverwaltung möchte ich wissen wie lange das Unternehmen schon besteht, damit ich Zuverlässigkeit und Erfahrung einschätzen kann
- Als Besucher möchte ich die Werte und Arbeitsphilosophie des Unternehmens verstehen, damit ich weiß ob es zu mir passt
- Als potenzieller Mitarbeiter möchte ich das Team und die Unternehmenskultur kennenlernen (sekundär)
- Als Besucher möchte ich nach der Über-uns-Seite direkt Kontakt aufnehmen können, damit der Weg zur Anfrage kurz ist

## Acceptance Criteria

### Seitenstruktur
- [ ] Seite erreichbar unter `/ueber-uns`
- [ ] Seiten-Hero mit Titel "Über uns" + prägnante Unterzeile (z.B. "10 Jahre Leidenschaft für grüne Lebensräume")

### Unternehmensgeschichte / Story Section
- [ ] Fließtext: Wer sind wir, wie hat alles angefangen, was treibt uns an
- [ ] Betonung: 10 Jahre Erfahrung, junges dynamisches Team, Qualitätsanspruch
- [ ] Optionales Bild: Baustellen-/Team-Foto

### Kennzahlen-Section (Social Proof)
- [ ] 3-4 Highlight-Zahlen mit Icon: z.B. "10+ Jahre", "200+ Projekte", "XX Mitarbeiter", "4,9★ Bewertung"
- [ ] Visuell prominent (große Zahlen, Akzentfarbe)

### Team Section
- [ ] Optionale Team-Karten: Name, Position, Foto (wenn Fotos vorhanden)
- [ ] Alternativ: Kurzer Text über das Team ohne individuelle Fotos

### Werte/Philosophie Section
- [ ] 3 Kernwerte als Karten/Icons: z.B. Qualität, Zuverlässigkeit, Nachhaltigkeit
- [ ] Je Wert: Icon + Titel + 2-3 Sätze Erklärung

### CTA-Section
- [ ] Am Ende: "Überzeugt? Sprechen Sie uns an."
- [ ] Button "Kontakt aufnehmen" → /kontakt

## Edge Cases
- Was passiert wenn kein Teamfoto vorhanden? → Placeholder-Illustration oder Icon als Fallback
- Was passiert wenn die Geschichte sehr lang ist? → Lesbarer Fließtext mit Absätzen, max. 300 Wörter
- Was passiert wenn der Nutzer direkt auf /ueber-uns navigiert? → Vollständig funktionale Seite ohne Startseiten-Abhängigkeit

## Technical Requirements
- Alle Inhalte hardcoded
- Team-Fotos: next/image mit Fallback
- SEO: Page Title + Meta-Description für /ueber-uns
- Keine Datenbankanbindung

---
<!-- Sections below are added by subsequent skills -->

## Implementation Notes (Frontend)

### What was built
- **Intro Section**: Hero with "Uber uns" label, gradient heading, company story text (3 paragraphs), owner signature with portrait photo, and photo collage (reuses existing `UeberUnsCollage` component)
- **KPIs Section**: 4 highlight cards (10+ Jahre, 3.000+ Projekte, 200+ Stammkunden, 5,0 Sterne) with icons, gradient values, glassmorphism card style
- **Team Section**: Image (team.jpg) + text block about the team's qualities, no individual team cards (no individual photos available)
- **Werte/Philosophie Section**: 3 value cards (Qualitat & Zuverlassigkeit, Nachhaltigkeit, Partnerschaftlichkeit) with icons, hover effects, glassmorphism style
- **CTA Section**: Full-width card with background image, dark overlay, heading "Sprechen Sie uns an", two buttons (Kontakt aufnehmen -> /kontakt, Direkt anrufen -> tel:)
- **SEO**: Page-specific metadata (title + description) via Next.js Metadata export
- **Design system**: All sections use rounded-t overlap pattern, FadeIn animations, green gradient accents, glassmorphism cards per design memory

### Components reused
- `FadeIn` (scroll-triggered animation)
- `UeberUnsCollage` (parallax photo collage)
- `Button` (shadcn/ui)
- All Lucide icons

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results (Re-test #2 -- Full Frontend Review)

**Tested:** 2026-03-21
**Previous test:** 2026-03-20
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS
**Lint Status:** PASS (all previous ESLint errors resolved)
**Focus:** Background gradients, background colors, navigation, overall frontend quality

### Background & Gradient Analysis (Hauptaugenmerk)

| Section | Background | Assessment |
|---|---|---|
| Hero (PageHero) | Image with rgba(0,0,0,0.45) overlay, `object-top` | GOOD -- team photo visible through overlay |
| Intro | `bg-white` with `-mt-20 rounded-t-[2.5rem]` | GOOD -- clean white |
| KPIs | `bg-gradient-to-br from-[#eef6e8] via-[#f4f7f2] to-[#ddebd5]` | GOOD -- soft green gradient |
| Team | `bg-white` | GOOD -- alternates with green above |
| Werte | `bg-gradient-to-tr from-[#ddebd5] via-[#f4f7f2] to-[#eef6e8]` | GOOD -- reversed gradient direction, creates visual variety |
| Rezensionen | `bg-white` | GOOD -- alternates with green above |
| CTA | `bg-white` with contained image card | GOOD |

**Verdict:** The Ueber-uns page has GOOD background alternation. White and green sections alternate consistently, creating clear visual rhythm. The Werte section uses a reversed gradient direction (`to-tr` vs `to-br`) which provides subtle variety. This is better than the Startseite's four-consecutive-green problem.

### Previous Bug Resolution

| Previous Bug | Status | Notes |
|---|---|---|
| BUG-1 (ESLint unescaped quote) | FIXED | Lint now passes clean |
| BUG-2 (No team photo fallback) | OPEN | Still no `onError` handler |
| BUG-3 (Oversized portrait 1.1 MB) | OPEN | Still served at full size for 48px display |
| BUG-4 (CTA px-10 on mobile) | OPEN | Still `px-10` without mobile fallback |
| BUG-5 (Header ESLint error) | FIXED | eslint-disable comment added |

### Acceptance Criteria Status

#### AC-1: Seitenstruktur
- [x] Seite erreichbar unter `/ueber-uns`
- [x] PageHero with badge "Ueber uns", title "Leidenschaft fuers Handwerk", subtitle about Koeln since 2016

#### AC-2: Unternehmensgeschichte
- [x] 3 paragraphs about founding (2016), passion, mission
- [x] Owner portrait (Marvin Amini) with signature block
- [x] UeberUnsCollage with multiple photos

#### AC-3: Kennzahlen
- [x] 4 KPI cards: 10+ Jahre, 3.000+ Projekte, 200+ Stammkunden, 5,0 Sterne
- [x] Gradient text values, glassmorphism cards

#### AC-4: Team
- [x] Team photo + two paragraphs about team culture
- [x] Koelsch quote "Jeder Jeck es anders" as blockquote

#### AC-5: Werte
- [x] 3 value cards: Qualitaet & Zuverlaessigkeit, Nachhaltigkeit, Partnerschaftlichkeit
- [x] Icons + hover effects + glassmorphism

#### AC-6: CTA
- [x] "Ueberzeugt?" + "Sprechen Sie uns an" + two CTA buttons

### Bugs Found

#### BUG-1: Oversized Portrait Image (CARRIED OVER)
- **Severity:** Medium
- **File:** `/public/images/marvin-portrait.jpg`
- **Description:** 1.1 MB served for a 48x48px display area (used on both Startseite and Ueber-uns). Next.js image optimization helps but the source is extremely oversized.
- **Priority:** Fix before deployment (PageSpeed target >= 90)

#### BUG-2: CTA Section padding too large for 375px (CARRIED OVER)
- **Severity:** Low
- **File:** `src/app/ueber-uns/page.tsx` line 347
- **Description:** `px-10 py-20` leaves only ~295px for content at 375px viewport
- **Priority:** Fix in next sprint

#### BUG-3: No team photo fallback (CARRIED OVER)
- **Severity:** Low
- **Description:** No `onError` handler on team image
- **Priority:** Nice to have

### Summary
- **Acceptance Criteria:** 12/12 passed
- **Bugs Found:** 3 total (0 critical, 0 high, 1 medium, 2 low)
- **Fixed since last QA:** BUG-1 (ESLint), BUG-5 (header ESLint) -- both resolved
- **Security:** PASS
- **Build:** PASS
- **Lint:** PASS
- **Production Ready:** CONDITIONAL YES
- **Blocking:** BUG-1 (portrait image size) impacts PageSpeed. Should be optimized before deployment.

## Deployment
_To be added by /deploy_
