# PROJ-4: Über uns Seite

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-4`
> bindet es richtig in die Kette ein.

**Created:** 2026-03-14
**Last Updated:** 2026-03-20

## Abhängigkeiten
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als gewerblicher Kunde möchte ich das Unternehmen und sein Team kennenlernen, damit ich Vertrauen aufbaue bevor ich eine Anfrage stelle
- Als Hausverwaltung möchte ich wissen wie lange das Unternehmen schon besteht, damit ich Zuverlässigkeit und Erfahrung einschätzen kann
- Als Besucher möchte ich die Werte und Arbeitsphilosophie des Unternehmens verstehen, damit ich weiß ob es zu mir passt
- Als potenzieller Mitarbeiter möchte ich das Team und die Unternehmenskultur kennenlernen (sekundär)
- Als Besucher möchte ich nach der Über-uns-Seite direkt Kontakt aufnehmen können, damit der Weg zur Anfrage kurz ist

## Akzeptanzkriterien

### Seitenstruktur
- [ ] **AC-1** — Seite erreichbar unter `/ueber-uns`
- [ ] **AC-2** — Seiten-Hero mit Titel "Über uns" + prägnante Unterzeile (z.B. "10 Jahre Leidenschaft für grüne Lebensräume")

### Unternehmensgeschichte / Story Section
- [ ] **AC-3** — Fließtext: Wer sind wir, wie hat alles angefangen, was treibt uns an
- [ ] **AC-4** — Betonung: 10 Jahre Erfahrung, junges dynamisches Team, Qualitätsanspruch
- [ ] **AC-5** — Optionales Bild: Baustellen-/Team-Foto

### Kennzahlen-Section (Social Proof)
- [ ] **AC-6** — 3-4 Highlight-Zahlen mit Icon: z.B. "10+ Jahre", "200+ Projekte", "XX Mitarbeiter", "4,9★ Bewertung"
- [ ] **AC-7** — Visuell prominent (große Zahlen, Akzentfarbe)

### Team Section
- [ ] **AC-8** — Optionale Team-Karten: Name, Position, Foto (wenn Fotos vorhanden)
- [ ] **AC-9** — Alternativ: Kurzer Text über das Team ohne individuelle Fotos

### Werte/Philosophie Section
- [ ] **AC-10** — 3 Kernwerte als Karten/Icons: z.B. Qualität, Zuverlässigkeit, Nachhaltigkeit
- [ ] **AC-11** — Je Wert: Icon + Titel + 2-3 Sätze Erklärung

### CTA-Section
- [ ] **AC-12** — Am Ende: "Überzeugt? Sprechen Sie uns an."
- [ ] **AC-13** — Button "Kontakt aufnehmen" → /kontakt

## Randfälle
- **EC-1** — Was passiert wenn kein Teamfoto vorhanden? → Placeholder-Illustration oder Icon als Fallback
- **EC-2** — Was passiert wenn die Geschichte sehr lang ist? → Lesbarer Fließtext mit Absätzen, max. 300 Wörter
- **EC-3** — Was passiert wenn der Nutzer direkt auf /ueber-uns navigiert? → Vollständig funktionale Seite ohne Startseiten-Abhängigkeit

## Technische Anforderungen
- Alle Inhalte hardcoded
- Team-Fotos: next/image mit Fallback
- SEO: Page Title + Meta-Description für /ueber-uns
- Keine Datenbankanbindung

---
