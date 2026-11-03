# PROJ-1: Layout & Navigation

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-1`
> bindet es richtig in die Kette ein.

**Created:** 2026-03-14
**Last Updated:** 2026-03-14

## Abhängigkeiten
- None (Grundlage für alle anderen Features)

## User Stories
- Als Besucher möchte ich eine klare Navigation sehen, damit ich schnell zur gewünschten Seite komme
- Als gewerblicher Kunde möchte ich sofort den Firmennamen und das Logo erkennen, damit ich Vertrauen aufbaue
- Als mobiler Nutzer möchte ich ein funktionales Hamburger-Menü nutzen, damit die Navigation auf dem Smartphone einfach ist
- Als Besucher möchte ich im Footer Kontaktdaten und Links finden, damit ich schnell Informationen abrufen kann
- Als Besucher möchte ich immer wissen, auf welcher Seite ich bin (aktiver Nav-Link), damit ich mich orientieren kann

## Akzeptanzkriterien
- [ ] **AC-1** — Header zeigt Logo (links) + Navigationslinks (rechts): Startseite, Leistungen, Projekte, Über uns, Kontakt
- [ ] **AC-2** — Header ist sticky (bleibt beim Scrollen oben sichtbar)
- [ ] **AC-3** — Auf Mobile (< 768px) erscheint ein Hamburger-Menü, das sich ein- und ausklappen lässt
- [ ] **AC-4** — Aktiver Navigationspunkt ist visuell hervorgehoben
- [ ] **AC-5** — Footer enthält: Firmenname, Telefonnummer, E-Mail, Adresse, Links zu allen Unterseiten, Copyright
- [ ] **AC-6** — "Kontakt aufnehmen" CTA-Button im Header ist auf allen Seiten sichtbar (Primärfarbe)
- [ ] **AC-7** — Layout ist responsiv für Mobile (375px), Tablet (768px) und Desktop (1280px+)
- [ ] **AC-8** — Alle Seiten teilen denselben Header und Footer (Shared Layout)
- [ ] **AC-9** — Seitenwechsel ohne Neuladen (Next.js Client Navigation)
- [ ] **AC-10** — Ladezeit Header < 100ms (kein CLS durch Layout-Shift)

## Randfälle
- **EC-1** — Was passiert wenn das Logo-Bild nicht lädt? → Firmenname als Text-Fallback
- **EC-2** — Was passiert bei sehr langen Firmennamen in der Navigation? → Responsiver Umbruch
- **EC-3** — Was passiert bei 5+ Navigationsitems auf kleinen Tablets? → Hamburger-Menü ab 768px
- **EC-4** — Was passiert wenn ein Nutzer direkt auf eine Unterseite navigiert? → Active State korrekt gesetzt via URL-Matching

## Technische Anforderungen
- Framework: Next.js 16 App Router (Shared Layout via `app/layout.tsx`)
- Styling: Tailwind CSS + shadcn/ui NavigationMenu-Komponente
- Mobile Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Performance: Keine Layout-Shifts (CLS = 0)
- Browser Support: Chrome, Firefox, Safari, Edge (aktuelle Versionen)

---
