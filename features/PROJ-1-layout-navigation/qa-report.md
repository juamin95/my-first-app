# PROJ-1: Layout & Navigation: QA-Bericht

## QA-Testergebnisse (Re-test #4 -- Full Frontend Review)

**Tested:** 2026-03-21
**Previous tests:** 2026-03-14, 2026-03-17, 2026-03-20
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS (Next.js 16.1.1 Turbopack, 16 routes including 6 SSG project pages + /impressum + /datenschutz)
**Lint Status:** PASS (npm run lint exits clean -- ESLint error suppressed via eslint-disable comment)

### Status früherer Bugs

| Previous Bug | Status | Notes |
|---|---|---|
| BUG-1 (fixed vs sticky header) | ACCEPTED | Design decision: `position: fixed` with floating rounded header in `px-4 pt-4` wrapper. Pages compensate with own top padding. Functionally correct. |
| BUG-2 (ESLint error setState in useEffect) | FIXED (suppressed) | `eslint-disable-next-line react-hooks/set-state-in-effect` comment added at line 39. Lint passes. Code quality concern remains but is not blocking. |
| BUG-3 (Footer missing address) | OPEN | Footer still only shows Phone and Email. No address. |
| BUG-4 (No text fallback for logo) | OPEN | Still no `onError` fallback on Image component. |

### Status der Akzeptanzkriterien

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
- [x] BUG: CLOSED (bewusste Entscheidung) – Adresse im Footer weggelassen, da Inhaber zu Kunden fährt und keine stationäre Anlaufstelle relevant ist.
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

### Status der Randfälle
- [ ] EC-1: No text fallback for logo image failure (See BUG-2)
- [x] EC-2: Logo constrained with `h-10 w-auto object-contain`
- [x] EC-3: Navigation handles 5+ items via Leistungen dropdown -- reduces horizontal crowding
- [x] EC-4: Direct URL navigation correctly highlights active link

### Sicherheitsprüfung
- [x] No user input in layout/nav · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `.env.local` in `.gitignore` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Security headers configured (X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] External links have `target="_blank" rel="noopener noreferrer"` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### Gefundene Bugs

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

### Zusammenfassung
- **Acceptance Criteria:** 9/10 passed (1 open: missing address in footer)
- **Bugs Found:** 5 total (0 critical, 1 high, 3 medium, 1 low)
- **Fixed since last QA round:** BUG-2 old (ESLint now passes via suppress comment)
- **Security:** PASS
- **Build:** PASS
- **Lint:** PASS
- **Production Ready:** NO
- **Blocking issues:** BUG-5 (Impressum/Datenschutz placeholders -- LEGAL), BUG-3/BUG-4 (duplicate Startseite in nav), BUG-1 (missing address)
- **Recommendation:** Fix BUG-5 (legal requirement), BUG-3/4 (remove Startseite from navLinks since it is rendered separately), and BUG-1 (add address). Then re-run /qa.
