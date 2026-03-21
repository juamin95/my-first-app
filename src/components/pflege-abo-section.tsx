import { Check, Minus, Leaf, Sprout, Trees, Calendar, Settings2, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import Link from "next/link"
import { cn } from "@/lib/utils"

const pakete = [
  {
    name: "Basis",
    tagline: "Für Einstieg & kleinere Objekte",
    icon: Sprout,
    highlight: false,
    leistungen: [
      { text: "Rasen mähen & trimmen", included: true },
      { text: "Laubbläsern & Kehren", included: true },
      { text: "Beetpflege (bis 3 cm)", included: true },
      { text: "Heckenschnitt 1× jährlich", included: true },
      { text: "Entsorgung inklusive", included: true },
      { text: "Rasendüngung", included: false },
      { text: "Baumschnitt", included: false },
      { text: "Winterdienst", included: false },
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
      { text: "Beetpflege (bis 3 cm)", included: true },
      { text: "Heckenschnitt 2× jährlich", included: true },
      { text: "Entsorgung inklusive", included: true },
      { text: "Rasendüngung mit Material", included: true },
      { text: "Baumschnitt", included: true },
      { text: "Winterdienst", included: false },
    ],
  },
  {
    name: "Premium",
    tagline: "Rundum-sorglos für Großobjekte",
    icon: Trees,
    highlight: false,
    leistungen: [
      { text: "Rasen mähen & trimmen", included: true },
      { text: "Laubbläsern & Kehren", included: true },
      { text: "Beetpflege (bis 3 cm)", included: true },
      { text: "Heckenschnitt 2× jährlich", included: true },
      { text: "Entsorgung inklusive", included: true },
      { text: "Rasendüngung mit Material", included: true },
      { text: "Baumschnitt", included: true },
      { text: "Winterdienst", included: true },
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

export function PflegeAboSection() {
  return (
    <section
      id="pflege-abo"
      className="bg-gradient-to-bl from-[#eef6e8] via-[#f4f7f2] to-[#d5e8cb] py-20 sm:py-24"
      aria-label="Dauerpflege-Abonnements"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Dauerpflege
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Pflege-Abonnements für Hausverwaltungen, Gewerbe &amp; Privat
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Planbare Dauerpflegeverträge – individuell auf Ihre Objekte
              abgestimmt, zuverlässig und termingerecht ausgeführt.
            </p>
          </div>
        </FadeIn>

        {/* Pakete */}
        <div className="grid gap-6 lg:grid-cols-3">
          {pakete.map((paket, i) => {
            const Icon = paket.icon
            const hl = paket.highlight
            return (
              <FadeIn key={paket.name} delay={i * 0.08}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border p-8 shadow-sm transition-shadow duration-300 hover:shadow-md",
                    hl
                      ? "border-primary bg-primary"
                      : "border-border bg-white"
                  )}
                >
                  {/* Icon + Name */}
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                        hl ? "bg-white/20" : "bg-primary/10"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-6 w-6",
                          hl ? "text-white" : "text-primary"
                        )}
                      />
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "text-xl font-bold",
                          hl ? "text-white" : "text-foreground"
                        )}
                      >
                        {paket.name}
                      </h3>
                      <p
                        className={cn(
                          "text-sm",
                          hl ? "text-white/70" : "text-muted-foreground"
                        )}
                      >
                        {paket.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={cn(
                      "mb-6 h-px w-full",
                      hl ? "bg-white/20" : "bg-border"
                    )}
                  />

                  {/* Leistungen */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {paket.leistungen.map((item) => (
                      <li key={item.text} className="flex items-center gap-3">
                        {item.included ? (
                          <span
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              hl ? "bg-white/20" : "bg-primary/10"
                            )}
                          >
                            <Check
                              className={cn(
                                "h-3 w-3",
                                hl ? "text-white" : "text-primary"
                              )}
                            />
                          </span>
                        ) : (
                          <span
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                              hl ? "bg-white/10" : "bg-muted"
                            )}
                          >
                            <Minus
                              className={cn(
                                "h-3 w-3",
                                hl ? "text-white/40" : "text-muted-foreground"
                              )}
                            />
                          </span>
                        )}
                        <span
                          className={cn(
                            "text-sm",
                            item.included
                              ? hl
                                ? "text-white"
                                : "text-foreground"
                              : hl
                                ? "text-white/40"
                                : "text-muted-foreground"
                          )}
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    variant={hl ? "secondary" : "outline"}
                    className={cn(
                      "w-full",
                      hl && "bg-white text-primary hover:bg-white/90"
                    )}
                  >
                    <Link href="/kontakt">Angebot anfragen</Link>
                  </Button>
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Vorteile */}
        <FadeIn delay={0.3}>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {vorteile.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="flex items-start gap-4 rounded-xl border border-primary/10 bg-white px-6 py-5"
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
    </section>
  )
}
