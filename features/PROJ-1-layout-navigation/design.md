# PROJ-1: Layout & Navigation: Design

## Technisches Design (Solution Architect)

**Last Updated:** 2026-03-14

### Kein Backend erforderlich
Navigation und Layout sind rein statisch – keine Datenbank, keine API. Alle Inhalte (Links, Firmenname, Kontaktdaten im Footer) sind fest im Code hinterlegt.

---

### Seitenstruktur (Routen)

```
app/
+-- layout.tsx          ← Shared Root-Layout (Header + Footer umschließen alle Seiten)
+-- page.tsx            ← Startseite (/)
+-- leistungen/
|   +-- page.tsx        ← /leistungen
+-- projekte/
|   +-- page.tsx        ← /projekte
+-- ueber-uns/
|   +-- page.tsx        ← /ueber-uns
+-- kontakt/
    +-- page.tsx        ← /kontakt
```

---

### Komponenten-Struktur

```
app/layout.tsx  (Root Layout – wraps alle Seiten)
+-- Header  (src/components/layout/header.tsx)
|   +-- Logo  (links: Bild-Datei + Text-Fallback)
|   +-- Desktop-Navigation  (shadcn NavigationMenu, ab 768px sichtbar)
|   |   +-- Nav-Link: Startseite
|   |   +-- Nav-Link: Leistungen
|   |   +-- Nav-Link: Projekte
|   |   +-- Nav-Link: Über uns
|   +-- CTA-Button "Kontakt aufnehmen"  (shadcn Button, Primärfarbe, Desktop)
|   +-- Hamburger-Icon  (nur Mobile < 768px)
|   +-- Mobile-Drawer  (shadcn Sheet – öffnet sich von der Seite)
|       +-- Nav-Links (vertikal)
|       +-- CTA-Button
|
+-- <main>  (Seiteninhalt – wechselt je nach Route)
|
+-- Footer  (src/components/layout/footer.tsx)
    +-- Spalte 1: Logo + kurzer Tagline-Text
    +-- Spalte 2: Navigation-Links (alle Unterseiten)
    +-- Spalte 3: Kontaktdaten (Telefon, E-Mail, Adresse)
    +-- Copyright-Zeile (unten)
```

---

### Wie der aktive Nav-Link funktioniert

Next.js stellt einen `usePathname()` Hook bereit – damit weiß die Navigation immer, welche Seite gerade offen ist und hebt den passenden Link visuell hervor (z.B. Grün-Unterstreichung oder fette Schrift). Das passiert automatisch ohne extra Logik.

---

### Tech-Entscheidungen

| Entscheidung | Warum |
|---|---|
| **shadcn Sheet** (Mobile-Drawer) | Bereits installiert, fertige Komponente, sauber animiert – kein Eigenaufwand |
| **shadcn NavigationMenu** | Bereits installiert, barrierefrei, für Desktop-Navigationen konzipiert |
| **Next.js `app/layout.tsx`** | Eingebaute Funktion: Header/Footer einmal definiert, auf allen Seiten automatisch vorhanden |
| **Sticky Header via CSS** | Kein JavaScript nötig – reines CSS `position: sticky`, kein Performance-Overhead |
| **Hardcoded Nav-Links** | Navigation ändert sich selten; kein CMS-Overhead nötig |

---

### Abhängigkeiten

Keine neuen Pakete notwendig – alle benötigten Komponenten (NavigationMenu, Sheet, Button) sind bereits installiert.

## Implementierungsnotizen (Frontend)

**Implemented:** 2026-03-14

### Erstellte Komponenten
- `src/components/layout/header.tsx` - Sticky header with desktop NavigationMenu, mobile Sheet drawer, logo with text fallback, CTA button, active link highlighting via `usePathname()`
- `src/components/layout/footer.tsx` - 3-column footer (logo+tagline, navigation links, contact info), copyright line

### Erstellte Seiten
- `src/app/layout.tsx` - Updated root layout wrapping all pages with Header + main + Footer, lang="de"
- `src/app/page.tsx` - Startseite with hero section (placeholder for PROJ-2 content)
- `src/app/leistungen/page.tsx` - Placeholder (PROJ-3)
- `src/app/projekte/page.tsx` - Placeholder (PROJ-6)
- `src/app/ueber-uns/page.tsx` - Placeholder (PROJ-4)
- `src/app/kontakt/page.tsx` - Placeholder (PROJ-5)

### Design-Entscheidungen
- Primary color changed to green (`hsl(142 76% 36%)`) per PRD brand guidelines
- Used shadcn NavigationMenu for desktop nav, shadcn Sheet for mobile drawer
- Logo uses a styled `<div>` with initial letter as placeholder (no image file yet)
- Company name "GreenScape" used as placeholder
- Contact data in footer uses placeholder values
- All routes confirmed working via `npm run build`

### Abdeckung der Akzeptanzkriterien
- [x] Header with logo (left) + nav links (right)
- [x] Sticky header (CSS `position: sticky`)
- [x] Hamburger menu on mobile (< 768px) via Sheet
- [x] Active nav link highlighted (usePathname + border/color)
- [x] Footer with company name, phone, email, address, nav links, copyright
- [x] CTA "Kontakt aufnehmen" button in header
- [x] Responsive layout (375px, 768px, 1280px+)
- [x] Shared header/footer via app/layout.tsx
- [x] Client navigation via Next.js Link
- [x] No layout shifts (static header, no dynamic content loading)
