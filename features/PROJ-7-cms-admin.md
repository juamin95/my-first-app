# PROJ-7: Supabase als CMS (Dynamische Inhalte)

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-21

## Ansatz
Kein eigenes Admin-Interface auf der Webseite. Inhalte werden direkt im **Supabase Table Editor** gepflegt — Supabase fungiert als einfaches, sicheres CMS. Die Webseite liest die Daten und zeigt sie dynamisch an.

**Vorteile:**
- Kein Login auf der Webseite nötig
- Keine Sicherheitsrisiken durch eigene Auth-Implementierung
- Supabase Table Editor ist intuitiv genug für einfache Pflege
- Bilder-Upload über Supabase Storage direkt im Dashboard

## Dependencies
- Requires: PROJ-6 (Projektgalerie) – Projekte werden dynamisch aus Supabase geladen

## User Stories
- Als Inhaber möchte ich neue Projekte direkt im Supabase Dashboard anlegen können, ohne Code anfassen zu müssen
- Als Inhaber möchte ich Projektbilder in Supabase Storage hochladen und verknüpfen können
- Als Inhaber möchte ich Projekte als Entwurf speichern können (nicht öffentlich sichtbar)
- Als Inhaber möchte ich eingegangene Leads direkt in Supabase einsehen können (read-only)
- Als Inhaber möchte ich Kundenbewertungen in Supabase pflegen, damit sie auf der Startseite erscheinen

## Acceptance Criteria

### Supabase Tabellen & Struktur
- [x] Tabelle `projekte`: id, slug, titel, subtext, beschreibung, leistungen, kategorie, kundentyp, ort, jahr, published, cover_url, bilder, created_at
- [x] Tabelle `bewertungen`: id, name, firma, text, sterne, tag, published, created_at
- [x] Tabelle `leads`: vorhanden (PROJ-5), nur lesend genutzt
- [x] Alle Spalten mit Kommentaren versehen (Supabase Table Editor selbsterklärend)
- [x] 6 Beispielprojekte als Seed-Daten geladen

### Row Level Security (RLS)
- [x] `projekte`: SELECT nur für published=true; kein öffentlicher Schreibzugriff
- [x] `bewertungen`: SELECT nur für published=true; kein öffentlicher Schreibzugriff
- [x] `leads`: RLS aktiviert (kein öffentlicher Zugriff)

### Webseite liest dynamisch aus Supabase
- [x] Projektgalerie lädt Projekte aus `projekte`-Tabelle via `src/lib/projekte-service.ts`
- [x] Nur published=true Projekte sind öffentlich sichtbar
- [x] Fehlerfall: Supabase nicht erreichbar → Fallback leere Liste, kein 500-Fehler
- [x] CLOSED (bewusste Entscheidung) – Bewertungen bleiben hardcoded. `bewertungen`-Tabelle wurde gelöscht. Bewertungen werden manuell im Code gepflegt.

### Supabase Storage
- [x] Bucket `projekt-bilder` erstellt (öffentlicher Lesezugriff, max 10 MB, JPEG/PNG/WebP/GIF)

## Dynamische Inhalte im Überblick

| Inhalt | Tabelle | Wer pflegt es |
|--------|---------|---------------|
| Projektgalerie | `projekte` | Inhaber im Supabase Dashboard |
| Kundenbewertungen | `bewertungen` | Inhaber im Supabase Dashboard |
| Leads / Anfragen | `leads` | Nur lesen (N8n + Supabase Dashboard) |

## Edge Cases
- Was passiert wenn `projekte`-Tabelle leer ist? → Galerie zeigt leeren Zustand mit Hinweistext
- Was passiert wenn ein Entwurf-Projekt direkt aufgerufen wird? → 404-Seite
- Was passiert wenn Supabase nicht erreichbar ist? → Seite lädt ohne Projekte/Bewertungen, kein Absturz
- Was passiert bei fehlerhafter Bild-URL? → Fallback-Bild oder Platzhalter

## Technical Requirements
- Datenabruf: Supabase JS Client (server-side mit Service Role Key für ISR/SSR)
- Caching: Next.js ISR (revalidate: 60s) – Änderungen erscheinen nach max. 60 Sekunden
- Bilder: Supabase Storage, öffentlicher Bucket, URLs direkt in der Tabelle gespeichert
- RLS: Service Role Key umgeht RLS für Lesezugriffe vom Server – kein öffentlicher Anon-Key für Datenbankzugriffe

---
<!-- Sections below are added by subsequent skills -->

## Implementation Notes

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

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
