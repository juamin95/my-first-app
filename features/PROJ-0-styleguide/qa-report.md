# PROJ-0 – Design System & Styleguide: QA-Bericht

## QA-Testergebnisse

**Tested:** 2026-03-22
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)

### 1. Brand Color Tokens (Tailwind Config)

#### TC-1: All 12 brand tokens defined in tailwind.config.ts
- [x] `brand-green-light` = `#eef6e8` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-green-mid` = `#f4f7f2` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-green-muted` = `#ddebd5` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-green-accent` = `#d5e8cb` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-green-soft` = `#90d170` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-green-pale` = `#c8f0a8` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-green-deep` = `#3a632b` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-green-vivid` = `#6db33f` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-stone-light` = `#f5f3ee` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-stone-mid` = `#ede9e2` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-stone-muted` = `#e0dbd1` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `brand-image-placeholder` = `#e8f0e4` -- matches spec · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### TC-2: CSS Variables (shadcn/ui) defined in globals.css
- [x] All shadcn CSS variables present (--primary, --foreground, --background, etc.) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Primary color is dark green (HSL 104 39% 28%) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Light and dark themes both defined · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### 2. Typography Classes

#### TC-3: Typography patterns match spec
- [x] Section-Badge: `text-sm font-semibold uppercase tracking-widest text-primary` -- used in SectionHeader and inline in 4+ files · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Section-H2: `mt-3 text-3xl font-bold tracking-tight sm:text-4xl` -- matches SectionHeader component · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Section-Beschreibung: `mt-4 text-muted-foreground` with correct max-width per align -- matches SectionHeader · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] BUG: Hero-H1 spec says `font-extrabold` but PageHero implementation uses `font-bold` (see BUG-1) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Gradient-Text: `bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text text-transparent` -- used in page.tsx, ueber-uns/page.tsx · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Karten-Titel: `text-lg font-bold tracking-tight` -- verified in card components · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### 3. Gradient Backgrounds

#### TC-4: All four gradient patterns used correctly
- [x] Grun Standard (`bg-gradient-to-br from-brand-green-light via-brand-green-mid to-brand-green-muted`) -- used in page.tsx, ueber-uns/page.tsx · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Grun Reversed (`bg-gradient-to-tr from-brand-green-muted via-brand-green-mid to-brand-green-light`) -- used in ueber-uns/page.tsx · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Grun Vorschau (`bg-gradient-to-tl from-brand-green-light via-brand-green-mid to-brand-green-muted`) -- used in page.tsx · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Stein Standard (`bg-gradient-to-br from-brand-stone-light via-brand-stone-mid to-brand-stone-muted`) -- used in leistungen/page.tsx · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### 4. Section Pattern (Layer-Effekt)

#### TC-5: Overlap pattern applied consistently
- [x] Standard sections use `relative -mt-8 overflow-hidden rounded-t-[2.5rem]` -- verified across 15+ sections · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] First sections after PageHero use `relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem]` -- verified in kontakt, leistungen, ueber-uns, projekte · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### 5. Shared Components

#### TC-6: SectionHeader component
- [x] File exists at `src/components/ui/section-header.tsx` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Props: badge (required), title (required), description (optional), align (optional, default "center"), className (optional) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Wraps in `<FadeIn>` internally · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] align="left": no text-center, description gets `max-w-3xl` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] align="center": text-center, description gets `mx-auto max-w-xl` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Used in: page.tsx, ueber-uns/page.tsx, leistungen/page.tsx · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### TC-7: CTASection component
- [x] File exists at `src/components/cta-section.tsx` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Uses `/images/cta-bg.jpg` as background (file exists) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Phone button with `+4915168452004` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Two trust badges: "Unverbindliches Angebot" + "Persönliche Beratung vor Ort" · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Wraps in `<FadeIn>` internally · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Default primaryLabel = "Jetzt Angebot anfragen" · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Used in: page.tsx, ueber-uns/page.tsx, leistungen/page.tsx · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### TC-8: PageHero component
- [x] File exists at `src/components/ui/page-hero.tsx` · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Props: badge, title, subtitle, imageSrc, imageAlt, overlayOpacity, objectPosition · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] BUG: overlayOpacity default is 0.55, spec documents default as 0.5 (see BUG-2) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Uses FadeIn for staggered animations (badge, title, subtitle) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Used in: projekte, ueber-uns, leistungen, kontakt pages · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### 6. Icons

#### TC-9: Icon conventions
- [x] Uses `lucide-react` as icon library (verified in imports across components) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Button/inline icons use `h-4 w-4` (e.g., Phone icon in CTASection) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### 7. Build & Lint

#### TC-10: Production build
- [x] `npm run build` completes without errors · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### TC-11: ESLint
- [ ] BUG: 3 ESLint errors in `src/app/datenschutz/page.tsx` -- unescaped quote entities (see BUG-3) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] BUG: 1 ESLint warning in `src/lib/projekte-service.ts` -- unused eslint-disable directive (see BUG-4) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### 8. Security Audit

#### SEC-1: Security Headers (next.config.ts)
- [x] X-Frame-Options: DENY · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] X-Content-Type-Options: nosniff · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Strict-Transport-Security with includeSubDomains and preload · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Permissions-Policy: camera, microphone, geolocation denied · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Content-Security-Policy: frame-ancestors 'none', script/style/img/connect sources restricted · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Referrer-Policy: `strict-origin-when-cross-origin` (more restrictive than spec's `origin-when-cross-origin` -- acceptable) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] BUG: CSP allows `unsafe-inline` and `unsafe-eval` for scripts (see BUG-5) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### SEC-2: Secrets Management
- [x] `.env.local` is in `.gitignore` (via `.env*.local` pattern) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `.env.local.example` uses dummy values, no real keys · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] `SUPABASE_SERVICE_ROLE_KEY` is server-only (no `NEXT_PUBLIC_` prefix) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Server client (`supabase-server.ts`) only used in API route, never in client components · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### SEC-3: Contact API Security
- [x] Zod validation on all form inputs server-side · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] HTML tag stripping via `sanitize()` function · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Honeypot field (`website`) for bot detection · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Rate limiting: 3 requests per 10 minutes per IP (Supabase-based, persistent) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] IP resolution from multiple headers (cf-connecting-ip, x-real-ip, x-forwarded-for) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Error responses do not leak internal details · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

#### SEC-4: Accessibility
- [x] `prefers-reduced-motion` media query in globals.css disables animations · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Sections have `aria-label` attributes · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### Gefundene Bugs

#### BUG-1: Hero-H1 Typography Mismatch -- Spec vs Implementation
- **Severity:** Low
- **Steps to Reproduce:**
  1. Read styleguide: Hero-H1 specifies `text-4xl font-extrabold sm:text-5xl lg:text-6xl`
  2. Read `src/components/ui/page-hero.tsx` line 47: uses `font-bold` instead of `font-extrabold`
  3. Expected: `font-extrabold` per styleguide
  4. Actual: `font-bold` in implementation
- **Priority:** Nice to have -- either update the spec to document the intentional deviation, or update the component to match the spec

#### BUG-2: PageHero overlayOpacity Default Mismatch -- Spec vs Implementation
- **Severity:** Low
- **Steps to Reproduce:**
  1. Read styleguide line 127: documents `overlayOpacity` default as `0.5`
  2. Read `src/components/ui/page-hero.tsx` line 22: actual default is `0.55`
  3. JSDoc comment on line 11 also says `0.55`
  4. Expected: Spec and implementation should agree
  5. Actual: Spec says 0.5, implementation says 0.55
- **Priority:** Nice to have -- update the spec to reflect the actual default of 0.55

#### BUG-3: ESLint Errors in Datenschutz Page
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Run `npm run lint`
  2. See 3 errors in `src/app/datenschutz/page.tsx` (lines 29, 87) for unescaped `"` characters
  3. Expected: No lint errors
  4. Actual: `react/no-unescaped-entities` rule violated
- **Priority:** Fix before deployment -- lint errors will block CI pipelines

#### BUG-4: Unused ESLint-Disable Directive in projekte-service.ts
- **Severity:** Low
- **Steps to Reproduce:**
  1. Run `npm run lint`
  2. See warning in `src/lib/projekte-service.ts` line 4: unused eslint-disable directive
  3. Expected: No unnecessary suppression comments
  4. Actual: Stale eslint-disable for `@typescript-eslint/no-explicit-any`
- **Priority:** Nice to have

#### BUG-5: CSP Allows unsafe-inline and unsafe-eval for Scripts
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Read `next.config.ts` line 16: `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
  2. Expected: Strict CSP without unsafe-inline/unsafe-eval, using nonces instead
  3. Actual: Both `unsafe-inline` and `unsafe-eval` are permitted, which weakens XSS protection
- **Note:** This is common with Next.js due to how it injects scripts. Implementing nonce-based CSP with Next.js requires additional setup. Acceptable for MVP but should be hardened post-launch.
- **Priority:** Fix in next sprint

### Zusammenfassung
- **Design Token Accuracy:** 12/12 tokens match (100%)
- **Component Compliance:** 3/3 shared components exist and follow documented API
- **Gradient Patterns:** 4/4 patterns used correctly
- **Section Patterns:** Consistent across all pages
- **Build:** Passes without errors
- **Lint:** 3 errors + 1 warning (must fix errors before deployment)
- **Bugs Found:** 5 total (0 critical, 0 high, 2 medium, 3 low)
- **Security:** Solid posture -- headers, validation, rate limiting, secrets all properly handled. CSP could be tightened post-MVP.
- **Production Ready:** NO -- ESLint errors (BUG-3) must be fixed first
- **Recommendation:** Fix BUG-3 (ESLint errors in datenschutz page), then re-run QA. BUG-5 (CSP) should be addressed in a follow-up sprint. BUG-1 and BUG-2 are documentation mismatches that should be resolved to keep the styleguide accurate.
