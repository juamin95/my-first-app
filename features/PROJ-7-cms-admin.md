# PROJ-7: Supabase als CMS (Dynamische Inhalte)

## Status: Planned
**Created:** 2026-03-14
**Last Updated:** 2026-03-20

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
- [ ] Tabelle `projekte`: id, titel, slug, beschreibung, kategorie, ort, jahr, published (bool), cover_url, bilder (json array), created_at
- [ ] Tabelle `bewertungen`: id, name, firma, text, sterne (1-5), published (bool), created_at
- [ ] Tabelle `leads`: bereits vorhanden durch PROJ-5, nur lesend genutzt
- [ ] Alle Tabellen mit sinnvollen Spaltenkommentaren versehen (damit der Table Editor selbsterklärend ist)

### Row Level Security (RLS)
- [ ] `projekte`: öffentliches Lesen nur für published=true; Schreiben nur über Service Role Key (kein öffentlicher Schreibzugriff)
- [ ] `bewertungen`: öffentliches Lesen nur für published=true; Schreiben nur über Service Role Key
- [ ] `leads`: kein öffentliches Lesen (nur über Supabase Dashboard oder N8n einsehbar)

### Webseite liest dynamisch aus Supabase
- [ ] Projektgalerie (PROJ-6) lädt Projekte aus `projekte`-Tabelle statt aus lokaler Datei
- [ ] Nur published=true Projekte sind öffentlich sichtbar
- [ ] Startseite lädt Kundenbewertungen aus `bewertungen`-Tabelle (falls vorhanden)
- [ ] Fehlerfall: Wenn Supabase nicht erreichbar → Fallback auf leere Liste, keine 500-Fehler

### Supabase Storage
- [ ] Bucket `projekt-bilder` erstellt (öffentlicher Lesezugriff)
- [ ] Anleitung im README: Wie lade ich ein Bild hoch und verknüpfe es mit einem Projekt?

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

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
