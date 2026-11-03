---
id: PROJ-8
title: WhatsApp Chat-Widget
created: 2026-03-22
author: Julian Amini
priority: Mittel
reference: bender-carparts.de
---

# PROJ-8: WhatsApp Chat-Widget

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-8`
> bindet es richtig in die Kette ein.

## 1. Beschreibung

Auf der Website soll ein WhatsApp-Chat-Widget integriert werden, das dem Besucher eine direkte Kontaktmöglichkeit per WhatsApp bietet. Das Widget besteht aus einem dauerhaft sichtbaren WhatsApp-Button (unten rechts) sowie einem aufklappbaren Chatfenster im authentischen WhatsApp-Design. Als Designreferenz dient die Implementierung auf bender-carparts.de.

---

## 2. Funktionale Anforderungen

### 2.1 WhatsApp-Button (Floating Action Button)

- Der Button ist dauerhaft sichtbar (fixed position) in der unteren rechten Ecke des Bildschirms.
- Der Button zeigt das offizielle WhatsApp-Icon (weißes Telefon auf grünem Kreis).
- Der Button ist auf allen Seiten der Website verfügbar.
- Der Button hat einen roten Notification-Badge (Punkt), um Aufmerksamkeit zu erzeugen.
- Der Button ist responsiv und auf Desktop sowie Mobile korrekt positioniert.
- Beim Klick auf den Button öffnet/schließt sich das Chatfenster (Toggle-Funktion).

### 2.2 Chatfenster (Chat-Popup)

- Das Chatfenster öffnet sich automatisch beim ersten Laden der Seite (Auto-Open nach 1 Sek.).
- Nach manuell Schließen bleibt das Fenster für die Session geschlossen (sessionStorage).
- Der Besucher kann das Chatfenster über ein ×-Symbol (oben rechts im Header) schließen.
- Das Chatfenster erscheint über dem WhatsApp-Button (unten rechts, oberhalb des Buttons).
- Das Design orientiert sich vollständig am originalen WhatsApp-Look-and-Feel.

### 2.3 Aufbau des Chatfensters

**Header (dunkelgrüner Balken #075E54):**
- Firmenlogo (rund, mit grünem Online-Indikator #25D366)
- Firmenname: „Grünschnitt by Marvin Amini"
- Statustext: „Antwortet innerhalb von einer Stunde"
- Schließen-Button (×)

**Nachrichtenbereich (WhatsApp-Chat-Hintergrund #E5DDD5):**
- Hintergrund mit typischem WhatsApp-Chat-Muster (helles Beige mit dezenten Punkten)
- Absender-Label über der Bubble
- Vorkonfigurierte Willkommensnachricht als Chat-Bubble mit Zeitstempel
- Nachrichtentext: „Guten Tag 👋 / Schreiben Sie uns direkt – wir beraten Sie persönlich und erstellen Ihnen ein unverbindliches Angebot."

**Footer (Call-to-Action):**
- Grüner „Chat starten"-Button (#25D366) mit WhatsApp-Icon
- Klick öffnet WhatsApp (Web oder App) mit vorbefüllter Nachricht an `+49 151 68452004`

---

## 3. Nicht-funktionale Anforderungen

- Das Widget darf die Ladezeit der Seite nicht merklich beeinträchtigen (Lightweight-Implementierung, keine externe JS-Bibliothek).
- Das Widget muss vollständig responsive sein (Desktop, Tablet, Mobile).
- Das Widget muss auf allen gängigen Browsern korrekt dargestellt werden (Chrome, Firefox, Safari, Edge).
- Das Widget soll barrierefrei bedienbar sein (`aria-label`, `role="dialog"`, Keyboard-Navigation).
- Telefonnummer und Nachrichtentext sind als Konstanten oben in der Datei konfigurierbar.

---

## 4. Technische Hinweise

- Implementierung als React/Next.js Client-Komponente (`"use client"`).
- WhatsApp-Deeplink: `https://wa.me/4915168452004?text=<encoded>`
- Auto-Open via `useEffect` + `setTimeout(1000ms)` nach Mount.
- Session-Persistenz via `sessionStorage.getItem/setItem('wa-chat-closed')`.
- Z-Index: `z-50` — über allen Seitenelementen.
- Animation: `scale` + `opacity` Transition (300ms) beim Öffnen/Schließen.
- Alle Farben als `style`-Inline-Props gesetzt (kein Tailwind-Arbitrary-Color-Purging-Problem).

---

## 5. Akzeptanzkriterien

- [ ] **AC-1** — Der WhatsApp-Button ist auf allen Seiten dauerhaft sichtbar (unten rechts).
- [ ] **AC-2** — Das Chatfenster öffnet sich automatisch nach ~1 Sek. beim ersten Besuch.
- [ ] **AC-3** — Das Chatfenster bleibt nach manuell Schließen für die Session geschlossen.
- [ ] **AC-4** — Manuelles Öffnen via Button-Klick funktioniert jederzeit.
- [ ] **AC-5** — Das Chatfenster entspricht optisch dem WhatsApp-Design (Referenz: bender-carparts.de).
- [ ] **AC-6** — Der „Chat starten"-Button leitet korrekt zu WhatsApp weiter (mit vorbefüllter Nachricht).
- [ ] **AC-7** — Das Widget ist auf Desktop und Mobile korrekt dargestellt und bedienbar.
- [ ] **AC-8** — `npm run build` liefert keine TypeScript-Fehler.

---
