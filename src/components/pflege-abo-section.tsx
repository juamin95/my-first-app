import Image from "next/image"
import { Check, Minus, Leaf, Sprout, Trees, Calendar, Settings2, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const pakete = [
  {
    name: "Basis",
    tagline: "Für Einstieg & kleinere Objekte",
    icon: Sprout,
    highlight: false,
    leistungen: [
      { text: "Rasen mähen & trimmen", included: true },
      { text: "Laubbläsern & Kehren", included: true },
      { text: "Laubentfernung & Entsorgung", included: true },
      { text: "Heckenschnitt 1× jährlich", included: true },
      { text: "Beetpflege (Unkraut, bis 3 cm)", included: true },
      { text: "Rasendüngung", included: false },
      { text: "Baumschnitt", included: false },
      { text: "Steinreinigung", included: false },
    ],
  },
  {
    name: "Komfort",
    tagline: "Für regelmäßig gepflegte Liegenschaften",
    icon: Leaf,
    highlight: true,
    leistungen: [
      { text: "Rasen mähen & trimmen", included: true },
      { text: "Laubbläsern & Kehren", included: true },
      { text: "Laubentfernung & Entsorgung", included: true },
      { text: "Heckenschnitt 2× jährlich", included: true },
      { text: "Beetpflege inkl. Nachsaat", included: true },
      { text: "Rasendüngung mit Material", included: true },
      { text: "Baumschnitt", included: true },
      { text: "Steinreinigung", included: false },
    ],
  },
  {
    name: "Premium",
    tagline: "Vollständige Pflege für anspruchsvolle Objekte",
    icon: Trees,
    highlight: false,
    leistungen: [
      { text: "Rasen mähen & trimmen", included: true },
      { text: "Laubbläsern & Kehren", included: true },
      { text: "Laubentfernung & Entsorgung", included: true },
      { text: "Heckenschnitt 2× jährlich", included: true },
      { text: "Beetpflege inkl. Nachsaat", included: true },
      { text: "Rasendüngung mit Material", included: true },
      { text: "Baumschnitt & Baumfällung", included: true },
      { text: "Steinreinigung (Hochdruckreiniger)", included: true },
    ],
  },
]

const vorteile = [
  {
    icon: Calendar,
    title: "Flexibel planbar",
    text: "Wöchentlich, 14-tägig oder monatlich – ganz nach Ihrem Bedarf.",
  },
  {
    icon: Settings2,
    title: "Individuell konfigurierbar",
    text: "Kein Standardpaket von der Stange – wir stimmen alles auf Ihre Liegenschaften ab.",
  },
  {
    icon: ClipboardList,
    title: "Stressfreie Jahresplanung",
    text: "Alle Termine im Jahreskalender – kein Koordinationsaufwand für Sie.",
  },
]

export function PflegeAboSection({
  className,
  actionImage,
  actionImageAlt = "Leistungsbeispiel von Grünschnitt by Amini",
}: {
  className?: string
  actionImage?: string
  actionImageAlt?: string
}) {
  return (
    <SectionWrapper
      id="pflege-abo"
      bgFrom="var(--section-sage)"
      bgTo="var(--section-sage)"
      className={cn("relative -mt-8 rounded-t-[2.5rem] py-20 sm:py-24", className)}
      aria-label="Dauerpflege-Abonnements"
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 shrink-0 bg-primary/35" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Dauerpflege
              </span>
              <div className="h-px w-8 shrink-0 bg-primary/35" />
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Pflege-Abonnements für Hausverwaltungen, Gewerbe &amp; Privat
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Planbare Dauerpflegeverträge – individuell auf Ihre Objekte
              abgestimmt, zuverlässig und termingerecht ausgeführt.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Pakete – mobile: horizontal scroll, desktop: 3-col grid */}
      <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth scroll-pl-4 sm:scroll-pl-6 lg:overflow-visible lg:scroll-pl-0">
        <div className="flex w-max gap-5 pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-3 lg:gap-6 lg:pb-0 lg:px-8">
          {pakete.map((paket) => {
            const Icon = paket.icon
            return (
              <div key={paket.name} className="w-[80vw] shrink-0 snap-start sm:w-[340px] lg:w-auto">
                <div className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-white/60 p-8 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-md",
                  paket.highlight
                    ? "border-primary/30 ring-2 ring-primary"
                    : "border-primary/10"
                )}>
                  {/* Empfohlen-Badge */}
                  {paket.highlight && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-green-cta px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Empfohlen
                    </span>
                  )}

                  {/* Icon + Name */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{paket.name}</h3>
                      <p className="text-sm text-muted-foreground">{paket.tagline}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-6 h-px w-full bg-border" />

                  {/* Leistungen */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {paket.leistungen.map((item) => (
                      <li key={item.text} className="flex items-center gap-3">
                        {item.included ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3 w-3 text-primary" />
                          </span>
                        ) : (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                            <Minus className="h-3 w-3 text-muted-foreground" />
                          </span>
                        )}
                        <span className={cn("text-sm", item.included ? "text-foreground" : "text-muted-foreground")}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {paket.highlight ? (
                    <Button asChild className="w-full bg-brand-green-cta text-white hover:bg-brand-green-cta-hover">
                      <Link href="/kontakt">Angebot anfragen</Link>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/kontakt">Angebot anfragen</Link>
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-4 px-4 text-center text-xs text-muted-foreground/60 sm:px-6 lg:hidden">
        Nach rechts wischen für mehr Pakete →
      </p>

      {actionImage && (
        <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={actionImage}
              alt={actionImageAlt}
              fill
              className="object-cover object-bottom"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
            />
          </div>
        </div>
      )}

      {/* Vorteile */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.3}>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {vorteile.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-white/60 px-6 py-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{v.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}
