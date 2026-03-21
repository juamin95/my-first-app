import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Phone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHero } from "@/components/ui/page-hero"
import { LeistungsCard } from "@/components/leistungs-card"
import { PflegeAboSection } from "@/components/pflege-abo-section"

export const metadata: Metadata = {
  title: "Unsere Leistungen | Grünschnitt by Marvin Amini",
  description:
    "Professionelle Pflege- und Bauleistungen im Garten- und Landschaftsbau. Rasenpflege, Heckenschnitt, Terrassenbau, Pflasterarbeiten und mehr in Köln, Bergisch Gladbach und Leverkusen.",
}

export default function LeistungenPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        badge="Was wir bieten"
        title="Unsere Leistungen"
        subtitle="Von der regelmäßigen Grünpflege bis zum kompletten Garten- und Landschaftsbau – wir sind Ihr zuverlässiger Partner für alle Anforderungen rund um Ihre Außenanlage."
        imageSrc="/images/leistungen/pflege-v2.jpg"
        imageAlt="Professionelle Grünpflege"
      />

      {/* ── PFLEGELEISTUNGEN ──────────────────────────────── */}
      <section
        id="pflege"
        className="relative z-10 -mt-20 scroll-mt-20 overflow-hidden rounded-t-[2.5rem] bg-white py-20 sm:py-24"
        aria-label="Pflegeleistungen"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Pflegeleistungen
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Zuverlässige Pflege für private und gewerbliche Außenanlagen
              </h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Ob Dauerpflege für Hausverwaltungen oder saisonale Arbeiten im
                Privatgarten – wir halten Ihre Grünflächen in bestem Zustand.
                Regelmäßig, zuverlässig und mit modernem Equipment.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pflegeleistungen.map((item, i) => (
              <LeistungsCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PFLEGE-ABO ────────────────────────────────────── */}
      <PflegeAboSection />

      {/* ── BAULEISTUNGEN ─────────────────────────────────── */}
      <section
        id="bau"
        className="relative -mt-8 scroll-mt-20 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-br from-[#f0f7eb] via-[#e8f3e1] to-[#d5e8cb] py-20 sm:py-24"
        aria-label="Bauleistungen"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Bauleistungen
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Professioneller Garten- und Landschaftsbau für anspruchsvolle
                Projekte
              </h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Von der Gartengestaltung über Terrassen- und Pflasterarbeiten
                bis hin zu Erdarbeiten und Rodungen – wir realisieren Ihr
                Projekt fachgerecht, termingerecht und mit höchstem
                Qualitätsanspruch.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bauleistungen.map((item, i) => (
              <LeistungsCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────── */}
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
              <div className="relative px-8 py-16 sm:px-16 sm:py-24 lg:max-w-[60%]">
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  Interesse? Wir erstellen Ihnen ein individuelles Angebot.
                </h2>
                <p className="mt-4 max-w-md text-lg text-white/80">
                  Schildern Sie uns Ihr Vorhaben – wir melden uns mit einem
                  unverbindlichen Angebot, persönlich und auf Ihr Projekt
                  zugeschnitten.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Unverbindliches Angebot
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Persönliche Beratung vor Ort
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link href="/kontakt">Kontakt aufnehmen</Link>
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

const pflegeleistungen = [
  {
    title: "Rasenpflege & Beetpflege",
    description:
      "Regelmäßiges Mähen, Vertikutieren, Düngen und Beetpflege – für einen stets gepflegten Außenbereich, der Eindruck macht. Ideal für Hausverwaltungen und gewerbliche Liegenschaften.",
    image: "/images/hero/rollrasen-edit.jpg",
  },
  {
    title: "Heckenschnitt",
    description:
      "Fachgerechter Formschnitt und Rückschnitt Ihrer Hecken – termingerecht und sauber ausgeführt. Wir pflegen Hecken jeder Größe, auch in gewerblichen Anlagen.",
    image: "/images/ueber-uns/heckenschnitt.jpg",
  },
  {
    title: "Baumschnitt & Baumfällung",
    description:
      "Professioneller Baumschnitt mit Hebebühne und Seilklettertechnik. Kronenpflege, Totholzentfernung oder komplette Baumfällung – sicher und fachgerecht.",
    image: "/images/hero/hebebuehne.jpg",
  },
  {
    title: "Laubreinigung",
    description:
      "Gründliche Laubentfernung im Herbst und Winter für Wege, Parkplätze und Grünflächen. Regelmäßig oder als Einmalleistung für Ihre Liegenschaft.",
    image: "/images/leistungen/laubentfernung.jpg",
  },
  {
    title: "Winterdienst",
    description:
      "Zuverlässiger Räum- und Streudienst für gewerbliche Objekte und Privatkunden. Wir sorgen für sichere Wege – auch bei extremer Witterung.",
    image: "/images/leistungen/winterdienst.jpg",
  },
  {
    title: "Häckslerservice",
    description:
      "Professionelles Häckseln von Strauch- und Baumschnitt direkt vor Ort. Schnelle Entsorgung von Grüngut für Gärten, Grünflächen und gewerbliche Liegenschaften.",
    image: "/images/leistungen/haeckslerservice.png",
  },
]

const bauleistungen = [
  {
    title: "Gartengestaltung & Neuanlage",
    description:
      "Komplette Gartenplanung und -umsetzung aus einer Hand. Von der ersten Idee bis zur fertigen Außenanlage – kreativ, durchdacht und fachgerecht realisiert.",
    image: "/images/hero/titelbild.jpg",
  },
  {
    title: "Terrassenbau",
    description:
      "Individuelle Terrassen aus Naturstein, Beton oder WPC – fachgerecht verlegt mit sauberem Unterbau. Wir schaffen Ihren perfekten Außenwohnbereich.",
    image: "/images/hero/terasse.jpg",
  },
  {
    title: "Pflasterarbeiten & Einfahrten",
    description:
      "Professionelle Pflasterarbeiten für Einfahrten, Wege und Hofflächen. Vom Betonsteinpflaster bis zum Natursteinbelag – langlebig und formschön.",
    image: "/images/hero/einfahrt.jpg",
  },
  {
    title: "Natursteinarbeiten",
    description:
      "Mauern, Treppen, Einfassungen und Bodenbeläge aus Naturstein. Wir verarbeiten hochwertige Materialien für zeitlose Ergebnisse mit Charakter.",
    image: "/images/leistungen/naturstein.jpg",
  },
  {
    title: "Zaunbau & Sichtschutz",
    description:
      "Zäune, Sichtschutzelemente und Gabionen – maßgeschneidert für Ihr Grundstück. Wir beraten Sie zu Material und Design für optimale Privatsphäre.",
    image: "/images/hero/zaun.jpg",
  },
  {
    title: "Bepflanzung",
    description:
      "Durchdachte Pflanzkonzepte für Gärten, Vorgärten und Gewerbeflächen. Vom Staudenbeet bis zur Großbaumverpflanzung – nachhaltig und standortgerecht.",
    image: "/images/leistungen/bepflanzung.jpg",
  },
  {
    title: "Erdarbeiten & Rodungen",
    description:
      "Bodenaushub, Planierarbeiten, Wurzelrodungen und Geländemodellierung. Mit modernem Maschinenpark effizient und termingerecht ausgeführt.",
    image: "/images/leistungen/erdarbeiten.png",
  },
]
