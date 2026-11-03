# PROJ-6: Projektgalerie (Portfolio – Public View): Design

## Implementierungsnotizen (Frontend)

### Gebaute Komponenten:
- `src/components/projekt-card.tsx` - Reusable project card with image, badges, hover effects, and skeleton loader
- `src/components/projekt-filter.tsx` - Client-side filter tabs (Alle/Bauleistungen/Pflegeleistungen/Gewerblich/Privat) with empty state
- `src/components/projekt-galerie.tsx` - Image gallery with main image + thumbnails and fullscreen lightbox (Dialog-based)

### Aktualisierte Seiten:
- `src/app/projekte/page.tsx` - Overview with SEO metadata, filter, loading skeleton, empty state
- `src/app/projekte/[slug]/page.tsx` - Detail page with generateMetadata, image gallery, lightbox, meta info row, CTA section

### Änderungen am Datenmodell:
- `src/lib/projekte-data.ts` - Replaced `badge` with `kundentyp` (Gewerblich/Privat) and added `kategorie` (Bauleistungen/Pflegeleistungen), `ort`, `coverImage`, `images[]`; added `filterProjekte()` utility; expanded from 3 to 6 sample projects
- Fixed home page (`src/app/page.tsx`) to use new field names (`kundentypStyles`, `kundentyp`, `coverImage`)

### Abweichungen von der Spec:
- Data is served from static TypeScript file instead of Supabase (pending PROJ-7 CMS Admin)
- Pagination not yet implemented (only 6 projects, not needed until 50+)
