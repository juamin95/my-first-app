# Concerns

_Mapped by `/map` on 2026-11-03 at commit `3dbba84`. Fakten mit Fundort; was daraus folgt, entscheidet der Nutzer._

Gelesen: `src/` (alle Routen, `src/lib/*`, `src/components/contact-form.tsx`, `src/components/structured-data.tsx`), `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `scripts/upload-projekt-bilder.mjs`, `.env.local.example` (nur Variablennamen), `public/` (Dateigrößen und Referenzen). Übersprungen: `node_modules`, `.next`, `playwright-report`, `test-results`. `.env.local` existiert und wurde nicht gelesen.

Zusätzlich gelesen, nur lesend: die laufende Supabase-Instanz `bnzpdujupmmrwcbunbql` am 2026-11-03 (Tabellenliste, `pg_policies`, `storage.buckets`, Security-/Performance-Advisors). Diese Angaben gelten für **diese Instanz an diesem Tag**. Im Repository gibt es kein Schema (kein `supabase/`-Ordner, keine `*.sql`-Datei).

## Oversized files and mixed responsibilities

| File | Lines | Responsibilities found | Severity |
|---|---|---|---|
| `src/components/contact-form.tsx` | 577 | UI (dreistufiger Wizard, Animation), Formularzustand/Validierung (react-hook-form + `contactFormSchema`), Datenzugriff: Upload direkt aus dem Browser in Supabase Storage `lead-attachments` mit dem Anon-Client (Z. 8, 103–105), Absenden an `/api/contact` (Z. 146) | medium |

Keine Datei ab ~800 Zeilen. Die längste Datei, `src/components/ui/sidebar.tsx` (774 Zeilen), ist eine unveränderte shadcn-Komponente mit einer Aufgabe und wird nirgends importiert (Suche nach `ui/sidebar` in `src/`: kein Treffer). Die Seiten `src/app/page.tsx` (395), `src/app/ueber-uns/page.tsx` (349), `src/app/leistungen/privat/page.tsx` (336) und `src/app/leistungen/gewerbe/page.tsx` (335) sind lang, aber reine Darstellung plus ein Service-Aufruf. Deshalb sind sie hier nicht aufgeführt.

## Duplicated logic

- **Erlaubte Werte für `kundentyp` an drei Stellen, die nicht übereinstimmen:**
  - `src/lib/contact-schema.ts:17` erlaubt `privat | gewerblich | oeffentlich`.
  - Die UI-Optionen in `src/components/contact-form.tsx` (Z. 346–348) zeigen dieselben drei.
  - Die RLS-Policy `Anon submit valid lead` auf `public.leads` (laufende Instanz) erlaubt nur `privat | gewerblich`.
  - Weil die API mit dem Service-Role-Key schreibt (siehe Security), greift die Policy für die API nicht. Für direkte Anon-Inserts gilt sie aber.
  - Zusätzlich hat die Tabelle den CHECK-Constraint `leads_kundentyp_check` mit `kundentyp = ANY (ARRAY['privat','gewerblich'])` (laufende Instanz, `pg_constraint`, gelesen 2026-11-03). Constraints gelten auch für den Service-Role-Client. (inferred, nicht ausprobiert) Ein Lead mit `oeffentlich` besteht die Zod-Prüfung, scheitert dann beim Insert und endet als HTTP 500 (`src/app/api/contact/route.ts:73-77`). Die Anfrage geht verloren. **Severity: high**, weil damit eine Zielgruppe der Startseite keine Anfrage abschicken kann.
- **Erlaubte Werte für `leistungsart`:** Die UI bietet zwei Werte aus `src/lib/contact-schema.ts:32-35` (`Gestaltung`, `Gartenpflege`). Der Server akzeptiert jeden nicht-leeren String (`src/lib/contact-schema.ts:20`, `z.string().min(1)`). Die Policy prüft nur auf nicht leer.
- **Honeypot doppelt:** Client in `src/components/contact-form.tsx` (Z. 142–145), Server in `src/app/api/contact/route.ts:30-32`. Gewollt, aber zwei Stellen.
- **Projektdaten doppelt:** `src/lib/projekte-data.ts` (208 Zeilen) enthält ein als `@deprecated` markiertes statisches Array `projekte`, das keine Datei mehr importiert. Die Live-Daten kommen aus `public.projekte` über `src/lib/projekte-service.ts`. Aus derselben Datei werden weiterhin `kundentypStyles`, `filterTabs` und Typen genutzt.
- **Fünf fast gleiche Abfragen** in `src/lib/projekte-service.ts:19-104` (gleicher `select("*")`, gleicher Filter `published`, gleiche Sortierung, gleiches Fehler-Schlucken).

## Untested critical paths

Es gibt keine einzige Testdatei. `tests/` ist leer, unter `src/` gibt es kein `*.test.*` und kein `*.spec.*`. `vitest.config.ts:11` und das Script `test:e2e` in `package.json` setzen `passWithNoTests`, deshalb laufen `npm run test` und `npm run test:e2e` grün durch.

- `src/app/api/contact/route.ts` (83 Zeilen): Lead-Erfassung, Rate-Limit, Honeypot, Sanitizing, Insert in `leads`. Kein Test unter `tests/` oder `src/`.
- `src/lib/contact-schema.ts`: serverseitige Validierung der Lead-Daten. Kein Test.
- `src/components/contact-form.tsx`: Datei-Upload in `lead-attachments` und Absenden. Kein Test.
- `src/lib/projekte-service.ts`: Filter `published = true`. Er entscheidet, welche Projekte öffentlich sichtbar sind. Kein Test.

## Security smells

| Location | What | Severity |
|---|---|---|
| `src/lib/projekte-service.ts:21,38,55,74,93` mit `src/lib/supabase-server.ts:6` | Öffentliche Lesezugriffe auf `projekte` laufen über den Service-Role-Client (`SUPABASE_SERVICE_ROLE_KEY`) und umgehen RLS. Dass Entwürfe verborgen bleiben, hängt nur am Filter `.eq("published", true)` im Code, nicht an der vorhandenen Policy `Anon read published projects`. | medium |
| `src/app/api/contact/route.ts:43,60` | Auch der Lead-Insert nutzt den Service-Role-Client. Die RLS-Policy auf `leads` (Pflichtfelder, `status = 'neu'`, `processed = false`, `kundentyp`) prüft deshalb nichts für diesen Pfad. | medium |
| `public.leads`, Policy `Anon submit valid lead` (laufende Instanz) | Wer den öffentlichen Anon-Key hat (er steckt im Browser-Bundle, `src/lib/supabase.ts:4`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`), kann Leads direkt per Supabase-REST einfügen. Das umgeht Rate-Limit, Honeypot, Sanitizing und die Mindestlänge von `nachricht`. Ob dieser Weg gewollt ist: (inferred) eher nicht, denn die App selbst nutzt ihn nicht. | medium |
| `storage.objects`, Policy `Anon upload lead attachments`, Bucket `lead-attachments` (laufende Instanz); Aufruf in `src/components/contact-form.tsx:103-105` | Anonyme Uploads sind ohne Rate-Limit und ohne Bindung an einen abgeschickten Lead erlaubt. Pro Datei gelten 10 MB, Bildendungen und Bild-MIME-Typen. Bilder aus abgebrochenen Formularen bleiben liegen, im Repo gibt es keine Aufräumlogik. Der Bucket ist privat, gelesen werden kann also nicht anonym. | medium |
| `src/app/api/contact/route.ts:9-15` | Die Client-IP für das Rate-Limit kommt zuerst aus `cf-connecting-ip`, dann aus `x-real-ip` und `x-forwarded-for`. (inferred) Läuft die Seite ohne Cloudflare davor (laut PRD Vercel), ist `cf-connecting-ip` ein frei setzbarer Request-Header. Das Limit von 3 pro 10 Minuten lässt sich dann mit wechselnden Werten umgehen. Ob Vercel diesen Header entfernt, ließ sich im Repo nicht klären. | medium |
| `src/app/api/contact/route.ts:47-52` | Das Rate-Limit schlägt offen fehl: Das Ergebnis `error` der Zählabfrage wird ignoriert, `count ?? 0` lässt bei einem DB-Fehler jede Anfrage durch. | low |
| `src/app/api/contact/route.ts:70` mit `src/lib/contact-schema.ts:23` | `bilder_urls` wird als beliebiges String-Array ungeprüft und ohne `sanitize()` gespeichert. Es gibt keine Prüfung auf Pfade im Bucket `lead-attachments` und keine Längenbegrenzung. | low |
| `src/app/api/contact/route.ts:71` | Die IP-Adresse wird pro Lead dauerhaft in `leads.ip_address` gespeichert (DSGVO-relevant). Im Repo gibt es keine Löschfrist und keinen Löschjob. Ob `src/app/datenschutz/page.tsx` diese Speicherung beschreibt, wurde nicht geprüft. | medium |
| `public.leads` (laufende Instanz, 21 Zeilen) | Personenbezogene Lead-Daten (Name, E-Mail, Telefon, Adresse, Nachricht, IP, Bildpfade) liegen in einer Tabelle ohne Schema-Datei, ohne Migration und ohne im Repo sichtbares Lösch- oder Aufbewahrungskonzept. | medium |
| `src/app/api/contact/route.ts:74` | `console.error("[Supabase Insert Error]", error)` schreibt das Supabase-Fehlerobjekt in die Server-Logs. (inferred) Bei Constraint-Fehlern kann es Werte aus dem Insert enthalten, also personenbezogene Daten in den Logs. | low |
| `next.config.ts:16-17` | Die CSP erlaubt `'unsafe-inline'` für `script-src` und `style-src`. Ohne Nonce oder Hash schützt sie nicht gegen eingeschleuste Inline-Skripte. `unsafe-eval` ist nicht gesetzt. | low |
| `scripts/upload-projekt-bilder.mjs:11,21` | Das Skript liest `SUPABASE_SERVICE_ROLE_KEY` in eine Variable namens `SUPABASE_ANON_KEY` und schreibt mit `upsert: true` sowie einem `update` auf `projekte`. Die irreführende Benennung macht eine spätere versehentliche Weitergabe des Service-Keys wahrscheinlicher. Kein Secret im Code. | low |
| Supabase Auth (laufende Instanz, Advisor `auth_leaked_password_protection`) | Leaked Password Protection ist aus. Im Code gibt es derzeit keinen Login (keine Auth-Aufrufe in `src/`). Relevant wird das erst mit einem Admin-Login (PROJ-7). | low |
| `.mcp.json` (Projektroot, lokal) | Laut Tech-Mapper steht im Authorization-Header ein Supabase-Zugangsschlüssel im Klartext. Die Datei ist über `.gitignore:38` ausgeschlossen und nicht getrackt (`git ls-files .mcp.json` ist leer). Der Wert wird hier nicht wiedergegeben. Risiko bei Weitergabe des Ordners, in Backups oder wenn `.gitignore` geändert wird. | low |

Geprüft und unauffällig: `dangerouslySetInnerHTML` in `src/components/structured-data.tsx:60,97,134,167` serialisiert nur statische, im Code festgelegte Objekte mit `JSON.stringify`. Bei den heutigen Aufrufen in `src/app/*/page.tsx` fließt keine Nutzer- oder DB-Eingabe hinein. Es gibt keine Admin- oder CMS-Route unter `src/app/` und keine `middleware.ts`. Im Code steht kein Secret (gesucht wurde nach `process.env`, es werden nur Variablennamen verwendet).

## Performance and fragility

- **Große Assets in `public/`** (insgesamt 41 MB, 80 Dateien):
  - Über 1 MB und referenziert: `public/images/hero-bg.mp4` (8,3 MB, `src/components/hero-scroll.tsx`), `public/images/leistungen/privat-einstieg.jpg` (6,4 MB), `public/images/leistungen/privat-abo-action.jpg` (1,1 MB), `public/images/projekte/terrasse-bankirai-koeln-2026-detail.jpg` (1,1 MB), `public/images/projekte/terrasse-bankirai-koeln-2026-cover.jpg` (1,0 MB).
  - Weitere 24 Dateien liegen zwischen 500 KB und 1 MB. Die vollständige Liste liefert `find public -size +500k`.
- **Nicht referenzierte Assets** (kein Treffer in `src/`, `next.config.ts` oder `scripts/`):
  - Bilder: `public/images/projekte/einfahrt-pflaster-detail.jpg` (904 KB), `einfahrt-pflaster-platten.jpg` (792 KB), `einfahrt-pflaster-cover.jpg` (732 KB), `public/images/whatsapp-bg.png` (776 KB, untracked), `public/images/leistungen/privat-pflege-action.jpg` (684 KB), `public/images/ueber-uns/team.jpg` und `team-collage-backup.jpg` (je 636 KB), `public/images/leistungen/pflege.jpg` (596 KB), `bau.jpg` (440 KB), `public/images/hero/hebebuehne.jpg`, `titelbild.jpg`, `rollrasen-compressed.jpg` (untracked), sowie Next-Standarddateien (`public/next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`).
  - Zusammen etwa 7,5 MB.
  - (inferred) Die Einfahrt-Bilder könnten als Storage-URLs in `projekte` stehen und lokal nur Quelle sein.
- **`.DS_Store`-Dateien in `public/`:** `public/.DS_Store`, `public/images/.DS_Store`, `public/images/leistungen/.DS_Store` sind nicht in `.gitignore` und würden mit ausgeliefert. `git ls-files` zeigt sie derzeit nicht als getrackt.
- **Fehler werden still verschluckt:** Jede Funktion in `src/lib/projekte-service.ts` gibt bei Fehler `[]` oder `null` zurück. Ein Ausfall der Datenbank zeigt sich als leere Projektgalerie bzw. als 404 auf `/projekte/[slug]`, ohne Log. Mit `revalidate = 60` (`src/app/projekte/page.tsx:11` u. a.) kann so ein leerer Stand eine Minute lang gecacht werden.
- **`select("*")` ohne Spaltenliste** in `src/lib/projekte-service.ts:23,40,57,76`, auf öffentlichen Seiten. Wegen des Service-Role-Clients würden neue, interne Spalten automatisch mitgeladen.
- **`mapRow(row: any)`** in `src/lib/projekte-service.ts:4`: Es gibt keine generierten Supabase-Typen. Schemaänderungen bleiben für TypeScript unsichtbar.
- **Externer, nicht dokumentierter Abnehmer von `leads`:** Laut Nutzer (2026-11-03) liest ein n8n-Flow außerhalb des Repos neue Leads und verschickt sie per Mail – das ist die einzige Benachrichtigung des Betreibers. Im Repo steht dazu nichts (kein Hinweis in `src/`, `docs/`, `README.md`). Jede Änderung an `public.leads` (Spalten, Constraints, Policies) kann den Flow brechen, ohne dass es auffällt. (inferred) `leads.processed` (Default `false`, vom Code nie geschrieben, `src/app/api/contact/route.ts:60-71`) könnte sein Verarbeitungs-Kennzeichen sein. Leads, die am Insert scheitern (z. B. `kundentyp = oeffentlich`), lösen auch keine Mail aus. Severity: medium.
- **Kein Schema im Repository:** `leads`, `projekte`, beide Buckets und alle Policies existieren nur in der laufenden Instanz. Eine neue Umgebung (Preview, lokale DB) lässt sich aus dem Repo nicht aufbauen.
- **Unterdrückte Lint-Regeln:** `react-hooks/set-state-in-effect` in `src/components/ui/fade-in.tsx:24` und `src/components/layout/header.tsx:39`, `react-hooks/exhaustive-deps` in `src/components/filmstreifen-karussell.tsx:74,89`.
- Keine TODO- oder FIXME-Häufung in `src/` (Suche: kein Treffer).
- Supabase-Performance-Advisor (laufende Instanz): keine Meldungen.

## Could not determine

- Ob vor der Produktivseite Cloudflare liegt bzw. ob Vercel einen vom Client gesetzten `cf-connecting-ip` entfernt. Davon hängt ab, ob das Rate-Limit umgangen werden kann (`src/app/api/contact/route.ts:11`).
- Spaltendefinitionen, Constraints, Indizes und Trigger von `leads` und `projekte`: nicht gelesen, und im Repo nicht vorhanden.
- Ob es außerhalb des Repos eine Löschfrist für Leads, IP-Adressen oder `lead-attachments` gibt (z. B. pg_cron oder eine Edge Function).
- Ob die Datenschutzerklärung (`src/app/datenschutz/page.tsx`) IP-Speicherung und Bild-Uploads abdeckt. Das ist eine inhaltlich-rechtliche Prüfung und gehört zu `/dsgvo`.
