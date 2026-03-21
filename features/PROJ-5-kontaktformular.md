# PROJ-5: Kontaktformular & Lead-Erfassung

## Status: In Review
**Created:** 2026-03-14
**Last Updated:** 2026-03-20

## Implementation Notes (Frontend)
- Contact page at `/kontakt` with hero section (dark overlay image, badge, heading, subtext)
- Contact form component using react-hook-form + Zod v4 validation with shadcn/ui Form primitives
- All required fields implemented: Vorname, Nachname, E-Mail, Telefon, Kundentyp (Radio), Leistungsart (Select), Nachricht (Textarea)
- Optional field: Projektumfang (Select)
- Datenschutz checkbox (required)
- Honeypot field for anti-spam (hidden from users, checked on both client and server)
- Success state replaces form after submission with confirmation message
- Error state shows inline alert banner
- Loading state disables submit button with spinner
- Sidebar with contact details (phone, email, address, hours) in glassmorphism card
- Phone CTA card with primary background
- Responsive: single column on mobile, 2/3 + 1/3 grid on desktop
- Design follows project conventions: FadeIn animations, rounded sections with overlap, glass-style cards
- Stub API route at `/api/contact` with server-side Zod validation (full backend with Resend + Supabase pending)

## Dependencies
- Requires: PROJ-1 (Layout & Navigation)

## User Stories
- Als Besucher möchte ich einfach und schnell eine Anfrage stellen können, damit ich nicht lange suchen muss
- Als gewerblicher Kunde möchte ich angeben können dass ich eine Hausverwaltung/Baufirma bin, damit ich eine passende Antwort bekomme
- Als Besucher möchte ich nach dem Absenden eine Bestätigung sehen, damit ich weiß dass meine Anfrage angekommen ist
- Als Inhaber möchte ich eine E-Mail-Benachrichtigung bei neuen Anfragen erhalten, damit ich schnell reagieren kann
- Als Inhaber möchte ich qualifizierte Leads von kleinen Anfragen unterscheiden können, damit ich Prioritäten setzen kann

## Acceptance Criteria

### Seite & Layout
- [ ] Seite erreichbar unter `/kontakt`
- [ ] Seiten-Hero: "Kontakt aufnehmen" + Einleitungstext (z.B. "Wir melden uns innerhalb von 24 Stunden")
- [ ] Neben dem Formular: Kontaktdaten (Telefon, E-Mail, Adresse, Öffnungszeiten)
- [ ] Optional: Google Maps Embed oder Adressbox

### Formularfelder
- [ ] Pflichtfeld: Vorname + Nachname
- [ ] Pflichtfeld: E-Mail-Adresse (mit Validierung)
- [ ] Pflichtfeld: Telefonnummer
- [ ] Pflichtfeld: Kundentyp (Radio: "Privatkunde" / "Gewerblich (Hausverwaltung, Baufirma, etc.)")
- [ ] Pflichtfeld: Art der Anfrage (Dropdown: Gartengestaltung, Gartenpflege, Pflasterarbeiten, Terrassenbau, Sonstiges)
- [ ] Pflichtfeld: Kurzbeschreibung / Nachricht (Textarea, min. 20 Zeichen)
- [ ] Optional: Ungefährer Projektumfang (Dropdown: < 1.000 €, 1.000–5.000 €, 5.000–20.000 €, > 20.000 €)
- [ ] Datenschutz-Checkbox (Pflicht): "Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu"
- [ ] Absenden-Button: "Anfrage senden"

### Validierung & UX
- [ ] Client-seitige Validierung (Zod + react-hook-form): Fehlermeldungen unter den Feldern
- [ ] Formular kann nur abgesendet werden wenn alle Pflichtfelder korrekt ausgefüllt sind
- [ ] Nach Absenden: Erfolgs-Meldung sichtbar ("Vielen Dank! Wir melden uns in Kürze.")
- [ ] Formular wird nach Absenden geleert oder durch Erfolgsmeldung ersetzt
- [ ] Fehlerstatus (Server Error): "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."

### Backend / Lead-Erfassung
- [ ] Formular-Submit sendet Daten an eine Next.js API Route (`/api/contact`)
- [ ] API Route sendet E-Mail-Benachrichtigung an Inhaber (via Resend oder ähnlich)
- [ ] E-Mail enthält alle Formularfelder strukturiert
- [ ] Leads werden in Supabase-Tabelle `leads` gespeichert (für spätere Auswertung)
- [ ] Anti-Spam: Honeypot-Feld (verstecktes Feld, das Bots ausfüllen)

## Edge Cases
- Was passiert bei ungültiger E-Mail? → Inline-Fehlermeldung "Bitte geben Sie eine gültige E-Mail-Adresse ein"
- Was passiert wenn der E-Mail-Versand fehlschlägt? → Lead wird trotzdem in DB gespeichert; Fehlermeldung an Nutzer
- Was passiert wenn der Nutzer mehrfach absendet? → Submit-Button wird nach erstem Klick deaktiviert (Loading-State)
- Was passiert bei Spam-Bots? → Honeypot-Feld fängt automatisierte Anfragen ab
- Was passiert wenn Supabase nicht erreichbar? → Fehler wird geloggt, Nutzer sieht generische Fehlermeldung
- Was passiert auf Mobile mit dem Formular? → Einspaltig, Touch-optimierte Eingabefelder

## Technical Requirements
- Formular: react-hook-form + Zod-Validierung
- API: Next.js Route Handler (`app/api/contact/route.ts`)
- E-Mail: Resend (kostenlose Tier: 100 E-Mails/Tag)
- Datenbank: Supabase Tabelle `leads` (id, created_at, vorname, nachname, email, telefon, kundentyp, leistungsart, nachricht, projektumfang, status)
- DSGVO: Datenschutz-Checkbox verpflichtend, Daten nur so lange gespeichert wie nötig

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results (Re-test #2)

**Tested:** 2026-03-20
**Previous test:** 2026-03-20 (initial)
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS (production build compiles, /kontakt static, /api/contact dynamic)

### Acceptance Criteria Status

#### AC-1: Seite & Layout
- [x] Seite erreichbar unter `/kontakt` (HTTP 200, static page generated)
- [x] Seiten-Hero: "Kontakt aufnehmen" heading present with introductory text
- [ ] BUG-1: Hero subtext says "unverbindliches Angebot" but spec requires "Wir melden uns innerhalb von 24 Stunden" -- the 24h promise is missing from hero
- [x] Neben dem Formular: Kontaktdaten (Telefon, E-Mail, Erreichbarkeit) in sidebar card
- [ ] BUG-2: Kontaktdaten sidebar is MISSING "Adresse" -- spec requires physical address to be displayed
- [ ] BUG-3: No Google Maps Embed or Adressbox present (spec says "Optional")

#### AC-2: Formularfelder
- [x] Pflichtfeld: Vorname + Nachname (Zod min(1) validation, red asterisk in UI)
- [x] Pflichtfeld: E-Mail-Adresse (Zod .email() validation)
- [x] Pflichtfeld: Telefonnummer (Zod regex validation for phone formats)
- [x] Pflichtfeld: Kundentyp (RadioGroup with "Privatkunde" / "Gewerblich")
- [ ] BUG-4: Kundentyp "Gewerblich" label is missing the clarifying description "(Hausverwaltung, Baufirma, etc.)" -- spec requires it so target users can identify themselves
- [ ] BUG-5: Art der Anfrage (Leistungsart) is implemented as RadioGroup but spec requires a Dropdown/Select
- [ ] BUG-6: Leistungsarten has only 2 options ("Pflege", "Bauprojekt") but spec requires 5: Gartengestaltung, Gartenpflege, Pflasterarbeiten, Terrassenbau, Sonstiges
- [x] FIXED (was BUG-7): Nachricht now has min(20) Zod validation and shows required asterisk in UI
- [ ] BUG-8: "Projektumfang" optional field is completely MISSING from the form, schema, and API -- spec requires a dropdown with budget ranges
- [x] Datenschutz-Checkbox present and required (refine val === true)
- [x] Absenden-Button: "Anfrage senden" with Send icon

#### AC-3: Validierung & UX
- [x] Client-seitige Validierung (Zod + react-hook-form) with inline error messages via FormMessage
- [x] Formular cannot be submitted without filling all required fields (multi-step validation via form.trigger per step)
- [x] Nach Absenden: Erfolgsmeldung visible ("Vielen Dank fuer Ihre Anfrage!")
- [ ] BUG-9: Success message text says "Vielen Dank fuer Ihre Anfrage!" but spec requires "Vielen Dank! Wir melden uns in Kuerze."
- [x] Formular replaced by success message after submission (motion animated)
- [x] Fehlerstatus shows "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut." in alert banner
- [x] Loading state disables submit button with Loader2 spinner ("Wird gesendet...")

#### AC-4: Backend / Lead-Erfassung
- [x] Formular-Submit sends data to `/api/contact` via POST with JSON body
- [ ] BUG-10: API Route does NOT send E-Mail-Benachrichtigung -- no Resend integration exists. Noted as "pending" in implementation notes but spec lists it as acceptance criterion
- [ ] BUG-11: API Route does NOT store `projektumfang` in database (field missing from schema, form, and insert)
- [x] Leads are inserted into Supabase `leads` table via supabase.from("leads").insert()
- [x] Anti-Spam: Honeypot field present (hidden "website" field, positioned off-screen)
- [ ] BUG-12: Honeypot implementation is flawed -- Zod schema has `z.string().max(0).optional()` which rejects non-empty strings with a 400 error containing field error details. Bots that fill the honeypot receive a validation error revealing it is a trap, instead of a silent 200 success

### Edge Cases Status

#### EC-1: Ungueltige E-Mail
- [x] Server-side: Invalid email returns 400 with German error message
- [x] Client-side: Zod validation shows "Bitte geben Sie eine gueltige E-Mail-Adresse ein"

#### EC-2: E-Mail-Versand fehlschlaegt
- [ ] NOT TESTABLE: E-Mail sending is not implemented yet (see BUG-10)

#### EC-3: Mehrfach-Submit
- [x] Submit button is disabled during submission (loading state with Loader2 spinner)
- [x] Client-side honeypot check returns fake success immediately for bot submissions

#### EC-4: Spam-Bots
- [ ] BUG-12 (see above): Honeypot reveals itself through Zod validation error response

#### EC-5: Supabase nicht erreichbar
- [x] API catches Supabase insert errors and returns 500 with "Datenbankfehler"
- [x] Generic catch returns 500 with "Interner Serverfehler"

#### EC-6: Mobile Formular
- [x] Multi-step wizard layout works on mobile (single column)
- [x] Touch-optimized inputs with proper spacing, sm:grid-cols-2 for larger screens

### Security Audit Results

- [x] Security Headers: X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, HSTS max-age=63072000 with includeSubDomains and preload, Permissions-Policy restricts camera/microphone/geolocation
- [x] GET requests to /api/contact return 405 (only POST exported)
- [x] Server-side Zod validation rejects invalid/malformed data with 400
- [x] Enum validation prevents invalid kundentyp values (only "privat" or "gewerblich")
- [x] FIXED (was BUG-13): Rate limiting now implemented -- max 3 requests per IP per 10-minute window, returns 429 on excess
- [ ] BUG-13a (SECURITY): Rate limiter is in-memory only (`Map`). It resets on every server restart/redeployment and does NOT work across multiple serverless function instances on Vercel. An attacker can bypass by rotating IP headers or waiting for cold starts
- [ ] BUG-13b (SECURITY): Rate limiter relies on `x-forwarded-for` header which can be trivially spoofed by an attacker to bypass rate limiting entirely. Each request can use a different forged IP
- [ ] BUG-14 (SECURITY): No input sanitization/escaping before database insertion -- XSS payloads like `<script>alert(1)</script>` are accepted and stored directly in Supabase. If PROJ-7 Admin interface renders these without escaping, stored XSS is possible
- [ ] BUG-15 (SECURITY): The Supabase client in `src/lib/supabase.ts` uses the anon key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) for server-side API route inserts. Server-side operations should use a service role key (without NEXT_PUBLIC_ prefix) for proper privilege separation. RLS policies on the `leads` table must be verified
- [x] .env.local is in .gitignore (via `.env*.local` pattern)
- [x] .env.local.example exists with dummy values
- [x] No Supabase credentials exposed in client-side rendered HTML
- [ ] BUG-16 (SECURITY): No Content-Security-Policy header configured in next.config.ts -- leaves the site vulnerable to XSS if user content is ever rendered
- [x] Datenschutz checkbox validation works server-side (datenschutz=false returns 400)
- [ ] BUG-17: Zod server-side validation errors for missing fields use English text ("Invalid input: expected string, received undefined") instead of German. This leaks implementation details and provides inconsistent UX
- [ ] BUG-18 (SECURITY): API returns full Zod error details in the 400 response via `result.error.flatten()`. This exposes internal schema structure to attackers (field names, validation rules, types). Should return only user-friendly German messages

### Cross-Browser Testing
- Note: Automated cross-browser testing was not possible in this environment. The following is based on code review of the component implementations.
- [x] No browser-specific CSS or JS detected
- [x] shadcn/ui components are cross-browser compatible (Radix UI primitives)
- [x] Framer Motion animations use standard CSS transforms (opacity, translateX)
- [x] Form uses standard HTML input types (email, tel, text, checkbox) -- native mobile keyboards will be triggered
- [ ] Manual testing in Chrome, Firefox, Safari recommended before deployment

### Responsive Testing
- [x] Mobile (375px): Single-column layout, multi-step wizard fits well, sidebar stacks below form
- [x] Tablet (768px): Form fields use sm:grid-cols-2 for 2-column layout where appropriate
- [x] Desktop (1440px): lg:grid-cols-3 layout (form 2/3 + sidebar 1/3), sidebar becomes sticky (top-28)

### Bugs Found

#### BUG-1: Hero subtext does not match spec
- **Severity:** Low
- **Steps to Reproduce:**
  1. Go to /kontakt
  2. Read the hero section subtext
  3. Expected: "Wir melden uns innerhalb von 24 Stunden" or similar
  4. Actual: "Haben Sie ein Projekt im Sinn? Schreiben Sie uns oder rufen Sie an -- wir erstellen Ihnen ein unverbindliches Angebot."
- **Priority:** Nice to have

#### BUG-2: Address missing from contact details sidebar
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Go to /kontakt
  2. Look at the sidebar contact details card
  3. Expected: Physical address (Adresse) displayed alongside phone, email, hours
  4. Actual: Only Telefon, E-Mail, WhatsApp, and Erreichbarkeit shown -- no address
- **Priority:** Fix before deployment (spec requirement)

#### BUG-3: No Google Maps or address box
- **Severity:** Low
- **Steps to Reproduce:**
  1. Go to /kontakt
  2. Look for a map or address box
  3. Expected: Google Maps embed or address box (spec says "Optional")
  4. Actual: Not present
- **Priority:** Nice to have (spec marks as optional)

#### BUG-4: Gewerblich label missing description
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Go to /kontakt, fill step 1, proceed to step 2
  2. Look at Kundentyp radio options
  3. Expected: "Gewerblich (Hausverwaltung, Baufirma, etc.)"
  4. Actual: Just "Gewerblich" with no clarifying text
- **Priority:** Fix before deployment (target users -- Hausverwaltungen, Baufirmen -- need to identify themselves)

#### BUG-5: Leistungsart uses RadioGroup instead of Dropdown
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Go to /kontakt, fill step 1, proceed to step 2
  2. Look at "Art der Anfrage" field
  3. Expected: Dropdown/Select component per spec
  4. Actual: RadioGroup cards
- **Priority:** Fix in next sprint (functional but will become unwieldy with 5 options)

#### BUG-6: Leistungsarten has only 2 options instead of 5
- **Severity:** High
- **Steps to Reproduce:**
  1. Go to /kontakt, fill step 1, proceed to step 2
  2. Look at available Leistungsart options
  3. Expected: Gartengestaltung, Gartenpflege, Pflasterarbeiten, Terrassenbau, Sonstiges
  4. Actual: Only "Pflege" and "Bauprojekt"
- **Priority:** Fix before deployment (core business offering incomplete -- customers cannot select their actual service need)

#### ~~BUG-7: FIXED~~ -- Nachricht field now has min(20) validation and required asterisk in UI

#### BUG-8: Projektumfang optional field completely missing
- **Severity:** High
- **Steps to Reproduce:**
  1. Go to /kontakt
  2. Look for a "Projektumfang" dropdown anywhere in the form
  3. Expected: Optional dropdown with ranges (< 1.000 EUR, 1.000-5.000 EUR, 5.000-20.000 EUR, > 20.000 EUR)
  4. Actual: Field does not exist in form, schema, or API
- **Priority:** Fix before deployment (critical for lead qualification -- the PRD success metric targets projects > 5.000 EUR)

#### BUG-9: Success message text does not match spec
- **Severity:** Low
- **Steps to Reproduce:**
  1. Submit a valid form
  2. Read the success message
  3. Expected: "Vielen Dank! Wir melden uns in Kuerze."
  4. Actual: "Vielen Dank fuer Ihre Anfrage!" + "Wir haben Ihre Nachricht erhalten und melden uns in Kuerze persoenlich bei Ihnen."
- **Priority:** Nice to have (message conveys same meaning, arguably better)

#### BUG-10: E-Mail notification not implemented
- **Severity:** High
- **Steps to Reproduce:**
  1. Submit a valid form via /api/contact
  2. Check if owner receives email notification
  3. Expected: Email sent via Resend with all form fields structured
  4. Actual: No email sending logic exists in API route -- no Resend SDK imported, no email template
- **Priority:** Fix before deployment (owner will not know about new leads without checking Supabase dashboard)

#### BUG-11: Projektumfang not stored in database
- **Severity:** High (linked to BUG-8)
- **Steps to Reproduce:**
  1. Review API route insert statement at line 55-63 of route.ts
  2. Expected: projektumfang field included in Supabase insert
  3. Actual: Field not present in insert object, not in schema, not in form
- **Priority:** Fix before deployment (with BUG-8)

#### BUG-12: Honeypot reveals itself to bots via validation error
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Send POST to /api/contact with body containing `"website": "http://spam.com"`
  2. Expected: HTTP 200 with `{"success": true}` (silent rejection -- bot thinks submission succeeded)
  3. Actual: HTTP 400 with error details including `"website"` field error "Too big: expected string to have <=0 characters"
  4. A bot receiving this can learn to leave the field empty, defeating the honeypot
  5. Root cause: Zod schema validates `website` with `z.string().max(0).optional()` BEFORE the honeypot check in the API handler
- **Priority:** Fix before deployment (move honeypot check before Zod validation, or remove website from Zod schema and check manually)

#### ~~BUG-13: FIXED~~ -- Rate limiting now implemented (3 requests / 10 min / IP)

#### BUG-13a: In-memory rate limiter does not persist across serverless instances (SECURITY)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Rate limiter uses a JavaScript `Map` object in module scope
  2. On Vercel, each serverless function invocation may run in a separate cold-start instance
  3. The Map resets on every cold start and is not shared between instances
  4. An attacker sending requests that hit different instances bypasses rate limiting entirely
- **Priority:** Fix in next sprint (acceptable for MVP with low traffic, but needs Redis/Upstash for production scale)

#### BUG-13b: Rate limiter IP based on spoofable x-forwarded-for header (SECURITY)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Send POST to /api/contact with header `X-Forwarded-For: 1.2.3.4`
  2. Send 3 more requests, each with a different X-Forwarded-For value
  3. Expected: Rate limiter catches repeated abuse from same actual source
  4. Actual: Each request is treated as from a different IP, bypassing rate limit
  5. Note: On Vercel, the platform sets x-forwarded-for reliably, but the code falls back to "unknown" which groups all requests without the header
- **Priority:** Fix in next sprint (use Vercel-specific headers like `x-real-ip` or `x-vercel-forwarded-for`)

#### BUG-14: No input sanitization before database storage (SECURITY)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Submit form with `<script>alert(1)</script>` as Vorname
  2. Data is stored in Supabase without any HTML escaping or sanitization
  3. If PROJ-7 Admin interface renders this data with dangerouslySetInnerHTML or similar, stored XSS occurs
  4. Note: React's default JSX rendering escapes HTML, so this is only exploitable if raw HTML rendering is used
- **Priority:** Fix before deployment (defense in depth -- sanitize on input, escape on output)

#### ~~BUG-15: FIXED~~ -- Server-side API now uses service role key
- New `src/lib/supabase-server.ts` creates client with `SUPABASE_SERVICE_ROLE_KEY` (no NEXT_PUBLIC_ prefix)
- API route imports `createServerClient()` from supabase-server.ts (line 3)
- Proper privilege separation achieved

#### BUG-16: No Content-Security-Policy header (SECURITY)
- **Severity:** Medium
- **Steps to Reproduce:**
  1. Check response headers on any page
  2. Expected: Content-Security-Policy header present
  3. Actual: Missing from security headers array in next.config.ts
- **Priority:** Fix in next sprint

#### BUG-17: Zod validation errors partly in English
- **Severity:** Low
- **Steps to Reproduce:**
  1. Send POST to /api/contact with empty body `{}`
  2. Response contains English Zod default messages for missing fields
  3. Expected: All error messages in German for consistency
- **Priority:** Fix in next sprint

#### ~~BUG-18: FIXED~~ -- API no longer exposes schema structure
- API route (line 43) now returns generic `{ error: "Ungueltige Formulardaten" }` instead of `result.error.flatten()`
- Internal field names and validation rules no longer disclosed

### Summary
- **Acceptance Criteria:** 16/24 passed (67%) -- improved from 63% after BUG-15 and BUG-18 fixes
- **Bugs Found:** 16 open (0 Critical, 4 High, 5 Medium, 4 Low, 3 Nice-to-have). 4 bugs fixed total (BUG-7, BUG-13, BUG-15, BUG-18).
- **Fixed since last QA run:** BUG-15 (service role key), BUG-18 (generic error response)
- **Security:** IMPROVED -- server now uses service role key, API no longer leaks schema details. Remaining: input sanitization, no CSP, in-memory rate limiter limitations.
- **Production Ready:** NO
- **Blocking bugs (must fix before deployment):**
  - BUG-6 (High): Only 2 Leistungsarten instead of 5 -- core business offering incomplete
  - BUG-8/BUG-11 (High): Projektumfang field missing entirely -- critical for lead qualification per PRD
  - BUG-10 (High): No email notification -- owner will not know about new leads
  - BUG-12 (Medium): Honeypot reveals itself to bots
  - BUG-2 (Medium): Address missing from sidebar
  - BUG-4 (Medium): Gewerblich label missing description
  - BUG-14 (Medium): No input sanitization
- **Recommended fix order:** BUG-6 > BUG-8/11 > BUG-10 > BUG-12 > BUG-14 > BUG-2 > BUG-4

## Deployment
_To be added by /deploy_
