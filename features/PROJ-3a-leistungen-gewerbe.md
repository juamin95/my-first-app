# PROJ-3a: Leistungsseite – Gewerbe & Öffentliche Hand

## Status: In Review
**Created:** 2026-04-02
**Last Updated:** 2026-04-03

---

## Kontext & Zielsetzung

Eigenständige Spezifikation für `/leistungen/gewerbe`. Dient als gemeinsame Seite für gewerbliche Kunden **und** die öffentliche Hand – eine Trennung in zwei Seiten wurde als nicht sinnvoll bewertet, da das Unternehmen noch nicht so spezialisiert ist. `/leistungen/oeffentlich` redirectet auf diese Seite.

**Zielgruppe:** Hausverwaltungen, Facility-Manager, Baufirmen, Projektentwickler, Gewerbeimmobilienbesitzer, Kommunen, Schulen, öffentliche Träger
**Ton:** Professionell, sachlich, verlässlich, B2B-fokussiert
**URL:** `/leistungen/gewerbe`
**Redirect:** `/leistungen/oeffentlich` → `/leistungen/gewerbe`

---

## Seitenstruktur (finale Reihenfolge)

### 1. PageHero



- Badge: `"Gewerbe & Öffentliche Hand"`
- H1: `"Gewerbeimmobilien mit Außenwirkung"`
- Subtitle: `"Von der zuverlässigen Dauerpflege für Hausverwaltungen bis zur fachgerechten Betreuung gewerblicher und öffentlicher Außenanlagen – Grünschnitt by Marvin Amini ist Ihr Partner für gepflegte Grünflächen in Köln, Bergisch Gladbach und Leverkusen."`
- Bild: `/images/leistungen/gewerbe-leistungen.jpg`

---

### 2. Einstiegs-Section (weißer Hintergrund, `-mt-20 rounded-t-[2.5rem]`)
Layout: **2-Spalter oben** (links Heading, rechts Text + 3 Sub-Features) + **breites Bild darunter**

**Linke Spalte:**
- Tagline: `"Gewerbe & Öffentliche Hand"`
- H2: `"Ihr Außenbereich. Ihr Aushängeschild."`

**Rechte Spalte:**
- Fließtext über Außenwirkung und individuelle Konzepte
- 3 Sub-Features (Icon + fetter Titel + Text darunter):
  1. **Hausverwaltungen** (ClipboardList) – Mehrere Objekte, ein Ansprechpartner. Strukturiert, dokumentiert, verlässlich.
  2. **Gewerbeimmobilien** (LandPlot) – Gepflegtes Umfeld stärkt Unternehmensimage und Immobilienwert.
  3. **Öffentliche Hand** (Landmark) – Kommunen, Schulen und öffentliche Träger – strukturiert, normgerecht, dokumentiert.

**Bild darunter (volle Containerbreite):**
- Bild: `/images/leistungen/gewerbe-hero.jpg`
- Responsive: `aspect-[4/3]` auf Mobile, `aspect-[16/7]` ab sm
- Stil: `rounded-2xl shadow-lg`

---

### 3. Leistungen-Section (`<LeistungenStickyScroll />`)
Sticky-Scroll-Komponente mit zwei Karten auf grünem Hintergrund.

**Karte 1 – Gestaltung & Bau** (`bg-[#eef6e8]`, sticky):
1. Erdarbeiten & Rodungen
2. Pflasterarbeiten & Steinarbeiten
3. Neugestaltung & Außenanlagen
4. Terrassenbau
5. Zäune & Sichtschutz
6. Bepflanzungen
- Bild: `/images/leistungen/gewerbe-leistungen-2.jpg`

**Karte 2 – Pflege & Instandhaltung** (`bg-[#ddebd5]`, scrollt darüber):
1. Dauerpflege & Grünpflege
2. Rasen- & Beetpflege
3. Heckenschnitt
4. Baumschnitt & Baumfällung
5. Laubentfernung & Entsorgung
6. Steinreinigung (Icon: Droplets)
- Bild: `/images/leistungen/pflege-gewerbe.jpg`

Desktop: Karte 1 klebt (`sticky top-0`), Karte 2 scrollt drüber mit Schatten oben.
Mobile: Karten gestapelt mit Corner-Overlays für nahtlose Übergänge.

---

### 4. PflegeAbo-Section (`<PflegeAboSection className="mt-0 rounded-none pt-0" />`)
Bestehende Komponente. Pakete: Basis / Komfort (highlighted) / Premium.
- Kein Winterdienst in keinem Paket
- Basis: 5 von 8 inklusive
- Komfort: 7 von 8 inklusive (Heckenschnitt 2×, Beetpflege inkl. Nachsaat, Rasendüngung, Baumschnitt)
- Premium: 8 von 8 (+ Baumfällung + Steinreinigung mit Hochdruckreiniger)
- Mobile: horizontal scrollbar (Snap-Scroll)

---

### 5. Referenzprojekte (weißer Hintergrund, `-mt-8 rounded-t-[2.5rem]`)
- Gefiltert: `kundentyp = "Gewerbe"` **oder** `"Öffentlich"`, max. 3 (`getProjekteByKundentypen`)
- Headline: `"Gewerbliche & öffentliche Referenzprojekte"`
- Link: "Alle Projekte ansehen" → `/projekte`
- Leerer Zustand: Platzhalter "Aktuelle Referenzprojekte folgen in Kürze"

---

### 6. Rezensionen-Section (grüner Hintergrund, `-mt-8 rounded-t-[2.5rem]`)
- Titel: `"Das sagen unsere Gewerbekunden"`
- Google-Badge: 5,0 · Gewerbliche Kunden
- Nur Bewertungen mit `tag === "Gewerblich"` (5 Stück: E.B., Sebastian Gopp, Lehr und Sohn, Eray Süerdem, Frank Brück)
- Horizontal scrollbar (Snap-Scroll), `aria-label="Kundenbewertungen"`
- Kein `overflow-hidden` auf SectionWrapper (verhindert Clipping der Scroll-Ränder)

---

### 7. Verlässlichkeit-Section (weißer Hintergrund, `-mt-8 rounded-t-[2.5rem]`)
Layout: **Linke Spalte = Foto** | **Rechte Spalte = Headline + 4 Trust-Punkte**

- Foto links: `/images/leistungen/gaertner-portrait.jpg`, `aspect-square lg:aspect-[4/5]`, `object-center`
- Headline rechts: `"Darauf können Sie sich verlassen"`
- 4 Trust-Punkte:
  1. Terminzuverlässigkeit (Clock)
  2. Transparente Dokumentation (ClipboardList)
  3. Ein Ansprechpartner (Phone)
  4. Kostensicherheit (Lock)

---

### 8. CTASection
- Badge: `"Gewerbe & Öffentliche Hand"`
- Titel: `"Jetzt Dauerpflege oder Neugestaltung anfragen"`
- Subtitle: `"Schildern Sie uns Ihre Liegenschaften – ob Gewerbeimmobilie oder öffentliche Einrichtung, wir erstellen ein maßgeschneidertes Angebot, das sich rechnet."`
- Button: `"Dauerauftrag anfragen"`

---

## Acceptance Criteria

- [x] Alle 8 Sections vorhanden und in korrekter Reihenfolge
- [x] Hero: Badge + H1 + Subtitle referenzieren beide Zielgruppen (Gewerbe & Öffentliche Hand)
- [x] Einstiegs-Section: 2-Spalter + breites Bild, `-mt-20 rounded-t-[2.5rem]`
- [x] Einstiegs-Section: 3 Sub-Features (Hausverwaltungen, Gewerbeimmobilien, Öffentliche Hand)
- [x] Einstiegs-Section: Icon-Container `h-12 w-12`, Icons `h-6 w-6 strokeWidth={1.5}` (Style Guide)
- [x] Leistungen: `LeistungenStickyScroll` mit 2 Karten × 6 Leistungen
- [x] Leistungen: Corner-Overlays auf Mobile und Desktop korrekt (weiße Ecken)
- [x] Leistungen: Icon-Container `h-12 w-12`, Icons `h-6 w-6 strokeWidth={1.5}` (Style Guide)
- [x] PflegeAbo: kein Winterdienst, sinnvolle Staffelung Basis/Komfort/Premium
- [x] PflegeAbo: Mobile horizontal scrollbar mit korrektem linken Rand
- [x] PflegeAbo: nicht-highlighted Karten = Glass Card Pattern (`border-primary/10 bg-white/60 backdrop-blur-sm`)
- [x] PflegeAbo: Vorteile-Karten = Glass Card Pattern (`rounded-2xl border-primary/10 bg-white/60 shadow-sm backdrop-blur-sm`)
- [x] Referenzprojekte: filtert Gewerbe + Öffentlich, leerer Zustand vorhanden
- [x] Referenzprojekte: kein doppelter FadeIn um SectionHeader
- [x] Rezensionen: nur Gewerblich-Tags, horizontaler Scroll mit korrektem linken Rand
- [x] Rezensionen-SectionWrapper: kein `overflow-hidden` (bewusste Ausnahme lt. Style Guide)
- [x] Verlässlichkeit: 4 Trust-Punkte, Foto `object-center`, Icon-Container `h-12 w-12 strokeWidth={1.5}`, Glass Card Pattern (`bg-white/60 backdrop-blur-sm`)
- [x] `/leistungen/oeffentlich` redirectet zu `/leistungen/gewerbe`
- [x] Navigation zeigt 2 Leistungs-Links: "Gewerbe & Öffentlich" + "Private Gardening"
- [x] Keine Cross-Links zu anderen Leistungsseiten
- [x] SEO: `metadata` mit Titel + Description
- [x] Build ohne TypeScript-Fehler

## Dependencies
- `src/app/leistungen/oeffentlich/page.tsx` – Redirect auf diese Seite
- `src/components/leistungen-sticky-scroll.tsx` – Leistungen-Komponente
- `src/components/pflege-abo-section.tsx` – Abo-Pakete
- `src/lib/projekte-service.ts` – `getProjekteByKundentypen()`
- `src/components/ui/review-card.tsx`
- `src/components/cta-section.tsx`

---

## QA Test Results

**Tested:** 2026-04-03
**App URL:** http://localhost:3000/leistungen/gewerbe
**Tester:** QA Engineer (AI)

### Acceptance Criteria Status

#### AC-1: Alle 8 Sections vorhanden und in korrekter Reihenfolge
- [x] PASS -- PageHero, Einstieg, Leistungen (StickyScroll), PflegeAbo, Referenzprojekte, Rezensionen, Verlaesslichkeit, CTA -- alle 8 in korrekter Reihenfolge

#### AC-2: Hero: Badge + H1 + Subtitle referenzieren beide Zielgruppen
- [x] PASS -- Badge="Gewerbe & Oeffentliche Hand", H1="Gewerbeimmobilien mit Aussenwirkung", Subtitle nennt Hausverwaltungen + gewerbliche und oeffentliche Aussenanlagen

#### AC-3: Einstiegs-Section: 2-Spalter + breites Bild, -mt-20 rounded-t-[2.5rem]
- [x] PASS -- Section hat `z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white`, 2-col grid + Bild darunter

#### AC-4: Einstiegs-Section: 3 Sub-Features
- [x] PASS -- Hausverwaltungen (ClipboardList), Gewerbeimmobilien (LandPlot), Oeffentliche Hand (Landmark) -- alle vorhanden

#### AC-5: Einstiegs-Section Icon-Container h-12 w-12, Icons h-6 w-6 strokeWidth={1.5}
- [x] PASS -- alle 3 Sub-Features verwenden `h-12 w-12` Container und `h-6 w-6` Icons mit `strokeWidth={1.5}`

#### AC-6: Leistungen: LeistungenStickyScroll mit 2 Karten x 6 Leistungen
- [x] PASS -- `<LeistungenStickyScroll />` ohne Props (default = gewerbeKategorien), 2 Karten mit je 6 Leistungen

#### AC-7: Leistungen: Corner-Overlays auf Mobile und Desktop
- [x] PASS -- KarteDesktop und KarteInline beide mit Corner-Overlay Spans (`radial-gradient`) oben links und rechts

#### AC-8: Leistungen Icon-Container Sizing
- [x] PASS -- alle Leistungen-Items verwenden `h-12 w-12` Container, `h-6 w-6` Icons, `strokeWidth={1.5}`

#### AC-9: PflegeAbo: kein Winterdienst
- [x] PASS -- kein "Winterdienst" in den Paketen. Basis 5/8, Komfort 7/8, Premium 8/8

#### AC-10: PflegeAbo: Mobile horizontal scrollbar
- [x] PASS -- `no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-pl-4` mit korrektem `pl-4 sm:pl-6`

#### AC-11: PflegeAbo: Glass Card Pattern fuer nicht-highlighted Karten
- [x] PASS -- `border-primary/10 bg-white/60 backdrop-blur-sm` auf nicht-highlighted Karten

#### AC-12: PflegeAbo: Vorteile-Karten Glass Card Pattern
- [x] PASS -- `rounded-2xl border border-primary/10 bg-white/60 px-6 py-5 shadow-sm backdrop-blur-sm`

#### AC-13: Referenzprojekte: filtert Gewerbe + Oeffentlich, leerer Zustand vorhanden
- [x] PASS -- `getProjekteByKundentypen(["Gewerbe", "Oeffentlich"], 3)`, leerer Zustand mit Platzhalter "Aktuelle Referenzprojekte folgen in Kuerze"

#### AC-14: Referenzprojekte: kein doppelter FadeIn um SectionHeader
- [x] PASS -- SectionHeader steht direkt im Container, kein zusaetzlicher FadeIn-Wrapper (SectionHeader hat internen FadeIn)

#### AC-15: Rezensionen: nur Gewerblich-Tags
- [x] PASS -- alle 5 Rezensionen haben `tag: "Gewerblich"` (E.B., Sebastian Gopp, Lehr und Sohn, Eray Suerdem, Frank Brueck)

#### AC-16: Rezensionen-SectionWrapper: kein overflow-hidden
- [x] PASS -- SectionWrapper-Komponente hat kein overflow-hidden, nur der aeussere className hat kein overflow-hidden

#### AC-17: Verlaesslichkeit: 4 Trust-Punkte, Foto object-center
- [x] PASS -- 4 Trust-Punkte (Terminzuverlaessigkeit, Transparente Dokumentation, Ein Ansprechpartner, Kostensicherheit), Foto mit `object-cover object-center`
- [ ] BUG: Verlaesslichkeit-Karten verwenden nicht das Glass Card Pattern (siehe BUG-1)

#### AC-18: /leistungen/oeffentlich redirectet zu /leistungen/gewerbe
- [x] PASS -- `src/app/leistungen/oeffentlich/page.tsx` verwendet `redirect("/leistungen/gewerbe")`

#### AC-19: Navigation zeigt 2 Leistungs-Links
- [x] PASS -- Header hat `leistungsLinks` mit "Gewerbe & Oeffentlich" und "Private Gardening" im Dropdown

#### AC-20: Keine Cross-Links zu anderen Leistungsseiten
- [x] PASS -- keine Links zu /leistungen/privat auf der Gewerbe-Seite (nur /kontakt und /projekte)

#### AC-21: SEO: metadata mit Titel + Description
- [x] PASS -- `title: "Gewerblicher Landschaftsbau | Gruenschnitt by Amini"`, description vorhanden

#### AC-22: Build ohne TypeScript-Fehler
- [x] PASS -- `npm run build` erfolgreich, `npm run lint` ohne Fehler

### Edge Cases

#### EC-1: /leistungen base-URL
- [x] PASS -- `/leistungen` redirectet auf `/leistungen/gewerbe` (eigene page.tsx mit redirect)

#### EC-2: Referenzprojekte leer
- [x] PASS -- leerer Zustand mit Platzhalter-UI getestet (Dashed Border + Icon + Text)

#### EC-3: Revalidation
- [x] PASS -- `export const revalidate = 60` -- Seite wird alle 60 Sekunden revalidiert

### Security Audit Results

#### SEC-1: Input Handling
- [x] Keine Benutzereingaben auf diesen Seiten (reine Darstellungsseiten)
- [x] Supabase-Queries in projekte-service.ts verwenden parametrisierte Abfragen (kein SQL-Injection-Risiko)

#### SEC-2: Data Exposure
- [x] Keine sensiblen Daten in Page-Source oder Client-Bundle
- [x] Supabase Server-Client wird nur serverseitig verwendet (async Server Component)

#### SEC-3: Redirect Safety
- [x] `/leistungen/oeffentlich` redirect verwendet Next.js `redirect()` -- sicher, kein Open Redirect moeglich

#### SEC-4: Image Handling
- [ ] BUG: gewerbe-leistungen.jpg ist 2.9 MB -- Performance-Problem (siehe BUG-2)

### Bugs Found

#### BUG-1: Verlaesslichkeit-Karten weichen vom Glass Card Pattern ab (Gewerbe)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Oeffne `/leistungen/gewerbe`, scrolle zur Verlaesslichkeit-Section
  2. Vergleiche Karten-Styling mit Glass Card Pattern aus Style Guide
  3. Expected: `rounded-2xl border border-primary/10 bg-white/60 p-5 shadow-sm backdrop-blur-sm`
  4. Actual: `rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-primary/[0.03] p-5 shadow-sm` -- verwendet Gradient statt `bg-white/60` und fehlt `backdrop-blur-sm`
- **Note:** Die Privat-Seite (PROJ-3b) verwendet das korrekte Glass Card Pattern. Inkonsistenz zwischen den beiden Seiten.
- **Priority:** Nice to have

#### BUG-2: Hero-Bild gewerbe-leistungen.jpg ist 2.9 MB
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Pruefe Dateigroesse: `ls -lh public/images/leistungen/gewerbe-leistungen.jpg` = 2.9 MB
  2. Expected: Bilder unter 500 KB fuer Web-Performance (PageSpeed Score >= 90 lt. PRD)
  3. Actual: 2.9 MB -- wird zwar von Next.js Image-Optimization verkleinert, aber das Quellbild sollte vorab optimiert werden
- **Priority:** Fix before deployment -- betrifft PageSpeed-Ziel aus PRD

#### BUG-3: Privat-Leistungen weichen vom Spec ab (PROJ-3b Kategorie-Namen)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Lese PROJ-3b Spec Karte 1: "Neuanlage & Gartenplanung, Terrassenbau, Natursteinarbeiten, Bepflanzung & Gartendesign, Pool- & Umfeldgestaltung, Bewässerungsanlagen"
  2. Lese Code privatKategorien Karte 1: "Erdarbeiten & Rodungen, Pflasterarbeiten & Steinarbeiten, Neugestaltung & Gartenanlage, Terrassenbau, Zaeune & Sichtschutz, Bepflanzungen"
  3. Expected: Code stimmt mit Spec ueberein
  4. Actual: Leistungen sind inhaltlich verschieden -- Code zeigt allgemeinere GaLaBau-Leistungen statt privat-spezifische (Pool, Bewaesserung fehlen)
- **Note:** Dies betrifft PROJ-3b, wird dort dokumentiert. Moeglicherweise bewusste Abweichung nach Implementierung.
- **Priority:** Klaeren ob Spec oder Code korrekt ist

### Summary
- **Acceptance Criteria:** 21/22 passed (1 minor deviation at AC-17)
- **Bugs Found:** 3 total (0 critical, 0 high, 1 medium, 2 low)
- **Security:** Pass -- reine Darstellungsseite, Supabase-Queries sicher, keine Benutzereingaben
- **Production Ready:** YES (mit Empfehlung BUG-2 vor Go-Live zu beheben)
- **Recommendation:** Bild-Optimierung (BUG-2) vor Deployment durchfuehren. BUG-1 und BUG-3 sind kosmetisch/dokumentarisch.
