# PROJ-5: Kontaktformular & Lead-Erfassung: Design

## Implementierungsnotizen (Frontend)
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
