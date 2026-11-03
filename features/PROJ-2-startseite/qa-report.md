# PROJ-2: Startseite: QA-Bericht

## QA-Testergebnisse (Re-test #5 -- Full Frontend + Security Audit)

**Tested:** 2026-04-03
**Previous tests:** 2026-03-15, 2026-03-17, 2026-03-20, 2026-03-21
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS (Next.js 16.1.1 Turbopack, compiled in 5.0s, 14 pages generated)
**Lint Status:** PASS (zero warnings)
**Focus:** Full acceptance criteria re-test, spec deviation audit, security red-team, accessibility

---

### Status der Akzeptanzkriterien

#### Bereich: Hero Section
- [x] Fullscreen background -- video with autoPlay/muted/loop/playsInline + poster fallback (`/images/hero/titelbild.jpg`) · **AC-1**
- [x] Dark overlay (`bg-black/50`) ensures text readability · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] H1 present: "Professioneller Garten- & Landschaftsbau Betrieb" with gradient text on second line · **AC-2**
- [x] USP badge: "10+ Jahre Erfahrung . 3.000+ Projekte . 5,0 Sterne" -- visible above headline · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] **BUG-6 (SPEC DEVIATION):** Primary CTA reads "Kontakt aufnehmen" instead of spec's "Jetzt Angebot anfragen". Links to `/kontakt` -- correct target. **Previously noted as BUG-1, marked CLOSED by decision.** · **AC-4**
- [ ] **BUG-7 (SPEC DEVIATION):** Secondary CTA is "Direkt anrufen" (tel: link) instead of spec's "Unsere Projekte ansehen" linking to `/projekte`. **Previously noted as BUG-2, marked CLOSED by decision.** This means there is NO direct link from the hero to the Projektgalerie. · **AC-5**
- [x] Trust logo: IHK Koeln displayed below CTAs (note: only 1 logo now, GaLaBau NRW logo removed since Re-test #4) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Scroll indicator with bounce animation + "Scrollen" text · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Hero is full-viewport height (`h-[calc(100vh+2rem)]`) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Responsive: CTAs stack vertically on mobile (`flex-col`), side-by-side on `sm:` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Bereich: Bewertungs-Section
- [x] 8 hardcoded reviews (exceeds minimum of 3) with name, text, tag, star rating · **AC-7, AC-10**
- [x] Google "G" SVG inline logo displayed · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Overall rating badge: "5,0" + "48 Bewertungen" shown prominently · **AC-9**
- [x] Horizontal snap-scroll carousel with `no-scrollbar` CSS · **AC-11**
- [x] ReviewCard uses `line-clamp-3` with "mehr lesen"/"weniger" toggle for long texts · **EC-3**
- [x] Source label: Google "G" icon on each card footer -- identifies source · **AC-8**
- [x] Card widths: `w-[85vw]` on mobile, `sm:w-[340px]`, `lg:w-[360px]` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Scroll hint text: "Nach rechts wischen" on mobile, arrows on desktop · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Bereich: Leistungs-Uebersicht
- [ ] **BUG-8 (SPEC DEVIATION):** Spec requires two categories: "Pflegeleistungen" and "Bauleistungen". Implementation shows two cards: "Gewerbe & Oeffentliche Hand" and "Private Gardening". The categorization model was changed to match the sub-page architecture (PROJ-3a/3b) but does not match the original PROJ-2 spec. · **AC-12**
- [x] Each category card has 5 example services with icons (spec asks 3-4, implementation has 5 -- acceptable) · **AC-13**
- [x] Links: cards link to `/leistungen/gewerbe` and `/leistungen/privat` -- functional sub-pages exist · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Visually distinguishable: each card has a distinct photo, badge, and icon · **AC-15**
- [ ] **BUG-9:** Spec asks for a "Alle Leistungen ansehen" link to the main `/leistungen` page. No such link exists in this section. The cards only link to the two sub-pages. · **AC-14**
- [x] Glassmorphism card style with hover effects (translate-y, shadow, scale on image) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Bereich: Ablauf-Section
- [x] 3 numbered steps: Vor-Ort-Besichtigung, Angebotserstellung, Umsetzung (spec says 3-4 steps) · **AC-16**
- [x] Each step has: icon, title, description · **AC-17**
- [x] Scroll-driven Framer Motion animation with progress circles and connecting lines · **AC-18**
- [ ] **BUG-10:** Spec says "Horizontal auf Desktop, vertikal auf Mobile". Implementation is ALWAYS vertical (stacked cards with connecting lines). No horizontal layout on desktop. · **AC-18**

#### Bereich: Ueber-uns Preview
- [x] Company description: 2 paragraphs about the company (spec asks 2-3 sentences -- slightly exceeds, acceptable) · **AC-19**
- [x] 4 stat cards: "10+" Jahre, "3.000+" Projekte, "200+" Stammkunden, "5,0" Sterne -- matches spec's stat highlight requirement · **AC-20**
- [x] Link "Mehr ueber uns" as Button linking to `/ueber-uns` · **AC-21**
- [x] Photo: Marvin Amini portrait + UeberUnsCollage with 4 parallax photos · **AC-22**
- [x] Responsive: 1-col mobile, 2-col tablet, 4-col desktop for stats · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Bereich: Footer-CTA Section
- [x] "Bereit fuer Ihr Projekt?" headline · **AC-24**
- [x] Subtitle text present · **AC-24**
- [x] "Jetzt Angebot anfragen" button linking to `/kontakt` · **AC-24**
- [x] "Direkt anrufen" button with tel: link · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Visually distinct: image card with dark gradient overlay on white background · **AC-25**
- [x] Trust badges: "Unverbindliches Angebot" + "Persoenliche Beratung vor Ort" · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

---

### Zusätzliche Abschnitte (nicht in der ursprünglichen Spec)

#### Partner Banner Section
- [x] Marquee animation with 7 partner logos · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Left/right fade masks for smooth edge transition · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `prefers-reduced-motion: reduce` stops animation -- good accessibility · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Uses `next/image` with `unoptimized` prop (logos are small, acceptable) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- **Note:** This section is NOT in the original spec but adds trust value. Acceptable addition.

#### Vorteile Section
- [x] 6 advantage items in a 3-column grid with icons · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Section header: "Warum Gruenschnitt" / "Ihr verlaesslicher Partner" · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- **Note:** This section is NOT in the original spec but enhances the page. Acceptable addition.

---

### Status der Randfälle

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

### Sicherheitsprüfung (Red Team)

#### Input Injection / XSS
- [x] All Startseite content is hardcoded -- no user-generated content rendered on this page · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] No `dangerouslySetInnerHTML` used anywhere on the Startseite · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Review texts are static strings, not fetched from user input · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Contact form API (`/api/contact/route.ts`) uses Zod validation + HTML tag stripping (`sanitize()`) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Data Exposure
- [x] No API keys or secrets exposed in client-side code · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `.env.local` is in `.gitignore` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Supabase URL visible in `next.config.ts` (hostname: `bnzpdujupmmrwcbunbql.supabase.co`) -- this is expected; the anon key should be in env vars only · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] No sensitive data in static page output · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Security Headers (next.config.ts)
- [x] `X-Frame-Options: DENY` -- prevents clickjacking · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `X-Content-Type-Options: nosniff` -- prevents MIME sniffing · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `Referrer-Policy: strict-origin-when-cross-origin` -- good · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` -- good · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `Permissions-Policy: camera=(), microphone=(), geolocation=()` -- good · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `Content-Security-Policy` present with `frame-ancestors 'none'` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] **BUG-12 (MEDIUM - SECURITY):** CSP includes `'unsafe-inline' 'unsafe-eval'` for `script-src`. This weakens XSS protection significantly. While Next.js requires `unsafe-inline` for its hydration, `unsafe-eval` should be removed in production if possible. This is a known trade-off with Next.js but worth flagging. · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Rate Limiting
- [x] Contact form API has rate limiting: 3 requests per IP per 10 minutes via Supabase query · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] **BUG-13 (LOW - SECURITY):** Rate limiting relies on IP headers (`cf-connecting-ip`, `x-real-ip`, `x-forwarded-for`). These headers can be spoofed if the app is not behind Cloudflare/a reverse proxy. An attacker could bypass rate limiting by setting a custom `X-Forwarded-For` header. · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### Phone Number Exposure
- [x] Phone number `+4915168452004` is hardcoded in multiple components (hero, CTA, WhatsApp widget, mobile menu). This is intentional for a business site but means the number is easily scrape-able. Acceptable for this use case. · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### WhatsApp Widget
- [x] Opens external `wa.me` link with `noopener noreferrer` -- safe · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Uses `sessionStorage` for dismiss state -- no sensitive data stored · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

---

### Responsive-Prüfung

#### 375px (Mobile)
- [x] Hero CTAs stack vertically, full width · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Review cards at 85vw with horizontal scroll · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Leistungen cards stack in single column · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Ablauf steps vertical (correct for mobile, but also vertical on desktop -- see BUG-10) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Stats grid: 1 column · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Mobile menu: fullscreen overlay with blur, all links accessible · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### 768px (Tablet)
- [x] Hero CTAs side by side · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Review cards at 340px width · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Leistungen cards: still single column (no `md:` grid breakpoint, only `lg:grid-cols-3`) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Stats: 2 columns (`sm:grid-cols-2`) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Navigation switches to desktop at `md:` breakpoint · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### 1440px (Desktop)
- [x] Max content width `max-w-7xl` (1280px) centered · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Leistungen: 3-column grid · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Stats: 4-column grid · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Review cards at 360px width in scrollable row · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

---

### Cross-Browser-Hinweise (Analyse auf Code-Ebene)
- [x] `backdrop-blur-sm` / `backdrop-blur-md` used extensively -- supported in Chrome 76+, Firefox 103+, Safari 9+. Older browsers get no blur but content remains functional. · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `prefers-reduced-motion` media query properly reduces all animations · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `-webkit-scrollbar` used with `-ms-overflow-style` and `scrollbar-width` fallbacks · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Video `playsInline` attribute set for iOS Safari autoplay support · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Framer Motion animations are client-side only ("use client" components) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

---

### Gefundene Bugs

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

#### Früher geschlossene Bugs (aus älteren QA-Runden)
- **BUG-1/2:** Merged into BUG-6/7 above with updated analysis
- **BUG-3:** FIXED -- gradient monotony addressed with SectionWrapper tokens
- **BUG-4:** CLOSED -- raw `<img>` for trust logo is acceptable (only 1 small SVG)
- **BUG-5:** ACCEPTED -- Projekte/Leistungen both `bg-white` with rounded overlap separation

---

### Regressionsprüfung (verwandte Features)

| Feature | Status | Regression |
|---|---|---|
| PROJ-1: Layout & Navigation | In Review | PASS -- Header, Footer, mobile menu all functional from Startseite |
| PROJ-5: Kontaktformular | In Review | PASS -- `/kontakt` link from hero and CTA section works |
| PROJ-6: Projektgalerie | In Review | PASS -- `/projekte` link from Projekte Preview section works |
| PROJ-8: WhatsApp Widget | In Review | PASS -- Widget renders on Startseite, chat opens, session dismiss works |

---

### Zusammenfassung
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
