# Feature Index

> Central tracking for all features. Updated by skills automatically.

## Status Legend
- **Planned** - Requirements written, ready for development
- **In Progress** - Currently being built
- **In Review** - QA testing in progress
- **Deployed** - Live in production

## Features

| ID | Feature | Status | Spec | Created |
|----|---------|--------|------|---------|
| PROJ-0 | Design System & Styleguide | Deployed | [PROJ-0-styleguide.md](PROJ-0-styleguide.md) | 2026-04-04 |
| PROJ-1 | Layout & Navigation | Deployed | [PROJ-1-layout-navigation.md](PROJ-1-layout-navigation.md) | 2026-03-14 |
| PROJ-2 | Startseite | Deployed | [PROJ-2-startseite.md](PROJ-2-startseite.md) | 2026-03-14 |
| PROJ-3a | Leistungen – Gewerbe & Öffentliche Hand | Deployed | [PROJ-3a-leistungen-gewerbe.md](PROJ-3a-leistungen-gewerbe.md) | 2026-04-02 |
| PROJ-3b | Leistungen – Private Gardening | Deployed | [PROJ-3b-leistungen-privat.md](PROJ-3b-leistungen-privat.md) | 2026-04-03 |
| PROJ-4 | Über uns Seite | Deployed | [PROJ-4-ueber-uns.md](PROJ-4-ueber-uns.md) | 2026-03-14 |
| PROJ-5 | Kontaktformular & Lead-Erfassung | In Review | [PROJ-5-kontaktformular.md](PROJ-5-kontaktformular.md) | 2026-03-14 |
| PROJ-6 | Projektgalerie (Portfolio) | Deployed | [PROJ-6-projektgalerie.md](PROJ-6-projektgalerie.md) | 2026-03-14 |
| PROJ-7 | CMS Admin-Interface | In Progress | [PROJ-7-cms-admin.md](PROJ-7-cms-admin.md) | 2026-03-14 |
| PROJ-8 | WhatsApp Chat-Widget | Deployed | [PROJ-8-whatsapp-widget.md](PROJ-8-whatsapp-widget.md) | 2026-03-22 |

<!-- Add features above this line -->

## Next Available ID: PROJ-9

---

## Full Site QA -- Pre Go-Live Audit

**Tested:** 2026-04-05
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS (Next.js 16.1.1 Turbopack, 15 routes, compiled without errors)
**Lint Status:** FAIL (2 ESLint errors -- see BUG-SITE-1)
**Scope:** All deployed features (PROJ-0 through PROJ-8 except PROJ-7), all pages, contact form, project gallery, mobile responsiveness, accessibility, security

### Feature-by-Feature Status

| Feature | AC Passed | Bugs Open | Production Ready |
|---------|-----------|-----------|------------------|
| PROJ-0 Styleguide | 12/12 | 0 | YES |
| PROJ-1 Layout & Nav | 10/10 | 0 | YES (all prev bugs fixed) |
| PROJ-2 Startseite | 22/26 | 4 spec deviations | CONDITIONAL YES |
| PROJ-3a Leistungen Gewerbe | 22/22 | 0 | YES |
| PROJ-3b Leistungen Privat | 11/11 | 0 spec deviations only | YES |
| PROJ-4 Ueber uns | 12/12 | 0 | YES |
| PROJ-5 Kontaktformular | 18/24 | 6 open | NO |
| PROJ-6 Projektgalerie | 13/14 | 2 open | CONDITIONAL |
| PROJ-8 WhatsApp Widget | 7/8 | 1 spec deviation | CONDITIONAL YES |

---

### Previously Reported Bugs -- Resolution Tracker

#### PROJ-1 Bugs (ALL FIXED)
| Bug | Status | Evidence |
|-----|--------|----------|
| BUG-1 (Footer missing address) | FIXED | Footer now shows "In der Rather Burg 21, 51107 Koeln" with MapPin icon |
| BUG-2 (No logo text fallback) | FIXED | `onError={() => setLogoError(true)}` + text fallback "Gruenschnitt" |
| BUG-3 (Duplicate Startseite desktop) | FIXED | `navLinks` no longer contains Startseite; rendered once explicitly |
| BUG-4 (Duplicate Startseite mobile) | FIXED | Same fix as BUG-3 |
| BUG-5 (Impressum/Datenschutz placeholders) | FIXED | Both pages now contain real legal data (Marvin Marcel Amini, Farnweg 4, 51107 Koeln, Steuernummer, etc.) |

#### PROJ-2 Bugs
| Bug | Status | Notes |
|-----|--------|-------|
| BUG-6 (CTA text deviation) | ACCEPTED | "Kontakt aufnehmen" instead of "Jetzt Angebot anfragen" -- deliberate decision |
| BUG-7 (No Projektgalerie link from hero) | OPEN | Hero still has no link to /projekte; however, a "Projekte Preview" section on the Startseite partially compensates |
| BUG-8 (Leistungen categories renamed) | ACCEPTED | Matches PROJ-3a/3b architecture |
| BUG-9 (Missing "Alle Leistungen ansehen") | OPEN | No link to /leistungen from Leistungen section on home page |
| BUG-10 (Ablauf always vertical) | ACCEPTED | Vertical with scroll-driven animation is the deliberate design |
| BUG-11 (No CSS fallback for hero) | OPEN | Low priority |
| BUG-12 (CSP unsafe-eval) | FIXED | `unsafe-eval` removed from CSP in next.config.ts |
| BUG-13 (IP rate limit spoofing) | ACCEPTED | Mitigated by Vercel deployment |

#### PROJ-3a Bugs
| Bug | Status | Notes |
|-----|--------|-------|
| BUG-1 (Glass card deviation) | ACCEPTED | Low, cosmetic |
| BUG-2 (gewerbe-leistungen.jpg 2.9 MB) | PARTIALLY FIXED | Reduced to ~500 KB |

#### PROJ-5 Bugs
| Bug | Status | Notes |
|-----|--------|-------|
| BUG-6 (Only 2+1 Leistungsarten) | PARTIALLY FIXED | Now 3 options (Pflege, Bauprojekt, Sonstiges) instead of 2, but spec requires 5 |
| BUG-8/11 (Projektumfang missing) | FIXED | Field now exists with 3 budget ranges |
| BUG-10 (Email notification) | CLOSED | Deliberate: backend trigger instead of API-level email |
| BUG-12 (Honeypot reveals itself) | FIXED | Honeypot check moved before Zod validation |
| BUG-14 (No input sanitization) | FIXED | `sanitize()` function strips HTML tags |

#### PROJ-6 Bugs
| Bug | Status | Notes |
|-----|--------|-------|
| BUG-1 (Filter tabs mismatch) | CLOSED | Deliberate -- tabs are Alle/Gewerbe/Privat/Oeffentlich |

#### PROJ-0 Bugs
| Bug | Status | Notes |
|-----|--------|-------|
| BUG-3 (ESLint errors datenschutz) | FIXED | Page rewritten with proper entity encoding |
| BUG-5 (CSP unsafe-eval) | FIXED | Removed from next.config.ts |

---

### NEW Bugs Found in Go-Live Audit

#### BUG-SITE-1: ESLint fails with 2 errors (BLOCKING)
- **Severity:** High
- **Steps to Reproduce:**
  1. Run `npm run lint`
  2. 2 errors in `src/components/ui/animated-counter.tsx` (line 36) and `src/components/ui/fade-in.tsx` (line 24) for `react-hooks/set-state-in-effect`
  3. Expected: Clean lint run
  4. Actual: 2 errors blocking CI pipeline
- **Priority:** MUST fix before deployment -- CI will reject the build
- **Suggested fix:** Add `// eslint-disable-next-line react-hooks/set-state-in-effect` comments or refactor to use layout effects / refs

#### BUG-SITE-2: Multiple oversized images degrading PageSpeed (Performance)
- **Severity:** High
- **Steps to Reproduce:**
  1. Check image file sizes in /public/images/
  2. Found 10 images over 1 MB:
     - `leistungen/erdarbeiten.png` -- 4.5 MB
     - `hero/garten.png` -- 3.7 MB
     - `hero/rollrasen.png` -- 2.8 MB
     - `leistungen/haeckslerservice.png` -- 2.4 MB
     - `leistungen/bau.jpg` -- 2.0 MB
     - `ueber-uns/heckenschnitt.jpg` -- 1.3 MB
     - `leistungen/action-baumschnitt.jpg` -- 1.3 MB
     - `leistungen/pflege.jpg` -- 1.2 MB
     - `leistungen/pflege-v2.jpg` -- 1.2 MB
     - `leistungen/pflege-gewerbe.jpg` -- 1.0 MB
  3. hero-bg.mp4 is 22 MB (video)
  4. whatsapp-bg.png is 774 KB (WhatsApp chat background texture -- should be much smaller)
  5. Expected: Images under 500 KB per PRD PageSpeed goal (>= 90)
  6. Actual: Total oversized assets ~44 MB
- **Priority:** Fix before deployment -- PRD targets PageSpeed >= 90. Next.js Image optimization helps at runtime, but source images this large increase build time and memory usage. PNG files should be converted to WebP/AVIF.

#### BUG-SITE-3: Kontaktformular Leistungsarten incomplete (CARRIED OVER, still open)
- **Severity:** High
- **Steps to Reproduce:**
  1. Go to /kontakt, fill step 1, proceed to step 2
  2. Look at "Art der Anfrage" options
  3. Expected: 5 options (Gartengestaltung, Gartenpflege, Pflasterarbeiten, Terrassenbau, Sonstiges) per PROJ-5 spec
  4. Actual: Only 3 options (Pflege, Bauprojekt, Sonstiges)
  5. Core business services like Pflasterarbeiten and Terrassenbau cannot be selected
- **File:** `src/lib/contact-schema.ts` line 39-43
- **Priority:** Fix before deployment -- customers cannot accurately describe their service need

#### BUG-SITE-4: Projektumfang is required but spec says optional
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Go to /kontakt, fill step 1 + 2 without selecting Projektumfang
  2. Try to proceed to step 3
  3. Expected: Can proceed (field is optional per spec)
  4. Actual: Validation error -- Projektumfang is required (z.enum with required message, asterisk in UI)
- **File:** `src/lib/contact-schema.ts` line 27-29 (uses required z.enum instead of optional)
- **Priority:** Fix before deployment -- spec explicitly says "Optional: Ungefaehr Projektumfang"

#### BUG-SITE-5: Kontaktformular "Gewerblich" label missing description
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Go to /kontakt, fill step 1, proceed to step 2
  2. Look at Kundentyp radio options
  3. Expected: "Gewerblich (Hausverwaltung, Baufirma, etc.)" per spec
  4. Actual: Just "Gewerblich"
  5. Target users (Hausverwaltungen, Baufirmen) may not identify with the generic label
- **File:** `src/components/contact-form.tsx` line 263
- **Priority:** Fix before deployment -- the PRD explicitly targets Hausverwaltungen and Baufirmen

#### BUG-SITE-6: WhatsApp chat auto-open delay is 3s instead of spec's 1s
- **Severity:** Low
- **Steps to Reproduce:**
  1. Clear sessionStorage, reload any page
  2. Time how long until WhatsApp chat opens
  3. Expected: ~1 second per spec
  4. Actual: ~3 seconds (setTimeout 3000ms at line 23)
- **File:** `src/components/whatsapp-button.tsx` line 23
- **Priority:** Nice to have -- 3s may actually be better UX (less intrusive)

#### BUG-SITE-7: WhatsApp chat welcome message deviates from spec
- **Severity:** Low
- **Steps to Reproduce:**
  1. Open WhatsApp chat widget
  2. Read the welcome message
  3. Expected per spec: "Guten Tag. Schreiben Sie uns direkt -- wir beraten Sie persoenlich und erstellen Ihnen ein unverbindliches Angebot."
  4. Actual: "Guten Tag" + "Wie koennen wir Ihnen helfen?" (shorter, different text)
- **File:** `src/components/whatsapp-button.tsx` lines 112-116
- **Priority:** Nice to have -- current text is adequate

#### BUG-SITE-8: WhatsApp chat missing "Antwortet innerhalb von einer Stunde" status text
- **Severity:** Low
- **Steps to Reproduce:**
  1. Open WhatsApp chat widget
  2. Look at the header area below the company name
  3. Expected per spec: Status text "Antwortet innerhalb von einer Stunde"
  4. Actual: No status text -- only company name displayed
- **File:** `src/components/whatsapp-button.tsx` lines 51-83
- **Priority:** Nice to have -- adds trust signal

#### BUG-SITE-9: No email notification for new leads (CARRIED OVER)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Submit a valid contact form
  2. Check if business owner receives email notification
  3. Expected: Email sent to owner with all form fields
  4. Actual: Lead stored in Supabase only -- no email notification
- **Note:** Previously documented as PROJ-5 BUG-10, closed as "deliberate -- backend trigger instead." However, no backend trigger has been implemented either. The owner must manually check Supabase dashboard.
- **Priority:** Should be implemented before or shortly after go-live to ensure leads are not missed

---

### Security Audit (Red Team -- Full Site)

#### SEC-1: Security Headers
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Permissions-Policy: camera=(), microphone=(), geolocation=()
- [x] Content-Security-Policy: present with frame-ancestors 'none', script-src 'self' 'unsafe-inline' (no unsafe-eval)
- [x] CSP improved since last audit -- unsafe-eval removed

#### SEC-2: Input Validation & Sanitization
- [x] Contact form: Zod server-side validation on all fields
- [x] HTML tag stripping via sanitize() function before DB insert
- [x] Honeypot check before Zod validation (silent success for bots)
- [x] Enum validation prevents invalid kundentyp/leistungsart/projektumfang values

#### SEC-3: Rate Limiting
- [x] Supabase-based rate limiting: 3 requests per IP per 10 minutes (persistent across serverless instances)
- [x] IP resolution: cf-connecting-ip > x-real-ip > x-forwarded-for
- [x] 429 response for exceeded limits

#### SEC-4: Secrets Management
- [x] .env.local in .gitignore via .env*.local pattern
- [x] .env.local.example uses dummy values
- [x] SUPABASE_SERVICE_ROLE_KEY is server-only (no NEXT_PUBLIC_ prefix)
- [x] Supabase server client only used in API routes and server components
- [x] No secrets exposed in client-side code or browser network tab

#### SEC-5: Authentication/Authorization
- [x] No authenticated routes in the current MVP (public website only)
- [x] API route /api/contact only accepts POST (no other methods exported)
- [x] No admin panel exposed (PROJ-7 is In Progress, not deployed)

#### SEC-6: Data Exposure
- [x] Supabase hostname visible in next.config.ts (expected -- anon key is in env vars only)
- [x] Error responses do not leak internal details (generic German messages)
- [x] No PII in static page output
- [x] Phone number and email are intentionally public (business contact info)

#### SEC-7: External Links
- [x] All external links (Facebook, Instagram, WhatsApp, Vercel privacy, Supabase privacy, LDI NRW) have target="_blank" rel="noopener noreferrer"

#### SEC-8: XSS Vectors
- [x] No dangerouslySetInnerHTML anywhere in the codebase
- [x] All content is either hardcoded or fetched from Supabase via parameterized queries
- [x] CSP restricts script-src to 'self' 'unsafe-inline' (unsafe-inline needed for Next.js hydration)
- [x] React default JSX escaping protects against reflected XSS

**Security Verdict: PASS** -- No critical or high security issues remaining. The CSP unsafe-inline is a known Next.js limitation and acceptable for this deployment.

---

### Responsive Audit (Code Review)

#### 375px (Mobile)
- [x] Header: Hamburger menu, fullscreen overlay with blur
- [x] Hero: CTAs stack vertically, full width
- [x] Leistungen cards: single column
- [x] Review carousel: 85vw card width, horizontal scroll
- [x] Contact form: single column multi-step wizard
- [x] Footer: single column with stacked sections
- [x] WhatsApp widget: 300px width chat window

#### 768px (Tablet)
- [x] Header switches to desktop navigation at md breakpoint
- [x] CTA button visible from sm breakpoint (640px)
- [x] Form fields use sm:grid-cols-2
- [x] Footer: 2-column grid

#### 1440px (Desktop)
- [x] Max content width max-w-7xl (1280px) centered
- [x] Leistungen: 3-column grid at lg
- [x] Contact page: 2-column grid (form + sidebar)
- [x] Projekt gallery: 3-column grid at lg
- [x] Stats: 4-column grid at lg

---

### Cross-Browser Notes (Code-Level)
- [x] backdrop-blur used extensively -- Chrome 76+, Firefox 103+, Safari 9+
- [x] prefers-reduced-motion stops all Framer Motion and CSS animations
- [x] Video playsInline for iOS Safari autoplay
- [x] -webkit-scrollbar + scrollbar-width fallbacks for custom scrollbar hiding
- [x] No vendor-specific CSS without fallbacks
- **Recommendation:** Manual browser testing in Chrome, Firefox, Safari before production launch

---

### Accessibility Audit
- [x] All sections have aria-label attributes
- [x] Mobile menu has aria-hidden toggle, body scroll lock
- [x] Form fields have proper FormLabel associations
- [x] Filter tabs use role="tablist" and aria-selected
- [x] WhatsApp dialog has role="dialog" and aria-label
- [x] Images inside linked cards use alt="" (decorative, link provides context)
- [x] Skip to content not implemented (minor -- not blocking)
- [x] prefers-reduced-motion CSS present in globals.css
- [x] Focus ring uses primary green color (--ring CSS variable)
- [x] Footer navigation has aria-label and aria-current for active page

---

### Go-Live Summary

**Total Bugs Found: 9 new + carried over**

| Severity | Count | Bugs |
|----------|-------|------|
| Critical | 0 | -- |
| High | 3 | BUG-SITE-1 (ESLint fails), BUG-SITE-2 (oversized images), BUG-SITE-3 (Leistungsarten incomplete) |
| Medium | 3 | BUG-SITE-4 (Projektumfang required not optional), BUG-SITE-5 (Gewerblich label), BUG-SITE-9 (no email notification) |
| Low | 3 | BUG-SITE-6, BUG-SITE-7, BUG-SITE-8 (WhatsApp spec deviations) |

**Production Ready: NO**

**BLOCKING issues (must fix before go-live):**
1. **BUG-SITE-1** -- ESLint errors will block CI. Add eslint-disable comments or refactor.
2. **BUG-SITE-2** -- 10+ images over 1 MB (total ~44 MB oversized). Convert PNGs to WebP, compress JPGs. PRD target is PageSpeed >= 90.
3. **BUG-SITE-3** -- Contact form only has 3 Leistungsarten options instead of 5. Customers cannot select Pflasterarbeiten or Terrassenbau.

**SHOULD FIX before go-live:**
4. **BUG-SITE-4** -- Projektumfang should be optional per spec, currently required.
5. **BUG-SITE-5** -- "Gewerblich" needs descriptive text "(Hausverwaltung, Baufirma, etc.)".
6. **BUG-SITE-9** -- No email notification means leads could be missed. At minimum, set up a Supabase webhook or Edge Function.

**NICE TO HAVE (can go-live without):**
7. BUG-SITE-6/7/8 -- WhatsApp widget spec deviations (timing, message text, status line)

**Recommended fix order:** BUG-SITE-1 > BUG-SITE-2 > BUG-SITE-3 > BUG-SITE-4 > BUG-SITE-5 > BUG-SITE-9

After fixes, re-run `/qa` for final verification.
