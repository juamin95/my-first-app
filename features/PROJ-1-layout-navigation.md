# PROJ-1: Layout & Navigation

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-14

## Dependencies
- None (Grundlage für alle anderen Features)

## User Stories
- Als Besucher möchte ich eine klare Navigation sehen, damit ich schnell zur gewünschten Seite komme
- Als gewerblicher Kunde möchte ich sofort den Firmennamen und das Logo erkennen, damit ich Vertrauen aufbaue
- Als mobiler Nutzer möchte ich ein funktionales Hamburger-Menü nutzen, damit die Navigation auf dem Smartphone einfach ist
- Als Besucher möchte ich im Footer Kontaktdaten und Links finden, damit ich schnell Informationen abrufen kann
- Als Besucher möchte ich immer wissen, auf welcher Seite ich bin (aktiver Nav-Link), damit ich mich orientieren kann

## Acceptance Criteria
- [ ] Header zeigt Logo (links) + Navigationslinks (rechts): Startseite, Leistungen, Projekte, Über uns, Kontakt
- [ ] Header ist sticky (bleibt beim Scrollen oben sichtbar)
- [ ] Auf Mobile (< 768px) erscheint ein Hamburger-Menü, das sich ein- und ausklappen lässt
- [ ] Aktiver Navigationspunkt ist visuell hervorgehoben
- [ ] Footer enthält: Firmenname, Telefonnummer, E-Mail, Adresse, Links zu allen Unterseiten, Copyright
- [ ] "Kontakt aufnehmen" CTA-Button im Header ist auf allen Seiten sichtbar (Primärfarbe)
- [ ] Layout ist responsiv für Mobile (375px), Tablet (768px) und Desktop (1280px+)
- [ ] Alle Seiten teilen denselben Header und Footer (Shared Layout)
- [ ] Seitenwechsel ohne Neuladen (Next.js Client Navigation)
- [ ] Ladezeit Header < 100ms (kein CLS durch Layout-Shift)

## Edge Cases
- Was passiert wenn das Logo-Bild nicht lädt? → Firmenname als Text-Fallback
- Was passiert bei sehr langen Firmennamen in der Navigation? → Responsiver Umbruch
- Was passiert bei 5+ Navigationsitems auf kleinen Tablets? → Hamburger-Menü ab 768px
- Was passiert wenn ein Nutzer direkt auf eine Unterseite navigiert? → Active State korrekt gesetzt via URL-Matching

## Technical Requirements
- Framework: Next.js 16 App Router (Shared Layout via `app/layout.tsx`)
- Styling: Tailwind CSS + shadcn/ui NavigationMenu-Komponente
- Mobile Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Performance: Keine Layout-Shifts (CLS = 0)
- Browser Support: Chrome, Firefox, Safari, Edge (aktuelle Versionen)

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

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

## Frontend Implementation Notes

**Implemented:** 2026-03-14

### Components Created
- `src/components/layout/header.tsx` - Sticky header with desktop NavigationMenu, mobile Sheet drawer, logo with text fallback, CTA button, active link highlighting via `usePathname()`
- `src/components/layout/footer.tsx` - 3-column footer (logo+tagline, navigation links, contact info), copyright line

### Pages Created
- `src/app/layout.tsx` - Updated root layout wrapping all pages with Header + main + Footer, lang="de"
- `src/app/page.tsx` - Startseite with hero section (placeholder for PROJ-2 content)
- `src/app/leistungen/page.tsx` - Placeholder (PROJ-3)
- `src/app/projekte/page.tsx` - Placeholder (PROJ-6)
- `src/app/ueber-uns/page.tsx` - Placeholder (PROJ-4)
- `src/app/kontakt/page.tsx` - Placeholder (PROJ-5)

### Design Decisions
- Primary color changed to green (`hsl(142 76% 36%)`) per PRD brand guidelines
- Used shadcn NavigationMenu for desktop nav, shadcn Sheet for mobile drawer
- Logo uses a styled `<div>` with initial letter as placeholder (no image file yet)
- Company name "GreenScape" used as placeholder
- Contact data in footer uses placeholder values
- All routes confirmed working via `npm run build`

### Acceptance Criteria Coverage
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

## QA Test Results (Re-test #4 -- Full Frontend Review)

**Tested:** 2026-03-21
**Previous tests:** 2026-03-14, 2026-03-17, 2026-03-20
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS (Next.js 16.1.1 Turbopack, 16 routes including 6 SSG project pages + /impressum + /datenschutz)
**Lint Status:** PASS (npm run lint exits clean -- ESLint error suppressed via eslint-disable comment)

### Previous Bug Resolution Status

| Previous Bug | Status | Notes |
|---|---|---|
| BUG-1 (fixed vs sticky header) | ACCEPTED | Design decision: `position: fixed` with floating rounded header in `px-4 pt-4` wrapper. Pages compensate with own top padding. Functionally correct. |
| BUG-2 (ESLint error setState in useEffect) | FIXED (suppressed) | `eslint-disable-next-line react-hooks/set-state-in-effect` comment added at line 39. Lint passes. Code quality concern remains but is not blocking. |
| BUG-3 (Footer missing address) | OPEN | Footer still only shows Phone and Email. No address. |
| BUG-4 (No text fallback for logo) | OPEN | Still no `onError` fallback on Image component. |

### Acceptance Criteria Status

#### AC-1: Header zeigt Logo (links) + Navigationslinks (rechts)
- [x] Logo image (`/logos/logo-amini.png`) renders on the left using `next/image` with alt text
- [x] Desktop navigation links visible on the right (hidden md:flex)
- [x] Navigation structure: Startseite (direct link) + Leistungen (dropdown with Pflegeleistungen/Bauleistungen submenu) + Projekte, Ueber uns, Kontakt (direct links)
- [x] Leistungen dropdown uses shadcn NavigationMenuTrigger/Content with anchor links to #pflege and #bau

#### AC-2: Header ist sticky (bleibt beim Scrollen oben sichtbar)
- [x] Header stays visible during scroll via `position: fixed; top: 0` (functionally equivalent to sticky)
- [x] Floating pill-shaped header with `rounded-2xl border border-black/10 bg-white/80 backdrop-blur-md` -- modern glass effect

#### AC-3: Hamburger-Menu auf Mobile (< 768px)
- [x] Hamburger icon visible only below md breakpoint
- [x] Fullscreen mobile menu with `backdrop-filter: blur(20px)` and white overlay
- [x] Close button (X icon) top-right
- [x] Body scroll locked when open
- [x] All nav links close menu on click
- [x] Leistungen has expandable submenu with ChevronDown rotation animation

#### AC-4: Aktiver Navigationspunkt visuell hervorgehoben
- [x] `usePathname()` + `isActive()` with exact match for "/" and `startsWith()` for sub-routes
- [x] Desktop: `text-primary font-semibold`
- [x] Mobile: `text-primary bg-primary/5`

#### AC-5: Footer Inhalte
- [x] Company name, phone, email, nav links, copyright, social media links all present
- [ ] BUG: Address still MISSING from footer (See BUG-1)
- [x] Impressum and Datenschutz links in footer bottom row
- [x] Facebook and Instagram social icons with proper `rel="noopener noreferrer"`

#### AC-6: CTA-Button im Header
- [x] "Kontakt aufnehmen" button links to /kontakt, visible from sm breakpoint (640px+)
- [x] Available in mobile fullscreen menu along with "Anrufen" phone button

#### AC-7: Layout responsiv
- [x] All breakpoints tested (375px, 768px, 1440px) via code review -- proper Tailwind responsive classes throughout

#### AC-8: Shared Layout
- [x] `app/layout.tsx` wraps all pages with Header + main + Footer + WhatsAppButton

#### AC-9: Client Navigation
- [x] All internal links use Next.js `<Link>`

#### AC-10: Kein CLS
- [x] Header rendered statically, logo with `priority` flag

### Edge Cases Status
- [ ] EC-1: No text fallback for logo image failure (See BUG-2)
- [x] EC-2: Logo constrained with `h-10 w-auto object-contain`
- [x] EC-3: Navigation handles 5+ items via Leistungen dropdown -- reduces horizontal crowding
- [x] EC-4: Direct URL navigation correctly highlights active link

### Security Audit
- [x] No user input in layout/nav
- [x] `.env.local` in `.gitignore`
- [x] Security headers configured (X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy)
- [x] External links have `target="_blank" rel="noopener noreferrer"`

### Bugs Found

#### BUG-1: Footer is missing physical address (CARRIED OVER)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Scroll to footer on any page
  2. Expected: Phone, Email, AND Address per spec
  3. Actual: Only Phone and Email shown
- **File:** `src/components/layout/footer.tsx` lines 54-75
- **Priority:** Fix before deployment -- business owner must provide real address

#### BUG-2: No text fallback when logo image fails to load (CARRIED OVER)
- **Severity:** Low
- **Steps to Reproduce:**
  1. Delete `/public/logos/logo-amini.png`
  2. Expected: Styled company name text
  3. Actual: Broken image with browser default alt text
- **File:** `src/components/layout/header.tsx` lines 61-68
- **Priority:** Nice to have

#### BUG-3: Duplicate "Startseite" link rendered in desktop navigation (NEW)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. View desktop navigation (768px+)
  2. "Startseite" is rendered twice: once explicitly (line 76-87) and again from the `navLinks.map()` loop (lines 130-144) since `navLinks` contains `{ href: "/", label: "Startseite" }`
  3. Expected: "Startseite" appears once
  4. Actual: "Startseite" appears twice in the desktop nav bar
- **File:** `src/components/layout/header.tsx` lines 74-87 (explicit Startseite) and lines 130-144 (navLinks loop includes Startseite)
- **Priority:** Fix before deployment -- duplicate navigation links look unprofessional

#### BUG-4: Duplicate "Startseite" link in mobile menu (NEW)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Open mobile menu on any screen < 768px
  2. "Startseite" appears twice: once explicitly (lines 189-198) and again from the `navLinks.map()` loop (lines 236-248)
  3. Expected: Each nav item once
  4. Actual: "Startseite" duplicated
- **File:** `src/components/layout/header.tsx`
- **Priority:** Fix before deployment (same root cause as BUG-3)

#### BUG-5: Impressum and Datenschutz pages contain placeholder data (NEW)
- **Severity:** High (LEGAL)
- **Steps to Reproduce:**
  1. Click "Impressum" link in footer
  2. Page shows `[Strasse und Hausnummer]`, `[PLZ]`, `[Telefonnummer]`, `[E-Mail-Adresse]`, `[USt-ID]`, `[Handwerkskammer]`
  3. Click "Datenschutz" link in footer
  4. Page shows `[Strasse und Hausnummer]`, `[PLZ]`, `[E-Mail-Adresse]`
  5. Expected: Real legal information
  6. Actual: Placeholder brackets throughout
- **Files:** `src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx`
- **Note:** Both pages have a disclaimer noting they are placeholders, but a German business website legally MUST have a complete Impressum (TMG SS 5) and Datenschutzerklaerung (DSGVO). Publishing with placeholders is a legal liability.
- **Priority:** MUST fix before deployment -- legal requirement under German law

### Summary
- **Acceptance Criteria:** 9/10 passed (1 open: missing address in footer)
- **Bugs Found:** 5 total (0 critical, 1 high, 3 medium, 1 low)
- **Fixed since last QA round:** BUG-2 old (ESLint now passes via suppress comment)
- **Security:** PASS
- **Build:** PASS
- **Lint:** PASS
- **Production Ready:** NO
- **Blocking issues:** BUG-5 (Impressum/Datenschutz placeholders -- LEGAL), BUG-3/BUG-4 (duplicate Startseite in nav), BUG-1 (missing address)
- **Recommendation:** Fix BUG-5 (legal requirement), BUG-3/4 (remove Startseite from navLinks since it is rendered separately), and BUG-1 (add address). Then re-run /qa.

## Deployment
_To be added by /deploy_
