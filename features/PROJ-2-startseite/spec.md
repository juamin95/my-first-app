# PROJ-2: Startseite

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-2`
> bindet es richtig in die Kette ein.

**Created:** 2026-03-14
**Last Updated:** 2026-11-02

## Abhängigkeiten
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als gewerblicher Kunde möchte ich sofort verstehen, was das Unternehmen macht und warum es vertrauenswürdig ist, damit ich entscheide, ob ich Kontakt aufnehme
- Als Besucher möchte ich in der Hero-Section eine starke visuelle Wirkung und klare Botschaft sehen, damit ich nicht sofort abspringe
- Als Privatkunde möchte ich Kundenbewertungen sehen, damit ich Vertrauen aufbaue
- Als gewerblicher Kunde möchte ich die angebotenen Leistungen auf einen Blick sehen, damit ich weiß ob das Unternehmen das Richtige ist
- Als Besucher möchte ich verstehen, wie eine Zusammenarbeit abläuft (Prozess), damit ich weiß was mich erwartet
- Als Besucher möchte ich einen überzeugenden CTA sehen, damit ich zur Kontaktaufnahme motiviert werde

## Akzeptanzkriterien

### Hero Section
- [x] **AC-1** — Vollbild-Hintergrundbild (Video mit Poster-Fallback + CSS-Fallback `bg-[#1a2e1a]`)
- [x] **AC-2** — Hauptüberschrift (H1): Prägnant, auf gewerbliche + private Zielgruppe ausgerichtet
- [x] **AC-3** — Subtext: 1-2 Sätze USP (10 Jahre Erfahrung, Köln/BGL/LEV)
- [x] **AC-4** — Primär-CTA: "Kontakt aufnehmen" → Kontaktseite (finale Entscheidung, ersetzt "Jetzt Angebot anfragen")
- [x] **AC-5** — Sekundär-CTA: "Direkt anrufen" + Textlink "Unsere Projekte ansehen" → Projektgalerie
- [x] **AC-6** — Hero ist auf Mobile und Desktop visuell ansprechend

### Bewertungs-Section
- [ ] **AC-7** — Zeigt mind. 3 Kundenbewertungen (Name, Bewertungstext, Sternebewertung)
- [ ] **AC-8** — Kennzeichnung der Quelle (z.B. "Google Bewertung")
- [ ] **AC-9** — Durchschnittliche Gesamtbewertung sichtbar (z.B. 4,9 / 5,0)
- [ ] **AC-10** — Bewertungen sind hardcoded (kein dynamisches Laden nötig)
- [ ] **AC-11** — Karussell oder Grid-Layout (abhängig von Device-Breite)

### Leistungs-Übersicht Section
- [x] **AC-12** — Zwei Kategorien: "Gewerbe & Öffentliche Hand" + "Private Gardening" (finale Entscheidung)
- [x] **AC-13** — Je Kategorie: 5 Beispiel-Leistungen als Liste
- [x] **AC-14** — Button "Alle Leistungen ansehen" → `/leistungen`
- [x] **AC-15** — Visuell unterscheidbare Karten mit Bild-Header

### Ablauf-Section
- [x] **AC-16** — 3-Schritt-Prozess: Vor-Ort-Besichtigung → Angebotserstellung → Umsetzung
- [x] **AC-17** — Jeder Schritt: Icon + Titel + Kurzbeschreibung
- [x] **AC-18** — Vertikal animiert (Scroll-triggered) auf allen Breakpoints – bewusste Entscheidung

### Über-uns Preview Section
- [ ] **AC-19** — Kurzer Einblick in das Unternehmen (2-3 Sätze)
- [ ] **AC-20** — Zahl-Highlights: z.B. "10 Jahre Erfahrung", "200+ Projekte", "Junges Team"
- [ ] **AC-21** — Link "Mehr über uns" → Über uns Seite (PROJ-4)
- [ ] **AC-22** — Optional: Foto des Teams oder Inhabers

### Footer-CTA Section
- [ ] **AC-23** — Abschließende starke CTA-Section vor dem Footer
- [ ] **AC-24** — Headline + Subtext + Kontakt-Button
- [ ] **AC-25** — Visuell abgesetzt (Hintergrundfarbe oder -bild)

## Randfälle
- **EC-1** — Was passiert wenn das Hero-Bild nicht lädt? → Hintergrundfarbe als Fallback + Text bleibt lesbar
- **EC-2** — Was passiert auf sehr kleinen Screens (320px)? → Hero-Text und CTAs bleiben lesbar, kein Overflow
- **EC-3** — Was passiert wenn Bewertungstext sehr lang ist? → Text wird auf max. 3 Zeilen gekürzt mit "mehr lesen"
- **EC-4** — Was passiert wenn Nutzer direkt über Google auf die Startseite kommt? → Alle wichtigen Infos above the fold

## Technische Anforderungen
- Alle Inhalte sind zunächst hardcoded (Texte, Bilder, Bewertungen)
- Hero-Bild: next/image für optimierte Bildladung
- Performance: LCP < 2,5s (Hero-Bild als Priority gesetzt)
- Keine externen Abhängigkeiten für Bewertungen (keine API)

---
