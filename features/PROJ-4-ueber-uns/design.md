# PROJ-4: Über uns Seite: Design

## Implementierungsnotizen (Frontend)

### Was gebaut wurde
- **Intro Section**: Hero with "Uber uns" label, gradient heading, company story text (3 paragraphs), owner signature with portrait photo, and photo collage (reuses existing `UeberUnsCollage` component)
- **KPIs Section**: 4 highlight cards (10+ Jahre, 3.000+ Projekte, 200+ Stammkunden, 5,0 Sterne) with icons, gradient values, glassmorphism card style
- **Team Section**: Image (team.jpg) + text block about the team's qualities, no individual team cards (no individual photos available)
- **Werte/Philosophie Section**: 3 value cards (Qualitat & Zuverlassigkeit, Nachhaltigkeit, Partnerschaftlichkeit) with icons, hover effects, glassmorphism style
- **CTA Section**: Full-width card with background image, dark overlay, heading "Sprechen Sie uns an", two buttons (Kontakt aufnehmen -> /kontakt, Direkt anrufen -> tel:)
- **SEO**: Page-specific metadata (title + description) via Next.js Metadata export
- **Design system**: All sections use rounded-t overlap pattern, FadeIn animations, green gradient accents, glassmorphism cards per design memory

### Wiederverwendete Komponenten
- `FadeIn` (scroll-triggered animation)
- `UeberUnsCollage` (parallax photo collage)
- `Button` (shadcn/ui)
- All Lucide icons
