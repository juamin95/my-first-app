# PROJ-6: Projektgalerie (Portfolio – Public View)

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-6`
> bindet es richtig in die Kette ein.

**Created:** 2026-03-14
**Last Updated:** 2026-03-20

## Abhängigkeiten
- Requires: PROJ-1 (Layout & Navigation)
- Requires: PROJ-7 (CMS Admin) für die Datenbefüllung (Admin muss zuerst Projekte eintragen)

## User Stories
- Als gewerblicher Kunde möchte ich realisierte Projekte mit Fotos sehen, damit ich die Qualität und den Stil des Unternehmens beurteilen kann
- Als Hausverwaltung möchte ich gezielt nach gewerblichen Projekten filtern können, damit ich relevante Referenzen sehe
- Als Privatkunde möchte ich Garten-Neugestaltungen sehen, damit ich mir vorstellen kann was für mich möglich ist
- Als Besucher möchte ich ein einzelnes Projekt mit mehr Details aufrufen können, damit ich mehr Informationen erhalte
- Als Inhaber möchte ich durch die Projektgalerie gezielt auf größere und gewerbliche Projekte aufmerksam machen, damit ich die Zielgruppe steuere

## Akzeptanzkriterien

### Übersichtsseite `/projekte`
- [x] **AC-1** — Raster-Layout (Grid) mit Projektkarten (Bild, Titel, Kategorie, Ort)
- [x] **AC-2** — Filter-Tabs: "Alle", "Gewerbe", "Privat", "Öffentlich" (nach Kundenfeedback 2026-03-21 angepasst)
- [ ] **AC-3** — Projekte werden aus Supabase-Datenbank geladen (Server Component) -- currently static data, Supabase pending PROJ-7
- [x] **AC-4** — Loading Skeleton während Daten laden
- [x] **AC-5** — Leerer Zustand: "Noch keine Projekte vorhanden" (für initiale Einrichtung)
- [x] **AC-6** — Klick auf Projektkarte → Detailseite `/projekte/[slug]`
- [x] **AC-7** — Sortierung: Neueste Projekte zuerst

### Detailseite `/projekte/[slug]`
- [x] **AC-8** — Projekt-Titel als H1
- [x] **AC-9** — Bildergalerie (mind. 1 Bild, bis zu 10 Bilder) mit Lightbox/Vollbild-Ansicht
- [x] **AC-10** — Projektbeschreibung (Fließtext)
- [x] **AC-11** — Meta-Infos: Kategorie, Ort, Projektumfang (optional), Jahr
- [x] **AC-12** — CTA am Ende: "Ähnliches Projekt gewünscht? Jetzt anfragen" → /kontakt
- [x] **AC-13** — Zurück-Link → /projekte

### Projektkarte (Komponente)
- [x] **AC-14** — Vorschaubild (next/image, optimiert)
- [x] **AC-15** — Titel + Kategorie-Badge + Ort
- [x] **AC-16** — Hover-Effekt (z.B. leichter Zoom oder Overlay)

## Randfälle
- **EC-1** — Was passiert wenn keine Projekte in der DB sind? → Leerer-Zustand mit Hinweis "Projekte werden bald hinzugefügt"
- **EC-2** — Was passiert wenn ein Bild nicht lädt? → Fallback-Placeholder-Bild
- **EC-3** — Was passiert wenn ein Slug nicht existiert? → Next.js 404 Seite
- **EC-4** — Was passiert mit sehr langen Projekttiteln? → Einheitliche Kartenhöhe, Text abgeschnitten (line-clamp)
- **EC-5** — Was passiert bei vielen Projekten (50+)? → Pagination oder Infinite Scroll
- **EC-6** — Was passiert wenn der Filter keine Ergebnisse liefert? → "Keine Projekte in dieser Kategorie"

## Technische Anforderungen
- Daten: Supabase Tabelle `projects` (id, slug, title, description, category, location, year, cover_image_url, images[], published)
- Images: Supabase Storage für Projektbilder
- Rendering: Server Component für initiales Laden (SEO), Client-Filter via State
- SEO: Dynamische Meta-Tags für jede Detailseite (`generateMetadata`)
- Performance: Bilder lazy-loaded, cover_image als priority nur above-the-fold

---
