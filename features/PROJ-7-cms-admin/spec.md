# PROJ-7: Supabase als CMS (Dynamische Inhalte)

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-7`
> bindet es richtig in die Kette ein.

**Created:** 2026-03-14
**Last Updated:** 2026-03-21

## Abhängigkeiten
- Requires: PROJ-6 (Projektgalerie) – Projekte werden dynamisch aus Supabase geladen

## Ansatz
Kein eigenes Admin-Interface auf der Webseite. Inhalte werden direkt im **Supabase Table Editor** gepflegt — Supabase fungiert als einfaches, sicheres CMS. Die Webseite liest die Daten und zeigt sie dynamisch an.

**Vorteile:**
- Kein Login auf der Webseite nötig
- Keine Sicherheitsrisiken durch eigene Auth-Implementierung
- Supabase Table Editor ist intuitiv genug für einfache Pflege
- Bilder-Upload über Supabase Storage direkt im Dashboard

## User Stories
- Als Inhaber möchte ich neue Projekte direkt im Supabase Dashboard anlegen können, ohne Code anfassen zu müssen
- Als Inhaber möchte ich Projektbilder in Supabase Storage hochladen und verknüpfen können
- Als Inhaber möchte ich Projekte als Entwurf speichern können (nicht öffentlich sichtbar)
- Als Inhaber möchte ich eingegangene Leads direkt in Supabase einsehen können (read-only)
- Als Inhaber möchte ich Kundenbewertungen in Supabase pflegen, damit sie auf der Startseite erscheinen

## Akzeptanzkriterien

### Supabase Tabellen & Struktur
- [x] **AC-1** — Tabelle `projekte`: id, slug, titel, subtext, beschreibung, leistungen, kategorie, kundentyp, ort, jahr, published, cover_url, bilder, created_at
- [x] **AC-2** — Tabelle `bewertungen`: id, name, firma, text, sterne, tag, published, created_at
- [x] **AC-3** — Tabelle `leads`: vorhanden (PROJ-5), nur lesend genutzt
- [x] **AC-4** — Alle Spalten mit Kommentaren versehen (Supabase Table Editor selbsterklärend)
- [x] **AC-5** — 6 Beispielprojekte als Seed-Daten geladen

### Row Level Security (RLS)
- [x] **AC-6** — `projekte`: SELECT nur für published=true; kein öffentlicher Schreibzugriff
- [x] **AC-7** — `bewertungen`: SELECT nur für published=true; kein öffentlicher Schreibzugriff
- [x] **AC-8** — `leads`: RLS aktiviert (kein öffentlicher Zugriff)

### Webseite liest dynamisch aus Supabase
- [x] **AC-9** — Projektgalerie lädt Projekte aus `projekte`-Tabelle via `src/lib/projekte-service.ts`
- [x] **AC-10** — Nur published=true Projekte sind öffentlich sichtbar
- [x] **AC-11** — Fehlerfall: Supabase nicht erreichbar → Fallback leere Liste, kein 500-Fehler
- [x] **AC-12** — CLOSED (bewusste Entscheidung) – Bewertungen bleiben hardcoded. `bewertungen`-Tabelle wurde gelöscht. Bewertungen werden manuell im Code gepflegt.

### Supabase Storage
- [x] **AC-13** — Bucket `projekt-bilder` erstellt (öffentlicher Lesezugriff, max 10 MB, JPEG/PNG/WebP/GIF)

## Dynamische Inhalte im Überblick

| Inhalt | Tabelle | Wer pflegt es |
|--------|---------|---------------|
| Projektgalerie | `projekte` | Inhaber im Supabase Dashboard |
| Kundenbewertungen | `bewertungen` | Inhaber im Supabase Dashboard |
| Leads / Anfragen | `leads` | Nur lesen (N8n + Supabase Dashboard) |

## Randfälle
- **EC-1** — Was passiert wenn `projekte`-Tabelle leer ist? → Galerie zeigt leeren Zustand mit Hinweistext
- **EC-2** — Was passiert wenn ein Entwurf-Projekt direkt aufgerufen wird? → 404-Seite
- **EC-3** — Was passiert wenn Supabase nicht erreichbar ist? → Seite lädt ohne Projekte/Bewertungen, kein Absturz
- **EC-4** — Was passiert bei fehlerhafter Bild-URL? → Fallback-Bild oder Platzhalter

## Technische Anforderungen
- Datenabruf: Supabase JS Client (server-side mit Service Role Key für ISR/SSR)
- Caching: Next.js ISR (revalidate: 60s) – Änderungen erscheinen nach max. 60 Sekunden
- Bilder: Supabase Storage, öffentlicher Bucket, URLs direkt in der Tabelle gespeichert
- RLS: Service Role Key umgeht RLS für Lesezugriffe vom Server – kein öffentlicher Anon-Key für Datenbankzugriffe

---
