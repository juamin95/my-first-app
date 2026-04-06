# PROJ-6: Projektgalerie (Portfolio – Public View)

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-20

## Dependencies
- Requires: PROJ-1 (Layout & Navigation)
- Requires: PROJ-7 (CMS Admin) für die Datenbefüllung (Admin muss zuerst Projekte eintragen)

## User Stories
- Als gewerblicher Kunde möchte ich realisierte Projekte mit Fotos sehen, damit ich die Qualität und den Stil des Unternehmens beurteilen kann
- Als Hausverwaltung möchte ich gezielt nach gewerblichen Projekten filtern können, damit ich relevante Referenzen sehe
- Als Privatkunde möchte ich Garten-Neugestaltungen sehen, damit ich mir vorstellen kann was für mich möglich ist
- Als Besucher möchte ich ein einzelnes Projekt mit mehr Details aufrufen können, damit ich mehr Informationen erhalte
- Als Inhaber möchte ich durch die Projektgalerie gezielt auf größere und gewerbliche Projekte aufmerksam machen, damit ich die Zielgruppe steuere

## Acceptance Criteria

### Übersichtsseite `/projekte`
- [x] Raster-Layout (Grid) mit Projektkarten (Bild, Titel, Kategorie, Ort)
- [x] Filter-Tabs: "Alle", "Gewerbe", "Privat", "Öffentlich" (nach Kundenfeedback 2026-03-21 angepasst)
- [ ] Projekte werden aus Supabase-Datenbank geladen (Server Component) -- currently static data, Supabase pending PROJ-7
- [x] Loading Skeleton während Daten laden
- [x] Leerer Zustand: "Noch keine Projekte vorhanden" (für initiale Einrichtung)
- [x] Klick auf Projektkarte → Detailseite `/projekte/[slug]`
- [x] Sortierung: Neueste Projekte zuerst

### Detailseite `/projekte/[slug]`
- [x] Projekt-Titel als H1
- [x] Bildergalerie (mind. 1 Bild, bis zu 10 Bilder) mit Lightbox/Vollbild-Ansicht
- [x] Projektbeschreibung (Fließtext)
- [x] Meta-Infos: Kategorie, Ort, Projektumfang (optional), Jahr
- [x] CTA am Ende: "Ähnliches Projekt gewünscht? Jetzt anfragen" → /kontakt
- [x] Zurück-Link → /projekte

### Projektkarte (Komponente)
- [x] Vorschaubild (next/image, optimiert)
- [x] Titel + Kategorie-Badge + Ort
- [x] Hover-Effekt (z.B. leichter Zoom oder Overlay)

## Edge Cases
- Was passiert wenn keine Projekte in der DB sind? → Leerer-Zustand mit Hinweis "Projekte werden bald hinzugefügt"
- Was passiert wenn ein Bild nicht lädt? → Fallback-Placeholder-Bild
- Was passiert wenn ein Slug nicht existiert? → Next.js 404 Seite
- Was passiert mit sehr langen Projekttiteln? → Einheitliche Kartenhöhe, Text abgeschnitten (line-clamp)
- Was passiert bei vielen Projekten (50+)? → Pagination oder Infinite Scroll
- Was passiert wenn der Filter keine Ergebnisse liefert? → "Keine Projekte in dieser Kategorie"

## Technical Requirements
- Daten: Supabase Tabelle `projects` (id, slug, title, description, category, location, year, cover_image_url, images[], published)
- Images: Supabase Storage für Projektbilder
- Rendering: Server Component für initiales Laden (SEO), Client-Filter via State
- SEO: Dynamische Meta-Tags für jede Detailseite (`generateMetadata`)
- Performance: Bilder lazy-loaded, cover_image als priority nur above-the-fold

---
<!-- Sections below are added by subsequent skills -->

## Implementation Notes (Frontend)

### Components built:
- `src/components/projekt-card.tsx` - Reusable project card with image, badges, hover effects, and skeleton loader
- `src/components/projekt-filter.tsx` - Client-side filter tabs (Alle/Bauleistungen/Pflegeleistungen/Gewerblich/Privat) with empty state
- `src/components/projekt-galerie.tsx` - Image gallery with main image + thumbnails and fullscreen lightbox (Dialog-based)

### Pages updated:
- `src/app/projekte/page.tsx` - Overview with SEO metadata, filter, loading skeleton, empty state
- `src/app/projekte/[slug]/page.tsx` - Detail page with generateMetadata, image gallery, lightbox, meta info row, CTA section

### Data model changes:
- `src/lib/projekte-data.ts` - Replaced `badge` with `kundentyp` (Gewerblich/Privat) and added `kategorie` (Bauleistungen/Pflegeleistungen), `ort`, `coverImage`, `images[]`; added `filterProjekte()` utility; expanded from 3 to 6 sample projects
- Fixed home page (`src/app/page.tsx`) to use new field names (`kundentypStyles`, `kundentyp`, `coverImage`)

### Deviations from spec:
- Data is served from static TypeScript file instead of Supabase (pending PROJ-7 CMS Admin)
- Pagination not yet implemented (only 6 projects, not needed until 50+)

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results (Re-test #2 -- Full Frontend Review)

**Tested:** 2026-03-21
**Previous test:** 2026-03-20
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS
**Lint Status:** PASS
**Focus:** Background gradients, background colors, navigation, overall frontend quality

### Background & Gradient Analysis (Hauptaugenmerk)

| Section | Background | Assessment |
|---|---|---|
| Uebersicht Hero (PageHero) | Image overlay rgba(0,0,0,0.55) | GOOD |
| Filter + Grid section | `bg-white` with `-mt-20 rounded-t-[2.5rem]` | GOOD -- clean white |
| Detail page | `bg-white pt-32 pb-24` | GOOD -- straightforward |
| Detail CTA | `bg-gradient-to-br from-primary/5 to-transparent` | GOOD -- subtle accent |
| Detail Leistungen box | `bg-[#f4f7f2]` | GOOD -- soft green background |

**Verdict:** Projektgalerie pages have clean, minimal backgrounds. No gradient issues.

### Previous Bug Updates

| Previous Bug | Status | Notes |
|---|---|---|
| BUG-1 (Filter tabs mismatch) | OPEN | Still "Alle/Gewerbe/Privat/Oeffentlich" -- missing Bauleistungen/Pflegeleistungen |
| BUG-4 (metadataBase not set) | FIXED | `metadataBase: new URL("https://gruenschnitt-amini.de")` now set in root layout.tsx line 11 |

### Acceptance Criteria Status

#### AC-1: Uebersichtsseite `/projekte`
- [x] Grid layout with ProjektCards (image, title, badge, ort)
- [x] BUG-1: CLOSED (bewusste Entscheidung) – Filter-Tabs funktionieren korrekt laut Inhaber. `kategorie`-Feld in Supabase vorhanden.
- [x] Static data source (Supabase pending PROJ-7)
- [x] Loading skeleton via Suspense
- [x] Empty state with FolderOpen icon
- [x] Card links to `/projekte/[slug]`

#### AC-2: Detailseite `/projekte/[slug]`
- [x] H1 with project title
- [x] Image gallery with Dialog lightbox + prev/next navigation
- [x] Description paragraphs
- [x] Meta info: Ort, Jahr, Leistungen count (Projektumfang optional -- not implemented but spec says optional)
- [x] CTA "Aehnliches Projekt gewuenscht?" -> /kontakt
- [x] Back link -> /projekte
- [x] generateMetadata for SEO with OpenGraph

#### AC-3: Projektkarte
- [x] next/image with fill + sizes
- [x] Badge + Ort overlay + title
- [x] Hover effects (lift, zoom, text shift)

### Edge Cases
- [x] Empty state handled
- [ ] No image `onError` fallback (See BUG-2)
- [x] 404 for invalid slugs
- [x] Long titles: line-clamp-2
- [x] Filter empty state with reset button

### Bugs Found

#### BUG-1: Filter tabs do not match spec (CARRIED OVER)
- **Severity:** High
- **Steps to Reproduce:**
  1. Go to `/projekte`
  2. Tabs: "Alle", "Gewerbe", "Privat", "Oeffentlich"
  3. Expected: "Alle", "Bauleistungen", "Pflegeleistungen", "Gewerblich", "Privat"
  4. Missing: "Bauleistungen" and "Pflegeleistungen" filters; data model has no `kategorie` field
- **Priority:** Fix before deployment

#### BUG-2: No image load error fallback (CARRIED OVER)
- **Severity:** Medium
- **Description:** No `onError` handler on Image components for broken image paths
- **Priority:** Fix in next sprint

#### BUG-3: German umlauts replaced with ASCII in UI text (CARRIED OVER)
- **Severity:** Low
- **Description:** Detail page CTA uses "Aehnliches", "Erzaehlen" instead of proper umlauts while other pages use umlauts
- **Priority:** Fix in next sprint

#### BUG-4: First project slug "wohnkomplex-koeln-lindenthal" does not match project title (NEW)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Go to `/projekte/wohnkomplex-koeln-lindenthal`
  2. Title shows "Kindergarten Gruenanlage Koeln-Lindenthal"
  3. Slug says "wohnkomplex" but the actual project is a Kindergarten
  4. Expected: Slug should match content (e.g., `kindergarten-koeln-lindenthal`)
  5. Actual: Misleading URL slug leftover from previous content version
- **File:** `src/lib/projekte-data.ts` line 38
- **Priority:** Fix before deployment (SEO and user trust -- URL should match content)

### Summary
- **Acceptance Criteria:** 12/14 passed (1 FAIL: filter tabs, 1 optional: Projektumfang)
- **Bugs Found:** 4 total (0 critical, 1 high, 1 medium, 2 low)
- **Fixed since last QA:** BUG-4 old (metadataBase now set in layout.tsx)
- **Security:** PASS
- **Production Ready:** NO
- **Blocking:** BUG-1 (filter tabs mismatch with spec)
- **Recommendation:** Fix BUG-1 (add `kategorie` field to data model and filter tabs) and BUG-4 (fix slug). Then re-run /qa.

## Deployment
_To be added by /deploy_
