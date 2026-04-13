import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  User,
  Trophy,
  Palette,
  ClipboardList,
  Leaf,
  LandPlot,
  ArrowRight,
  Star,
} from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { FadeIn } from "@/components/ui/fade-in"
import { CTASection } from "@/components/cta-section"
import { PflegeAboSection } from "@/components/pflege-abo-section"
import { ProjektCard } from "@/components/projekt-card"
import { getProjekteByKundentyp } from "@/lib/projekte-service"
import { LeistungenStickyScroll, privatKategorien } from "@/components/leistungen-sticky-scroll"
import { PrivatRezensionenScroll } from "@/components/privat-rezensionen-scroll"
import { ServiceSchemaPrivat, BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Gartengestaltung Köln | Grünschnitt by Marvin Amini",
  description:
    "Gartengestaltung & Gartenpflege für Privatkunden in Köln. Terrassenbau, Naturstein, Neuanlage. Persönlich begleitet. Jetzt anfragen!",
  openGraph: {
    title: "Gartengestaltung Köln | Grünschnitt by Marvin Amini",
    description: "Gartengestaltung & Gartenpflege für Privatkunden in Köln. Terrassenbau, Naturstein, Neuanlage. Persönlich begleitet. Jetzt anfragen!",
    url: "https://gruenschnitt-amini.de/leistungen/privat",
    images: [{ url: "/images/leistungen/privat-hero.jpg", width: 1200, height: 630, alt: "Gartengestaltung Köln – Grünschnitt by Marvin Amini" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gartengestaltung Köln | Grünschnitt by Marvin Amini",
    description: "Gartengestaltung & Gartenpflege für Privatkunden in Köln. Terrassenbau, Naturstein, Neuanlage. Persönlich begleitet. Jetzt anfragen!",
    images: ["/images/leistungen/privat-hero.jpg"],
  },
  alternates: { canonical: "https://gruenschnitt-amini.de/leistungen/privat" },
}

export const revalidate = 60

export default async function PrivatLeistungenPage() {
  const projekte = await getProjekteByKundentyp("Privat", 3)

  return (
    <div className="flex flex-col">
      <ServiceSchemaPrivat />
      <BreadcrumbSchema items={[{ name: "Leistungen Privat", url: "https://gruenschnitt-amini.de/leistungen/privat" }]} />

      {/* ── 1. PAGE HERO ──────────────────────────────────── */}
      <PageHero
        badge="Private Gardening"
        title="Ihr Garten. Handverlesen gestaltet."
        subtitle="Grünschnitt by Marvin Amini gestaltet und pflegt Privatgärten, die begeistern – persönlich begleitet, handwerklich präzise, abgestimmt auf Sie."
        imageSrc="/images/leistungen/privat-hero.jpg"
        imageAlt="Exklusiver Privatgarten gestaltet von Grünschnitt by Amini"
      />

      {/* ── 2. EINSTIEG ───────────────────────────────────── */}
      <section className="relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white pt-16 pb-0 sm:pt-20" aria-label="Einstieg und Leistungsüberblick">
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Links: Tagline + Heading */}
            <FadeIn direction="up">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 shrink-0 bg-primary/35" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Private Gardening
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Ihr Garten.<br className="hidden sm:block" /> Ihr Ort.
              </h2>
            </FadeIn>

            {/* Rechts: Fließtext + 3 Sub-Features */}
            <FadeIn direction="up" delay={0.1}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Kein Garten von der Stange. Marvin Amini lernt Ihren Garten kennen –
                und entwickelt daraus ein Konzept, das zu Ihnen passt: Ihrem Grundstück,
                Ihrem Stil, Ihrem Alltag.
              </p>

              <div className="mt-8 flex flex-col gap-6">
                {/* Sub-Feature A */}
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/15">
                      <User className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="font-semibold leading-snug">Persönliche Betreuung</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Marvin Amini ist Ihr direkter Ansprechpartner – vom ersten Gespräch bis zur Übergabe.
                  </p>
                </div>
                {/* Sub-Feature B */}
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/15">
                      <Trophy className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="font-semibold leading-snug">Handwerk & Qualität</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Über 10 Jahre Erfahrung, ausgebildete Fachkräfte und ausgewählte Materialien –
                    für Ergebnisse, die dauerhaft begeistern.
                  </p>
                </div>
                {/* Sub-Feature C */}
                <div>
                  <div className="mb-2 flex items-center gap-2.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors hover:bg-primary/15">
                      <Palette className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <p className="font-semibold leading-snug">Ihr Stil, Ihre Wünsche</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Kein Standardkonzept. Jede Planung entsteht neu – abgestimmt auf
                    Ihr Grundstück und Ihren Geschmack.
                  </p>
                </div>
              </div>

            </FadeIn>
          </div>
        </div>

        {/* Breites Bild unter dem Text */}
        <FadeIn direction="up" delay={0.15}>
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg sm:aspect-[16/7]">
              <Image
                src="/images/leistungen/privat-einstieg.jpg"
                alt="Gestalteter Privatgarten mit Pool, Rollrasen und Bepflanzung von Grünschnitt by Amini"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── 3. LEISTUNGEN ─────────────────────────────────── */}
      <LeistungenStickyScroll kategorien={privatKategorien} />

      {/* ── 4. PFLEGE-ABO ─────────────────────────────────── */}
      <PflegeAboSection
        className="mt-0 rounded-none pt-0 sage-texture"
        actionImage="/images/leistungen/privat-abo-action.jpg"
        actionImageAlt="Gartenpflege für Privatkunden von Grünschnitt by Amini"
      />

      {/* ── 5. REFERENZPROJEKTE ───────────────────────────── */}
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] section-py"
        aria-label="Private Referenzprojekte"
        style={{ background: `linear-gradient(to bottom, var(--section-beige-light), var(--section-beige))`, boxShadow: "inset 0 6px 24px -4px rgba(100,80,50,0.08)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(180,155,110,0.12),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeader
              badge="Referenzen"
              title="Private Referenzprojekte"
              align="left"
              className="mb-0"
            />
            <Link
              href="/projekte"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Alle Projekte ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {projekte.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {projekte.map((p, i) => (
                <ProjektCard key={p.slug} projekt={p} index={i} />
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-primary/[0.02] py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <LandPlot className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="mt-4 font-semibold text-foreground/70">Aktuelle Referenzprojekte folgen in Kürze</p>
                <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
                  Wir dokumentieren unsere Projekte laufend – schauen Sie bald wieder vorbei.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── 6. REZENSIONEN ────────────────────────────────── */}
      <SectionWrapper
        bgFrom="var(--section-sage)"
        bgTo="var(--section-sage)"
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] section-py sage-texture section-wave-top"
        aria-label="Kundenbewertungen"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,158,64,0.10),transparent)]" />

        {/* Header */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-14 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 shrink-0 bg-primary/35" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Kundenstimmen</span>
                <div className="h-px w-8 shrink-0 bg-primary/35" />
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Das sagen unsere Privatkunden</h2>
              <div className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-sm">
                <svg width="18" height="18" viewBox="0 0 18 18" aria-label="Google">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                <div className="flex" aria-label="5 von 5 Sternen">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-amber text-brand-amber" />
                  ))}
                </div>
                <span className="text-sm font-bold text-brand-amber">5,0</span>
                <span className="text-sm text-muted-foreground">· 48 Bewertungen</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <PrivatRezensionenScroll />
      </SectionWrapper>

      {/* ── 7. WERTE-SECTION ──────────────────────────────── */}
      <section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white section-py" aria-label="Unser Versprechen und Werte">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Foto links */}
            <FadeIn direction="up">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg lg:aspect-[4/5]">
                <Image
                  src="/images/leistungen/gaertner-portrait.jpg"
                  alt="Marvin Amini, Inhaber von Grünschnitt by Amini"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            {/* Werte rechts */}
            <FadeIn direction="up" delay={0.1}>
              <SectionHeader
                badge="Unser Versprechen"
                title="Was uns ausmacht"
                align="left"
                className="mb-10"
              />
              <div className="space-y-5">
                {wertePunkte.map((item, i) => (
                  <FadeIn key={item.title} delay={i * 0.08} direction="up">
                    <div className="group flex items-start gap-4 rounded-2xl border border-primary/10 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="h-6 w-6 text-primary transition-transform duration-200 group-hover:scale-110" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Jetzt unverbindlich anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. CTA ────────────────────────────────────────── */}
      <CTASection
        badge="Private Gardening"
        title="Erzählen Sie uns von Ihrem Garten"
        subtitle="Marvin Amini berät Sie persönlich und unverbindlich vor Ort – und entwickelt gemeinsam mit Ihnen eine Idee, die begeistert."
        primaryLabel="Gartenberatung anfragen"
      />
    </div>
  )
}

/* ── DATA ──────────────────────────────────────────────── */

const wertePunkte = [
  {
    icon: User,
    title: "Persönlich",
    desc: "Marvin Amini begleitet jedes Projekt persönlich – kein Callcenter, kein Weitervermitteln.",
  },
  {
    icon: Trophy,
    title: "Handwerklich präzise",
    desc: "Ausgebildete Fachkräfte, hochwertige Materialien, sorgfältige Ausführung – sichtbar im Ergebnis.",
  },
  {
    icon: ClipboardList,
    title: "Ehrlich & transparent",
    desc: "Klare Angebote, keine Überraschungen. Wir starten erst, wenn Sie vollständig überzeugt sind.",
  },
  {
    icon: Leaf,
    title: "Langfristig gedacht",
    desc: "Pflanzen, Materialien und Konzepte, die zu Ihrem Garten passen – heute und in zehn Jahren.",
  },
]

