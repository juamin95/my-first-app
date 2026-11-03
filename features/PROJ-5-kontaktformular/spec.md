# PROJ-5: Kontaktformular & Lead-Erfassung

> Migrated from the AI Coding Starter Kit. Dieses Feature entstand, bevor es die Kette AC → Task → Test gab.
> Es hat deshalb keine `tasks.md`, und seine AC-IDs stehen in keinem Task. `/refine PROJ-5`
> bindet es richtig in die Kette ein.

**Created:** 2026-03-14
**Last Updated:** 2026-03-20

## Abhängigkeiten
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als Besucher möchte ich einfach und schnell eine Anfrage stellen können, damit ich nicht lange suchen muss
- Als gewerblicher Kunde möchte ich angeben können dass ich eine Hausverwaltung/Baufirma bin, damit ich eine passende Antwort bekomme
- Als Besucher möchte ich nach dem Absenden eine Bestätigung sehen, damit ich weiß dass meine Anfrage angekommen ist
- Als Inhaber möchte ich über neue Anfragen informiert werden – dies erfolgt über Backend-Automatisierungsflows (außerhalb dieser Spec)
- Als Inhaber möchte ich qualifizierte Leads von kleinen Anfragen unterscheiden können, damit ich Prioritäten setzen kann

## Akzeptanzkriterien

### Seite & Layout
- [ ] **AC-1** — Seite erreichbar unter `/kontakt`
- [ ] **AC-2** — Seiten-Hero: "Kontakt aufnehmen" + Einleitungstext (z.B. "Wir melden uns innerhalb von 24 Stunden")
- [ ] **AC-3** — Neben dem Formular: Kontaktdaten (Telefon, E-Mail, Adresse, Öffnungszeiten)
- [ ] **AC-4** — Optional: Google Maps Embed oder Adressbox

### Formularfelder
- [ ] **AC-5** — Pflichtfeld: Vorname + Nachname
- [ ] **AC-6** — Pflichtfeld: E-Mail-Adresse (mit Validierung)
- [ ] **AC-7** — Pflichtfeld: Telefonnummer
- [ ] **AC-8** — Pflichtfeld: Kundentyp (Radio: "Privatkunde" / "Gewerblich (Hausverwaltung, Baufirma, etc.)")
- [ ] **AC-9** — Pflichtfeld: Art der Anfrage (Dropdown: Gartengestaltung, Gartenpflege, Pflasterarbeiten, Terrassenbau, Sonstiges)
- [ ] **AC-10** — Pflichtfeld: Kurzbeschreibung / Nachricht (Textarea, min. 20 Zeichen)
- [ ] **AC-11** — Optional: Ungefährer Projektumfang (Dropdown: < 1.000 €, 1.000–5.000 €, 5.000–20.000 €, > 20.000 €)
- [ ] **AC-12** — Datenschutz-Checkbox (Pflicht): "Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu"
- [ ] **AC-13** — Absenden-Button: "Anfrage senden"

### Validierung & UX
- [ ] **AC-14** — Client-seitige Validierung (Zod + react-hook-form): Fehlermeldungen unter den Feldern
- [ ] **AC-15** — Formular kann nur abgesendet werden wenn alle Pflichtfelder korrekt ausgefüllt sind
- [ ] **AC-16** — Nach Absenden: Erfolgs-Meldung sichtbar ("Vielen Dank! Wir melden uns in Kürze.")
- [ ] **AC-17** — Formular wird nach Absenden geleert oder durch Erfolgsmeldung ersetzt
- [ ] **AC-18** — Fehlerstatus (Server Error): "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."

### Backend / Lead-Erfassung
- [ ] **AC-19** — Formular-Submit sendet Daten an eine Next.js API Route (`/api/contact`)
- [x] **AC-20** — CLOSED – E-Mail-Benachrichtigung erfolgt über Backend-Automatisierungsflows des Inhabers, nicht über die API Route
- [ ] **AC-21** — Leads werden in Supabase-Tabelle `leads` gespeichert (für spätere Auswertung)
- [ ] **AC-22** — Anti-Spam: Honeypot-Feld (verstecktes Feld, das Bots ausfüllen)

## Randfälle
- **EC-1** — Was passiert bei ungültiger E-Mail? → Inline-Fehlermeldung "Bitte geben Sie eine gültige E-Mail-Adresse ein"
- **EC-2** — Was passiert wenn der E-Mail-Versand fehlschlägt? → Lead wird trotzdem in DB gespeichert; Fehlermeldung an Nutzer
- **EC-3** — Was passiert wenn der Nutzer mehrfach absendet? → Submit-Button wird nach erstem Klick deaktiviert (Loading-State)
- **EC-4** — Was passiert bei Spam-Bots? → Honeypot-Feld fängt automatisierte Anfragen ab
- **EC-5** — Was passiert wenn Supabase nicht erreichbar? → Fehler wird geloggt, Nutzer sieht generische Fehlermeldung
- **EC-6** — Was passiert auf Mobile mit dem Formular? → Einspaltig, Touch-optimierte Eingabefelder

## Technische Anforderungen
- Formular: react-hook-form + Zod-Validierung
- API: Next.js Route Handler (`app/api/contact/route.ts`)
- E-Mail: Nicht Teil dieser Spec – Benachrichtigung läuft über Backend-Automatisierungsflows
- Datenbank: Supabase Tabelle `leads` (id, created_at, vorname, nachname, email, telefon, kundentyp, leistungsart, nachricht, projektumfang, status)
- DSGVO: Datenschutz-Checkbox verpflichtend, Daten nur so lange gespeichert wie nötig

---
