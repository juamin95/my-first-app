# Tech Debt — internal work with no visible behaviour

> The one list of work that changes no acceptance criterion: refactorings, test coverage, cleanup,
> and the "we know, later" decisions. Features live in `features/INDEX.md`; this file is for what is
> *not* a feature.
>
> - **Fed by `/map`:** every concern from `docs/codebase/concerns.md` lands here once, with the commit it
>   was found at, and is set to `Resolved` when a later map no longer finds it. `concerns.md` is the
>   snapshot; this is the history.
> - **Worked by `/refactor`:** with no argument it takes the top `Planned` row, then the top `Open` row
>   that is an oversized or mixed-responsibility file, and sets it `Resolved` when the split is green.
> - **Yours to edit:** change a status, add what you found yourself, write why something is `Accepted`.
>   The kit only appends rows and changes statuses — it never deletes a row or rewrites your text.
> - **Compacted by `/cleanup`** (Resolved rows move to the archive below), **checked by `/audit`** (rows
>   whose path no longer exists).

**Status:** `Open` — found, undecided · `Planned` — do next, in this order · `Accepted` — known,
deliberately left, with the reason · `Resolved` — gone, with the commit that removed it. A security
smell never becomes `Accepted`: it is a finding for `/security-check` or the owning feature's next
`/qa`, and this file only records that it is known.

| ID | Status | Path | What | Why it matters | Severity | Owning features | Found (commit) | Resolved (commit) |
|----|--------|------|------|----------------|----------|-----------------|----------------|-------------------|
| TD-1 | Open | `src/components/contact-form.tsx` | 577 Zeilen: Wizard-UI, Formularzustand/Validierung, Browser-Upload in Storage und Absenden in einer Datei | Schwer zu ändern und zu testen; Datenzugriff steckt in der UI | medium | PROJ-5 | `3dbba84` | |
| TD-2 | Open | `src/lib/contact-schema.ts:17` | Kundentyp `oeffentlich` erlaubt Zod und UI, der CHECK-Constraint `leads_kundentyp_check` (und die Policy) nur `privat`/`gewerblich` | (inferred, nicht ausprobiert) Anfragen mit „Öffentlich“ scheitern mit HTTP 500, werden nicht gespeichert und lösen keine n8n-Mail aus – laut Betreiber bestätigt | high | PROJ-5 | `3dbba84` | |
| TD-3 | Open | `src/lib/contact-schema.ts:20` | `leistungsart` akzeptiert serverseitig jeden nicht-leeren String; die UI bietet zwei Werte | Erlaubte Werte sind an zwei Stellen unterschiedlich definiert | – | PROJ-5 | `3dbba84` | |
| TD-4 | Open | `src/app/api/contact/route.ts:30-32` | Honeypot doppelt: im Client (`contact-form.tsx` Z. 142–145) und im Server | Gewollt, aber zwei Stellen, die zusammen geändert werden müssen | – | PROJ-5 | `3dbba84` | |
| TD-5 | Open | `src/lib/projekte-data.ts` | Statisches Array `projekte` (7 Einträge, `@deprecated`) wird nicht mehr importiert | Toter Datenbestand neben den Live-Daten; in der Feature-Map unassigned | – | unassigned (übrige Exporte: PROJ-6) | `3dbba84` | |
| TD-6 | Open | `src/lib/projekte-service.ts:19-104` | Fünf fast gleiche Abfragen (gleiches `select`, Filter, Sortierung, Fehlerbehandlung) | Änderungen am Filter `published` müssen an fünf Stellen passieren | – | PROJ-6 | `3dbba84` | |
| TD-7 | Open | `src/app/api/contact/route.ts` | Kein Test für Lead-Erfassung, Rate-Limit, Honeypot, Sanitizing, Insert | Kritischster Pfad der Seite; `passWithNoTests` meldet grün ohne Tests | – | PROJ-5 | `3dbba84` | |
| TD-8 | Open | `src/lib/contact-schema.ts` | Kein Test für die serverseitige Validierung | Validierungsfehler fallen erst bei echten Anfragen auf | – | PROJ-5 | `3dbba84` | |
| TD-9 | Open | `src/components/contact-form.tsx` | Kein Test für Datei-Upload und Absenden | Fehler im Formular kosten direkt Leads | – | PROJ-5 | `3dbba84` | |
| TD-10 | Open | `src/lib/projekte-service.ts` | Kein Test für den Filter `published = true` | Er entscheidet, welche Projekte öffentlich sichtbar sind | – | PROJ-6 | `3dbba84` | |
| TD-11 | Open | `src/lib/projekte-service.ts:21,38,55,74,93` | Öffentliche Lesezugriffe auf `projekte` über den Service-Role-Client | RLS greift nicht; Entwürfe bleiben nur durch den Code-Filter verborgen | medium | PROJ-6 | `3dbba84` | |
| TD-12 | Open | `src/app/api/contact/route.ts:43,60` | Lead-Insert über den Service-Role-Client | Die RLS-Policy auf `leads` prüft für diesen Pfad nichts | medium | PROJ-5 | `3dbba84` | |
| TD-13 | Open | public.leads (Policy `Anon submit valid lead`) | Mit dem öffentlichen Anon-Key (`src/lib/supabase.ts:4`) lassen sich Leads direkt per REST einfügen | Umgeht Rate-Limit, Honeypot, Sanitizing und Mindestlänge der Nachricht | medium | PROJ-5 | `3dbba84` | |
| TD-14 | Open | storage.objects (Bucket `lead-attachments`), src/components/contact-form.tsx:103-105 | Anonyme Uploads ohne Rate-Limit und ohne Bindung an einen Lead; keine Aufräumlogik | Speicher kann gefüllt werden; verwaiste Dateien bleiben liegen | medium | PROJ-5 | `3dbba84` | |
| TD-15 | Open | `src/app/api/contact/route.ts:9-15` | IP für das Rate-Limit zuerst aus `cf-connecting-ip` | (inferred) Ohne Cloudflare davor frei setzbar, Limit damit umgehbar | medium | PROJ-5 | `3dbba84` | |
| TD-16 | Open | `src/app/api/contact/route.ts:47-52` | Rate-Limit schlägt offen fehl: Fehler der Zählabfrage wird ignoriert | Bei DB-Fehler wird jede Anfrage durchgelassen | low | PROJ-5 | `3dbba84` | |
| TD-17 | Open | `src/app/api/contact/route.ts:70` | `bilder_urls` ungeprüft und ohne `sanitize()` gespeichert | Beliebige Strings und Längen landen in `leads` | low | PROJ-5 | `3dbba84` | |
| TD-18 | Open | `src/app/api/contact/route.ts:71` | IP-Adresse pro Lead dauerhaft in `leads.ip_address` | DSGVO-relevant; keine Löschfrist, kein Löschjob im Repo | medium | PROJ-5 | `3dbba84` | |
| TD-19 | Open | `public.leads` | Personenbezogene Lead-Daten ohne Schema-Datei und ohne sichtbares Lösch- oder Aufbewahrungskonzept | DSGVO-relevant; Thema für `/dsgvo` | medium | PROJ-5 | `3dbba84` | |
| TD-20 | Open | `src/app/api/contact/route.ts:74` | `console.error` schreibt das Supabase-Fehlerobjekt in die Server-Logs | (inferred) Kann personenbezogene Werte in Logs bringen | low | PROJ-5 | `3dbba84` | |
| TD-21 | Open | `next.config.ts:16-17` | CSP mit `'unsafe-inline'` für `script-src` und `style-src` | Kein Schutz gegen eingeschleuste Inline-Skripte | low | unassigned (querschnittlich) | `3dbba84` | |
| TD-22 | Open | `scripts/upload-projekt-bilder.mjs:11,21` | Service-Role-Key in Variable namens `SUPABASE_ANON_KEY` | Irreführend; erhöht das Risiko versehentlicher Weitergabe | low | PROJ-7 | `3dbba84` | |
| TD-23 | Open | Supabase Auth (Advisor `auth_leaked_password_protection`) | Leaked Password Protection ist aus | Relevant erst mit einem Login (z. B. Admin für PROJ-7) | low | unassigned | `3dbba84` | |
| TD-24 | Open | `.mcp.json` | Supabase-Zugangsschlüssel im Klartext in einer lokalen Datei (per `.gitignore:38` ausgeschlossen, nicht getrackt) | Risiko bei Weitergabe des Ordners, Backups oder Änderung der `.gitignore` | low | unassigned | `3dbba84` | |
| TD-25 | Open | `public/` | Große Assets über 1 MB, u. a. `images/hero-bg.mp4` (8,3 MB), `images/leistungen/privat-einstieg.jpg` (6,4 MB); 24 weitere zwischen 500 KB und 1 MB | PageSpeed-Ziel ≥ 90 laut PRD | – | PROJ-2, PROJ-3b, PROJ-6 | `3dbba84` | |
| TD-26 | Open | `public/images/` | Nicht referenzierte Assets, zusammen ca. 7,5 MB (Liste in `docs/codebase/concerns.md`) | Ballast im Repo und im Deploy | – | unassigned | `3dbba84` | |
| TD-27 | Open | `public/.DS_Store, public/images/.DS_Store, public/images/leistungen/.DS_Store` | .DS_Store-Dateien in `public/`, nicht in `.gitignore` | Würden bei einem Commit mit ausgeliefert | – | unassigned | `3dbba84` | |
| TD-28 | Open | `src/lib/projekte-service.ts:30-33` | Fehler werden still verschluckt (`[]`/`null`, kein Log) | DB-Ausfall zeigt sich als leere Galerie bzw. 404, mit `revalidate = 60` gecacht | – | PROJ-6 | `3dbba84` | |
| TD-29 | Open | `src/lib/projekte-service.ts:23,40,57,76` | `select("*")` ohne Spaltenliste auf öffentlichen Seiten | Neue interne Spalten würden wegen Service-Role automatisch mitgeladen | – | PROJ-6 | `3dbba84` | |
| TD-30 | Open | `src/lib/projekte-service.ts:4` | `mapRow(row: any)`, keine generierten Supabase-Typen | Schemaänderungen bleiben für TypeScript unsichtbar | – | PROJ-6 | `3dbba84` | |
| TD-31 | Open | `public.leads (externer n8n-Flow)` | n8n-Flow außerhalb des Repos liest neue Leads und verschickt sie per Mail; im Repo nicht dokumentiert. (inferred) `leads.processed` könnte sein Kennzeichen sein | Änderungen an `leads` können die einzige Lead-Benachrichtigung unbemerkt brechen | medium | PROJ-5 | `3dbba84` | |
| TD-32 | Open | `(kein Schema im Repo)` | `leads`, `projekte`, beide Buckets und alle Policies existieren nur in der Live-Instanz | Keine zweite Umgebung aufbaubar; Voraussetzung für einen Wechsel der Umgebungsstrategie (ADR-001) | – | PROJ-5, PROJ-6, PROJ-7 | `3dbba84` | |
| TD-33 | Open | `src/components/ui/fade-in.tsx:24, src/components/layout/header.tsx:39, src/components/filmstreifen-karussell.tsx:74,89` | Unterdrückte Lint-Regeln (`set-state-in-effect`, `exhaustive-deps`) | Mögliche Effekt-Fehler bleiben unsichtbar | – | PROJ-0, PROJ-1, unassigned | `3dbba84` | |

## Archive (Resolved)
_Moved here by `/cleanup`, one line each: ID, path, what, resolving commit._
