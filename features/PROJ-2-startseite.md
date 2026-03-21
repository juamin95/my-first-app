# PROJ-2: Startseite

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-14

## Dependencies
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als gewerblicher Kunde möchte ich sofort verstehen, was das Unternehmen macht und warum es vertrauenswürdig ist, damit ich entscheide, ob ich Kontakt aufnehme
- Als Besucher möchte ich in der Hero-Section eine starke visuelle Wirkung und klare Botschaft sehen, damit ich nicht sofort abspringe
- Als Privatkunde möchte ich Kundenbewertungen sehen, damit ich Vertrauen aufbaue
- Als gewerblicher Kunde möchte ich die angebotenen Leistungen auf einen Blick sehen, damit ich weiß ob das Unternehmen das Richtige ist
- Als Besucher möchte ich verstehen, wie eine Zusammenarbeit abläuft (Prozess), damit ich weiß was mich erwartet
- Als Besucher möchte ich einen überzeugenden CTA sehen, damit ich zur Kontaktaufnahme motiviert werde

## Acceptance Criteria

### Hero Section
- [ ] Vollbild-Hintergrundbild (hochwertiges Garten-/Landschaftsbaufoto)
- [ ] Hauptüberschrift (H1): Prägnant, auf gewerbliche + private Zielgruppe ausgerichtet
- [ ] Subtext: 1-2 Sätze USP (10 Jahre Erfahrung, junges Team, Qualitätsanspruch)
- [ ] Primär-CTA Button: "Jetzt Angebot anfragen" → linkt zu Kontaktseite
- [ ] Sekundär-CTA: "Unsere Projekte ansehen" → linkt zu Projektgalerie
- [ ] Hero ist auf Mobile und Desktop visuell ansprechend (Bild-Overlay mit Textlesbarkeit)

### Bewertungs-Section
- [ ] Zeigt mind. 3 Kundenbewertungen (Name, Bewertungstext, Sternebewertung)
- [ ] Kennzeichnung der Quelle (z.B. "Google Bewertung")
- [ ] Durchschnittliche Gesamtbewertung sichtbar (z.B. 4,9 / 5,0)
- [ ] Bewertungen sind hardcoded (kein dynamisches Laden nötig)
- [ ] Karussell oder Grid-Layout (abhängig von Device-Breite)

### Leistungs-Übersicht Section
- [ ] Zwei Kategorien: "Pflegeleistungen" und "Bauleistungen" (Icons + Kurzbeschreibung)
- [ ] Je Kategorie: 3-4 Beispiel-Leistungen als Liste oder Kacheln
- [ ] Link "Alle Leistungen ansehen" → Leistungsseite (PROJ-3)
- [ ] Visuell unterscheidbare Darstellung der zwei Kategorien

### Ablauf-Section
- [ ] Nummerierter 3-4-Schritt-Prozess (z.B. Anfrage → Beratung → Angebot → Umsetzung)
- [ ] Jeder Schritt: Icon + Titel + Kurzbeschreibung
- [ ] Horizontal auf Desktop, vertikal auf Mobile

### Über-uns Preview Section
- [ ] Kurzer Einblick in das Unternehmen (2-3 Sätze)
- [ ] Zahl-Highlights: z.B. "10 Jahre Erfahrung", "200+ Projekte", "Junges Team"
- [ ] Link "Mehr über uns" → Über uns Seite (PROJ-4)
- [ ] Optional: Foto des Teams oder Inhabers

### Footer-CTA Section
- [ ] Abschließende starke CTA-Section vor dem Footer
- [ ] Headline + Subtext + Kontakt-Button
- [ ] Visuell abgesetzt (Hintergrundfarbe oder -bild)

## Edge Cases
- Was passiert wenn das Hero-Bild nicht lädt? → Hintergrundfarbe als Fallback + Text bleibt lesbar
- Was passiert auf sehr kleinen Screens (320px)? → Hero-Text und CTAs bleiben lesbar, kein Overflow
- Was passiert wenn Bewertungstext sehr lang ist? → Text wird auf max. 3 Zeilen gekürzt mit "mehr lesen"
- Was passiert wenn Nutzer direkt über Google auf die Startseite kommt? → Alle wichtigen Infos above the fold

## Technical Requirements
- Alle Inhalte sind zunächst hardcoded (Texte, Bilder, Bewertungen)
- Hero-Bild: next/image für optimierte Bildladung
- Performance: LCP < 2,5s (Hero-Bild als Priority gesetzt)
- Keine externen Abhängigkeiten für Bewertungen (keine API)

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## Implementation Notes (Frontend)
- Hero section uses `next/image` with priority loading and dark overlay for text readability. Fallback is a solid dark green background (`#2a4a1e`) if the image fails to load. The `HeroImage` client component handles the error state.
- CTAs updated to match spec: "Jetzt Angebot anfragen" links to `/kontakt`, "Unsere Projekte ansehen" links to `/projekte`
- Bewertungs-Section added with 3 hardcoded Google reviews, star ratings, and an average rating display (4,9/5,0)
- Leistungs-Uebersicht split into two visual categories: Pflegeleistungen (4 items) and Bauleistungen (4 items), each with icons and descriptions
- Ablauf-Section kept with 4 numbered steps, horizontal on desktop, vertical on mobile
- Ueber-uns Preview added with company description, link to `/ueber-uns`, and 4 stat cards (10+ Jahre, 200+ Projekte, 4.9 Bewertung, 15+ Teammitglieder)
- Footer-CTA section with gradient background, "Jetzt Angebot anfragen" and phone CTA
- Hero image placeholder expected at `/public/images/hero-garden.jpg` -- user needs to provide actual image
- All content is hardcoded as specified, no API calls
- Uses existing shadcn/ui Card component and FadeIn animation component
- Responsive at all breakpoints, uses Tailwind CSS exclusively

## QA Test Results (Re-test #4 -- Full Frontend Review)

**Tested:** 2026-03-21
**Previous tests:** 2026-03-15, 2026-03-17, 2026-03-20
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS
**Lint Status:** PASS
**Focus:** Background gradients, background colors, navigation integration, overall frontend quality

### Background & Gradient Analysis (Hauptaugenmerk)

The Startseite uses a carefully layered section design with overlapping rounded sections (`-mt-8 rounded-t-[2.5rem]`). Here is the complete gradient/background inventory:

| Section | Background | Assessment |
|---|---|---|
| Hero | Video with `bg-black/50` dark overlay | GOOD -- text readable, poster fallback present |
| Partner Banner | `bg-white` with left/right white fade masks | GOOD -- clean separation |
| Leistungen | `bg-white` | GOOD -- neutral |
| Projekte Preview | `bg-white` | NOTE -- same as Leistungen above it; no visual separation between these two white sections despite the `-mt-8 rounded-t-[2.5rem]` overlap |
| Vorteile | `bg-gradient-to-br from-[#eef6e8] via-[#f4f7f2] to-[#ddebd5]` | GOOD -- soft green gradient |
| Bewertungen | `bg-gradient-to-br from-[#f0f7eb] via-[#e8f3e1] to-[#ddebd5]` + radial gradient overlay | NOTE -- very similar to Vorteile gradient directly above; creates a seamless but monotonous feel |
| Ueber-uns Preview | `bg-gradient-to-tl from-[#eef6e8] via-[#f4f7f2] to-[#ddebd5]` | NOTE -- same palette as Vorteile/Bewertungen; three consecutive green-tinted sections |
| Ablauf | `bg-gradient-to-br from-[#f0f7eb] via-[#f4f7f2] to-[#ddebd5]` | NOTE -- fourth consecutive green gradient section |
| CTA Final | `bg-white` with image card overlay | GOOD -- white background with contained image card breaks the gradient sequence |

### Acceptance Criteria Status

#### AC-1: Hero Section
- [x] Fullscreen video background with dark overlay
- [x] H1: "Professioneller Garten- & Landschaftsbau Betrieb" with green gradient text
- [x] USP badge: "10+ Jahre Erfahrung . 3.000+ Projekte . 5,0 Sterne"
- [ ] BUG-1: Primary CTA "Kontakt aufnehmen" instead of spec's "Jetzt Angebot anfragen"
- [ ] BUG-2: Secondary CTA "Direkt anrufen" (tel:) instead of spec's "Unsere Projekte ansehen" -> /projekte
- [x] Trust logos (GaLaBau NRW + IHK Koeln) displayed below CTAs
- [x] Scroll indicator with bounce animation

#### AC-2: Bewertungs-Section
- [x] 8 reviews (exceeds minimum 3) with name, text, tag, star rating
- [x] Google "G" SVG logo + "5,0" + "48 Bewertungen"
- [x] Horizontal snap-scroll carousel
- [x] ReviewCard with line-clamp-3 + "mehr lesen"/"weniger" toggle

#### AC-3: Leistungs-Uebersicht
- [x] Two categories with photos: Pflegeleistungen (8 items) + Bauleistungen (8 items)
- [x] Links to /leistungen
- [x] Glassmorphism card style with hover effects

#### AC-4: Ablauf-Section
- [x] 3 steps with scroll-driven Framer Motion animation
- [x] Icons, numbered badges, titles, descriptions

#### AC-5: Ueber-uns Preview
- [x] Company description + Marvin Amini portrait + "Mehr ueber uns" link
- [x] UeberUnsCollage with parallax
- [x] 4 KPI stat cards (10+, 3.000+, 200+, 5,0) with gradient values

#### AC-6: Footer-CTA
- [x] "Bereit fuer Ihr Projekt?" with CTA image card
- [x] "Jetzt Angebot anfragen" + "Direkt anrufen" buttons

### Edge Cases
- [x] Video poster fallback works
- [x] 320px screens: full-width CTAs, 85vw review cards
- [x] Long review text: line-clamp-3 with toggle
- [x] Direct Google landing: above-the-fold value proposition

### Bugs Found

#### BUG-1: Hero primary CTA text deviates from spec (CARRIED OVER)
- **Severity:** Low
- **File:** `src/components/hero-scroll.tsx` line 50
- **Expected:** "Jetzt Angebot anfragen" | **Actual:** "Kontakt aufnehmen"
- **Priority:** Fix or update spec

#### BUG-2: Hero secondary CTA deviates from spec (CARRIED OVER)
- **Severity:** Low
- **File:** `src/components/hero-scroll.tsx` lines 52-62
- **Expected:** "Unsere Projekte ansehen" -> /projekte | **Actual:** "Direkt anrufen" -> tel:
- **Priority:** Fix or update spec

#### BUG-3: Four consecutive green gradient sections without visual contrast (NEW)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Go to localhost:3000
  2. Scroll past the Projekte Preview section
  3. Vorteile, Bewertungen, Ueber-uns Preview, and Ablauf all use nearly identical green gradients (`from-[#eef6e8] / #f0f7eb via-[#f4f7f2] to-[#ddebd5]`)
  4. Expected: Visual variety between sections to guide the user's eye and create rhythm
  5. Actual: A monotonous green-tinted stretch that blends together; sections feel visually undifferentiated
- **Files:** `src/app/page.tsx` lines 259-261, 294-296, 352, `src/components/ablauf-section.tsx` line 110
- **Priority:** Fix before deployment -- the PRD emphasizes "Weiss/Hellgrau als Basis + frisches Gruen + Akzentfarben." Currently the accent green has become the dominant color for a large portion of the page, making it monotonous rather than accentual. Recommendation: Alternate some sections with `bg-white` or `bg-muted/30` to create visual rhythm.

#### BUG-4: Trust logos use raw `<img>` tags (CARRIED OVER)
- **Severity:** Low
- **File:** `src/components/hero-scroll.tsx` lines 69-79
- **Priority:** Nice to have

#### BUG-5: Projekte Preview and Leistungen sections both bg-white with no clear visual boundary (NEW)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Scroll through Startseite
  2. Leistungen section (bg-white) flows into Projekte Preview (bg-white)
  3. The `-mt-8 rounded-t-[2.5rem]` overlap creates the rounded edge, but same white-on-white does not create sufficient visual separation
- **Priority:** Nice to have -- subtle but affects design hierarchy

### Summary
- **Acceptance Criteria:** 19/22 passed (3 spec deviations)
- **Bugs Found:** 5 total (0 critical, 0 high, 1 medium, 4 low)
- **Security:** PASS
- **Build:** PASS
- **Lint:** PASS
- **Production Ready:** CONDITIONAL YES
- **Blocking:** BUG-3 (gradient monotony) is Medium and should be addressed for a professional appearance per PRD color guidelines. BUG-1/2 are spec deviations to resolve or formally accept.

## Deployment
_To be added by /deploy_
