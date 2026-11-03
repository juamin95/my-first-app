# Feature Map

_Mapped by `/map` on 2026-11-03 at commit `3dbba84`. Vorschlag aus `docs/codebase/architecture.md`; bestätigt wird er in `/init`._

## Vorgeschlagene Features

| # | Name | Was es tut | Evidenz | Layer | ~ACs | Reihenfolge – Grund |
|---|---|---|---|---|---|---|
| 1 | Anfrage stellen | Besucher füllen auf `/kontakt` den dreistufigen Assistenten aus (Kundentyp, Leistungsart, Kontaktdaten, Nachricht, optional Bilder) und schicken ihn ab. | `/kontakt` (`src/app/kontakt/page.tsx`), `src/components/contact-form.tsx`, `src/lib/contact-schema.ts`, Client-Upload in Bucket `lead-attachments` (`contact-form.tsx:103`) | app | 10 | 1 – der Geschäftszweck der Seite (Leads), einziger Weg, über den Nutzer Daten anlegen |
| 2 | Anfrage annehmen und schützen | Der Server prüft die Anfrage (Honeypot, Zod, Rate-Limit 3/10 min pro IP), bereinigt sie und speichert sie in `leads`. | `POST /api/contact` (`src/app/api/contact/route.ts`), Tabelle `leads`, `src/lib/supabase-server.ts` | app | 8 | 2 – hängt direkt an 1; enthält die Schutzregeln, die heute ungetestet sind |
| 3 | Seitenrahmen und Navigation | Header mit Leistungen-Dropdown, mobiles Menü, Footer, Weiterleitungen, Impressum und Datenschutz – der Rahmen jeder Seite. | `src/app/layout.tsx`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `/leistungen` und `/leistungen/oeffentlich` (Redirects), Redirects in `next.config.ts`, `/impressum`, `/datenschutz` | app | 10 | 3 – jede andere Seite hängt daran |
| 4 | Projektgalerie | Besucher sehen veröffentlichte Projekte, filtern nach Kundentyp und öffnen die Detailseite. | `/projekte`, `/projekte/[slug]`, Tabelle `projekte`, `getProjekte`, `getProjektBySlug`, `getAllSlugs` (`src/lib/projekte-service.ts`), Typen/`filterTabs` aus `src/lib/projekte-data.ts` | app | 8 | 4 – besitzt `projekte`; Startseite, beide Leistungsseiten und die Sitemap lesen daraus |
| 5 | Projekte pflegen | Der Betreiber legt Projekte im Supabase-Dashboard an und lädt Bilder hoch; ein Einmal-Skript hat Bilder für ein Projekt hochgeladen. | `scripts/upload-projekt-bilder.mjs`, Bucket `projekt-bilder`, Funktion `upload()`; Dashboard außerhalb des Repos (`features/PROJ-7-cms-admin/design.md`) | Skript / extern | 3 | 5 – liefert die Daten für 4; im Repo kaum Code |
| 6 | Startseite | Hero mit Video, Leistungen, Ablauf, Über-uns-Collage, Zähler, Bewertungen, Projekt-Vorschau und CTA. | `/` (`src/app/page.tsx`), `src/components/hero-scroll.tsx`, `LocalBusinessSchema` | app | 10 | 6 – Einstiegsseite, nutzt 3 und 4 |
| 7 | Leistungen Gewerbe & Öffentlich | Leistungsseite für Hausverwaltungen, Baufirmen und öffentliche Hand mit Pflege-Abo, Rezensionen und 3 passenden Projekten. | `/leistungen/gewerbe`, `getProjekteByKundentypen` | app | 8 | 7 – Hauptzielgruppe laut PRD |
| 8 | Leistungen Privat | Leistungsseite „Private Gardening“ mit Rezensionen und 3 privaten Projekten. | `/leistungen/privat`, `getProjekteByKundentyp` | app | 7 | 8 – Nebenzielgruppe |
| 9 | Über uns | Seite über den Betrieb mit Collage, Zählern, Bewertungen und CTA (statisch). | `/ueber-uns` (`src/app/ueber-uns/page.tsx`) | app | 5 | 9 – statisch, keine Abhängigkeiten außer 3 |
| 10 | Auffindbarkeit (SEO) | Suchmaschinen bekommen `robots.txt`, eine Sitemap mit allen veröffentlichten Projekten, strukturierte Daten und `llms.txt`. | `/robots.txt` (`src/app/robots.ts`), `/sitemap.xml` (`src/app/sitemap.ts`), `src/components/structured-data.tsx`, `public/llms.txt`, `public/llms-full.txt` | app | 6 | 10 – querschnittlich, liest nur |
| 11 | WhatsApp-Chat | Schwebender Button auf jeder Seite öffnet ein Chatfenster und verlinkt auf WhatsApp. | `src/components/whatsapp-button.tsx` (im Root-Layout) | app | 5 | 11 – Randfunktion ohne Daten |

1 und 2 sind getrennt, weil das Kontaktthema zusammen über 12 AC-Kandidaten hätte (heute 24 ACs in `features/PROJ-5-kontaktformular/spec.md`). Die Grenze verläuft zwischen dem, was der Besucher im Browser tut, und dem, was der Server prüft.

## Unassigned

- Statisches Array `projekte` in `src/lib/projekte-data.ts` (7 Einträge, `@deprecated`): wird nicht mehr importiert und gehört zu keinem Feature. Die übrigen Exporte der Datei (Typen, `filterTabs`, `kundentypStyles`) gehören zu 4.

**Coverage:** 16 of 16 routes/screens/tools assigned, 4 of 5 data entities assigned (2 von 2 Tabellen, 2 von 2 Buckets, statischer Datensatz unassigned), 8 of 8 server functions assigned.

## Abgleich mit `features/INDEX.md`

| Vorschlag | INDEX-Eintrag | Befund |
|---|---|---|
| 1 Anfrage stellen + 2 Anfrage annehmen | PROJ-5 | Im Code vorhanden. Teilung in zwei Features ist ein Vorschlag, `/init` entscheidet. |
| 3 Seitenrahmen und Navigation | PROJ-1 | Vorhanden. Impressum und Datenschutz haben keinen eigenen INDEX-Eintrag, laufen in der QA-Historie aber unter PROJ-1. |
| 4 Projektgalerie | PROJ-6 | Vorhanden. |
| 5 Projekte pflegen | PROJ-7 | Kein Admin-Interface im Code. Vorhanden sind nur das Skript und die Leseschicht; gepflegt wird im Supabase-Dashboard. |
| 6 Startseite | PROJ-2 | Vorhanden. |
| 7 Leistungen Gewerbe | PROJ-3a | Vorhanden. |
| 8 Leistungen Privat | PROJ-3b | Vorhanden. |
| 9 Über uns | PROJ-4 | Vorhanden. |
| 10 Auffindbarkeit (SEO) | – | **Im Code, ohne INDEX-Eintrag.** |
| 11 WhatsApp-Chat | PROJ-8 | Vorhanden. |
| – | PROJ-0 Styleguide | Kein Nutzer-Feature, keine Route. Im Code existiert es als Tokens (`src/app/globals.css`, `tailwind.config.ts`) und Bausteine in `src/components/ui/`. |
