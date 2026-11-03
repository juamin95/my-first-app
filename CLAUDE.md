<!-- AI-ENG-KIT:START (managed — do not edit by hand; refreshed by /verify-setup) -->
## AI Engineering Workflow

`/init → /write-spec → /architecture → /tasks → /build → /qa → /deploy`

Feature artifacts: `features/PROJ-X-name/{spec,design,tasks,qa-report}.md`.
Use `/refine` for changes, `/audit` for drift, `/dsgvo` for personal data, `/e2e-tests` for critical
journeys, `/security-check` and `/cleanup` after release. Phase details live in the skills;
specialist guidance in `docs/kit/guides/` and matching `docs/stacks/` packs is read on demand.

@.claude/rules/general.md
@.claude/rules/security.md
<!-- AI-ENG-KIT:END -->

# Grünschnitt – Unternehmenswebseite

> In diesem Projekt ist das AI Engineering Kit installiert – ein spec-getriebener Workflow.
> Diese Datei ist der eine Ort, an dem der Projektkontext gepflegt wird.

## Key Conventions

- **Working language: Deutsch.** Talk to the user in Deutsch and write every project document in Deutsch — see `.claude/rules/general.md` → Working Language.
- **Feature-IDs:** PROJ-1, PROJ-2 usw. (fortlaufend; bestehende IDs wie PROJ-3a/PROJ-3b bleiben, wie sie sind)
- **Feature-Ordner:** ein Ordner pro Feature, `features/PROJ-X-name/` mit `spec.md`, `design.md`, `tasks.md`, `qa-report.md` (siehe `features/README.md`). Status steht nur in `features/INDEX.md`.
- **Commits:** `feat(PROJ-X): Beschreibung`, `fix(PROJ-X): Beschreibung`
- **Single Responsibility:** ein Feature pro Ordner
- **Feature-Branches:** Vor `/build` entsteht ein Branch `feat/PROJ-X-name`; die Arbeit bleibt dort bis Build/QA, `/deploy` merged ihn. `main` bleibt immer deploybar (Vercel deployt automatisch von `main`).
- **Human-in-the-loop:** Alle Workflows haben Freigabe-Punkte durch den Nutzer.
- **Secrets / env-Dateien:** Nie echte env- oder Credential-Dateien lesen oder schreiben. Nur Dummy-Beispiele bearbeiten; Schlüsselnamen und Ort beim Anbieter nennen, damit der Nutzer echte Werte selbst einträgt.
- **shadcn/ui first:** Installierte shadcn-Komponenten in `src/components/ui/` nie nachbauen oder eigene Versionen davon anlegen.
- **Formulare:** Validierung mit Zod + react-hook-form (gemeinsames Schema für Client und Server, z. B. `src/lib/contact-schema.ts`).
- **Ordnerstruktur `src/`:** `app/` Seiten (App Router) · `components/` Abschnitte, `components/layout/` Header/Footer, `components/ui/` shadcn/ui · `hooks/` eigene Hooks · `lib/` Hilfsfunktionen, Supabase-Clients, Datenservice. Produktions-Leitfäden in `docs/production/`.
- **Dieses Projekt existierte vor dem Kit.** Sein Code, seine Struktur und seine Konventionen sind maßgeblich – folge dem Vorhandenen statt den Kit-Vorgaben. Wo sich beides widerspricht, gewinnt das Projekt.

## How This Project Runs

_Von `/init` am 2026-11-03 aus den bestätigten Antworten erzeugt; Quelle ist `.ai-eng-kit`._

- **Platform:** web · **Mode:** existing · **Quality:** standard · **Law:** gdpr · **Feature-Präfix:** PROJ
- **Stack:** Next.js 16 (App Router) · Supabase (Postgres + Storage, kein Auth im Einsatz) · shadcn/ui auf Tailwind CSS 3 · Vitest · Playwright · npm · Deploy: Vercel
- **Start:** `npm run dev` (Entwicklung, `localhost:3000`); Produktionsserver lokal: `npm run build` und danach `npm run start`
- **Verify:** Probe `http` gegen `http://localhost:3000` (keine Health-Route; `GET /` bzw. `/robots.txt`). Nie gegen die Produktivadresse prüfen.
- **Layers:** keine (`layers: []`); `scripts/upload-projekt-bilder.mjs` ist ein manuelles Einmal-Skript, keine Laufzeit.
- **Closing check:** kein Aggregat (`commands.check: null`, `checkLayers: []`, `checkCoverage: null`) — die Einzelbefehle laufen nacheinander:
  - Lint: `npm run lint` (prüft nur `src/`)
  - Typecheck: `npx tsc --noEmit`
  - Test: `npm run test` — läuft mit `passWithNoTests` und es gibt derzeit **keine einzige Testdatei**: ein grüner Testlauf beweist zurzeit nichts.
  - Build: `npm run build`
  - Structure-Check: keiner
- **Deploy:** Vercel, Auto-Deploy von `main` auf `https://www.gruenschnitt-amini.de`; einzige Freigabe ist der Merge nach `main` durch den Nutzer. Keine CI.
- **Datenbank:** eine Supabase-Instanz `bnzpdujupmmrwcbunbql` (`eu-west-1`, Irland) = Produktion; `Environment strategy: single` (siehe `docs/decisions.md` → ADR-001). Schema liegt nur in der Instanz, nicht im Repo.
- **Externe Abhängigkeit:** Ein n8n-Flow außerhalb des Repos verschickt neue Leads per Mail. Änderungen an der Tabelle `leads` können ihn brechen.
- **Codebase map:** `docs/codebase/` — geschrieben von `/map`, vor jedem Design lesen; nach größeren Änderungen `/map` erneut ausführen.

## Product Context

@docs/PRD.md

## Data Model

@docs/data-model.md

## Feature Overview

@features/INDEX.md
