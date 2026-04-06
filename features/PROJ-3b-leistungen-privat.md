# PROJ-3b: Leistungsseite – Private Gardening

## Status: In Review
**Created:** 2026-04-03
**Last Updated:** 2026-04-03

---

## Kontext & Zielsetzung

Eigenständige Seite für Privatkunden unter `/leistungen/privat`. Gleiche 8-Section-Struktur wie PROJ-3A (Gewerbe), aber inhaltlich und tonell auf Privatkunden zugeschnitten.

**Zielgruppe:** Eigenheimbesitzer mit Budget für hochwertige Gartengestaltung – Wert auf persönliche Betreuung, Qualitätsmaterialien und individuelle Konzepte. Keine Kleinstaufträge.

**Ton:** Warm, handwerklich stolz, persönlich. Premium ohne Arroganz – authentisch kölnisch. Der Garten als persönlicher Ort der Freude, nicht als Statussymbol.

**URL:** `/leistungen/privat`

---

## Seitenstruktur (finale Reihenfolge)

### 1. PageHero
- Badge: `"Private Gardening"`
- H1: `"Ihr Garten. Handverlesen gestaltet."`
- Subtitle: `"Grünschnitt by Marvin Amini gestaltet und pflegt Privatgärten, die begeistern – persönlich begleitet, handwerklich präzise, abgestimmt auf Sie."`
- Bild: `/images/hero/titelbild.jpg` (Placeholder – echtes Privatgarten-Foto folgt)

---

### 2. Einstiegs-Section (weiß, `-mt-20 rounded-t-[2.5rem]`)
Layout: 2-Spalter (links Heading, rechts Text + 3 Sub-Features) + breites Bild darunter

**Links:**
- Tagline: `"Private Gardening"`
- H2: `"Ihr Garten. Ihr Ort."`

**Rechts:**
- Fließtext: `"Kein Garten von der Stange. Marvin Amini lernt Ihren Garten kennen – und entwickelt daraus ein Konzept, das zu Ihnen passt: Ihrem Grundstück, Ihrem Stil, Ihrem Alltag."`
- 3 Sub-Features:
  1. **Persönliche Betreuung** (User) – direkter Ansprechpartner vom ersten Gespräch bis zur Übergabe
  2. **Handwerk & Qualität** (Trophy) – 10+ Jahre Erfahrung, Fachkräfte, ausgewählte Materialien
  3. **Ihr Stil, Ihre Wünsche** (Palette) – kein Standardkonzept, individuelle Planung

**Bild darunter:** `/images/hero/titelbild.jpg`, `aspect-[4/3]` mobile, `aspect-[16/7]` ab sm

---

### 3. Leistungen-Section (`<LeistungenStickyScroll kategorien={privatKategorien} />`)
`privatKategorien` wird aus `leistungen-sticky-scroll.tsx` importiert. Keine eigene Komponente nötig.

**Karte 1 – Gartengestaltung & Bau** (`bg-[#eef6e8]`, cornerColor: `#ffffff`):
1. Erdarbeiten & Rodungen
2. Pflasterarbeiten & Steinarbeiten
3. Neugestaltung & Gartenanlage
4. Terrassenbau
5. Zäune & Sichtschutz
6. Bepflanzungen
- Bild: `/images/leistungen/gewerbe-leistungen-2.jpg` (Placeholder – privates Bild folgt)

> **Hinweis:** Leistungsnamen sind bewusst deckungsgleich mit Gewerbe (gleiche 6+6 Basis), Beschreibungstexte aber auf Privatkunden zugeschnitten (persönlicher Kontext statt B2B-Sprache).

**Karte 2 – Gartenpflege** (`bg-[#ddebd5]`, cornerColor: `#eef6e8`):
1. Dauerpflege & Grünpflege
2. Rasen- & Beetpflege
3. Heckenschnitt
4. Baumschnitt & Baumfällung
5. Laubentfernung & Entsorgung
6. Steinreinigung
- Bild: `/images/leistungen/pflege-gewerbe.jpg` (Placeholder – privates Bild folgt)

---

### 4. PflegeAbo-Section
`<PflegeAboSection className="mt-0 rounded-none pt-0" />` – identisch zu 3A

---

### 5. Referenzprojekte (weiß, `-mt-8 rounded-t-[2.5rem]`)
- Gefiltert: `kundentyp = "Privat"`, max. 3 (`getProjekteByKundentyp`)
- Headline: `"Private Referenzprojekte"`
- Kein `FadeIn`-Wrapper um `SectionHeader`
- Leerer Zustand: Platzhalter vorhanden
- Link: "Alle Projekte ansehen" → `/projekte`

---

### 6. Rezensionen (grün, `-mt-8 rounded-t-[2.5rem]`)
- Titel: `"Das sagen unsere Privatkunden"`
- Google-Badge: 5,0 · Private Kunden
- 7 Reviews: R A, Niklas TT, Paul Wojtyczka, Lukas Fleige, Paul Seuthe, Holger Grashof, Claudia Schackert (`tag === "Privat"`)
- Horizontaler Scroll, kein `overflow-hidden` auf SectionWrapper (bewusste Ausnahme lt. Style Guide)

---

### 7. Werte-Section (weiß, `-mt-8 rounded-t-[2.5rem]`)
Ersetzt die Verlässlichkeit-Section aus 3A. Gleiche 2-col Layout, aber persönlich-werteorientiert statt B2B-Trust.

- **Links:** Foto `/images/leistungen/gaertner-portrait.jpg`, `aspect-square lg:aspect-[4/5]`, `object-center`
- **Rechts:**
  - Badge: `"Unser Versprechen"`
  - H2: `"Was uns ausmacht"`
  - 4 Werte (Glass Card Pattern):
    1. Persönlich (User)
    2. Handwerklich präzise (Trophy)
    3. Ehrlich & transparent (ClipboardList)
    4. Langfristig gedacht (Leaf)

---

### 8. CTASection
- Badge: `"Private Gardening"`
- Titel: `"Erzählen Sie uns von Ihrem Garten"`
- Subtitle: persönliche Beratung vor Ort
- Button: `"Gartenberatung anfragen"`

---

## Bewusste Abweichungen von PROJ-3A

| Punkt | 3A (Gewerbe) | 3B (Privat) |
|-------|-------------|-------------|
| Hero H1 | „Gewerbeimmobilien mit Außenwirkung" | „Ihr Garten. Handverlesen gestaltet." |
| Leistungskategorien | Gestaltung & Bau / Pflege & Instandhaltung | Gartengestaltung & Bau / Gartenpflege |
| Section 7 | Verlässlichkeit (B2B Trust-Punkte) | Werte (persönlich-handwerklich) |
| Referenzprojekte | Gewerbe + Öffentlich | Privat |
| Rezensionen | Gewerblich | Privat |
| Keine Cross-Links | ✓ | ✓ |

## Acceptance Criteria

- [x] Alle 8 Sections vorhanden und in korrekter Reihenfolge
- [x] Hero: Badge + H1 + Subtitle auf Privatkunden zugeschnitten
- [x] Einstieg: 2-Spalter + breites Bild, 3 Sub-Features, `-mt-20 rounded-t-[2.5rem]`
- [x] Leistungen: `LeistungenStickyScroll` mit `privatKategorien` (2 × 6 Leistungen)
- [x] PflegeAbo: `className="mt-0 rounded-none pt-0"`
- [x] Referenzprojekte: filtert `kundentyp = "Privat"`, leerer Zustand vorhanden
- [x] Rezensionen: nur `tag === "Privat"`, horizontaler Scroll
- [x] Werte-Section: Foto + 4 Werte-Punkte im Glass Card Pattern
- [x] Keine Cross-Links
- [x] SEO: `metadata` mit Titel + Description
- [x] Build ohne TypeScript-Fehler

## Dependencies
- `src/components/leistungen-sticky-scroll.tsx` – `privatKategorien` Export + optionales `kategorien`-Prop
- `src/components/pflege-abo-section.tsx`
- `src/lib/projekte-service.ts` – `getProjekteByKundentyp()`
- `src/components/ui/review-card.tsx`
- `src/components/cta-section.tsx`

---

## QA Test Results

**Tested:** 2026-04-03
**App URL:** http://localhost:3000/leistungen/privat
**Tester:** QA Engineer (AI)

### Acceptance Criteria Status

#### AC-1: Alle 8 Sections vorhanden und in korrekter Reihenfolge
- [x] PASS -- PageHero, Einstieg, Leistungen (StickyScroll), PflegeAbo, Referenzprojekte, Rezensionen, Werte-Section, CTA -- alle 8 in korrekter Reihenfolge

#### AC-2: Hero: Badge + H1 + Subtitle auf Privatkunden zugeschnitten
- [x] PASS -- Badge="Private Gardening", H1="Ihr Garten. Handverlesen gestaltet.", Subtitle mit persoenlicher Ansprache

#### AC-3: Einstieg: 2-Spalter + breites Bild, 3 Sub-Features, -mt-20 rounded-t-[2.5rem]
- [x] PASS -- Section hat `z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white`
- [x] 3 Sub-Features: Persoenliche Betreuung (User), Handwerk & Qualitaet (Trophy), Ihr Stil Ihre Wuensche (Palette)
- [x] Breites Bild mit `aspect-[4/3] sm:aspect-[16/7]`

#### AC-4: Leistungen: LeistungenStickyScroll mit privatKategorien (2 x 6 Leistungen)
- [x] PASS -- `<LeistungenStickyScroll kategorien={privatKategorien} />`, Import von `privatKategorien`
- [ ] BUG: Leistungs-Inhalte weichen vom Spec ab (siehe BUG-1)

#### AC-5: PflegeAbo: className="mt-0 rounded-none pt-0"
- [x] PASS -- `<PflegeAboSection className="mt-0 rounded-none pt-0" />`

#### AC-6: Referenzprojekte: filtert kundentyp = "Privat", leerer Zustand vorhanden
- [x] PASS -- `getProjekteByKundentyp("Privat", 3)`, leerer Zustand mit Platzhalter

#### AC-7: Rezensionen: nur tag === "Privat", horizontaler Scroll
- [x] PASS -- alle 7 Rezensionen haben `tag: "Privat"`
- [ ] BUG: Spec nennt 3 Reviews, Code hat 7 (siehe BUG-2)

#### AC-8: Werte-Section: Foto + 4 Werte-Punkte im Glass Card Pattern
- [x] PASS -- Foto links `/images/leistungen/gaertner-portrait.jpg` mit `aspect-square lg:aspect-[4/5]` und `object-center`
- [x] 4 Werte-Punkte: Persoenlich (User), Handwerklich praezise (Trophy), Ehrlich & transparent (ClipboardList), Langfristig gedacht (Leaf)
- [x] Glass Card Pattern korrekt: `rounded-2xl border border-primary/10 bg-white/60 p-5 shadow-sm backdrop-blur-sm`

#### AC-9: Keine Cross-Links
- [x] PASS -- keine Links zu /leistungen/gewerbe auf der Privat-Seite

#### AC-10: SEO: metadata mit Titel + Description
- [x] PASS -- `title: "Private Gardening | Gruenschnitt by Amini"`, Description vorhanden und relevant

#### AC-11: Build ohne TypeScript-Fehler
- [x] PASS -- `npm run build` erfolgreich, `npm run lint` ohne Fehler

### Edge Cases

#### EC-1: Referenzprojekte leer
- [x] PASS -- leerer Zustand mit Platzhalter-UI (Dashed Border + LandPlot Icon + Hilfstext)

#### EC-2: Lange Rezensionen
- [x] PASS -- ReviewCard hat `line-clamp-3` und "mehr lesen"-Button fuer Texte > 120 Zeichen

#### EC-3: Revalidation
- [x] PASS -- `export const revalidate = 60`

### Security Audit Results

#### SEC-1: Input Handling
- [x] Keine Benutzereingaben auf dieser Seite
- [x] Supabase-Queries parametrisiert

#### SEC-2: Data Exposure
- [x] Keine sensiblen Daten im Client-Bundle
- [x] Server Component -- Supabase Server-Client nur serverseitig

#### SEC-3: Rezensionen-Daten
- [x] Hartcodiert in Page-Datei -- kein Risiko fuer Injection oder Manipulation

### Bugs Found

#### BUG-1: privatKategorien Leistungen weichen vom Spec ab
- **Severity:** Low
- **Steps to Reproduce:**
  1. Lese PROJ-3b Spec Karte 1: "Neuanlage & Gartenplanung, Terrassenbau, Natursteinarbeiten, Bepflanzung & Gartendesign, Pool- & Umfeldgestaltung, Bewässerungsanlagen"
  2. Lese Code `privatKategorien` Karte 1 in leistungen-sticky-scroll.tsx: "Erdarbeiten & Rodungen, Pflasterarbeiten & Steinarbeiten, Neugestaltung & Gartenanlage, Terrassenbau, Zaeune & Sichtschutz, Bepflanzungen"
  3. Ebenso Karte 2: Spec nennt "Rasenpflege & Beetpflege, Heckenschnitt, Baumschnitt & Baumpflege, Saisonale Bepflanzung, Laubentfernung & Entsorgung, Steinreinigung (Hochdruck)" -- Code hat z.T. andere Bezeichnungen und "Dauerpflege & Gruenpflege" statt "Saisonale Bepflanzung"
  4. Expected: Code stimmt mit Spec ueberein
  5. Actual: Leistungsnamen und -inhalte sind teilweise verschieden. Pool- & Umfeldgestaltung und Bewaesserungsanlagen fehlen gaenzlich.
- **Note:** Moeglicherweise bewusste Anpassung nach Spec-Erstellung. Entweder Spec oder Code sollte aktualisiert werden.
- **Priority:** Klaeren ob Spec oder Code korrekt ist -- kein funktionaler Bug

#### BUG-2: Rezensionen-Anzahl weicht vom Spec ab
- **Severity:** Low
- **Steps to Reproduce:**
  1. Lese PROJ-3b Spec Section 6: "3 Reviews: mogli anish, Lukas Fleige, Claudia Schackert"
  2. Lese Code `privatRezensionen`: 7 Reviews (R A, Niklas TT, Paul Wojtyczka, Lukas Fleige, Paul Seuthe, Holger Grashof, Claudia Schackert)
  3. Expected: 3 Reviews lt. Spec
  4. Actual: 7 Reviews, und "mogli anish" aus dem Spec fehlt, "R A" ist stattdessen vorhanden
- **Note:** Mehr Reviews sind wahrscheinlich eine bewusste Verbesserung. Spec sollte aktualisiert werden.
- **Priority:** Nice to have -- Spec aktualisieren

#### BUG-3: Werte-Section Badge fehlt "Unser Versprechen" laut Spec
- **Severity:** Low
- **Steps to Reproduce:**
  1. Lese PROJ-3b Spec Section 7: Badge: "Unser Versprechen"
  2. Lese Code: `<SectionHeader badge="Unser Versprechen" title="Was uns ausmacht" />`
  3. PASS -- Badge ist korrekt vorhanden
- **Note:** Kein Bug -- bei erneuter Pruefung ist dies korrekt implementiert. Streichung.

### Summary
- **Acceptance Criteria:** 11/11 passed (2 mit Spec-Abweichungen, aber funktional korrekt)
- **Bugs Found:** 2 total (0 critical, 0 high, 0 medium, 2 low)
- **Security:** Pass -- reine Darstellungsseite
- **Production Ready:** YES
- **Recommendation:** Spec-Dokument aktualisieren um Code-Realitaet widerzuspiegeln (BUG-1 Leistungsnamen, BUG-2 Rezensionen-Anzahl). Keine funktionalen Blocker.
