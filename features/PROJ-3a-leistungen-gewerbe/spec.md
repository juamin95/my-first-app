# PROJ-3a: Leistungsseite – Gewerbe & Öffentliche Hand

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-3a`
> bindet es richtig in die Kette ein.

**Created:** 2026-04-02
**Last Updated:** 2026-04-03

---

## Abhängigkeiten
- `src/app/leistungen/oeffentlich/page.tsx` – Redirect auf diese Seite
- `src/components/leistungen-sticky-scroll.tsx` – Leistungen-Komponente
- `src/components/pflege-abo-section.tsx` – Abo-Pakete
- `src/lib/projekte-service.ts` – `getProjekteByKundentypen()`
- `src/components/ui/review-card.tsx`
- `src/components/cta-section.tsx`

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

## Akzeptanzkriterien

- [x] **AC-1** — Alle 8 Sections vorhanden und in korrekter Reihenfolge
- [x] **AC-2** — Hero: Badge + H1 + Subtitle referenzieren beide Zielgruppen (Gewerbe & Öffentliche Hand)
- [x] **AC-3** — Einstiegs-Section: 2-Spalter + breites Bild, `-mt-20 rounded-t-[2.5rem]`
- [x] **AC-4** — Einstiegs-Section: 3 Sub-Features (Hausverwaltungen, Gewerbeimmobilien, Öffentliche Hand)
- [x] **AC-5** — Einstiegs-Section: Icon-Container `h-12 w-12`, Icons `h-6 w-6 strokeWidth={1.5}` (Style Guide)
- [x] **AC-6** — Leistungen: `LeistungenStickyScroll` mit 2 Karten × 6 Leistungen
- [x] **AC-7** — Leistungen: Corner-Overlays auf Mobile und Desktop korrekt (weiße Ecken)
- [x] **AC-8** — Leistungen: Icon-Container `h-12 w-12`, Icons `h-6 w-6 strokeWidth={1.5}` (Style Guide)
- [x] **AC-9** — PflegeAbo: kein Winterdienst, sinnvolle Staffelung Basis/Komfort/Premium
- [x] **AC-10** — PflegeAbo: Mobile horizontal scrollbar mit korrektem linken Rand
- [x] **AC-11** — PflegeAbo: nicht-highlighted Karten = Glass Card Pattern (`border-primary/10 bg-white/60 backdrop-blur-sm`)
- [x] **AC-12** — PflegeAbo: Vorteile-Karten = Glass Card Pattern (`rounded-2xl border-primary/10 bg-white/60 shadow-sm backdrop-blur-sm`)
- [x] **AC-13** — Referenzprojekte: filtert Gewerbe + Öffentlich, leerer Zustand vorhanden
- [x] **AC-14** — Referenzprojekte: kein doppelter FadeIn um SectionHeader
- [x] **AC-15** — Rezensionen: nur Gewerblich-Tags, horizontaler Scroll mit korrektem linken Rand
- [x] **AC-16** — Rezensionen-SectionWrapper: kein `overflow-hidden` (bewusste Ausnahme lt. Style Guide)
- [x] **AC-17** — Verlässlichkeit: 4 Trust-Punkte, Foto `object-center`, Icon-Container `h-12 w-12 strokeWidth={1.5}`, Glass Card Pattern (`bg-white/60 backdrop-blur-sm`)
- [x] **AC-18** — `/leistungen/oeffentlich` redirectet zu `/leistungen/gewerbe`
- [x] **AC-19** — Navigation zeigt 2 Leistungs-Links: "Gewerbe & Öffentlich" + "Private Gardening"
- [x] **AC-20** — Keine Cross-Links zu anderen Leistungsseiten
- [x] **AC-21** — SEO: `metadata` mit Titel + Description
- [x] **AC-22** — Build ohne TypeScript-Fehler

---
