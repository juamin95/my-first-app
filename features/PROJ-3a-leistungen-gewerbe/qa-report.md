# PROJ-3a: Leistungsseite – Gewerbe & Öffentliche Hand: QA-Bericht

## QA-Testergebnisse

**Tested:** 2026-04-03
**App URL:** http://localhost:3000/leistungen/gewerbe
**Tester:** QA Engineer (AI)

### Status der Akzeptanzkriterien

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

### Randfälle

#### EC-1: /leistungen base-URL
- [x] PASS -- `/leistungen` redirectet auf `/leistungen/gewerbe` (eigene page.tsx mit redirect) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### EC-2: Referenzprojekte leer
- [x] PASS -- leerer Zustand mit Platzhalter-UI getestet (Dashed Border + Icon + Text) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### EC-3: Revalidation
- [x] PASS -- `export const revalidate = 60` -- Seite wird alle 60 Sekunden revalidiert · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### Ergebnisse der Sicherheitsprüfung

#### SEC-1: Input Handling
- [x] Keine Benutzereingaben auf diesen Seiten (reine Darstellungsseiten) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Supabase-Queries in projekte-service.ts verwenden parametrisierte Abfragen (kein SQL-Injection-Risiko) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### SEC-2: Data Exposure
- [x] Keine sensiblen Daten in Page-Source oder Client-Bundle · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Supabase Server-Client wird nur serverseitig verwendet (async Server Component) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### SEC-3: Redirect Safety
- [x] `/leistungen/oeffentlich` redirect verwendet Next.js `redirect()` -- sicher, kein Open Redirect moeglich · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### SEC-4: Image Handling
- [ ] BUG: gewerbe-leistungen.jpg ist 2.9 MB -- Performance-Problem (siehe BUG-2) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### Gefundene Bugs

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

### Zusammenfassung
- **Acceptance Criteria:** 21/22 passed (1 minor deviation at AC-17)
- **Bugs Found:** 3 total (0 critical, 0 high, 1 medium, 2 low)
- **Security:** Pass -- reine Darstellungsseite, Supabase-Queries sicher, keine Benutzereingaben
- **Production Ready:** YES (mit Empfehlung BUG-2 vor Go-Live zu beheben)
- **Recommendation:** Bild-Optimierung (BUG-2) vor Deployment durchfuehren. BUG-1 und BUG-3 sind kosmetisch/dokumentarisch.
