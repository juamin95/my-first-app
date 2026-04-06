import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Award,
  Users,
  Star,
  Clock,
  ShieldCheck,
  Leaf,
  HeartHandshake,
  ArrowRight,
} from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHero } from "@/components/ui/page-hero"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { UeberUnsCollage } from "@/components/ueber-uns-collage"
import { CTASection } from "@/components/cta-section"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { BewertungenScroll } from "@/components/bewertungen-scroll"
import { BreadcrumbSchema } from "@/components/structured-data"


export const metadata: Metadata = {
  title: "Gärtner Köln – Unser Team | Grünschnitt by Amini",
  description:
    "Über 10 Jahre Erfahrung, 3.000+ Projekte, 5,0 Sterne bei Google. Lernen Sie das Team hinter Grünschnitt by Marvin Amini in Köln kennen.",
  openGraph: {
    title: "Gärtner Köln – Unser Team | Grünschnitt by Amini",
    description: "Über 10 Jahre Erfahrung, 3.000+ Projekte, 5,0 Sterne bei Google. Lernen Sie das Team hinter Grünschnitt by Marvin Amini in Köln kennen.",
    url: "https://gruenschnitt-amini.de/ueber-uns",
    images: [{ url: "/images/leistungen/privat-gestaltung-2.jpg", width: 1200, height: 630, alt: "Team Grünschnitt by Marvin Amini" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gärtner Köln – Unser Team | Grünschnitt by Amini",
    description: "Über 10 Jahre Erfahrung, 3.000+ Projekte, 5,0 Sterne bei Google. Lernen Sie das Team hinter Grünschnitt by Marvin Amini in Köln kennen.",
    images: ["/images/leistungen/privat-gestaltung-2.jpg"],
  },
  alternates: { canonical: "https://gruenschnitt-amini.de/ueber-uns" },
}

const kpis = [
  { icon: Clock, value: "10+", label: "Jahre am Markt" },
  { icon: Award, value: "3.000+", label: "Abgeschlossene Projekte" },
  { icon: Users, value: "200+", label: "Stammkunden" },
  { icon: Star, value: "5,0", label: "Sterne bei Google" },
]

const werte = [
  {
    icon: ShieldCheck,
    title: "Qualität & Zuverlässigkeit",
    description:
      "Wir halten, was wir versprechen – termingerecht, sauber und in höchster handwerklicher Qualität. Unsere Kunden schätzen, dass sie sich auf uns verlassen können, Projekt für Projekt.",
  },
  {
    icon: Leaf,
    title: "Nachhaltigkeit",
    description:
      "Wir setzen auf elektrifizierte Maschinen im Pflegebereich, arbeiten ressourcenschonend und achten darauf, dass unsere Arbeit der Natur gerecht wird – heute und in Zukunft.",
  },
  {
    icon: HeartHandshake,
    title: "Partnerschaftlichkeit",
    description:
      "Wir sehen uns nicht als Dienstleister, sondern als Partner. Transparente Kommunikation, ehrliche Beratung und ein offenes Ohr für Ihre Wünsche sind für uns selbstverständlich.",
  },
]

export default function UeberUnsPage() {
  return (
    <div className="flex flex-col">
      <BreadcrumbSchema items={[{ name: "Über uns", url: "https://gruenschnitt-amini.de/ueber-uns" }]} />
      <PageHero
        badge="Über uns"
        title="Leidenschaft fürs Handwerk"
        subtitle="Seit 2016 gestalten wir Außenanlagen in Köln und Umgebung – mit Herzblut, Erfahrung und einem Team, das zusammenhält."
        imageSrc="/images/leistungen/privat-gestaltung-2.jpg"
        imageAlt="Hochwertige Gartengestaltung mit Pool und Olivenbaum"
        overlayOpacity={0.45}
        objectPosition="object-top"
      />

      {/* ── INTRO + KPIs ───────────────────────────────────── */}
      <section className="relative -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white pt-16 pb-16 sm:pb-20" aria-label="Über uns Einführung">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <FadeIn direction="up">
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-primary/35" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Unsere Geschichte
                  </span>
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Was uns jeden Tag
                  <br />
                  <span className="text-brand-green-deep bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text [color:transparent]">
                    antreibt
                  </span>
                </h2>

                <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Grünschnitt wurde 2016 mit echter Leidenschaft fürs Handwerk
                    gegründet – und genau das treibt uns bis heute an. Was uns
                    jeden Morgen motiviert, ist das Sichtbare: das Vorher und das
                    Nachher. Ein Außenbereich, der verwandelt wird. Ein Ort, der
                    plötzlich Freude macht. Dieses Gefühl werden wir nie müde.
                  </p>
                  <p>
                    In einer Welt, die immer lauter und hektischer wird, ist der
                    Garten mehr als nur Fläche. Er ist ein Ort der Ruhe, der Kraft
                    und der Erholung – ein wichtiger Platz im Leben unserer Kunden.
                    Ihn zu gestalten ist für uns kein Auftrag, sondern eine Aufgabe,
                    die wir mit Sorgfalt und Stolz erfüllen.
                  </p>

                  <p>
                    Das Vertrauen unserer Kunden und ihre Wertschätzung sind unsere
                    größte Motivation – und der Anspruch, ihn jeden Tag aufs Neue
                    zu verdienen. Unsere Mission: Köln und Umgebung gemeinsam
                    grüner und lebensfreundlicher machen.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-10 flex items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/15">
                    <Image
                      src="/images/marvin-portrait.jpg"
                      alt="Marvin Amini"
                      fill
                      className="object-cover object-top"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Marvin Amini</p>
                    <p className="text-sm text-muted-foreground">
                      Inhaber, Grünschnitt by Marvin Amini
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Collage */}
            <UeberUnsCollage />
          </div>

          {/* KPIs */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi, i) => (
              <FadeIn key={kpi.label} delay={i * 0.08} direction="up">
                <div className="group flex flex-col items-center rounded-2xl border border-primary/10 bg-primary/[0.03] p-8 text-center shadow-sm transition-transform duration-200 hover:scale-[1.02]">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 transition-transform duration-200 group-hover:scale-110">
                    <kpi.icon
                      className="h-6 w-6 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter
                      value={kpi.value}
                      className="text-brand-green-deep bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text [color:transparent]"
                    />
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                    {kpi.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ───────────────────────────────────────────── */}
      <SectionWrapper
        bgFrom="var(--section-sage)"
        bgTo="var(--section-sage)"
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] section-py sage-texture section-wave-top"
        aria-label="Unser Team"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,158,64,0.10),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/ueber-uns/teamfoto-am-tisch.jpg"
                  alt="Das Grünschnitt-Team am Tisch"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn direction="up" delay={0.1}>
              <div>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 shrink-0 bg-primary/35" />
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                    Unser Team
                  </span>
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Jung, dynamisch &{" "}
                  <span className="text-brand-green-deep bg-gradient-to-r from-brand-green-deep to-brand-green-vivid bg-clip-text [color:transparent]">
                    erfahren
                  </span>
                </h2>

                <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Hinter Grünschnitt steht ein vielfältiges, familiäres Team –
                    jung und dynamisch trifft auf jahrelange Erfahrung im Garten-
                    und Landschaftsbau. Was uns verbündet, ist die gemeinsame
                    Leidenschaft fürs Handwerk.
                  </p>
                  <p>
                    Wir pflegen eine offene, soziale und respektvolle
                    Unternehmenskultur – und sehen unsere Vielfalt als das, was
                    sie ist: eine Stärke. Sie bereichert unser Miteinander und
                    spiegelt sich in der Qualität jedes einzelnen Projekts wider.
                  </p>
                </div>

                {/* Zitat */}
                <blockquote className="mt-8 border-l-4 border-primary/40 pl-5">
                  <p className="italic leading-relaxed text-foreground/80">
                    &bdquo;Jeder Jeck es anders.&rdquo;
                  </p>
                  <footer className="mt-2 text-sm font-medium text-primary">
                    — Unser Motto
                  </footer>
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      {/* ── WERTE / PHILOSOPHIE ────────────────────────────── */}
      <SectionWrapper
        bgFrom="var(--section-sage)"
        bgTo="var(--section-sage)"
        className="relative section-py sage-texture"
        aria-label="Unsere Werte"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Wofür wir stehen"
            title="Unsere Werte"
            description="Drei Prinzipien leiten unser tägliches Handeln – und machen den Unterschied, den unsere Kunden spüren."
            className="mb-14"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {werte.map((wert, i) => (
              <FadeIn key={wert.title} delay={i * 0.1} direction="up">
                <div className="group flex h-full flex-col rounded-2xl border border-primary/10 bg-white/60 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 transition-transform duration-300 group-hover:scale-110">
                    <wert.icon
                      className="h-7 w-7 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {wert.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {wert.description}
                  </p>
                </div>
              </FadeIn>
            ))}
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
      </SectionWrapper>

      {/* ── REZENSIONEN ─────────────────────────────────────── */}
      <SectionWrapper
        bgFrom="var(--section-sage)"
        bgTo="var(--section-white)"
        className="relative section-py sage-texture"
        aria-label="Kundenstimmen"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-14 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 shrink-0 bg-primary/35" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Kundenstimmen</span>
                <div className="h-px w-8 shrink-0 bg-primary/35" />
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Was unsere Kunden sagen
              </h2>
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

      <CTASection
        badge="Überzeugt?"
        title="Sprechen Sie uns an"
        subtitle="Erzählen Sie uns von Ihrem Vorhaben – wir beraten Sie persönlich und erstellen Ihnen ein unverbindliches Angebot."
        primaryLabel="Kontakt aufnehmen"
      />
    </div>
  )
}
