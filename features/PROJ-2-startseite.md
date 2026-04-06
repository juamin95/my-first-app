# PROJ-2: Startseite

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-14

## Dependencies
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als gewerblicher Kunde möchte ich sofort verstehen, was das Unternehmen macht und warum es vertrauenswürdig ist, damit ich entscheide, ob ich Kontakt aufnehme
- Als Besucher möchte ich in der Hero-Section eine starke visuelle Wirkung und klare Botschaft sehen, damit ich nicht sofort abspringe
- Als Privatkunde möchte ich Kundenbewertungen sehen, damit ich Vertrauen aufbaue
- Als gewerblicher Kunde möchte ich die angebotenen Leistungen auf einen Blick sehen, damit ich weiß ob das Unternehmen das Richtige ist
- Als Besucher möchte ich verstehen, wie eine Zusammenarbeit abläuft (Prozess), damit ich weiß was mich erwartet
- Als Besucher möchte ich einen überzeugenden CTA sehen, damit ich zur Kontaktaufnahme motiviert werde

## Acceptance Criteria

### Hero Section
- [x] Vollbild-Hintergrundbild (Video mit Poster-Fallback + CSS-Fallback `bg-[#1a2e1a]`)
- [x] Hauptüberschrift (H1): Prägnant, auf gewerbliche + private Zielgruppe ausgerichtet
- [x] Subtext: 1-2 Sätze USP (10 Jahre Erfahrung, Köln/BGL/LEV)
- [x] Primär-CTA: "Kontakt aufnehmen" → Kontaktseite (finale Entscheidung, ersetzt "Jetzt Angebot anfragen")
- [x] Sekundär-CTA: "Direkt anrufen" + Textlink "Unsere Projekte ansehen" → Projektgalerie
- [x] Hero ist auf Mobile und Desktop visuell ansprechend

### Bewertungs-Section
- [ ] Zeigt mind. 3 Kundenbewertungen (Name, Bewertungstext, Sternebewertung)
- [ ] Kennzeichnung der Quelle (z.B. "Google Bewertung")
- [ ] Durchschnittliche Gesamtbewertung sichtbar (z.B. 4,9 / 5,0)
- [ ] Bewertungen sind hardcoded (kein dynamisches Laden nötig)
- [ ] Karussell oder Grid-Layout (abhängig von Device-Breite)

### Leistungs-Übersicht Section
- [x] Zwei Kategorien: "Gewerbe & Öffentliche Hand" + "Private Gardening" (finale Entscheidung)
- [x] Je Kategorie: 5 Beispiel-Leistungen als Liste
- [x] Button "Alle Leistungen ansehen" → `/leistungen`
- [x] Visuell unterscheidbare Karten mit Bild-Header

### Ablauf-Section
- [x] 3-Schritt-Prozess: Vor-Ort-Besichtigung → Angebotserstellung → Umsetzung
- [x] Jeder Schritt: Icon + Titel + Kurzbeschreibung
- [x] Vertikal animiert (Scroll-triggered) auf allen Breakpoints – bewusste Entscheidung

### Über-uns Preview Section
- [ ] Kurzer Einblick in das Unternehmen (2-3 Sätze)
- [ ] Zahl-Highlights: z.B. "10 Jahre Erfahrung", "200+ Projekte", "Junges Team"
- [ ] Link "Mehr über uns" → Über uns Seite (PROJ-4)
- [ ] Optional: Foto des Teams oder Inhabers

### Footer-CTA Section
- [ ] Abschließende starke CTA-Section vor dem Footer
- [ ] Headline + Subtext + Kontakt-Button
- [ ] Visuell abgesetzt (Hintergrundfarbe oder -bild)

## Edge Cases
- Was passiert wenn das Hero-Bild nicht lädt? → Hintergrundfarbe als Fallback + Text bleibt lesbar
- Was passiert auf sehr kleinen Screens (320px)? → Hero-Text und CTAs bleiben lesbar, kein Overflow
- Was passiert wenn Bewertungstext sehr lang ist? → Text wird auf max. 3 Zeilen gekürzt mit "mehr lesen"
- Was passiert wenn Nutzer direkt über Google auf die Startseite kommt? → Alle wichtigen Infos above the fold

## Technical Requirements
- Alle Inhalte sind zunächst hardcoded (Texte, Bilder, Bewertungen)
- Hero-Bild: next/image für optimierte Bildladung
- Performance: LCP < 2,5s (Hero-Bild als Priority gesetzt)
- Keine externen Abhängigkeiten für Bewertungen (keine API)

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## Implementation Notes (Frontend)
- Hero section uses `next/image` with priority loading and dark overlay for text readability. Fallback is a solid dark green background (`#2a4a1e`) if the image fails to load. The `HeroImage` client component handles the error state.
- CTAs updated to match spec: "Jetzt Angebot anfragen" links to `/kontakt`, "Unsere Projekte ansehen" links to `/projekte`
- Bewertungs-Section added with 3 hardcoded Google reviews, star ratings, and an average rating display (4,9/5,0)
- Leistungs-Uebersicht split into two visual categories: Pflegeleistungen (4 items) and Bauleistungen (4 items), each with icons and descriptions
- Ablauf-Section kept with 4 numbered steps, horizontal on desktop, vertical on mobile
- Ueber-uns Preview added with company description, link to `/ueber-uns`, and 4 stat cards (10+ Jahre, 200+ Projekte, 4.9 Bewertung, 15+ Teammitglieder)
- Footer-CTA section with gradient background, "Jetzt Angebot anfragen" and phone CTA
- Hero image placeholder expected at `/public/images/hero-garden.jpg` -- user needs to provide actual image
- All content is hardcoded as specified, no API calls
- Uses existing shadcn/ui Card component and FadeIn animation component
- Responsive at all breakpoints, uses Tailwind CSS exclusively

## QA Test Results (Re-test #5 -- Full Frontend + Security Audit)

**Tested:** 2026-04-03
**Previous tests:** 2026-03-15, 2026-03-17, 2026-03-20, 2026-03-21
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS (Next.js 16.1.1 Turbopack, compiled in 5.0s, 14 pages generated)
**Lint Status:** PASS (zero warnings)
**Focus:** Full acceptance criteria re-test, spec deviation audit, security red-team, accessibility

---

### Acceptance Criteria Status

#### AC-1: Hero Section
- [x] Fullscreen background -- video with autoPlay/muted/loop/playsInline + poster fallback (`/images/hero/titelbild.jpg`)
- [x] Dark overlay (`bg-black/50`) ensures text readability
- [x] H1 present: "Professioneller Garten- & Landschaftsbau Betrieb" with gradient text on second line
- [x] USP badge: "10+ Jahre Erfahrung . 3.000+ Projekte . 5,0 Sterne" -- visible above headline
- [ ] **BUG-6 (SPEC DEVIATION):** Primary CTA reads "Kontakt aufnehmen" instead of spec's "Jetzt Angebot anfragen". Links to `/kontakt` -- correct target. **Previously noted as BUG-1, marked CLOSED by decision.**
- [ ] **BUG-7 (SPEC DEVIATION):** Secondary CTA is "Direkt anrufen" (tel: link) instead of spec's "Unsere Projekte ansehen" linking to `/projekte`. **Previously noted as BUG-2, marked CLOSED by decision.** This means there is NO direct link from the hero to the Projektgalerie.
- [x] Trust logo: IHK Koeln displayed below CTAs (note: only 1 logo now, GaLaBau NRW logo removed since Re-test #4)
- [x] Scroll indicator with bounce animation + "Scrollen" text
- [x] Hero is full-viewport height (`h-[calc(100vh+2rem)]`)
- [x] Responsive: CTAs stack vertically on mobile (`flex-col`), side-by-side on `sm:`

#### AC-2: Bewertungs-Section
- [x] 8 hardcoded reviews (exceeds minimum of 3) with name, text, tag, star rating
- [x] Google "G" SVG inline logo displayed
- [x] Overall rating badge: "5,0" + "48 Bewertungen" shown prominently
- [x] Horizontal snap-scroll carousel with `no-scrollbar` CSS
- [x] ReviewCard uses `line-clamp-3` with "mehr lesen"/"weniger" toggle for long texts
- [x] Source label: Google "G" icon on each card footer -- identifies source
- [x] Card widths: `w-[85vw]` on mobile, `sm:w-[340px]`, `lg:w-[360px]`
- [x] Scroll hint text: "Nach rechts wischen" on mobile, arrows on desktop

#### AC-3: Leistungs-Uebersicht
- [ ] **BUG-8 (SPEC DEVIATION):** Spec requires two categories: "Pflegeleistungen" and "Bauleistungen". Implementation shows two cards: "Gewerbe & Oeffentliche Hand" and "Private Gardening". The categorization model was changed to match the sub-page architecture (PROJ-3a/3b) but does not match the original PROJ-2 spec.
- [x] Each category card has 5 example services with icons (spec asks 3-4, implementation has 5 -- acceptable)
- [x] Links: cards link to `/leistungen/gewerbe` and `/leistungen/privat` -- functional sub-pages exist
- [x] Visually distinguishable: each card has a distinct photo, badge, and icon
- [ ] **BUG-9:** Spec asks for a "Alle Leistungen ansehen" link to the main `/leistungen` page. No such link exists in this section. The cards only link to the two sub-pages.
- [x] Glassmorphism card style with hover effects (translate-y, shadow, scale on image)

#### AC-4: Ablauf-Section
- [x] 3 numbered steps: Vor-Ort-Besichtigung, Angebotserstellung, Umsetzung (spec says 3-4 steps)
- [x] Each step has: icon, title, description
- [x] Scroll-driven Framer Motion animation with progress circles and connecting lines
- [ ] **BUG-10:** Spec says "Horizontal auf Desktop, vertikal auf Mobile". Implementation is ALWAYS vertical (stacked cards with connecting lines). No horizontal layout on desktop.

#### AC-5: Ueber-uns Preview
- [x] Company description: 2 paragraphs about the company (spec asks 2-3 sentences -- slightly exceeds, acceptable)
- [x] 4 stat cards: "10+" Jahre, "3.000+" Projekte, "200+" Stammkunden, "5,0" Sterne -- matches spec's stat highlight requirement
- [x] Link "Mehr ueber uns" as Button linking to `/ueber-uns`
- [x] Photo: Marvin Amini portrait + UeberUnsCollage with 4 parallax photos
- [x] Responsive: 1-col mobile, 2-col tablet, 4-col desktop for stats

#### AC-6: Footer-CTA Section
- [x] "Bereit fuer Ihr Projekt?" headline
- [x] Subtitle text present
- [x] "Jetzt Angebot anfragen" button linking to `/kontakt`
- [x] "Direkt anrufen" button with tel: link
- [x] Visually distinct: image card with dark gradient overlay on white background
- [x] Trust badges: "Unverbindliches Angebot" + "Persoenliche Beratung vor Ort"

---

### Additional Sections (Not in Original Spec)

#### Partner Banner Section
- [x] Marquee animation with 7 partner logos
- [x] Left/right fade masks for smooth edge transition
- [x] `prefers-reduced-motion: reduce` stops animation -- good accessibility
- [x] Uses `next/image` with `unoptimized` prop (logos are small, acceptable)
- **Note:** This section is NOT in the original spec but adds trust value. Acceptable addition.

#### Vorteile Section
- [x] 6 advantage items in a 3-column grid with icons
- [x] Section header: "Warum Gruenschnitt" / "Ihr verlaesslicher Partner"
- **Note:** This section is NOT in the original spec but enhances the page. Acceptable addition.

---

### Edge Cases Status

#### EC-1: Hero image/video fails to load
- [x] Video element has `poster="/images/hero/titelbild.jpg"` as fallback
- [ ] **BUG-11:** If both video AND poster image fail, there is no CSS background-color fallback. The `bg-black/50` overlay sits on a transparent background, resulting in a black hero. The implementation notes mention a solid dark green fallback (`#2a4a1e`) but this is NOT present in the current code.

#### EC-2: Very small screens (320px)
- [x] Hero CTAs use `w-full` on mobile, preventing overflow
- [x] Review cards use `w-[85vw]`, fitting within viewport
- [x] Text remains readable, no horizontal overflow detected in code

#### EC-3: Very long review text
- [x] `line-clamp-3` applied when text > 120 chars
- [x] "mehr lesen" / "weniger" toggle functional (useState in ReviewCard)

#### EC-4: Direct Google landing (above-the-fold value)
- [x] H1, USP badge, CTAs, and trust logo all render above the fold
- [x] No blocking client-side data fetching for hero content

---

### Security Audit (Red Team)

#### Input Injection / XSS
- [x] All Startseite content is hardcoded -- no user-generated content rendered on this page
- [x] No `dangerouslySetInnerHTML` used anywhere on the Startseite
- [x] Review texts are static strings, not fetched from user input
- [x] Contact form API (`/api/contact/route.ts`) uses Zod validation + HTML tag stripping (`sanitize()`)

#### Data Exposure
- [x] No API keys or secrets exposed in client-side code
- [x] `.env.local` is in `.gitignore`
- [x] Supabase URL visible in `next.config.ts` (hostname: `bnzpdujupmmrwcbunbql.supabase.co`) -- this is expected; the anon key should be in env vars only
- [x] No sensitive data in static page output

#### Security Headers (next.config.ts)
- [x] `X-Frame-Options: DENY` -- prevents clickjacking
- [x] `X-Content-Type-Options: nosniff` -- prevents MIME sniffing
- [x] `Referrer-Policy: strict-origin-when-cross-origin` -- good
- [x] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` -- good
- [x] `Permissions-Policy: camera=(), microphone=(), geolocation=()` -- good
- [x] `Content-Security-Policy` present with `frame-ancestors 'none'`
- [ ] **BUG-12 (MEDIUM - SECURITY):** CSP includes `'unsafe-inline' 'unsafe-eval'` for `script-src`. This weakens XSS protection significantly. While Next.js requires `unsafe-inline` for its hydration, `unsafe-eval` should be removed in production if possible. This is a known trade-off with Next.js but worth flagging.

#### Rate Limiting
- [x] Contact form API has rate limiting: 3 requests per IP per 10 minutes via Supabase query
- [ ] **BUG-13 (LOW - SECURITY):** Rate limiting relies on IP headers (`cf-connecting-ip`, `x-real-ip`, `x-forwarded-for`). These headers can be spoofed if the app is not behind Cloudflare/a reverse proxy. An attacker could bypass rate limiting by setting a custom `X-Forwarded-For` header.

#### Phone Number Exposure
- [x] Phone number `+4915168452004` is hardcoded in multiple components (hero, CTA, WhatsApp widget, mobile menu). This is intentional for a business site but means the number is easily scrape-able. Acceptable for this use case.

#### WhatsApp Widget
- [x] Opens external `wa.me` link with `noopener noreferrer` -- safe
- [x] Uses `sessionStorage` for dismiss state -- no sensitive data stored

---

### Responsive Audit

#### 375px (Mobile)
- [x] Hero CTAs stack vertically, full width
- [x] Review cards at 85vw with horizontal scroll
- [x] Leistungen cards stack in single column
- [x] Ablauf steps vertical (correct for mobile, but also vertical on desktop -- see BUG-10)
- [x] Stats grid: 1 column
- [x] Mobile menu: fullscreen overlay with blur, all links accessible

#### 768px (Tablet)
- [x] Hero CTAs side by side
- [x] Review cards at 340px width
- [x] Leistungen cards: still single column (no `md:` grid breakpoint, only `lg:grid-cols-3`)
- [x] Stats: 2 columns (`sm:grid-cols-2`)
- [x] Navigation switches to desktop at `md:` breakpoint

#### 1440px (Desktop)
- [x] Max content width `max-w-7xl` (1280px) centered
- [x] Leistungen: 3-column grid
- [x] Stats: 4-column grid
- [x] Review cards at 360px width in scrollable row

---

### Cross-Browser Notes (Code-Level Analysis)
- [x] `backdrop-blur-sm` / `backdrop-blur-md` used extensively -- supported in Chrome 76+, Firefox 103+, Safari 9+. Older browsers get no blur but content remains functional.
- [x] `prefers-reduced-motion` media query properly reduces all animations
- [x] `-webkit-scrollbar` used with `-ms-overflow-style` and `scrollbar-width` fallbacks
- [x] Video `playsInline` attribute set for iOS Safari autoplay support
- [x] Framer Motion animations are client-side only ("use client" components)

---

### Bugs Found

#### BUG-6: Hero primary CTA text deviates from spec (REOPENED)
- **Severity:** Low (spec deviation, previously accepted)
- **Status:** OPEN -- Formally re-documenting. Spec says "Jetzt Angebot anfragen", implementation says "Kontakt aufnehmen".
- **Impact:** Minor branding inconsistency. The CTA is less action-oriented than the spec intended.
- **Priority:** Nice to have (confirm acceptance or update spec)

#### BUG-7: No link to Projektgalerie from Hero (REOPENED)
- **Severity:** Medium
- **Status:** OPEN -- The spec's secondary CTA "Unsere Projekte ansehen" linking to `/projekte` was replaced with "Direkt anrufen" (tel:). This means there is zero path from the hero to the project gallery. For a portfolio-driven business, this could reduce engagement.
- **Steps to Reproduce:**
  1. Visit the Startseite
  2. Look at the Hero section
  3. Expected: A CTA linking to `/projekte`
  4. Actual: Only "Kontakt aufnehmen" and "Direkt anrufen"
- **Priority:** Fix before deployment -- the Projektgalerie is a P1 feature meant to build trust; it needs hero-level visibility

#### BUG-8: Leistungen categories renamed from spec
- **Severity:** Low (spec deviation)
- **Status:** OPEN -- Spec says "Pflegeleistungen" + "Bauleistungen". Implementation uses "Gewerbe & Oeffentliche Hand" + "Private Gardening" to align with the sub-page architecture (PROJ-3a/3b).
- **Priority:** Update the PROJ-2 spec to match the new categorization, or formally accept

#### BUG-9: Missing "Alle Leistungen ansehen" link
- **Severity:** Low
- **Status:** OPEN
- **Steps to Reproduce:**
  1. Scroll to the Leistungen section on the Startseite
  2. Expected: A link "Alle Leistungen ansehen" pointing to `/leistungen`
  3. Actual: Only individual sub-page links exist
- **Priority:** Nice to have

#### BUG-10: Ablauf-Section always vertical, spec requires horizontal on desktop
- **Severity:** Medium
- **Status:** OPEN
- **Steps to Reproduce:**
  1. View the Startseite on a 1440px desktop viewport
  2. Scroll to the Ablauf section
  3. Expected: Steps arranged horizontally
  4. Actual: Steps are stacked vertically with connecting vertical lines
- **Note:** The vertical layout with scroll-driven animations is arguably a better UX, but it contradicts the spec.
- **Priority:** Confirm acceptance or update spec

#### BUG-11: No CSS fallback background-color on Hero if video+poster both fail
- **Severity:** Low
- **Status:** OPEN
- **Steps to Reproduce:**
  1. Block `/images/hero/titelbild.jpg` and `/images/hero-bg.mp4` in DevTools
  2. Reload the Startseite
  3. Expected: Dark green fallback background with readable white text
  4. Actual: Black background from overlay only (acceptable but not matching implementation notes)
- **Priority:** Nice to have

#### BUG-12: CSP allows 'unsafe-eval' in script-src
- **Severity:** Medium (Security)
- **Status:** OPEN
- **Details:** `next.config.ts` line 14 includes `'unsafe-eval'` in the Content-Security-Policy `script-src` directive. This could allow an attacker to execute arbitrary JavaScript via `eval()` if they find an injection point.
- **Priority:** Fix before deployment -- remove `'unsafe-eval'` if the application works without it. Test thoroughly after removal.

#### BUG-13: IP-based rate limiting can be spoofed
- **Severity:** Low (Security)
- **Status:** OPEN
- **Details:** The contact API uses `x-forwarded-for` and `x-real-ip` headers for rate limiting. If the app is deployed behind Vercel (which sets `x-real-ip`), this is mitigated. If deployed without a trusted proxy, an attacker can send arbitrary IPs.
- **Priority:** Nice to have -- Vercel deployment mitigates this

#### Previously Closed Bugs (from earlier QA rounds)
- **BUG-1/2:** Merged into BUG-6/7 above with updated analysis
- **BUG-3:** FIXED -- gradient monotony addressed with SectionWrapper tokens
- **BUG-4:** CLOSED -- raw `<img>` for trust logo is acceptable (only 1 small SVG)
- **BUG-5:** ACCEPTED -- Projekte/Leistungen both `bg-white` with rounded overlap separation

---

### Regression Check (Related Features)

| Feature | Status | Regression |
|---|---|---|
| PROJ-1: Layout & Navigation | In Review | PASS -- Header, Footer, mobile menu all functional from Startseite |
| PROJ-5: Kontaktformular | In Review | PASS -- `/kontakt` link from hero and CTA section works |
| PROJ-6: Projektgalerie | In Review | PASS -- `/projekte` link from Projekte Preview section works |
| PROJ-8: WhatsApp Widget | In Review | PASS -- Widget renders on Startseite, chat opens, session dismiss works |

---

### Summary
- **Acceptance Criteria:** 20/26 sub-criteria passed, 6 failed (4 spec deviations, 2 functional)
- **Bugs Found:** 8 total (0 critical, 2 medium, 6 low)
  - Medium: BUG-7 (no Projektgalerie link in hero), BUG-10 (Ablauf layout), BUG-12 (CSP unsafe-eval)
  - Low: BUG-6, BUG-8, BUG-9, BUG-11, BUG-13
- **Security Audit:** 2 findings (BUG-12 medium, BUG-13 low)
- **Build:** PASS
- **Lint:** PASS
- **Accessibility:** prefers-reduced-motion support present, aria-labels on sections, semantic HTML
- **Production Ready:** CONDITIONAL YES
- **Blocking items:** BUG-12 (CSP `unsafe-eval`) should be investigated before production. BUG-7 and BUG-10 are spec deviations that should be formally accepted or fixed.

## Deployment
_To be added by /deploy_
