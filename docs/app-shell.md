# App-Rahmen & Navigation

> Die app-weite Übersicht über **den Rahmen, in dem jedes Feature angezeigt wird** — Navigation, Layout-Bereiche und die Muster, die jede Seite wiederholt.
>
> - Angelegt von `/init` (erster Gesamtüberblick), hier aus `docs/codebase/architecture.md` → Shared shell (Stand Commit `3dbba84`, 2026-11-03).
> - Verfeinert von `/architecture`, sobald ein Feature entworfen wird.
> - **Flughöhe:** Struktur, nicht Gestaltung. Farben, Schriften und Komponenten-Styling stehen in `docs/design-system.md`; die Innenseite einer einzelnen Seite im `design.md` ihres Features.

## Zuständiges Feature

Owner: PROJ-1 Layout & Navigation — Änderungen am Rahmen laufen über `/refine PROJ-1`.

## Hauptbereiche

| Bereich | Was der Besucher dort tut | Sichtbar für | Zuständiges Feature |
|---------|---------------------------|--------------|---------------------|
| Startseite (`/`, Logo bzw. „Startseite“ mobil) | Überblick über den Betrieb | alle | PROJ-2 |
| Leistungen → Gewerbe & Öffentlich (`/leistungen/gewerbe`) | Leistungen für gewerbliche und öffentliche Kunden ansehen | alle | PROJ-3a |
| Leistungen → Private Gardening (`/leistungen/privat`) | Leistungen für Privatkunden ansehen | alle | PROJ-3b |
| Projekte (`/projekte`) | Referenzprojekte ansehen und filtern | alle | PROJ-6 |
| Über uns (`/ueber-uns`) | Den Betrieb kennenlernen | alle | PROJ-4 |
| Kontakt (`/kontakt`, zusätzlich CTA „Kontakt aufnehmen“) | Eine Anfrage stellen | alle | PROJ-5 |
| Impressum, Datenschutz (nur im Footer) | Rechtliche Angaben lesen | alle | PROJ-1 |

Quelle: `src/components/layout/header.tsx:20-29`, `:147`, `:183-248`; `src/components/layout/footer.tsx:10-15`.

## Layout-Bereiche

- **Header:** Logo, Dropdown „Leistungen“, Projekte, Über uns, Kontakt, CTA-Button (`src/components/layout/header.tsx`).
- **Inhalt:** `<main className="flex-1">` im Root-Layout (`src/app/layout.tsx`).
- **Footer:** Navigation, Telefon, E-Mail, Adresse, Impressum, Datenschutz, Facebook, Instagram (`src/components/layout/footer.tsx`).
- **Schwebend:** WhatsApp-Widget auf jeder Seite (`src/components/whatsapp-button.tsx`).
- **Mobil:** Vollbild-Overlay-Menü mit denselben Einträgen, CTA und Telefonlink (`src/components/layout/header.tsx:183-248`).

## Seitenmuster

_Nicht aus der Map ableitbar — offen. Bekannt ist nur: Es gibt keine `loading.tsx`, `error.tsx` oder `not-found.tsx` unter `src/app/` (`docs/codebase/conventions.md`)._

## Anmeldestatus

- **Nicht angemeldet:** Alle Bereiche sind öffentlich erreichbar. Die Seite hat keine Anmeldung.
- **Angemeldet / Rollen:** gibt es nicht. Die Pflege der Projekte (PROJ-7) läuft im Supabase-Dashboard, außerhalb der Webseite.

## Rahmen-Komponenten

| Komponente | Datei | Zweck |
|------------|-------|-------|
| Root-Layout | `src/app/layout.tsx` | Header, Inhalt, Footer, WhatsApp-Widget, Speed Insights; `lang="de"` |
| Header | `src/components/layout/header.tsx` | Hauptnavigation, mobiles Menü, Aktiv-Markierung per `usePathname()` |
| Footer | `src/components/layout/footer.tsx` | Footer-Navigation mit `aria-current`, Kontaktdaten, Rechtliches |
| WhatsAppButton | `src/components/whatsapp-button.tsx` | Schwebender Chat-Einstieg |

---

_Lebendes Dokument. Verhaltensänderungen am Rahmen laufen über `/refine PROJ-1` — nie direkt im `design.md` eines anderen Features._
