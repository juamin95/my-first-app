# Projektweite Entscheidungen

> Entscheidungen, die mehrere Features oder Laufzeiten betreffen. Entscheidungen, die nur ein Feature betreffen, stehen in dessen `design.md` → Technical Decisions. Feature-Designs verlinken die ID, statt den Text zu kopieren.

## ADR-001: Eine Supabase-Instanz für Entwicklung und Produktion

- **Status:** Accepted
- **Datum:** 2026-11-03 (festgehalten von `/init`)
- **Geltungsbereich:** alle Features mit Datenbank — PROJ-5 (`leads`, Bucket `lead-attachments`), PROJ-6 und PROJ-7 (`projekte`, Bucket `projekt-bilder`)

**Kontext:** Das Projekt nutzt genau eine gehostete Supabase-Instanz, `bnzpdujupmmrwcbunbql` in `eu-west-1` (Irland). Sie enthält die echten Leads. Das Schema existiert nur in dieser Instanz; im Repo gibt es weder einen `supabase/`-Ordner noch Migrationsdateien (`docs/codebase/architecture.md` → Data).

**Entscheidung:** `Environment strategy: single`. Die Instanz ist zugleich Entwicklungs- und Produktionsumgebung. Das ist der vom Betreiber bestätigte Ist-Zustand, keine neu getroffene Wahl; Gründe aus der Entstehungszeit sind nicht dokumentiert und werden hier nicht nachträglich erfunden.

**Alternativen:** `local` (Supabase in Docker für die Entwicklung) und `two-projects` (getrennte Dev- und Prod-Instanz) sind bekannt. Ob gewechselt wird, entscheidet der Betreiber später; am 2026-11-03 wurde nichts eingerichtet.

**Konsequenzen:**
- ⚠️ Jede Entwicklungsarbeit an der Datenbank trifft die Live-Daten.
- Schemaänderungen lassen sich vor dem Go-live nirgends getrennt erproben.
- Der externe n8n-Flow liest `leads` aus derselben Instanz; Änderungen an `leads` wirken sofort auf ihn.

**Voraussetzung für einen späteren Wechsel:** Das Schema muss zuerst als Migrationen ins Repo kommen (Tabellen, Constraints, Policies, Buckets). Ohne das lässt sich keine zweite Umgebung aufbauen.

**Lasttragend:** ja — die Datenregion (`eu-west-1`) ist ohne Umzug der ganzen Datenbank nicht änderbar, und Lead-Daten sind geschäftskritisch.
