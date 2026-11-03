# PROJ-7: Supabase als CMS (Dynamische Inhalte): Design

## Implementierungsnotizen

### Neue Dateien
- `src/lib/projekte-service.ts` – Supabase-Fetching: `getProjekte()`, `getProjektBySlug()`, `getAllSlugs()`

### Geänderte Dateien
- `src/app/projekte/page.tsx` – async Server Component, ISR revalidate=60, lädt via `getProjekte()`
- `src/app/projekte/[slug]/page.tsx` – async Server Component, ISR revalidate=60, lädt via `getProjektBySlug()`

### Wie neue Projekte anlegen (Supabase Dashboard)
1. Öffne [supabase.com](https://supabase.com) → Projekt → Table Editor → `projekte`
2. Klicke „Insert row"
3. Felder ausfüllen:
   - `slug`: URL-freundlich, z.B. `gartengestaltung-koeln-sued`
   - `cover_url` / `bilder`: Bild zuerst in Storage → `projekt-bilder` hochladen, dann öffentliche URL kopieren
   - `published`: auf `true` setzen wenn fertig
4. Nach max. 60 Sekunden erscheint das Projekt auf der Webseite (ISR)
