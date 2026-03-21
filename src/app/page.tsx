import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  ArrowRight,
  Star,
  Scissors,
  TreePine,
  Droplets,
  Hammer,
  Layers,
  Fence,
  LandPlot,
  Users,
  Award,
  Clock,
  ImageIcon,
  Leaf,
  Snowflake,
  Axe,
  Pickaxe,
  Sparkles,
  Sprout,
  GraduationCap,
  ShieldCheck,
  Wrench,
  Zap,
  PackageCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { HeroScroll } from "@/components/hero-scroll"
import { projekte, kundentypStyles } from "@/lib/projekte-data"
import { ReviewCard } from "@/components/ui/review-card"
import { AblaufSection } from "@/components/ablauf-section"
import { UeberUnsCollage } from "@/components/ueber-uns-collage"

const projektPreview = projekte.slice(0, 3)

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── HERO (scroll-driven zoom-out) ─────────────────────── */}
      <HeroScroll />

      {/* ── PARTNER BANNER ───────────────────────────────────── */}
      <section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] border-b border-primary/10 bg-white py-10" aria-label="Partner">
        <div className="mb-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            Unsere Partner &amp; Netzwerk
          </span>
        </div>
        <div className="relative">
          {/* Left/right fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          {/* Outer clip */}
          <div className="overflow-hidden">
            {/*
              Seamless marquee: we render logos 4× so each "half" is always
              wider than any viewport. The CSS animation moves exactly -50%
              (= one half), then snaps back — invisible seam.
            */}
            <div className="animate-scroll-left flex w-max items-center">
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
      <section className="bg-white py-24" aria-label="Leistungen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Was wir bieten
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Unsere Leistungen
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Von der Dauerpflege bis zum kompletten Neubau – wir sind Ihr
                verlässlicher Partner für alle Anforderungen.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Pflegeleistungen */}
            <FadeIn delay={0.1} direction="up">
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src="/images/leistungen/pflege-v2.jpg"
                    alt="Professionelle Grünpflege"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Pflegeleistungen
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {pflegeleistungen.map((item) => (
                      <li key={item.title} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-foreground/80">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/leistungen"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Alle Pflegeleistungen ansehen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>

            {/* Bauleistungen */}
            <FadeIn delay={0.2} direction="up">
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src="/images/hero/titelbild.jpg"
                    alt="Pool-Garten Komplettgestaltung"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <h3 className="text-2xl font-bold tracking-tight">
                    Bauleistungen
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                    {bauleistungen.map((item) => (
                      <li key={item.title} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-foreground/80">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/leistungen"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    Alle Bauleistungen ansehen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PROJEKTE PREVIEW ─────────────────────────────────── */}
      <section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white py-24" aria-label="Referenzprojekte">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Referenzen
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Ausgewählte Projekte
                </h2>
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

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {projektPreview.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.1} direction="up">
                <Link href={`/projekte/${p.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    <div className="relative overflow-hidden">
                      {p.coverImage ? (
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <Image
                            src={p.coverImage}
                            alt={p.titel}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#e8f0e4] transition-transform duration-500 group-hover:scale-105">
                          <ImageIcon className="h-12 w-12 text-primary/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${kundentypStyles[p.kundentyp]}`}>
                          {p.kundentyp}
                        </span>
                        <span className="text-xs text-muted-foreground">{p.jahr}</span>
                      </div>
                      <h3 className="mt-3 font-semibold leading-snug tracking-tight">{p.titel}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{p.subtext}</p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                        Projekt ansehen
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/projekte">
                  Alle Projekte ansehen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── VORTEILE ─────────────────────────────────────────── */}
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-br from-[#eef6e8] via-[#f4f7f2] to-[#ddebd5] py-16"
        aria-label="Unsere Vorteile"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Warum Grünschnitt
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Ihr verlässlicher Partner
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-x-12 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {vorteile.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06} direction="up">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
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
      <section
        className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white py-24"
        aria-label="Kundenbewertungen"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,158,64,0.10),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Kundenstimmen
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Das sagen unsere Kunden
              </h2>
              {/* Google rating badge */}
              <div className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full border border-primary/10 bg-white/70 px-5 py-2.5 shadow-sm backdrop-blur-sm">
                {/* Google "G" logo */}
                <svg width="18" height="18" viewBox="0 0 18 18" aria-label="Google">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                <div className="flex" aria-label="5 von 5 Sternen">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">5,0</span>
                <span className="text-sm text-muted-foreground">· 48 Bewertungen</span>
              </div>
            </div>
          </FadeIn>

          <div className="no-scrollbar -mx-4 overflow-x-auto scroll-smooth px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-5 pb-4" style={{ width: "max-content" }}>
              {bewertungen.map((review) => (
                <div key={review.name} className="w-[85vw] shrink-0 snap-start sm:w-[340px] lg:w-[360px]">
                  <ReviewCard
                    name={review.name}
                    tag={review.tag}
                    text={review.text}
                    rating={review.rating}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground/60">
  <span className="hidden sm:inline">← Weitere Bewertungen →</span>
  <span className="sm:hidden">Nach rechts wischen für mehr Bewertungen →</span>
</p>
        </div>
      </section>

      {/* ── UEBER UNS PREVIEW ──────────────────────────────── */}
      <section className="relative -mt-8 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-tl from-[#eef6e8] via-[#f4f7f2] to-[#ddebd5] py-24" aria-label="Ueber uns">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Text + Collage */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn direction="up">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Wer wir sind</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Ihr Partner für Garten- und Landschaftsbau
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Seit über 10 Jahren ist Grünschnitt by Amini als verlässlicher
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
                      <p className="text-xs text-muted-foreground">Inhaber, Grünschnitt by Amini</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/ueber-uns">Mehr über uns <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* Photo Collage */}
            <UeberUnsCollage />
          </div>

          {/* KPI Stats – 4 cols desktop / 2 cols iPad / 1 col mobile */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ueberUnsStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08} direction="up">
                <div className="flex flex-col items-center rounded-2xl border border-primary/15 bg-white p-6 text-center shadow-sm">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5">
                    <stat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-[#3a632b] to-[#6db33f] bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ── ABLAUF ──────────────────────────────────────────── */}
      <AblaufSection />

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative bg-white py-20" aria-label="Kontakt aufnehmen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Background image container */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/cta-bg.jpg"
                alt="Professioneller Gartenbau aus der Vogelperspektive"
                fill
                className="object-cover object-center"
                priority
              />

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative px-10 py-20 sm:px-16 sm:py-24 lg:max-w-[60%]">
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Bereit für Ihr Projekt?
                </h2>
                <p className="mt-4 max-w-md text-lg text-white/80">
                  Schildern Sie uns Ihr Vorhaben – wir melden uns mit einem
                  unverbindlichen Angebot, persönlich und auf Ihr Projekt zugeschnitten.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Unverbindliches Angebot
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Persönliche Beratung vor Ort
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/kontakt">Jetzt Angebot anfragen</Link>
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
    name: "mogli anish",
    tag: "Privat",
    text: "Unser Garten wurde komplett neu gestaltet und das Ergebnis ist einfach wunderschön. Das Team hat unsere Ideen toll umgesetzt und alles termingerecht fertiggestellt.",
    rating: 5,
  },
  {
    name: "Lehr und Sohn",
    tag: "Gewerblich",
    text: "Professioneller Betrieb mit echtem Qualitätsbewusstsein. Für unsere Liegenschaften gibt es keine bessere Wahl – seit Jahren unser verlässlicher Grünpflegepartner.",
    rating: 5,
  },
  {
    name: "Eray Süerdem",
    tag: "Gewerblich",
    text: "Sehr kompetentes Team, das auch bei größeren Projekten den Überblick behält. Kommunikation auf Augenhöhe und das Ergebnis hat alle Erwartungen übertroffen.",
    rating: 5,
  },
  {
    name: "Lukas Fleige",
    tag: "Privat",
    text: "Meine Terrasse und der neue Natursteinweg sind einfach geworden. Faire Beratung ohne Verkaufsdruck, saubere Arbeit – ich bin rundum begeistert.",
    rating: 5,
  },
  {
    name: "Claudia Schackert",
    tag: "Privat",
    text: "Freundliches Team, das wirklich zuhört. Die Bepflanzung und der neue Rasen sehen toll aus. Ich hätte nicht gedacht, dass mein Garten so schön werden kann!",
    rating: 5,
  },
  {
    name: "Frank Brück",
    tag: "Gewerblich",
    text: "Grünschnitt übernimmt die komplette Außenanlage unseres Bürogebäudes – Schnitt, Pflege, Winterdienst. Alles aus einer Hand, alles top. Absolut weiterempfehlenswert.",
    rating: 5,
  },
]

const pflegeleistungen = [
  { icon: Scissors,  title: "Rasen- & Beetpflege" },
  { icon: Droplets,  title: "Bewässerung" },
  { icon: TreePine,  title: "Heckenschnitt" },
  { icon: TreePine,  title: "Baumschnitt" },
  { icon: Leaf,      title: "Laubentfernung" },
  { icon: Sparkles,  title: "Stein- & Oberflächenreinigung" },
  { icon: Snowflake, title: "Winterdienst" },
  { icon: Axe,       title: "Baumfällungen" },
]

const bauleistungen = [
  { icon: LandPlot,  title: "Neugestaltung & Umgestaltung" },
  { icon: Sprout,    title: "Bepflanzungen" },
  { icon: Pickaxe,   title: "Erdarbeiten" },
  { icon: Axe,       title: "Rodungen" },
  { icon: Layers,    title: "Terrassenbau" },
  { icon: Hammer,    title: "Pflasterarbeiten" },
  { icon: Hammer,    title: "Beton- & Natursteinarbeiten" },
  { icon: Fence,     title: "Zäune & Sichtschutz" },
]

const ueberUnsStats = [
  { icon: Clock, value: "10+",    label: "Jahre am Markt" },
  { icon: Award, value: "3.000+", label: "Projekte abgeschlossen" },
  { icon: Users, value: "200+",   label: "Stammkunden" },
  { icon: Star,  value: "5,0",    label: "Sterne bei Google" },
]

const partnerLogos = [
  { src: "/logos/partners/kipp-gruenhoff.png",          alt: "Kipp & Grünhoff",           width: 140 },
  { src: "/logos/partners/lehr-sohn.png",               alt: "Lehr & Sohn",               width: 150 },
  { src: "/logos/partners/orth-motorgeraete.png",       alt: "Orth Motorgeräte",          width: 140 },
  { src: "/logos/partners/heckmann-immobilien.png",     alt: "Heckmann Immobilien",       width: 160 },
  { src: "/logos/partners/becker-gartenbaumschule.png", alt: "Becker GartenBaumschule",   width: 160 },
  { src: "/logos/partners/toennes.png",                 alt: "Bauzentrum Tönnes i&M",     width: 150 },
  { src: "/logos/partners/focus-immo.svg",              alt: "Focus-Immo",                width: 160 },
]

