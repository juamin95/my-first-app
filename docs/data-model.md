_Quelle: Live-Instanz Supabase `bnzpdujupmmrwcbunbql` (`eu-west-1`), gelesen von `/map` am 2026-11-03, übernommen von `/init` am 2026-11-03. Das ist **eine laufende Instanz zu einem Zeitpunkt, keine Definition** — im Repo steht kein Schema (kein `supabase/`-Ordner, keine `.sql`-Datei, keine Migrationsdatei). Einzelheiten mit Fundstellen: `docs/codebase/architecture.md` → Data._

# Datenmodell

> Die app-weite Übersicht, **welche Daten das Produkt speichert und wie sie zusammenhängen** — die gemeinsame Vorlage, an die sich die Tabellen jedes Features halten.
>
> - Angelegt von `/init` (erster Gesamtüberblick: Entitäten + Beziehungen).
> - Verfeinert von `/architecture`, sobald ein Feature entworfen wird.
> - **Flughöhe:** Entitäten, Beziehungen und Zuständigkeit stehen hier (Produktebene, für jeden lesbar). Spaltentypen, Indizes und genaue Fremdschlüssel entscheidet jedes Feature in seinem `design.md` — nicht hier.

## Entitäten

| Entität | Was sie darstellt | Zuständig / wer sie sieht |
|---------|-------------------|---------------------------|
| Lead (`leads`) | Eine Anfrage aus dem Kontaktformular: Kontaktdaten, Kundentyp, Leistungsart, Nachricht, Pfade hochgeladener Bilder, IP-Adresse, Bearbeitungsstatus | PROJ-5. Öffentlich: nur anlegen (Formular). Lesen: Betreiber im Supabase-Dashboard und der externe n8n-Flow. Kein Lesen über die Webseite. |
| Lead-Anhang (Bucket `lead-attachments`, privat) | Ein Bild, das ein Besucher zu seiner Anfrage hochlädt | PROJ-5. Öffentlich: nur hochladen. Lesen: Betreiber. |
| Projekt (`projekte`) | Ein Referenzprojekt für die Galerie: Titel, Ort, Jahr, Kundentyp, Beschreibung, Leistungen, Titelbild, Bilder, veröffentlicht ja/nein | PROJ-6 (Anzeige), PROJ-7 (Pflege). Öffentlich sichtbar nur veröffentlichte Projekte. Pflege durch den Betreiber im Supabase-Dashboard. |
| Projektbild (Bucket `projekt-bilder`, öffentlich) | Ein Bild zu einem Projekt | PROJ-7 (Pflege), PROJ-6 (Anzeige). Öffentlich lesbar per URL. |

Bewertungen, Kennzahlen und Leistungstexte sind keine gespeicherten Daten — sie stehen fest im Code (`docs/codebase/conventions.md` → Inhalte).

## Beziehungen

- Ein Lead kann mehrere Lead-Anhänge haben (die Pfade stehen im Lead; es gibt keine Datenbank-Verknüpfung, und ein hochgeladenes Bild kann ohne Lead liegen bleiben).
- Ein Projekt hat ein Titelbild und mehrere Projektbilder (als URLs im Projekt gespeichert).
- Leads und Projekte sind nicht miteinander verbunden.

## Externe Leser

- **n8n-Flow (außerhalb dieses Repos)** liest neue Leads und verschickt sie per Mail an den Betreiber (laut Betreiber, 2026-11-03). Wie er an die Daten kommt, ist nicht dokumentiert. Jede Änderung an `leads` — Spalten, Constraints, Policies — kann den Flow brechen. _(inferred)_ Die Spalte `processed` wird vom Code nie geschrieben und könnte das Kennzeichen sein, mit dem der Flow verarbeitete Leads markiert.

## Diagramm

```
Lead ──hat 0..n──> Lead-Anhang      (Pfade im Lead, ohne Fremdschlüssel)
  └── wird gelesen von: n8n-Flow (extern)

Projekt ──hat 1 Titelbild + 0..n──> Projektbild   (URLs im Projekt)
```

---

_Lebendes Dokument. Wenn `/architecture` ein Feature entwirft, das eine Entität einführt oder ändert, aktualisiert es zuerst diese Übersicht._
