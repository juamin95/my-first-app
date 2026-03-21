# PROJ-3: Leistungsseite

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-18
**QA Result:** In Review -- StickyServiceTabs wurde nach Kundenfeedback entfernt (2026-03-21)

### Implementation Notes (Frontend)
- Created `src/components/leistungs-card.tsx` -- reusable card with image (or green gradient placeholder), title, description
- Created `src/components/sticky-service-tabs.tsx` -- existiert, aber nach Kundenfeedback (2026-03-21) aus der Seite entfernt; Komponente bleibt für eventuelle spätere Nutzung
- Built full `src/app/leistungen/page.tsx` with Hero, Pflege section (6 cards), PflegeAbo, Bau section (7 cards), CTA
- Design follows project conventions: glassmorphism cards, FadeIn animations, rounded sections with overlap, primary green
- Responsive: 1-col mobile, 2-col tablet, 3-col desktop grid
- SEO metadata exported (title + description)
- All content hardcoded, no backend needed
- Images mapped from `/public/images/hero/` and `/public/images/ueber-uns/`; Winterdienst and Bewaesserung use green gradient placeholders

## Dependencies
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als gewerblicher Kunde möchte ich alle Leistungen im Detail sehen, damit ich beurteilen kann ob das Unternehmen meinen Bedarf abdeckt
- Als Hausverwaltung möchte ich Pflegeleistungen klar von Bauleistungen unterscheiden können, damit ich schnell das Richtige finde
- Als Baufirma möchte ich die Bauleistungen mit Details sehen (z.B. Tiefbau, Pflasterarbeiten), damit ich einschätzen kann ob das Unternehmen geeignet ist
- Als Besucher möchte ich am Ende der Leistungsseite einen klaren CTA zur Kontaktaufnahme sehen, damit ich direkt eine Anfrage stellen kann
- Als mobiler Nutzer möchte ich die Leistungen übersichtlich auf dem Smartphone durchscrollen, damit ich keine wichtigen Informationen verpasse

## Acceptance Criteria

### Seitenstruktur
- [ ] Seite erreichbar unter `/leistungen`
- [ ] Seiten-Hero mit Titel "Unsere Leistungen" + kurzer Einleitungstext
- [ ] Zwei klar getrennte Sections: "Pflegeleistungen" und "Bauleistungen"
- [ ] Tab- oder Scroll-Navigation zwischen den zwei Kategorien (optional)

### Pflegeleistungen Section
- [ ] Kategorie-Überschrift + Einleitungssatz (z.B. "Zuverlässige Pflege für private und gewerbliche Außenanlagen")
- [ ] Leistungskarten mit: Icon/Bild, Leistungsname, Kurzbeschreibung (2-3 Sätze)
- [ ] Beispiel-Leistungen: Rasenpflege, Gehölzschnitt, Laubreinigung, Winterdienst, Bewässerungsanlagen, Saisonale Bepflanzung
- [ ] Alle Texte sind hardcoded und können später im Code angepasst werden

### Bauleistungen Section
- [ ] Kategorie-Überschrift + Einleitungssatz (z.B. "Professioneller Garten- und Landschaftsbau für anspruchsvolle Projekte")
- [ ] Leistungskarten mit: Icon/Bild, Leistungsname, Kurzbeschreibung (2-3 Sätze)
- [ ] Beispiel-Leistungen: Gartengestaltung, Natursteinarbeiten, Pflasterarbeiten, Terrassenbau, Einfahrten, Zaunbau, Bepflanzung/Neuanlage
- [ ] Alle Texte sind hardcoded

### CTA-Section
- [ ] Am Ende der Seite: "Interesse? Fordern Sie jetzt Ihr individuelles Angebot an"
- [ ] Button "Kontakt aufnehmen" → /kontakt

## Edge Cases
- Was passiert wenn eine Leistungsbeschreibung sehr lang ist? → Einheitliche Kartenhöhe, Text ggf. abgeschnitten mit Tooltip
- Was passiert wenn der Nutzer direkt auf /leistungen navigiert? → Seite lädt vollständig ohne Abhängigkeit von der Startseite
- Was passiert auf Mobile mit den Leistungskarten? → Einspaltige Darstellung, keine horizontalen Scroll-Traps

## Technical Requirements
- Alle Inhalte hardcoded (keine Datenbankanbindung)
- Leistungskarten als wiederverwendbare React-Komponente
- Bilder/Icons: Entweder shadcn-Icons oder SVG-Icons (kein externer Icon-Service)
- SEO: Page Title + Meta-Description für /leistungen

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
**Erstellt:** 2026-03-18

### Seitenstruktur (Komponentenbaum)

```
/leistungen (page.tsx – Server Component)
│
├── Page Hero
│   ├── Hintergrundbild mit dunklem Overlay (pflege-v2.jpg)
│   ├── Label "Was wir bieten"
│   ├── H1 "Unsere Leistungen"
│   └── Einleitungstext
│
├── Sticky Tab-Navigation (Client Component)
│   ├── Tab "Pflegeleistungen"  → Anker #pflege
│   └── Tab "Bauleistungen"    → Anker #bau
│
├── Pflegeleistungen Section  (id="pflege")
│   ├── Section-Header + Einleitungssatz
│   └── LeistungsCard-Grid (3 Spalten Desktop / 2 Tablet / 1 Mobil)
│       ├── LeistungsCard: Rasenpflege & Beetpflege       [rollrasen-edit.jpg]
│       ├── LeistungsCard: Heckenschnitt                  [heckenschnitt.jpg]
│       ├── LeistungsCard: Baumschnitt & Baumfällung      [hebebuehne.jpg]
│       ├── LeistungsCard: Laubreinigung                  [garten.png]
│       ├── LeistungsCard: Winterdienst                   [Platzhalter – grüner Farbverlauf]
│       └── LeistungsCard: Bewässerungsanlagen            [Platzhalter – grüner Farbverlauf]
│
├── Bauleistungen Section  (id="bau")
│   ├── Section-Header + Einleitungssatz
│   └── LeistungsCard-Grid
│       ├── LeistungsCard: Gartengestaltung & Neuanlage   [titelbild.jpg]
│       ├── LeistungsCard: Terrassenbau                   [terasse.jpg]
│       ├── LeistungsCard: Pflasterarbeiten & Einfahrten  [einfahrt.jpg]
│       ├── LeistungsCard: Natursteinarbeiten             [terasse2.jpg]
│       ├── LeistungsCard: Zaunbau & Sichtschutz          [zaun.jpg]
│       ├── LeistungsCard: Bepflanzung & Neuanlage        [garten.png]
│       └── LeistungsCard: Erdarbeiten & Rodungen         [luftaufnahme.webp]
│
└── CTA Section
    ├── Hintergrundbild mit Overlay (cta-bg.jpg)
    ├── Titel "Interesse? Wir erstellen Ihnen ein individuelles Angebot."
    └── Button "Kontakt aufnehmen" → /kontakt
```

### Datenhaltung

Alle Inhalte sind **hardcoded** direkt im Code — kein CMS, keine Datenbank.

Jede Leistungskarte enthält:
- **Bild** — vorhandenes Foto aus `/public/images/` (bei fehlenden: grüner Farbverlauf als Platzhalter)
- **Titel** — Name der Leistung
- **Beschreibung** — 2–3 Sätze, gezielt auf gewerbliche Kunden ausgerichtet

### Technische Entscheidungen

| Entscheidung | Gewählt | Begründung |
|---|---|---|
| Navigation | Sticky Tabs mit Anker-Sprung | Gewerbliche Kunden finden Pflege oder Bau sofort, ohne zu scrollen |
| Karten-Design | Foto oben, Text unten | Authentischer als Icons, zeigt echte Arbeit |
| Fehlende Bilder | Grüner Farbverlauf als Platzhalter | Sieht sauber aus, kann später durch echte Fotos ersetzt werden |
| Animationen | FadeIn (bereits vorhanden) | Konsistent mit Startseite, kein neues Paket |
| Backend | Nicht nötig | Rein statische Seite |
| SEO | `metadata` Export in page.tsx | Page Title + Meta-Description für Google |

### Neue Dateien

| Datei | Zweck |
|---|---|
| `src/app/leistungen/page.tsx` | Hauptseite (komplett neu) |
| `src/components/leistungs-card.tsx` | Wiederverwendbare Bildkarte |

### Wiederverwendete Komponenten (kein Neuaufwand)

`Button`, `FadeIn`, `Tabs` (shadcn/ui), `Image` (Next.js), `Link` — alle bereits installiert.

### Abhängigkeiten

Keine neuen Pakete erforderlich.

## QA Test Results (Re-test #3 -- Full Frontend Review)
**Tested by:** /qa
**Date:** 2026-03-21
**Previous tests:** 2026-03-18, 2026-03-20
**Build status:** PASS
**Lint status:** PASS
**Focus:** Background gradients, background colors, navigation, overall frontend quality

### Background & Gradient Analysis (Hauptaugenmerk)

| Section | Background | Assessment |
|---|---|---|
| Hero (PageHero) | Image with rgba overlay `opacity: 0.55` | GOOD -- dark overlay ensures text readability |
| Pflegeleistungen | `bg-white` with `-mt-20 rounded-t-[2.5rem]` overlap | GOOD -- clean white section |
| PflegeAbo | `bg-gradient-to-bl from-[#eef6e8] via-[#f4f7f2] to-[#d5e8cb]` | GOOD -- soft green, visually distinct from white above |
| Bauleistungen | `bg-gradient-to-br from-[#f0f7eb] via-[#e8f3e1] to-[#d5e8cb]` | NOTE -- nearly identical gradient to PflegeAbo directly above; creates seamless but monotonous flow |
| CTA | `bg-white` with contained image card | GOOD -- breaks gradient sequence |

**Verdict:** The Leistungsseite has better color alternation than the Startseite. PflegeAbo and Bauleistungen use nearly identical green gradients back-to-back, but the PflegeAbo pricing cards (white/green) provide sufficient visual contrast in between.

### Previous Bugs Status
- BUG-1 (Sticky tabs): CHANGED -- component now has `sticky top-[84px] z-30` BUT the component is NOT IMPORTED on the Leistungsseite. See BUG-1 below.
- BUG-2 (Hackslerservice): OPEN -- still "Haeckslerservice" instead of spec services

### Acceptance Criteria Results

#### Seitenstruktur
- [x] Seite erreichbar unter `/leistungen`
- [x] Seiten-Hero via reusable PageHero component with "Was wir bieten" badge + "Unsere Leistungen" title
- [x] Two clearly separated sections: "Pflegeleistungen" (id="pflege") and "Bauleistungen" (id="bau")
- [ ] **FAIL** -- Tab-Navigation: `StickyServiceTabs` component EXISTS with correct sticky CSS but is NOT IMPORTED or rendered anywhere on the page. See BUG-1.

#### Pflegeleistungen Section
- [x] 6 Leistungskarten with real images, titles, descriptions
- [x] All text hardcoded
- [!] DEVIATION: "Haeckslerservice" instead of spec's "Bewasserungsanlagen"/"Saisonale Bepflanzung" (See BUG-2)

#### Bauleistungen Section
- [x] 7 Leistungskarten with images
- [x] All text hardcoded

#### CTA Section
- [x] "Interesse? Wir erstellen Ihnen ein individuelles Angebot." with CheckCircle2 icons
- [x] "Kontakt aufnehmen" -> /kontakt + "Direkt anrufen" tel: button

### Edge Cases
- [x] Long descriptions: `line-clamp-3` on LeistungsCard
- [x] Direct navigation to `/leistungen`: fully functional
- [x] Mobile: single-column layout, no scroll traps

### Undocumented Addition: PflegeAboSection
- 3 subscription tiers (Basis, Komfort, Premium) between Pflege and Bau sections
- Well-built responsive pricing cards with Komfort highlighted in green
- **Recommendation:** Update spec to document this valuable addition

### Bugs Found

#### BUG-1: StickyServiceTabs component NOT USED on page (UPDATED)
- **Severity:** HIGH
- **Priority:** P1 -- Fix before deployment
- **Description:** The `StickyServiceTabs` component at `src/components/sticky-service-tabs.tsx` now correctly has `sticky top-[84px] z-30` CSS. However, this component is NOT IMPORTED or RENDERED anywhere in `src/app/leistungen/page.tsx`. A grep across the entire `src/` directory confirms zero imports of `StickyServiceTabs`. The component is dead code.
- **Expected:** Tab navigation rendered on the Leistungsseite to allow quick jumping between Pflege and Bau sections
- **Actual:** No tab navigation visible on the page at all
- **Steps to reproduce:**
  1. Open `/leistungen`
  2. Scroll down -- there is no tab bar between hero and content
  3. No way to quickly jump between Pflege and Bau sections
- **Root Cause:** Import was likely removed during a refactor or never added after the component was created

#### BUG-2: Spec deviation -- "Haeckslerservice" not in acceptance criteria (CARRIED OVER)
- **Severity:** MEDIUM
- **Priority:** P2
- **Location:** `src/app/leistungen/page.tsx`, pflegeleistungen array, item 6
- **Description:** "Haeckslerservice" replaces spec's "Bewasserungsanlagen" and "Saisonale Bepflanzung"

#### BUG-3: Bauleistungen gradient nearly identical to PflegeAbo gradient (NEW)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Open `/leistungen`
  2. Scroll past PflegeAbo section into Bauleistungen
  3. Both use nearly identical green-tinted gradients
  4. Expected: Visual contrast between adjacent sections
  5. Actual: Seamless blend, sections feel undifferentiated
- **Priority:** Nice to have

### Security Audit
- [x] Fully static page, no attack surface
- [x] No dangerouslySetInnerHTML
- **VERDICT: No security concerns**

### Responsive / Cross-Browser
- [x] Grid: 1-col mobile, 2-col tablet, 3-col desktop
- [x] PflegeAbo: 3-col on desktop, stacks on mobile
- [x] All standard CSS, well-supported

### Summary

| Category | Result |
|----------|--------|
| Acceptance Criteria | 14/16 PASS, 1 FAIL (tabs), 1 deviation |
| Build | PASS |
| Lint | PASS |
| Responsive | PASS |
| SEO | PASS |
| Security | PASS |

**Bugs: 3 total (0 Critical, 1 High, 1 Medium, 1 Low)**

**Overall verdict: NOT READY for production.**
BUG-1 (StickyServiceTabs not imported) is HIGH severity. The component exists but is unused dead code. Either import and render it on the Leistungsseite, or remove the dead code and update the spec to remove the tab-navigation requirement.

## Deployment
_To be added by /deploy_
