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
  Phone,
  ArrowRight,
} from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHero } from "@/components/ui/page-hero"
import { ReviewCard } from "@/components/ui/review-card"
import { UeberUnsCollage } from "@/components/ueber-uns-collage"
import { Button } from "@/components/ui/button"

const bewertungen = [
  {
    name: "E.B.",
    tag: "Gewerblich",
    text: "Wir beauftragen Grünschnitt regelmäßig für die Pflege unserer Gewerbeanlagen – pünktlich, zuverlässig und stets top gepflegt. Klare Empfehlung für Hausverwaltungen.",
    rating: 5,
  },
  {
    name: "Sebastian Gopp",
    tag: "Gewerblich",
    text: "Als Bauunternehmer schätze ich Verlässlichkeit – und genau das liefert Grünschnitt. Saubere Ausführung, faire Preise, professionelle Kommunikation. Gerne wieder!",
    rating: 5,
  },
  {
    name: "Lukas Fleige",
    tag: "Privat",
    text: "Meine Terrasse und der neue Natursteinweg sind einfach geworden. Faire Beratung ohne Verkaufsdruck, saubere Arbeit – ich bin rundum begeistert.",
    rating: 5,
  },
]

export const metadata: Metadata = {
  title: "Über uns | Grünschnitt by Marvin Amini",
  description:
    "Lernen Sie Grünschnitt by Marvin Amini kennen – über 10 Jahre Erfahrung im Garten- und Landschaftsbau. Qualität, Zuverlässigkeit und Leidenschaft für grüne Außenbereiche.",
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
      <PageHero
        badge="Über uns"
        title="Leidenschaft fürs Handwerk"
        subtitle="Seit 2016 gestalten wir Außenanlagen in Köln und Umgebung – mit Herzblut, Erfahrung und einem Team, das zusammenhält."
        imageSrc="/images/ueber-uns/team-collage.jpg"
        imageAlt="Das Grünschnitt-Team"
        overlayOpacity={0.45}
        objectPosition="object-top"
      />

      {/* ── INTRO ──────────────────────────────────────────── */}
      <section className="relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white pt-16 pb-24" aria-label="Über uns Einführung">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <FadeIn direction="up">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Unsere Geschichte
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Was uns jeden Tag
                  <br />
                  <span className="bg-gradient-to-r from-[#3a632b] to-[#6db33f] bg-clip-text text-transparent">
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
        </div>
      </section>

      {/* ── KPIs ───────────────────────────────────────────── */}
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-br from-[#eef6e8] via-[#f4f7f2] to-[#ddebd5] py-24"
        aria-label="Kennzahlen"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi, i) => (
              <FadeIn key={kpi.label} delay={i * 0.08} direction="up">
                <div className="flex flex-col items-center rounded-2xl border border-primary/10 bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5">
                    <kpi.icon
                      className="h-6 w-6 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-[#3a632b] to-[#6db33f] bg-clip-text text-transparent">
                      {kpi.value}
                    </span>
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
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white py-24"
        aria-label="Unser Team"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <FadeIn direction="left">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/ueber-uns/team.jpg"
                  alt="Das Grünschnitt-Team am Tisch"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn direction="up" delay={0.1}>
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Unser Team
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Jung, dynamisch &{" "}
                  <span className="bg-gradient-to-r from-[#3a632b] to-[#6db33f] bg-clip-text text-transparent">
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
                    &bdquo;Jeder Jeck es anders.&ldquo;
                  </p>
                  <footer className="mt-2 text-sm font-medium text-primary">
                    — Unser Motto
                  </footer>
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WERTE / PHILOSOPHIE ────────────────────────────── */}
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-tr from-[#ddebd5] via-[#f4f7f2] to-[#eef6e8] py-24"
        aria-label="Unsere Werte"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Wofür wir stehen
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Unsere Werte
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Drei Prinzipien leiten unser tägliches Handeln – und machen den
                Unterschied, den unsere Kunden spüren.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {werte.map((wert, i) => (
              <FadeIn key={wert.title} delay={i * 0.1} direction="up">
                <div className="group flex h-full flex-col rounded-2xl border border-primary/10 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">
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
        </div>
      </section>

      {/* ── REZENSIONEN ─────────────────────────────────────── */}
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white py-20"
        aria-label="Kundenstimmen"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Kundenstimmen
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Was unsere Kunden sagen
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bewertungen.slice(0, 3).map((review, i) => (
              <FadeIn key={review.name} delay={i * 0.08} direction="up">
                <ReviewCard
                  name={review.name}
                  tag={review.tag}
                  text={review.text}
                  rating={review.rating}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white py-20"
        aria-label="Kontakt aufnehmen"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/cta-bg.jpg"
                alt="Professioneller Gartenbau aus der Vogelperspektive"
                fill
                className="object-cover object-center"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative px-10 py-20 sm:px-16 sm:py-24 lg:max-w-[60%]">
                <span className="text-sm font-semibold uppercase tracking-widest text-white/60">
                  Überzeugt?
                </span>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Sprechen Sie uns an
                </h2>
                <p className="mt-4 max-w-md text-lg text-white/80">
                  Erzählen Sie uns von Ihrem Vorhaben – wir beraten Sie
                  persönlich und erstellen Ihnen ein unverbindliches Angebot.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/kontakt">
                      Kontakt aufnehmen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                  >
                    <a href="tel:+4915168452004">
                      <Phone className="mr-2 h-4 w-4" />
                      Direkt anrufen
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
