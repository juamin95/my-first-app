# Stack

_Mapped by `/map` on 2026-11-03 at commit `3dbba84`. Stated = in einer Datei festgehalten; inferred = meine Lesart, muss bestätigt werden._

## Language and runtime
- **TypeScript / Node.js (einzige Laufzeit, die App selbst):** TypeScript `^5` laut `package.json` → `devDependencies.typescript`; `tsconfig.json` mit `strict: true`, Pfad-Alias `@/*` → `./src/*`. Eine Node-Version ist **nicht** gepinnt (kein `.nvmrc`, kein `.node-version`, kein `engines` in `package.json`). Lokal installiert ist Node v26.8.1 (Ablesung der Maschine, keine Projektvorgabe).
- **Node-Skript außerhalb der App:** `scripts/upload-projekt-bilder.mjs` (plain ESM-JavaScript), laut Kopfkommentar einmalig per `node --env-file=.env.local scripts/upload-projekt-bilder.mjs` auszuführen. Lädt drei Projektbilder in den Supabase-Storage-Bucket `projekt-bilder` und aktualisiert danach die Tabelle `projekte` (`scripts/upload-projekt-bilder.mjs:18`, `:48-60`, `:68`). Kein eigenes Manifest, kein Test → keine eigene Layer, sondern ein Hilfsskript (inferred).
- `.ai-eng-kit` → `layers` ist leer (`[]`); eine zweite Laufzeit in eigenem Ordner wurde nicht gefunden (gesucht: `pyproject.toml`, `go.mod`, `composer.json`, weitere `package.json` außerhalb von `node_modules`).

## Framework
- **Next.js `^16.1.1`** (App Router) — `package.json` → `dependencies.next`; App-Code unter `src/app/` (`src/app/layout.tsx`, `src/app/page.tsx`, API-Route `src/app/api/contact/`).
- **React `^19.0.0`** / `react-dom ^19.0.0` — `package.json`.
- **UI:** Tailwind CSS `^3.4.1` (`tailwind.config.ts`, `postcss.config.mjs`, `src/app/globals.css`), shadcn/ui (`components.json`: style `default`, `rsc: true`, baseColor `slate`, cssVariables `true`), Radix-UI-Primitives, `lucide-react`, `framer-motion ^12.36.0`, `next-themes`, `sonner` — alles `package.json`.
- **Formulare/Validierung:** `react-hook-form ^7.71.1`, `@hookform/resolvers ^5.2.2`, `zod ^4.3.5` — `package.json`; Schema in `src/lib/contact-schema.ts`.
- **Konfiguration:** `next.config.ts` setzt globale Security-Header inkl. CSP (`next.config.ts:3-23`, `:142-149`), erlaubt Remote-Bilder vom Supabase-Host (`next.config.ts:26-33`) und definiert Redirects (non-www → `www.gruenschnitt-amini.de`, alte Webflow-Pfade → neue Routen, `/leistungen` → `/leistungen/gewerbe`) (`next.config.ts:34-139`).

## Backend and data
- **Supabase** über `@supabase/supabase-js ^2.39.3` (`package.json`). Kein Supabase-CLI-Projekt im Repo.
  - Browser-/Anon-Client: `src/lib/supabase.ts` (Variablen `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
  - Server-Client mit Service-Role: `src/lib/supabase-server.ts` (`createServerClient()`, Variablen `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `persistSession: false`).
  - Im Code angesprochene Tabellen: `leads` (`src/app/api/contact/route.ts:48`, `:60`), `projekte` (`src/lib/projekte-service.ts:23`, `:40`, `:57`, `:76`, `:95`; `scripts/upload-projekt-bilder.mjs:68`). Storage-Bucket `projekt-bilder` (`scripts/upload-projekt-bilder.mjs:18`).
- **Wo das Schema liegt:** **nur gehostet — keine Schemadatei im Repository.** Gesucht: Ordner `supabase/`, `*.sql`, `migrations/`, ORM-Schemadateien (`git ls-files` ohne Treffer für `.sql`/`migration`/`supabase`-Ordner). Tabellen, RLS-Policies und Rate-Limit-Struktur sind daher nur im Supabase-Dashboard bzw. der laufenden Instanz nachvollziehbar. `docs/data-model.md` ist noch die unausgefüllte Vorlage.
- Supabase-Projekt-Host ist in `next.config.ts:14`, `:15`, `:29` als fester Hostname eingetragen (öffentlicher Projekt-Host, kein Schlüssel).

## Package manager and scripts
- **npm** — stated: `package-lock.json` vorhanden (kein `yarn.lock`, `pnpm-lock.yaml`, `bun.lockb`); `.ai-eng-kit` → `stack.packageManager: "npm"`.
- Skripte aus `package.json` (wörtlich):

| Name | Befehl | Zweck |
|---|---|---|
| `dev` | `next dev` | Start (Entwicklung) — stated durch Name |
| `build` | `next build` | Build — stated |
| `start` | `next start` | Start (Produktion, nach Build) — stated |
| `lint` | `eslint src` | Lint — stated |
| `test` | `vitest run` | Unit-/Komponententests — stated |
| `test:watch` | `vitest` | Tests im Watch-Modus — stated |
| `test:e2e` | `playwright test --pass-with-no-tests` | E2E — stated |
| `test:e2e:ui` | `playwright test --ui` | E2E interaktiv — stated |
| `test:all` | `vitest run && playwright test --pass-with-no-tests` | Unit + E2E — stated |

- Kein Skript für Type-Check (`tsc --noEmit`) gefunden; `.ai-eng-kit` → `commands.check` ist `null`.

## How it runs (proposal for `/init`)
- **Start:** `npm run dev` — stated (`package.json` → `scripts.dev`, `.ai-eng-kit` → `commands.dev`).
- **Base URL / probe:** `http://localhost:3000` — stated in `playwright.config.ts` (`use.baseURL`, `webServer.url`). Eine eigene Health-Route gibt es nicht; als Probe bietet sich ein HTTP-GET auf `/` bzw. `/robots.txt` (`src/app/robots.ts`) an (inferred). `.ai-eng-kit` → `probe` ist noch `null`.
- **Build:** `npm run build` (`next build`) — stated.
- **Test:** `npm run test` (`vitest run`) — stated. Konfiguration `vitest.config.ts` (jsdom, `globals: true`, Setup `src/test/setup.ts`, `passWithNoTests: true`, schließt `tests/**` aus). Unter `src/` wurde keine `*.test.*`-Datei gefunden, der Ordner `tests/` (Playwright, `playwright.config.ts` → `testDir: './tests'`) ist leer.
- **Lint:** `npm run lint` (`eslint src`) — stated. Flat-Config `eslint.config.mjs` (`eslint-config-next/core-web-vitals`); daneben liegt noch eine alte `.eslintrc.json` (`next/core-web-vitals`), die ESLint 9 mit Flat-Config nicht liest (inferred).

## Integrations and external services
| Service | Used for | Configured in (file, variable **names** only) |
|---|---|---|
| Supabase (Postgres) | Leads speichern (`leads`), Projektgalerie lesen (`projekte`), Rate-Limit über `leads` | `src/lib/supabase.ts`, `src/lib/supabase-server.ts`; `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (Namen aus `.env.local.example`) |
| Supabase Storage | Projektbilder (Bucket `projekt-bilder`), per `next/image` ausgeliefert | `scripts/upload-projekt-bilder.mjs`; `next.config.ts` → `images.remotePatterns`, CSP `img-src` |
| Vercel Speed Insights | Performance-Messung im Browser | `src/app/layout.tsx:7`, `:65` (`@vercel/speed-insights`) |
| WhatsApp (wa.me-Link) | Chat-Widget, Absprung zu WhatsApp | `src/components/whatsapp-button.tsx:11` (Nummer als Konstante im Code) |
| Supabase MCP (Entwicklungswerkzeug, nicht App) | Datenbankzugriff für den Coding-Agenten | `.mcp.json` (per `.gitignore` ausgeschlossen; enthält einen Zugangs-Header — Wert hier bewusst nicht wiedergegeben) |
| E-Mail-Versand | **im Repo keiner** (gesucht nach `resend`, `nodemailer`, `sendgrid`, `smtp` in `src/` — ohne Treffer). Laut Nutzer (2026-11-03) verschickt ein **n8n-Flow außerhalb des Repos** neue Leads per Mail. | nicht im Repo; wie n8n an `leads` kommt, ist nicht dokumentiert |

## How it goes live
- **Vercel** — inferred, nicht durch eine Konfigurationsdatei belegt: Abhängigkeit `@vercel/speed-insights` (`package.json`, `src/app/layout.tsx:65`), `.gitignore` ignoriert `.vercel`, `README.md:64`, `:127` nennt Vercel als Ziel, `docs/PRD.md` → Constraints „Deployment: Vercel“. Es gibt **kein** `vercel.json` und keinen lokalen `.vercel/`-Ordner. `.ai-eng-kit` → `stack.deploy` ist `null`.
- **Produktionsdomain:** `gruenschnitt-amini.de` / `www.gruenschnitt-amini.de` — stated in `next.config.ts:38-41` (Redirect auf www als kanonische Domain).
- **Git-Remote:** `origin` → GitHub-Repo `juamin95/my-first-app` (`git remote -v`). Vermutlich Vercel-Git-Integration mit Auto-Deploy von `main` (inferred; Commit `3dbba84` „deploy(PROJ-2): Hero-Video auf Produktion ausgerollt“ deutet auf Deploys über `main` hin).
- **CI:** keiner — kein Ordner `.github/workflows/`, keine andere CI-Konfiguration gefunden. Lint/Test/Build laufen also nicht automatisch vor einem Deploy (außer dem `next build`, den Vercel selbst ausführt, inferred).
- Kein `Dockerfile`, `Procfile`, `fly.toml` oder Deploy-Skript. Human-Gates (Pflicht-Reviews, Release-Branches) sind im Repo nicht sichtbar.

## Could not determine
- **Deploy-Ziel und -Ablauf** offiziell: Vercel ist nur abgeleitet; ob Auto-Deploy von `main`, ob Preview-Deploys und welche Env-Variablen in Vercel gesetzt sind, steht in keiner Datei.
- **Node-Version** für Produktion (keine Pinning-Datei, kein `engines`).
- **Datenbankschema, RLS-Policies, Rate-Limit-Struktur**: keine Migrationen im Repo; nur im gehosteten Supabase-Projekt einsehbar. Ob es mehrere Supabase-Projekte (Dev/Prod) gibt, ist nicht erkennbar.
- **E-Mail-Benachrichtigung bei neuen Leads:** geklärt laut Nutzer (2026-11-03) — ein n8n-Flow außerhalb des Repos verschickt neue Leads per Mail. Offen bleibt, wie er an die Daten kommt (Abfrage, Webhook, Zugangsdaten); das steht in keiner Datei.
- **Health-/Probe-Route:** keine vorhanden; ob `/init` `GET /` als Probe nutzen soll, ist zu klären.
- Zweck von `.agents/skills/` (`frontend-design`, `ui-ux-pro-max`) — Werkzeug-Konfiguration ohne Laufzeitbezug, Herkunft nicht belegt.
