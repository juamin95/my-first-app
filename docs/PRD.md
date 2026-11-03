# Product Requirements Document

## Vision
Eine professionelle Unternehmenswebseite für einen Garten-Landschaftsbaubetrieb, die gezielt qualifizierte Leads generiert – mit Fokus auf größere Projekte und gewerbliche Kunden wie Hausverwaltungen und Baufirmen. Die Webseite positioniert das Unternehmen als erfahrenen, modernen und zuverlässigen Partner im Garten- und Landschaftsbau.

## Target Users

### Primär: Gewerbliche Kunden
- **Hausverwaltungen / Firmen mit Außenbereich:** Suchen zuverlässige Dauerpflegepartner für Außenanlagen mehrerer Liegenschaften
- **Baufirmen / Projektentwickler:** Beauftragen Landschaftsbau-Gewerke im Rahmen von Bauprojekten
- **Schmerz:** Schlechte Erfahrungen mit unzuverlässigen Dienstleistern; brauchen Seriosität und Referenzen

### Sekundär: Privatkunden (größere Projekte)
- Eigenheimbesitzer mit Gartenneugestaltung, Poolbau, Natursteinarbeiten
- Budgetrahmen > 5.000 € (keine Kleinstaufträge)
- **Schmerz:** Suchen handwerklich starken Betrieb mit Erfahrung und seriösem Auftreten

## Core Features (Roadmap)

Die Feature-Liste mit Status und Reihenfolge steht ausschließlich in `features/INDEX.md`.

## Success Metrics
- Anzahl qualifizierter Leads über das Kontaktformular (Ziel: Projektgröße > 5.000 €)
- Anzahl Anrufe (messbar über Call-Tracking oder Google Analytics)
- Anteil gewerblicher Anfragen steigt auf > 30 % aller Leads
- Google PageSpeed Score ≥ 90 (Mobile & Desktop)
- Conversion Rate Kontaktformular ≥ 3 %

## Constraints
- Kein dediziertes Dev-Team; Änderungen sollen einfach über ein Admin-Interface möglich sein
- Bestehendes Logo vorhanden, kein definiertes Corporate Design (Farben werden neu entwickelt: Hell & Modern)
- Farbschema: Weiß/Hellgrau als Basis + frisches Grün + Akzentfarben
- Budget: Bootstrapped (Vercel Free Tier + Supabase Free Tier für Start)
- Deployment: Vercel, Domain bereits vorhanden (bestehende Website)
- Hosting: Vercel mit Auto-Deploy von `main` auf https://www.gruenschnitt-amini.de; einzige Freigabe ist der Merge nach `main` durch den Betreiber. Keine CI.
- Data region: eu-west-1 (Irland) für Supabase; Region der Vercel-Funktionen offen, Klärung bei `/dsgvo`.
- Environment strategy: single — eine gehostete Supabase-Instanz (`bnzpdujupmmrwcbunbql`) ist zugleich Entwicklung und Produktion. ⚠️ Jede Entwicklungsarbeit an der Datenbank trifft die Live-Daten (echte Leads). Ein Wechsel auf `local` oder `two-projects` ist eine spätere Entscheidung und setzt voraus, dass das Schema zuerst ins Repo kommt. Siehe `docs/decisions.md` → ADR-001.
- Data protection law: GDPR (EU/DE)
- Design system: see docs/design-system.md
- Externe Abhängigkeit: Ein n8n-Flow außerhalb dieses Repos verschickt neue Anfragen aus der Tabelle `leads` per Mail an den Betreiber. Wie n8n an die Daten kommt, ist im Repo nicht dokumentiert; Änderungen an `leads` (Spalten, Constraints, Policies) können den Flow brechen.

## Betriebsannahmen

_Annahmen, keine bestätigten Zusagen. Verantwortlich: der Betreiber. Neu prüfen, wenn sich Traffic, Lead-Volumen oder Tarif ändern._

- **Last:** niedrig — eine Unternehmenswebseite mit wenigen Besuchern gleichzeitig; bis 2026-11-03 sind 21 Leads in `leads` gespeichert (Live-Instanz, gelesen von `/map`). Ein Lastziel ist nicht festgelegt.
- **Anbieter-Limits:** Laut Constraints startete das Projekt auf den Free-Tarifen von Vercel und Supabase; ob das heute noch gilt und welche Limits greifen, ist nicht bestätigt — offen.
- **Datenverlust:** Leads sind die geschäftskritischen Daten. Eine Backup- oder Wiederherstellungsstrategie ist nicht festgelegt — offen.
- **Ausfall:** Ein tolerierbarer Ausfall ist nicht festgelegt — offen. Bei einem Ausfall der Datenbank zeigt die Projektgalerie heute still eine leere Liste (siehe `docs/codebase/concerns.md`).

## Ziele

- Projekte für die Galerie öfter einstellen — das läuft über PROJ-7 (Supabase-Dashboard plus Skript).
- Die Seite später weiter optimieren.
- Aus beiden Zielen wird derzeit kein neues Feature abgeleitet.

## Was bereits existiert

_Aus dem Code gelesen (`docs/codebase/features.md`, Stand Commit `3dbba84`), nicht verifiziert — verifiziert wird über `/qa` bzw. `/reverse-spec`._

- **PROJ-0 Design System & Styleguide** — Tokens in `src/app/globals.css` und `tailwind.config.ts`, Bausteine in `src/components/ui/`.
- **PROJ-1 Layout & Navigation** — `src/app/layout.tsx`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, Redirects in `next.config.ts`, `/impressum`, `/datenschutz`.
- **PROJ-2 Startseite** — `/` (`src/app/page.tsx`, `src/components/hero-scroll.tsx`).
- **PROJ-3a Leistungen Gewerbe & Öffentlich** — `/leistungen/gewerbe`, `getProjekteByKundentypen`.
- **PROJ-3b Leistungen Privat** — `/leistungen/privat`, `getProjekteByKundentyp`.
- **PROJ-4 Über uns** — `/ueber-uns`.
- **PROJ-5 Kontaktformular & Lead-Erfassung** — `/kontakt`, `src/components/contact-form.tsx`, `POST /api/contact`, Tabelle `leads`, Bucket `lead-attachments`.
- **PROJ-6 Projektgalerie** — `/projekte`, `/projekte/[slug]`, Tabelle `projekte`, `src/lib/projekte-service.ts`.
- **PROJ-7 Projekte pflegen** — keine Admin-Oberfläche im Code; Pflege im Supabase-Dashboard plus `scripts/upload-projekt-bilder.mjs`, Bucket `projekt-bilder`.
- **PROJ-8 WhatsApp-Chat** — `src/components/whatsapp-button.tsx`.
- **PROJ-9 Auffindbarkeit (SEO)** — `/robots.txt`, `/sitemap.xml`, `src/components/structured-data.tsx`, `public/llms.txt`, `public/llms-full.txt`.

## Non-Goals
- Kein Online-Shop / E-Commerce
- Keine Kundenbewertungsplattform (Bewertungen werden manuell eingepflegt)
- Kein Buchungssystem / Terminkalender (in dieser Version)
- Kein mehrsprachiger Auftritt (nur Deutsch)
- Keine mobile App
