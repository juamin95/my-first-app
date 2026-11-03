# Conventions

_Mapped by `/map` on 2026-11-03 at commit `3dbba84`. Beschreibt, was der Code durchgängig tut – nicht, was er tun sollte._

## Style and naming
- **Linter:** ESLint 9 mit Flat Config `eslint.config.mjs` → `eslint-config-next/core-web-vitals` (stated). Daneben liegt noch eine alte `.eslintrc.json` (`"extends": "next/core-web-vitals"`), die ESLint 9 im Flat-Config-Modus nicht liest (inferred). Script `"lint": "eslint src"` in `package.json` – geprüft wird nur `src/`.
- **Lint-Stand:** `npm run lint` lief am 2026-11-03 ohne Fehler und ohne Warnungen durch. Die im Audit in `features/INDEX.md` gemeldeten Fehler (BUG-SITE-1) sind über Inline-Unterdrückungen gelöst: `src/components/ui/fade-in.tsx:24` (`react-hooks/set-state-in-effect`); `src/components/ui/animated-counter.tsx` hat keine Unterdrückung mehr. Weitere `eslint-disable-next-line` in `src/components/layout/header.tsx:39` (`set-state-in-effect`), `src/components/filmstreifen-karussell.tsx:74` und `:89` (`exhaustive-deps`), `src/components/hero-scroll.tsx:102` und `src/components/contact-form.tsx:478` (`@next/next/no-img-element`), `src/components/ui/sidebar.tsx:665` (`react-hooks/purity`).
- **Formatter:** keine Prettier-Konfiguration gefunden (gesucht: `.prettierrc*`, `prettier.config.*`, `package.json`). Der Code ist trotzdem einheitlich: doppelte Anführungszeichen, keine Semikolons, 2 Leerzeichen Einrückung (z. B. `src/app/page.tsx`, `src/components/contact-form.tsx`, `src/components/ui/button.tsx` – 0 Zeilen mit `;` am Zeilenende). Ausnahme: `vitest.config.ts` nutzt einfache Anführungszeichen.
- **TypeScript:** `strict: true`, Pfad-Alias `@/*` → `./src/*` (`tsconfig.json`). Ein `any`: `src/lib/projekte-service.ts:4` (`mapRow(row: any)`). Keine `@ts-ignore`/`@ts-expect-error` gefunden.
- **Dateinamen:** kebab-case für alle Komponenten, Hooks und Libs (`src/components/projekt-card.tsx`, `src/hooks/use-mobile.tsx`, `src/lib/contact-schema.ts`). Komponenten-Exporte in PascalCase als benannte Exporte (`export function ContactForm` in `src/components/contact-form.tsx`). Seiten sind `export default` (`src/app/page.tsx` → `Home`).
- **Sprache im Code:** Fachbegriffe auf Deutsch (`projekte`, `kundentyp`, `leistungsart`, `vorname`, `bewertungen`, `Projekt`, `Kundentyp`), technische Begriffe auf Englisch (`getProjekte`, `mapRow`, `handleFiles`, `FormStatus`). Spaltennamen in Supabase ebenfalls deutsch/snake_case (`bilder_urls`, `cover_url`, `ip_address` in `src/app/api/contact/route.ts`, `src/lib/projekte-service.ts`).
- **Ordner:** `src/app/` (App Router, eine `page.tsx` je Route), `src/components/` (Seitenabschnitte, flach), `src/components/layout/` (Header, Footer), `src/components/ui/` (shadcn/ui laut `components.json` plus eigene Bausteine wie `fade-in.tsx`, `section-header.tsx`, `section-wrapper.tsx`, `page-hero.tsx`, `review-card.tsx`, `animated-counter.tsx`), `src/lib/` (Schema, Supabase-Clients, Datenservice), `src/hooks/`.
- **Inhalte:** Texte, Kennzahlen, Bewertungen und Logos stehen als Konstanten direkt in Seiten und Komponenten, meist am Dateiende (`src/app/page.tsx:338` `vorteile`, `:378` `partnerLogos`; `src/app/ueber-uns/page.tsx:44` `kpis`; `src/components/bewertungen-scroll.tsx:7` `bewertungen`). Nur Projekte kommen aus der Datenbank.
- **Kommentare:** Abschnittsmarker im JSX (`{/* ── HERO ── */}` in `src/app/page.tsx`), kurze JSDoc-Zeilen an Hilfsfunktionen (`src/app/api/contact/route.ts:8`, `:18`).
- **Commits:** Conventional Commits mit Feature-Scope, Beschreibung überwiegend Deutsch, ältere Englisch (`git log`: `feat(PROJ-2): …`, `fix(a11y): …`, `deploy(PROJ-2): …`, `perf: …`, `revert: …`).

## State, data fetching, errors
- **State:** nur lokaler React-State mit `useState`; kein Context, kein globaler Store (gesucht: `createContext`, `useContext` in `src/` außerhalb `components/ui/`). Client-Komponenten tragen `"use client"` (z. B. `src/components/layout/header.tsx`, `src/components/projekt-filter.tsx`). Ausnahme: `src/hooks/use-toast.ts` hält ein modulweites `memoryState` (shadcn-Standard), wird außerhalb von `components/ui/` aber nicht verwendet.
- **Formulare:** `react-hook-form` + `zodResolver` mit einem gemeinsamen Zod-Schema `src/lib/contact-schema.ts`, das Client (`src/components/contact-form.tsx:56`) und Server (`src/app/api/contact/route.ts:34`) beide nutzen. Mehrstufiger Assistent über `STEP_FIELDS` und `form.trigger` (`src/components/contact-form.tsx:42`, `:129`).
- **Lesen:** Server Components rufen Funktionen aus `src/lib/projekte-service.ts` direkt auf (`getProjekte`, `getProjektBySlug`, `getProjekteByKundentyp(en)`, `getAllSlugs`), mit ISR `export const revalidate = 60` (`src/app/page.tsx:30`, `src/app/projekte/page.tsx:11`, `src/app/projekte/[slug]/page.tsx:12`, `src/app/leistungen/gewerbe/page.tsx:45`, `src/app/leistungen/privat/page.tsx:45`) und `generateStaticParams` für Projektdetailseiten. Der Service nutzt den Service-Role-Client aus `src/lib/supabase-server.ts`.
- **Schreiben:** Das Kontaktformular sendet per `fetch("/api/contact", { method: "POST" })` (`src/components/contact-form.tsx:148`) an den Route Handler `src/app/api/contact/route.ts`. Keine Server Actions (gesucht: `"use server"`).
- **Ausnahme vom Muster:** Bild-Uploads gehen direkt aus dem Browser mit dem Anon-Client `src/lib/supabase.ts` in den Storage-Bucket `lead-attachments` (`src/components/contact-form.tsx:103-105`), nicht über die API.
- **Fehler – Datenzugriff:** Jede Service-Funktion fängt Fehler und gibt still `[]` bzw. `null` zurück, ohne Logging (`src/lib/projekte-service.ts:30-33` u. a.). Eine fehlende Projektseite führt zu `notFound()` (`src/app/projekte/[slug]/page.tsx:46`). Keine `error.tsx`, `not-found.tsx` oder `loading.tsx` unter `src/app/`.
- **Fehler – API:** generische deutsche Fehlermeldungen mit Statuscode (400 `Ungültige Formulardaten`, 429, 500 `Datenbankfehler` / `Interner Serverfehler`) und `console.error` als einziges Logging (`src/app/api/contact/route.ts:36-40`, `:74`, `:80`).
- **Fehler – UI:** Kontaktformular mit Statusmaschine `idle | submitting | success | error` (`src/components/contact-form.tsx:26`) und Inline-Hinweis bei `status === "error"` (`:523`); Feldfehler über `FormMessage`. Bild-Ladefehler über `onError` + State-Fallback (`src/components/projekt-card.tsx:18`, `src/components/hero-image.tsx:7`, `src/components/layout/header.tsx:35`). Toasts (`sonner`, `use-toast`) sind installiert, aber außerhalb von `components/ui/` nicht im Einsatz.

## Tests
- **Runner:** Vitest 4 (jsdom, `globals: true`, Setup `src/test/setup.ts` lädt nur `@testing-library/jest-dom`; `vitest.config.ts`) und Playwright 1.58 (`playwright.config.ts`, `testDir: ./tests`, Projekte `chromium` und `Mobile Safari`, startet `npm run dev` als Webserver). Scripts: `test` → `vitest run`, `test:e2e` → `playwright test --pass-with-no-tests`, `test:all` (`package.json`).
- **Count:** 0 Testdateien. `tests/` ist leer; unter `src/` gibt es keine `*.test.*`/`*.spec.*`. Beide Runner sind auf „grün ohne Tests“ gestellt (`passWithNoTests: true` in `vitest.config.ts`, `--pass-with-no-tests` in `package.json`).
- **What they cover:** nichts.
- **What they do not:** alle kritischen Pfade, unter anderem
  - Lead-Erfassung, Honeypot, Validierung und Rate-Limit: `src/app/api/contact/route.ts`
  - gemeinsames Formular-Schema: `src/lib/contact-schema.ts`
  - mehrstufiges Formular und Bild-Upload: `src/components/contact-form.tsx`
  - Projektabfragen (nur `published = true`): `src/lib/projekte-service.ts`
  - Filterlogik: `filterProjekte` in `src/lib/projekte-data.ts`
  - SEO-Ausgaben: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/structured-data.tsx`
  - Navigation: `src/components/layout/header.tsx`

## What a finished change looks like here
- **Im Repo erzwungen:** nichts. Keine CI-Workflows (`.github/` fehlt), keine Git-Hooks (`.git/hooks` nur Samples, kein `.husky/`), kein PR-Template, kein Hook in `.claude/settings.json` gefunden. Eine CI-Vorlage liegt nur als Kit-Asset unter `.claude/skills/verify-setup/assets/ci/quality.yml` und ist nicht aktiv (inferred).
- **Verfügbar, aber freiwillig:** `npm run lint`, `npm run build` (Next.js prüft dabei die Typen, inferred), `npm run test` / `npm run test:e2e` (laufen ohne Tests grün). Kein eigenes `typecheck`-Script.
- **Praxis laut Historie:** Commits im Muster `feat|fix|deploy(PROJ-X): …`; der QA-Stand pro Feature wird in `features/INDEX.md` und den Feature-Ordnern dokumentiert (Audit vom 2026-04-05 dort).

## Could not determine
- Ob `.eslintrc.json` irgendwo noch gelesen wird (z. B. von einer Editor-Erweiterung) – aus den Dateien nicht ableitbar.
- Ob `npm run build` derzeit fehlerfrei durchläuft – nicht ausgeführt, um keine Build-Artefakte zu erzeugen.
- Ob vor Deploys auf Vercel Checks laufen (Vercel-Projekteinstellungen liegen nicht im Repo).
