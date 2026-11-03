# PROJ-6: Projektgalerie (Portfolio – Public View): QA-Bericht

## QA-Testergebnisse (Re-test #2 -- Full Frontend Review)

**Tested:** 2026-03-21
**Previous test:** 2026-03-20
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS
**Lint Status:** PASS
**Focus:** Background gradients, background colors, navigation, overall frontend quality

### Analyse von Hintergründen und Verläufen (Hauptaugenmerk)

| Section | Background | Assessment |
|---|---|---|
| Uebersicht Hero (PageHero) | Image overlay rgba(0,0,0,0.55) | GOOD |
| Filter + Grid section | `bg-white` with `-mt-20 rounded-t-[2.5rem]` | GOOD -- clean white |
| Detail page | `bg-white pt-32 pb-24` | GOOD -- straightforward |
| Detail CTA | `bg-gradient-to-br from-primary/5 to-transparent` | GOOD -- subtle accent |
| Detail Leistungen box | `bg-[#f4f7f2]` | GOOD -- soft green background |

**Verdict:** Projektgalerie pages have clean, minimal backgrounds. No gradient issues.

### Aktualisierung früherer Bugs

| Previous Bug | Status | Notes |
|---|---|---|
| BUG-1 (Filter tabs mismatch) | OPEN | Still "Alle/Gewerbe/Privat/Oeffentlich" -- missing Bauleistungen/Pflegeleistungen |
| BUG-4 (metadataBase not set) | FIXED | `metadataBase: new URL("https://gruenschnitt-amini.de")` now set in root layout.tsx line 11 |

### Status der Akzeptanzkriterien

#### Bereich: Uebersichtsseite `/projekte`
- [x] Grid layout with ProjektCards (image, title, badge, ort) · **AC-1**
- [x] BUG-1: CLOSED (bewusste Entscheidung) – Filter-Tabs funktionieren korrekt laut Inhaber. `kategorie`-Feld in Supabase vorhanden. · **AC-2**
- [x] Static data source (Supabase pending PROJ-7) · **AC-3**
- [x] Loading skeleton via Suspense · **AC-4**
- [x] Empty state with FolderOpen icon · **AC-5**
- [x] Card links to `/projekte/[slug]` · **AC-6**

#### Bereich: Detailseite `/projekte/[slug]`
- [x] H1 with project title · **AC-8**
- [x] Image gallery with Dialog lightbox + prev/next navigation · **AC-9**
- [x] Description paragraphs · **AC-10**
- [x] Meta info: Ort, Jahr, Leistungen count (Projektumfang optional -- not implemented but spec says optional) · **AC-11**
- [x] CTA "Aehnliches Projekt gewuenscht?" -> /kontakt · **AC-12**
- [x] Back link -> /projekte · **AC-13**
- [x] generateMetadata for SEO with OpenGraph · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Bereich: Projektkarte
- [x] next/image with fill + sizes · **AC-14**
- [x] Badge + Ort overlay + title · **AC-15**
- [x] Hover effects (lift, zoom, text shift) · **AC-16**

### Randfälle
- [x] Empty state handled · **EC-1**
- [ ] No image `onError` fallback (See BUG-2) · **EC-2**
- [x] 404 for invalid slugs · **EC-3**
- [x] Long titles: line-clamp-2 · **EC-4**
- [x] Filter empty state with reset button · **EC-6**

### Gefundene Bugs

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

### Zusammenfassung
- **Acceptance Criteria:** 12/14 passed (1 FAIL: filter tabs, 1 optional: Projektumfang)
- **Bugs Found:** 4 total (0 critical, 1 high, 1 medium, 2 low)
- **Fixed since last QA:** BUG-4 old (metadataBase now set in layout.tsx)
- **Security:** PASS
- **Production Ready:** NO
- **Blocking:** BUG-1 (filter tabs mismatch with spec)
- **Recommendation:** Fix BUG-1 (add `kategorie` field to data model and filter tabs) and BUG-4 (fix slug). Then re-run /qa.
