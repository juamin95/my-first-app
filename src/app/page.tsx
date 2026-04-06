import Link from "next/link"
import Image from "next/image"
import { LocalBusinessSchema } from "@/components/structured-data"
import {
  ArrowRight,
  Star,
  Users,
  Award,
  Clock,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Zap,
  PackageCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { CTASection } from "@/components/cta-section"
import { HeroScroll } from "@/components/hero-scroll"
import { AblaufSection } from "@/components/ablauf-section"
import { UeberUnsCollage } from "@/components/ueber-uns-collage"
import { LeistungenSection } from "@/components/leistungen-section"
import { BewertungenScroll } from "@/components/bewertungen-scroll"
import { ProjektePreviewFilter } from "@/components/projekte-preview-filter"
import { getProjekte } from "@/lib/projekte-service"

export const revalidate = 60

export default async function Home() {
  const allProjekte = await getProjekte()
  const projektPreview = allProjekte.slice(0, 9)

  return (
    <div className="flex flex-col">
      <LocalBusinessSchema />
      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroScroll />

      {/* ── PARTNER BANNER ───────────────────────────────────── */}
      <section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white py-10" aria-label="Partner">
        <div className="mb-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            Unsere Partner &amp; Netzwerk
          </span>
        </div>
        <div className="group relative">
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="overflow-hidden">
            <div className="animate-scroll-left flex w-max items-center group-hover:[animation-play-state:paused]">
              {Array.from({ length: 4 }).flatMap((_, rep) =>
                partnerLogos.map((logo) => (
                  <div
                    key={`${rep}-${logo.alt}`}
                    aria-hidden={rep >= 2}
                    className="flex shrink-0 items-center justify-center px-10"
                  >
                    <Image
                      src={logo.src}
                      alt={rep < 2 ? logo.alt : ""}
                      width={logo.width}
                      height={48}
                      className="h-10 w-auto object-contain grayscale opacity-60 transition-opacity hover:opacity-90"
                      unoptimized
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEISTUNGEN ───────────────────────────────────────── */}
      <section className="bg-white section-py" aria-label="Leistungen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Was wir bieten"
            title="Unsere Leistungen"
            description="Ob Gewerbe, öffentliche Hand oder privater Traumgarten – wir haben das passende Angebot für jede Anforderung."
            className="mb-14"
          />
          <LeistungenSection />
        </div>
      </section>

      {/* ── PROJEKTE PREVIEW ─────────────────────────────────── */}
      <section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-[var(--section-sage-light)] sage-texture section-wave-top section-py" aria-label="Referenzprojekte">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,158,64,0.08),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-primary/35" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Referenzen</span>
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Ausgewählte Projekte</h2>
              </div>
              <Link
                href="/projekte"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Alle Projekte ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <ProjektePreviewFilter projekte={projektPreview} />
        </div>
      </section>

      {/* ── SO ARBEITEN WIR + WARUM GRÜNSCHNITT ─────────────── */}
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] section-py"
        style={{ background: `linear-gradient(to bottom, var(--section-beige-light), var(--section-beige))`, boxShadow: "inset 0 6px 24px -4px rgba(100,80,50,0.08)" }}
        aria-label="So arbeiten wir – Warum Grünschnitt"
      >
        {/* Radial accent – warm beige glow from top */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(180,155,110,0.12),transparent)]" />
        {/* ① Centered intro */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 shrink-0 bg-primary/35" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">So arbeiten wir</span>
                <div className="h-px w-8 shrink-0 bg-primary/35" />
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Hands-on.{" "}
                <span className="text-brand-green-deep bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text [color:transparent]">
                  Präzise.
                </span>{" "}
                Leidenschaftlich.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Vom ersten Spatenstich bis zur finalen Bepflanzung – unser Team bringt
                Erfahrung, Präzision und echte Leidenschaft für jeden Außenbereich mit.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ② Full-bleed filmstrip */}
        <div className="group relative mt-12 overflow-hidden">
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--section-beige-light)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--section-beige)] to-transparent" />
          <div className="animate-scroll-left-slow flex w-max items-stretch gap-4 group-hover:[animation-play-state:paused]">
            {Array.from({ length: 4 }).flatMap((_, rep) =>
              actionShots.map((shot) => (
                <div
                  key={`${rep}-${shot.src}`}
                  aria-hidden={rep >= 2}
                  className="group/img relative h-56 w-64 shrink-0 overflow-hidden rounded-2xl sm:h-80 sm:w-80"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90">{shot.label}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ③ Compact features grid */}
        <div className="relative mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 shrink-0 bg-primary/35" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">Warum Grünschnitt</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-5 lg:grid-cols-3">
            {vorteile.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06} direction="up">
                <div
                  className={[
                    "flex items-start gap-3 py-5 transition-all duration-200 hover:-translate-y-0.5 sm:py-0",
                    i < vorteile.length - 1 ? "border-b border-border sm:border-b-0" : "",
                  ].join(" ")}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="font-semibold leading-snug">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEWERTUNGEN ─────────────────────────────────────── */}
      <SectionWrapper
        bgFrom="var(--section-sage)"
        bgTo="var(--section-sage)"
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] section-py sage-texture section-wave-top"
        aria-label="Kundenbewertungen"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,158,64,0.10),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-14 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 shrink-0 bg-primary/35" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Kundenstimmen</span>
                <div className="h-px w-8 shrink-0 bg-primary/35" />
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Das sagen unsere Kunden</h2>
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

          <BewertungenScroll />
        </div>
      </SectionWrapper>

      {/* ── ÜBER UNS PREVIEW ──────────────────────────────── */}
      <SectionWrapper
        bgFrom="var(--section-sage)"
        bgTo="var(--section-sage)"
        className="relative section-py sage-texture"
        aria-label="Über uns"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="up">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-primary/35" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">Wer wir sind</span>
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Ihr Partner für Garten- und Landschaftsbau
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Seit über 10 Jahren ist Grünschnitt by Marvin Amini als verlässlicher
                  Partner für Gestaltung und Pflege von Außenbereichen bekannt –
                  für gewerbliche und private Kunden in Köln, Bergisch Gladbach und Leverkusen.
                </p>
                <p className="mt-3 text-muted-foreground">
                  Die Wertschätzung unserer Kunden treibt uns täglich an, immer das Beste zu geben.
                </p>
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/15">
                      <Image
                        src="/images/marvin-portrait.jpg"
                        alt="Marvin Amini"
                        fill
                        className="object-cover object-top"
                        sizes="44px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Marvin Amini</p>
                      <p className="text-xs text-muted-foreground">Inhaber, Grünschnitt by Marvin Amini</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="lg" className="bg-white/60 backdrop-blur-sm border-primary/20 hover:bg-white/80">
                    <Link href="/ueber-uns">Mehr über uns <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </FadeIn>

            <UeberUnsCollage />
          </div>

          {/* KPI Stats with animated counters */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ueberUnsStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08} direction="up">
                <div className="flex flex-col items-center rounded-2xl border border-primary/10 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5">
                    <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter
                      value={stat.value}
                      className="text-brand-green-deep bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text [color:transparent]"
                    />
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── ABLAUF ──────────────────────────────────────────── */}
      <AblaufSection />

      <CTASection
        badge="Bereit?"
        title="Bereit für Ihr Projekt?"
        subtitle="Schildern Sie uns Ihr Vorhaben – wir melden uns mit einem unverbindlichen Angebot, persönlich und auf Ihr Projekt zugeschnitten."
      />
    </div>
  )
}

/* ── DATA ──────────────────────────────────────────────── */

const vorteile = [
  {
    icon: GraduationCap,
    title: "Qualifiziertes Personal",
    desc: "Ausgebildete Fachkräfte – für höchste Qualität bei jedem Auftrag.",
  },
  {
    icon: Award,
    title: "Langjährige Erfahrung",
    desc: "Über 10 Jahre Expertise im Garten- und Landschaftsbau.",
  },
  {
    icon: ShieldCheck,
    title: "Zuverlässigkeit",
    desc: "Pünktlich, verbindlich und transparent – von der Planung bis zur Fertigstellung.",
  },
  {
    icon: Wrench,
    title: "Modernes Maschinenportfolio",
    desc: "Zeitgemäße Technik für effiziente und präzise Ergebnisse.",
  },
  {
    icon: Zap,
    title: "Elektrifizierte Maschinen im Pflegebereich",
    desc: "Emissionsarme Geräte im Pflegebereich – leise, sauber, klimafreundlich.",
  },
  {
    icon: PackageCheck,
    title: "Sorglos-Pflegepakete",
    desc: "Alles aus einer Hand – einfach zurücklehnen und genießen.",
  },
]

const ueberUnsStats = [
  { icon: Clock, value: "10+",    label: "Jahre am Markt" },
  { icon: Award, value: "3.000+", label: "Projekte abgeschlossen" },
  { icon: Users, value: "200+",   label: "Stammkunden" },
  { icon: Star,  value: "5,0",    label: "Sterne bei Google" },
]

const partnerLogos = [
  { src: "/logos/partners/lehr-sohn.png",               alt: "Lehr & Sohn",             width: 150 },
  { src: "/logos/partners/orth-motorgeraete.png",       alt: "Orth Motorgeräte",        width: 140 },
  { src: "/logos/partners/heckmann-immobilien.png",     alt: "Heckmann Immobilien",     width: 160 },
  { src: "/logos/partners/becker-gartenbaumschule.png", alt: "Becker GartenBaumschule", width: 160 },
  { src: "/logos/partners/toennes.png",                 alt: "Bauzentrum Tönnes i&M",   width: 150 },
  { src: "/logos/partners/focus-immo.svg",              alt: "Focus-Immo",              width: 160 },
  { src: "/logos/partners/felix-boettcher.png",         alt: "Felix Böttcher GmbH & Co. KG", width: 160 },
]

const actionShots = [
  { src: "/images/leistungen/action-baumschnitt.jpg",    alt: "Baumschnitt mit Kettensäge", label: "Baumkronenpflege" },
  { src: "/images/leistungen/action-heckenschnitt.jpg",  alt: "Heckenschnitt mit Heckenschere im Einsatz", label: "Heckenschnitt" },
  { src: "/images/leistungen/action-gartenbau.jpg",      alt: "Professioneller Gartenbau – Einpflanzen eines Olivenbaums", label: "Gartenbau" },
  { src: "/images/leistungen/erdarbeiten.jpg",           alt: "Erdarbeiten und Geländegestaltung", label: "Erdarbeiten" },
  { src: "/images/leistungen/action-gartenpflege.jpg",   alt: "Gartenpflege – Rasenmähen im Privatgarten", label: "Gartenpflege" },
  { src: "/images/leistungen/action-pflasterarbeiten.jpg", alt: "Pflasterarbeiten und Außengestaltung", label: "Pflasterarbeiten" },
]
