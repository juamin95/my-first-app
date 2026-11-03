# Architecture

_Mapped by `/map` on 2026-11-03 at commit `3dbba84`. Quelle = Dateien im Repo; Angaben aus der Live-Datenbank sind ausdrücklich als „Live-DB (gelesen 2026-11-03)“ markiert._

## Layers and entry points

### App (einzige Laufzeit)
- Next.js App Router, alles unter `src/app/`. Root-Layout: `src/app/layout.tsx` (rendert `Header`, `<main>`, `Footer`, `WhatsAppButton`, `SpeedInsights`; `lang="de"`, `metadataBase` = `https://www.gruenschnitt-amini.de`).
- **Server:** Seiten sind Server Components; datenladende Seiten nutzen ISR mit `export const revalidate = 60` (`src/app/page.tsx:30`, `src/app/projekte/page.tsx:11`, `src/app/projekte/[slug]/page.tsx:12`, `src/app/leistungen/gewerbe/page.tsx:45`, `src/app/leistungen/privat/page.tsx:45`).
- **Einziger schreibender Server-Einstieg:** `src/app/api/contact/route.ts` (`POST`).
- **Client → Supabase direkt:** `src/components/contact-form.tsx:103` lädt Bilder mit dem Anon-Client (`src/lib/supabase.ts`) in den Storage-Bucket `lead-attachments` hoch.
- **Supabase-Clients:** `src/lib/supabase.ts` (Browser, Anon-Key, Variablen `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) und `src/lib/supabase-server.ts` (Service-Role, Variable `SUPABASE_SERVICE_ROLE_KEY`, umgeht RLS). Alle Lesezugriffe auf `projekte` und der Lead-Insert laufen über den Service-Role-Client.
- **Kein `middleware.ts` / `proxy.ts`** im Projekt (gesucht im Root und in `src/`).
- Querschnitt in `next.config.ts`: Security-Header inkl. CSP für alle Pfade, `images.remotePatterns` auf den Supabase-Host, Redirects (non-www → www; Webflow-Altpfade `/galerie`, `/referenzen`, `/portfolio` → `/projekte`; `/team`, `/ueber-uns-0`, `/ueber-uns-1` → `/ueber-uns`; `/leistungen` → `/leistungen/gewerbe`; `/contact`, `/anfrage` → `/kontakt`; `/blog`, `/news` → `/`).

### Skript außerhalb der App
- `scripts/upload-projekt-bilder.mjs` — einmaliges Node-Skript (manuell: `node --env-file=.env.local scripts/upload-projekt-bilder.mjs`, laut Kommentar im Skript). Lädt drei fest codierte Bilder aus `public/images/projekte/` in den Bucket `projekt-bilder` und setzt `projekte.cover_url` / `projekte.bilder` für den Slug `terrasse-bankirai-koeln-2026`. Nutzt den Service-Role-Key (Variablenname im Skript irreführend `SUPABASE_ANON_KEY`, Zeile 11). Kein npm-Script, kein Zeitplan.

## Routes, screens, or tools

| Route / screen / tool / job | Layer | File | What it does | Nav entry? |
|---|---|---|---|---|
| `/` | app | `src/app/page.tsx` | Startseite: Hero-Scroll, Leistungen, Ablauf, Über-uns-Collage, Zähler, Bewertungen, Projekte-Vorschau (`getProjekte()`), CTA, `LocalBusinessSchema` | ja (Logo/„Startseite“ mobil, Footer) |
| `/leistungen` | app | `src/app/leistungen/page.tsx` | `redirect("/leistungen/gewerbe")` (zusätzlich permanenter Redirect in `next.config.ts`) | nein |
| `/leistungen/gewerbe` | app | `src/app/leistungen/gewerbe/page.tsx` | Leistungen Gewerbe & Öffentlich; 3 Projekte via `getProjekteByKundentypen(["Gewerbe","Öffentlich"],3)`; Pflege-Abo, Rezensionen, Service-/Breadcrumb-Schema | ja (Dropdown „Gewerbe & Öffentlich“) |
| `/leistungen/privat` | app | `src/app/leistungen/privat/page.tsx` | Private Gardening; 3 Projekte via `getProjekteByKundentyp("Privat",3)`; Rezensionen, Schema | ja (Dropdown „Private Gardening“) |
| `/leistungen/oeffentlich` | app | `src/app/leistungen/oeffentlich/page.tsx` | `redirect("/leistungen/gewerbe")`; trotzdem als eigene URL in `src/app/sitemap.ts:35` gelistet | nein |
| `/projekte` | app | `src/app/projekte/page.tsx` | Projektgalerie mit Filter (Alle/Gewerbe/Privat/Öffentlich), Daten aus `getProjekte()` | ja |
| `/projekte/[slug]` | app | `src/app/projekte/[slug]/page.tsx` | Projektdetail; `generateStaticParams` via `getAllSlugs()`, `notFound()` bei unbekanntem/unveröffentlichtem Slug, Bildergalerie | nein (über Karten) |
| `/ueber-uns` | app | `src/app/ueber-uns/page.tsx` | Über uns: Collage, Zähler, Bewertungen, CTA (statischer Inhalt) | ja |
| `/kontakt` | app | `src/app/kontakt/page.tsx` | Kontaktseite mit mehrstufigem `ContactForm` und Kontakt-Sidebar | ja (+ CTA-Button „Kontakt aufnehmen“) |
| `/impressum` | app | `src/app/impressum/page.tsx` | Impressum (statisch) | Footer |
| `/datenschutz` | app | `src/app/datenschutz/page.tsx` | Datenschutzerklärung (statisch) | Footer |
| `/robots.txt` | app | `src/app/robots.ts` | Erlaubt alles, verweist auf Sitemap | nein |
| `/sitemap.xml` | app | `src/app/sitemap.ts` | Statische Seiten + alle veröffentlichten Projekt-Slugs (`getProjekte()`) | nein |
| `POST /api/contact` | app | `src/app/api/contact/route.ts` | Honeypot → Zod-Validierung → Rate-Limit → Insert in `leads` | nein |
| `scripts/upload-projekt-bilder.mjs` | Skript | `scripts/upload-projekt-bilder.mjs` | Einmal-Upload Projektbilder → Bucket `projekt-bilder`, Update `projekte` | nein |
| WhatsApp-Widget (global) | app | `src/components/whatsapp-button.tsx` | Schwebender Button + Chatfenster, Link auf `wa.me/…` | auf jeder Seite (Root-Layout) |

Statische Textdateien: `public/llms.txt`, `public/llms-full.txt` (direkt ausgeliefert, keine Route-Datei).

**Kein Admin-/CMS-Bereich im Code:** keine Route unter `src/app/admin` o. Ä., keine Login-Seite, keine Server Action. Gesucht: Dateiliste `src/app/**`, `grep -rni "admin|cms" src` (keine Treffer). PROJ-7 ist laut `features/PROJ-7-cms-admin/design.md` als „Supabase als CMS“ umgesetzt: Projekte werden im Supabase-Dashboard (Table Editor → `projekte`, Storage → `projekt-bilder`) gepflegt; im Code existiert davon nur die Leseschicht `src/lib/projekte-service.ts` und das Skript `scripts/upload-projekt-bilder.mjs`.

## Data: schema source and entities
**Schema lives in:** hosted only — kein Schema-File im Repo (kein `supabase/`-Ordner, keine `.sql`-Datei, kein ORM-Schema; `docs/data-model.md` ist noch die leere Vorlage). Live-DB (gelesen 2026-11-03, Projekt-Ref aus `next.config.ts`): 14 Migrationen sind nur in der Datenbank registriert (`list_migrations`), u. a. `create_leads_table`, `add_projektumfang_to_leads`, `add_ip_address_to_leads`, `create_projekte_and_bewertungen`, `storage_bucket_public_read_policy`, `add_processed_to_leads`, `remove_cockpit_magic_link_legacy`, `tighten_public_policies_remove_auth_legacy`, `clean_storage_policies_keep_upload_columns`, `tighten_anon_lead_insert_policy`, `create_marvin_loop_history_infrastructure`, `harden_loop_history_security_and_indexes`, `create_loop_event_outbox_trigger`, `drop_archived_loop_history_keep_website_tables`. Keine davon liegt als Datei im Repo.

Abgleich: Der Code greift auf 2 Tabellen und 2 Buckets zu; die Live-DB hat im Schema `public` genau 2 Tabellen (`leads`, `projekte`) — Übereinstimmung.

| Table / entity | Defined in | Owned by (route group / module) | Notes (relations, RLS/policies present?) |
|---|---|---|---|
| `leads` | nur Live-DB (Migration `create_leads_table` + Folge-Migrationen) | `/api/contact`, `src/components/contact-form.tsx` | Code schreibt: `vorname, nachname, email, telefon, kundentyp, leistungsart, adresse, nachricht, bilder_urls, ip_address` (`src/app/api/contact/route.ts:60-71`); liest `count` nach `ip_address`/`created_at` (Zeile 46-51). Live-DB: weitere Spalten `id, created_at, status` (CHECK `neu/kontaktiert/angebot/abgeschlossen/abgelehnt`, Default `neu`), `projektumfang` (nullable, vom Code **nicht** geschrieben), `processed` (Default false). CHECK `kundentyp IN ('privat','gewerblich')` — Zod erlaubt zusätzlich `oeffentlich` (`src/lib/contact-schema.ts:17`). RLS an; Policy `Anon submit valid lead` (INSERT, anon). 21 Zeilen. Keine Relation. Nur Index auf `id`. |
| `projekte` | nur Live-DB (Migration `create_projekte_and_bewertungen`) | `/projekte`, `/projekte/[slug]`, `/`, `/leistungen/*`, `/sitemap.xml`, Skript | Gelesen: `slug, titel, subtext, kundentyp, ort, jahr, beschreibung (jsonb), leistungen (jsonb), cover_url, bilder (jsonb), published, created_at` (`src/lib/projekte-service.ts:4-17`). Live-DB zusätzlich `id`, `kategorie` (im Code ungenutzt). `slug` unique. RLS an; Policy `Anon read published projects` (SELECT, anon, `published = true`). 3 Zeilen. |
| Storage-Bucket `lead-attachments` | nur Live-DB | `src/components/contact-form.tsx:103-105` | Live-DB: privat, 10 MB Limit, MIME jpeg/png/webp/gif; Policy `Anon upload lead attachments` (INSERT auf `storage.objects`, anon, Endung jpg/jpeg/png/webp/gif). Pfade landen in `leads.bilder_urls`. |
| Storage-Bucket `projekt-bilder` | nur Live-DB | `scripts/upload-projekt-bilder.mjs`, Anzeige über `next/image` | Live-DB: öffentlich, 10 MB, MIME jpeg/png/webp/gif. Keine Policy auf `storage.objects` für diesen Bucket gefunden (öffentliche Buckets sind ohne SELECT-Policy per URL lesbar). |
| Statische Projektdaten (deprecated) | `src/lib/projekte-data.ts` (7 Einträge, `@deprecated`) | — | Array `projekte` laut Kommentar abgelöst; aus der Datei werden nur noch Typen, `filterTabs`, `filterProjekte`, `kundentypStyles` importiert. |

Live-DB, weitere Befunde: keine Trigger im Schema `public`, keine Funktionen im Schema `public`, keine Edge Functions (`list_edge_functions` leer). Die Tabelle `bewertungen` aus dem Migrationsnamen existiert nicht mehr; Bewertungen sind im Code fest hinterlegt (Komponenten `src/components/bewertungen-scroll.tsx`, `gewerbe-rezensionen-scroll.tsx`, `privat-rezensionen-scroll.tsx`).

## Server functions and endpoints

| Function / endpoint | File | Called from | Touches (tables) |
|---|---|---|---|
| `POST /api/contact` | `src/app/api/contact/route.ts:23` | `src/components/contact-form.tsx:148` | `leads` (count + insert, Service-Role) |
| `getProjekte()` | `src/lib/projekte-service.ts:20` | `src/app/page.tsx:33`, `src/app/projekte/page.tsx:33`, `src/app/sitemap.ts:7` | `projekte` (select, `published = true`) |
| `getProjektBySlug(slug)` | `src/lib/projekte-service.ts:37` | `src/app/projekte/[slug]/page.tsx:25,45` | `projekte` |
| `getProjekteByKundentyp(k, limit)` | `src/lib/projekte-service.ts:54` | `src/app/leistungen/privat/page.tsx:48` | `projekte` |
| `getProjekteByKundentypen(ks, limit)` | `src/lib/projekte-service.ts:73` | `src/app/leistungen/gewerbe/page.tsx:48` | `projekte` |
| `getAllSlugs()` | `src/lib/projekte-service.ts:92` | `src/app/projekte/[slug]/page.tsx:15` | `projekte` (slug) |
| Client-Upload `supabase.storage.from("lead-attachments").upload` | `src/components/contact-form.tsx:103` | Kontaktformular, Browser | Bucket `lead-attachments` |
| `upload()` (Skript) | `scripts/upload-projekt-bilder.mjs:42` | manuell | Bucket `projekt-bilder`, `projekte` (update) |

Keine Server Actions (`"use server"` nicht gefunden), keine RPCs, keine Edge Functions. Alle `projekte`-Funktionen fangen Fehler ab und geben `[]` bzw. `null` zurück.

## Authentication and permissions
- **Keine Benutzer-Authentifizierung im Code.** Kein Login, keine Session, keine `auth.*`-Aufrufe, keine Middleware (gesucht: `grep -rn "auth\.|getUser|getSession" src scripts`, keine Treffer). Alle Routen sind öffentlich; es gibt keine geschützte Route.
- **Durchsetzung liegt in Supabase-RLS** (Live-DB, gelesen 2026-11-03, `pg_policies`):
  - `public.leads`: nur `INSERT` für `anon` mit Prüfungen (Pflichtfelder nicht leer, `@` in E-Mail, `kundentyp IN ('privat','gewerblich')`, `status = 'neu'`, `processed = false`). Kein SELECT/UPDATE/DELETE für anon.
  - `public.projekte`: nur `SELECT` für `anon` mit `published = true`.
  - `storage.objects`: nur `INSERT` für `anon` in `lead-attachments` mit Bild-Endung.
- **Der Server benutzt den Service-Role-Key** (`src/lib/supabase-server.ts`) für Lead-Insert und alle Projekt-Lesezugriffe — RLS greift dort nicht; die Filter `published = true` stehen deshalb zusätzlich im Code (`src/lib/projekte-service.ts:25,43,…`). CHECK-Constraints (z. B. `leads.kundentyp`) gelten trotzdem.
- **Ohne serverseitige Prüfung erreichbar:** der Storage-Upload in `lead-attachments` geht direkt vom Browser mit Anon-Key an Supabase (`src/components/contact-form.tsx:103`), nicht über `/api/contact`, und unterliegt nicht dem Rate-Limit der API. `POST /api/contact` ist ohne Anmeldung erreichbar (gewollt, öffentliches Formular).
- **Rate-Limit** (`src/app/api/contact/route.ts:5-6, 9-16, 44-58`): max. 3 Leads pro IP in 10 Minuten; gezählt werden vorhandene Zeilen in `leads` mit gleicher `ip_address` und `created_at >= jetzt − 10 min`. IP aus Header `cf-connecting-ip` → `x-real-ip` → erster Wert von `x-forwarded-for` → `"unknown"`. Prüfung erfolgt nach Honeypot und Zod, vor dem Insert; Überschreitung → HTTP 429. Honeypot (`body.website` gesetzt) → stilles `{ success: true }` ohne Insert und ohne Zählung (Zeile 30-32). Kein Index auf `leads(ip_address, created_at)` in der Live-DB.
- **Admin-Zugang (PROJ-7):** existiert nur als Supabase-Dashboard-Zugang außerhalb des Repos; im Code gibt es keinen Admin-Bereich, also auch keinen öffentlich erreichbaren.

## Shared shell
- Root-Layout `src/app/layout.tsx`: `Header` → `<main className="flex-1">` → `Footer` → `WhatsAppButton` → `SpeedInsights`. Schriften Spectral + Inter über `next/font/google`.
- **Header** `src/components/layout/header.tsx` (257 Z., Client Component): Logo → `/`; Dropdown „Leistungen“ mit `/leistungen/gewerbe` („Gewerbe & Öffentlich“) und `/leistungen/privat` („Private Gardening“) (Zeile 26-29); danach `navLinks` in dieser Reihenfolge: `/projekte` „Projekte“, `/ueber-uns` „Über uns“, `/kontakt` „Kontakt“ (Zeile 20-24); CTA-Button „Kontakt aufnehmen“ → `/kontakt` (Zeile 147). Mobil: Vollbild-Overlay mit „Startseite“, denselben Einträgen, CTA und `tel:`-Link (Zeile 183-248). Aktiv-Markierung per `usePathname()` (`isActive`, Zeile 49).
- **Footer** `src/components/layout/footer.tsx` (129 Z.): Navigation Startseite, Leistungen Gewerbe & Öffentlich, Leistungen Private Gardening, Projekte, Über uns, Kontakt (Zeile 10-15, `aria-current`); Telefon, E-Mail, Adresse; Links `/impressum`, `/datenschutz`; Facebook, Instagram.
- **WhatsApp-Widget** `src/components/whatsapp-button.tsx`: global, fest positioniert, Chat-Hintergrund `/images/whatsapp-bg.jpg` (Zeile 90).
- Keine Unterschiede nach Anmeldestatus (es gibt keine Anmeldung). `docs/app-shell.md` ist noch die leere Vorlage.

## Design system
- **Tokens:** CSS-Variablen in `src/app/globals.css` (166 Z.; `:root` u. a. `--primary: 104 39% 28%`, `--ring` gleich, `--radius: 0.5rem`; `.dark`-Block vorhanden) und Marken-Farben in `tailwind.config.ts` (`brand-green-*`, `brand-green-cta` `#4f802e` mit Kommentar „WCAG AA“, `brand-amber` `#D97706`, `brand-stone-*`). `darkMode: ["class"]`.
- **Komponenten:** shadcn/ui laut `components.json` (style `default`, baseColor `slate`, RSC, CSS-Variablen, Alias `@/components`, `@/lib/utils`). 41 Dateien in `src/components/ui/`, darunter projekteigene Bausteine, die keine shadcn-Registry-Komponenten sind: `animated-counter.tsx`, `fade-in.tsx`, `page-hero.tsx`, `review-card.tsx`, `section-header.tsx`, `section-wrapper.tsx`.
- **Animation:** Framer Motion (`motion` in `src/components/contact-form.tsx` u. a.); `@media (prefers-reduced-motion: reduce)` in `src/app/globals.css:151`.
- **Dokumentiertes System:** Feature PROJ-0 Styleguide (`features/PROJ-0-styleguide/spec.md`); kein `docs/design-system.md` vorhanden; keine Styleguide-Route im Code.

## Could not determine
- Exakter DDL-Inhalt der 14 Migrationen (nur Namen aus der Live-DB; SQL nicht gelesen, nicht im Repo).
- Ob `projekte.kategorie` noch fachlich gebraucht wird (im Code ungenutzt).
- Ob die Live-DB `bnzpdujupmmrwcbunbql` Produktion oder Entwicklung ist — es ist das einzige Projekt, dessen Host in `next.config.ts` steht; eine zweite Umgebung ist im Repo nicht beschrieben.
- Wie Leads beim Betreiber ankommen: im Repo kein Trigger, keine Edge Function, kein Mailversand. Laut Nutzer (2026-11-03) liest ein **n8n-Flow außerhalb des Repos** neue Leads und verschickt sie per Mail. Wie er an die Daten kommt, ist nicht dokumentiert. (inferred) Die vom Code nie geschriebene Spalte `leads.processed` (Default `false`) könnte sein Verarbeitungs-Kennzeichen sein.
- Wer Zugriff auf das Supabase-Dashboard (= PROJ-7-„Admin“) hat.
