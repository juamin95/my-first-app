# PROJ-2: Startseite: Design

## Implementierungsnotizen (Frontend)
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
- 2026-11-01: Hero-Video `/public/images/hero-bg.mp4` ersetzt: Drohnen-Video (23 MB, 10,9 s) durch Arbeitsszenen aus `hero-entwurf-12-web.mp4` (5,3 MB, 21,7 s, 1920x1080, ohne Ton). Pfad gleich, keine Code-Aenderung.
- 2026-11-02: Hero-Video erneut ersetzt durch `hero-entwurf-15-web.mp4` (8,7 MB, 33,9 s, 1920x1080).
- 2026-11-02: Fix in `hero-scroll.tsx`: Feuerte `canplay` vor der Hydration, blieb das Video dauerhaft auf `opacity-0`. Der `readyState` wird jetzt zusaetzlich beim Mount geprueft.

## Deployment (aus dem Starter Kit übernommen)
- **Production URL:** https://www.gruenschnitt-amini.de
- **Deployed:** 2026-11-02 (Commit `1c7abe1`, nur Hero-Video und Einblende-Fix; die a11y-Commits von `fix/a11y-kontrast-impeccable` sind nicht enthalten)
- **Offen:** React-Fehler #418 (Text-Hydration) in der Konsole der Produktion, Ursache nicht bestaetigt; Verdacht: Uhrzeit in `whatsapp-button.tsx`.
