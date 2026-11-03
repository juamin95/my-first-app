# PROJ-3b: Leistungsseite – Private Gardening

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-3b`
> bindet es richtig in die Kette ein.

**Created:** 2026-04-03
**Last Updated:** 2026-04-03

---

## Abhängigkeiten
- `src/components/leistungen-sticky-scroll.tsx` – `privatKategorien` Export + optionales `kategorien`-Prop
- `src/components/pflege-abo-section.tsx`
- `src/lib/projekte-service.ts` – `getProjekteByKundentyp()`
- `src/components/ui/review-card.tsx`
- `src/components/cta-section.tsx`

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

## Akzeptanzkriterien

- [x] **AC-1** — Alle 8 Sections vorhanden und in korrekter Reihenfolge
- [x] **AC-2** — Hero: Badge + H1 + Subtitle auf Privatkunden zugeschnitten
- [x] **AC-3** — Einstieg: 2-Spalter + breites Bild, 3 Sub-Features, `-mt-20 rounded-t-[2.5rem]`
- [x] **AC-4** — Leistungen: `LeistungenStickyScroll` mit `privatKategorien` (2 × 6 Leistungen)
- [x] **AC-5** — PflegeAbo: `className="mt-0 rounded-none pt-0"`
- [x] **AC-6** — Referenzprojekte: filtert `kundentyp = "Privat"`, leerer Zustand vorhanden
- [x] **AC-7** — Rezensionen: nur `tag === "Privat"`, horizontaler Scroll
- [x] **AC-8** — Werte-Section: Foto + 4 Werte-Punkte im Glass Card Pattern
- [x] **AC-9** — Keine Cross-Links
- [x] **AC-10** — SEO: `metadata` mit Titel + Description
- [x] **AC-11** — Build ohne TypeScript-Fehler

---
