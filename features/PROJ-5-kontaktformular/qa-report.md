# PROJ-5: Kontaktformular & Lead-Erfassung: QA-Bericht

## QA-Testergebnisse (Re-test #2)

**Tested:** 2026-03-20
**Previous test:** 2026-03-20 (initial)
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Build Status:** PASS (production build compiles, /kontakt static, /api/contact dynamic)

### Status der Akzeptanzkriterien

#### Bereich: Seite & Layout
- [x] Seite erreichbar unter `/kontakt` (HTTP 200, static page generated) · **AC-1**
- [x] Seiten-Hero: "Kontakt aufnehmen" heading present with introductory text · **AC-2**
- [ ] BUG-1: Hero subtext says "unverbindliches Angebot" but spec requires "Wir melden uns innerhalb von 24 Stunden" -- the 24h promise is missing from hero · **AC-2**
- [x] Neben dem Formular: Kontaktdaten (Telefon, E-Mail, Erreichbarkeit) in sidebar card · **AC-3**
- [x] BUG-2: CLOSED – bewusste Entscheidung: Adresse in Sidebar nicht nötig · **AC-3**
- [x] BUG-3: CLOSED (bewusste Entscheidung) – Google Maps / Adressbox nicht gewünscht, da Inhaber zu Kunden fährt · **AC-4**

#### Bereich: Formularfelder
- [x] Pflichtfeld: Vorname + Nachname (Zod min(1) validation, red asterisk in UI) · **AC-5**
- [x] Pflichtfeld: E-Mail-Adresse (Zod .email() validation) · **AC-6**
- [x] Pflichtfeld: Telefonnummer (Zod regex validation for phone formats) · **AC-7**
- [x] Pflichtfeld: Kundentyp (RadioGroup with "Privatkunde" / "Gewerblich") · **AC-8**
- [x] BUG-4: CLOSED – bewusste Entscheidung: "Gewerblich" ohne Zusatz bleibt · **AC-8**
- [ ] BUG-5: Art der Anfrage (Leistungsart) is implemented as RadioGroup but spec requires a Dropdown/Select · **AC-9**
- [x] BUG-6: CLOSED – bewusste Entscheidung: aktuelle Optionen bleiben · **AC-9**
- [x] FIXED (was BUG-7): Nachricht now has min(20) Zod validation and shows required asterisk in UI · **AC-10**
- [x] BUG-8: FIXED – Projektumfang-Feld (3 Budget-Stufen) in Formular, Schema und API ergänzt · **AC-11**
- [x] Datenschutz-Checkbox present and required (refine val === true) · **AC-12**
- [x] Absenden-Button: "Anfrage senden" with Send icon · **AC-13**

#### Bereich: Validierung & UX
- [x] Client-seitige Validierung (Zod + react-hook-form) with inline error messages via FormMessage · **AC-14**
- [x] Formular cannot be submitted without filling all required fields (multi-step validation via form.trigger per step) · **AC-15**
- [x] Nach Absenden: Erfolgsmeldung visible ("Vielen Dank fuer Ihre Anfrage!") · **AC-16**
- [x] BUG-9: CLOSED – bewusste Entscheidung: Erfolgstext bleibt so · **AC-16**
- [x] Formular replaced by success message after submission (motion animated) · **AC-17**
- [x] Fehlerstatus shows "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut." in alert banner · **AC-18**
- [x] Loading state disables submit button with Loader2 spinner ("Wird gesendet...") · **EC-3**

#### Bereich: Backend / Lead-Erfassung
- [x] Formular-Submit sends data to `/api/contact` via POST with JSON body · **AC-19**
- [x] BUG-10: CLOSED (bewusste Entscheidung) – E-Mail-Benachrichtigung wird nicht über die Next.js API implementiert. Wird später durch Supabase-Backend-Trigger (Edge Function oder Webhook) ausgelöst. Kein Resend-Integration geplant auf Frontend-Ebene. · **AC-20**
- [x] BUG-11: FIXED – projektumfang wird in Supabase leads-Tabelle gespeichert (Spalte per Migration ergänzt) · **AC-21**
- [x] Leads are inserted into Supabase `leads` table via supabase.from("leads").insert() · **AC-21**
- [x] Anti-Spam: Honeypot field present (hidden "website" field, positioned off-screen) · **AC-22**
- [x] BUG-12: FIXED – Honeypot-Check vor Zod-Validierung verschoben, Schema auf `z.string().optional()` geändert · **AC-22**

### Status der Randfälle

#### EC-1: Ungueltige E-Mail
- [x] Server-side: Invalid email returns 400 with German error message
- [x] Client-side: Zod validation shows "Bitte geben Sie eine gueltige E-Mail-Adresse ein"

#### EC-2: E-Mail-Versand fehlschlaegt
- [x] CLOSED (bewusste Entscheidung) – E-Mail-Versand nicht auf dieser Ebene, wird durch Backend-Trigger erledigt

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

### Ergebnisse der Sicherheitsprüfung

- [x] Security Headers: X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, HSTS max-age=63072000 with includeSubDomains and preload, Permissions-Policy restricts camera/microphone/geolocation · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] GET requests to /api/contact return 405 (only POST exported) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Server-side Zod validation rejects invalid/malformed data with 400 · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Enum validation prevents invalid kundentyp values (only "privat" or "gewerblich") · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] FIXED (was BUG-13): Rate limiting now implemented -- max 3 requests per IP per 10-minute window, returns 429 on excess · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] BUG-13a: FIXED – Rate-Limiter auf Supabase umgestellt (persistent, funktioniert über alle Vercel-Instanzen) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] BUG-13b: FIXED – IP-Auflösung priorisiert cf-connecting-ip > x-real-ip > x-forwarded-for · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] BUG-14: FIXED – `sanitize()` entfernt HTML-Tags aus allen Freitext-Feldern vor dem DB-Insert · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] BUG-15: FIXED – API Route nutzt `createServerClient()` mit `SUPABASE_SERVICE_ROLE_KEY` (server-only) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] .env.local is in .gitignore (via `.env*.local` pattern) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] .env.local.example exists with dummy values · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] No Supabase credentials exposed in client-side rendered HTML · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] BUG-16 (SECURITY): No Content-Security-Policy header configured in next.config.ts -- leaves the site vulnerable to XSS if user content is ever rendered · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Datenschutz checkbox validation works server-side (datenschutz=false returns 400) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] BUG-17: FIXED – API gibt nur generische deutsche Fehlermeldung zurück ("Ungültige Formulardaten") · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] BUG-18: FIXED – Keine Zod-Details in der API-Response, kein Schema-Leak · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### Cross-Browser-Tests
- Note: Automated cross-browser testing was not possible in this environment. The following is based on code review of the component implementations.
- [x] No browser-specific CSS or JS detected · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] shadcn/ui components are cross-browser compatible (Radix UI primitives) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Framer Motion animations use standard CSS transforms (opacity, translateX) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Form uses standard HTML input types (email, tel, text, checkbox) -- native mobile keyboards will be triggered · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [ ] Manual testing in Chrome, Firefox, Safari recommended before deployment · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### Responsive-Tests
- [x] Mobile (375px): Single-column layout, multi-step wizard fits well, sidebar stacks below form · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Tablet (768px): Form fields use sm:grid-cols-2 for 2-column layout where appropriate · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**
- [x] Desktop (1440px): lg:grid-cols-3 layout (form 2/3 + sidebar 1/3), sidebar becomes sticky (top-28) · **Nicht einer AC-ID zuordenbar (aus dem Starter-Kit-Bericht)**

### Gefundene Bugs

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

### Zusammenfassung
- **Acceptance Criteria:** 16/24 passed (67%) -- improved from 63% after BUG-15 and BUG-18 fixes
- **Bugs Found:** 16 open (0 Critical, 4 High, 5 Medium, 4 Low, 3 Nice-to-have). 4 bugs fixed total (BUG-7, BUG-13, BUG-15, BUG-18).
- **Fixed since last QA run:** BUG-15 (service role key), BUG-18 (generic error response)
- **Security:** IMPROVED -- server now uses service role key, API no longer leaks schema details. Remaining: input sanitization, no CSP, in-memory rate limiter limitations.
- **Production Ready:** NO
- **Blocking bugs (must fix before deployment):**
  - BUG-6 (High): Only 2 Leistungsarten instead of 5 -- core business offering incomplete
  - BUG-8/BUG-11 (High): Projektumfang field missing entirely -- critical for lead qualification per PRD
  - ~~BUG-10~~: CLOSED – wird durch Backend-Trigger gelöst
  - BUG-12 (Medium): Honeypot reveals itself to bots
  - BUG-2 (Medium): Address missing from sidebar
  - BUG-4 (Medium): Gewerblich label missing description
  - BUG-14 (Medium): No input sanitization
- **Recommended fix order:** BUG-6 > BUG-8/11 > BUG-10 > BUG-12 > BUG-14 > BUG-2 > BUG-4
