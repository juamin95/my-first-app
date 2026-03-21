import type { Metadata } from "next"
import { Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHero } from "@/components/ui/page-hero"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Kontakt | Grünschnitt by Marvin Amini",
  description:
    "Kontaktieren Sie uns für Ihre Garten- und Landschaftsbau-Projekte in Köln, Bergisch Gladbach und Leverkusen. Unverbindliches Angebot anfragen.",
}

const contactDetails = [
  {
    icon: Phone,
    label: "Telefon",
    value: "0151 68452004",
    href: "tel:+4915168452004",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: "info@gruenschnitt-amini.de",
    href: "mailto:info@gruenschnitt-amini.de",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "0151 68452004",
    href: "https://wa.me/4915168452004?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Anfrage%20und%20w%C3%BCrde%20gerne%20mehr%20erfahren.",
  },
  {
    icon: Clock,
    label: "Erreichbarkeit",
    value: "Mo–Fr: 08:00–18:00 Uhr",
    href: null,
  },
] as const

export default function KontaktPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        badge="Kontakt"
        title="Kontakt aufnehmen"
        subtitle="Haben Sie ein Projekt im Sinn? Schreiben Sie uns oder rufen Sie an – wir erstellen Ihnen ein unverbindliches Angebot."
        imageSrc="/images/hero/terasse.jpg"
        imageAlt="Kontakt aufnehmen"
      />

      {/* ── FORM + SIDEBAR ────────────────────────────────────── */}
      <section
        className="relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white py-16 sm:py-20"
        aria-label="Kontaktformular"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Form column (2/3) */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Anfrage senden
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Füllen Sie das Formular aus und wir erstellen Ihnen ein
                    unverbindliches Angebot.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="rounded-2xl border border-primary/5 bg-gradient-to-br from-muted/30 to-muted/60 p-6 backdrop-blur-sm sm:p-8">
                  <ContactForm />
                </div>
              </FadeIn>
            </div>

            {/* Sidebar (1/3) */}
            <div className="lg:col-span-1">
              <FadeIn delay={0.2}>
                <div className="sticky top-28 space-y-6">
                  {/* Contact details card */}
                  <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
                    <h3 className="text-lg font-semibold">Kontaktdaten</h3>
                    <div className="mt-5 space-y-5">
                      {contactDetails.map((item) => {
                        const Icon = item.icon
                        const content = (
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                {item.label}
                              </p>
                              <p className="mt-0.5 text-sm font-medium">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        )

                        if (item.href) {
                          return (
                            <a
                              key={item.label}
                              href={item.href}
                              className="block transition-opacity hover:opacity-75"
                            >
                              {content}
                            </a>
                          )
                        }

                        return <div key={item.label}>{content}</div>
                      })}
                    </div>
                  </div>

                  {/* Quick CTA card */}
                  <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                    <h3 className="text-lg font-semibold">
                      Lieber telefonisch?
                    </h3>
                    <p className="mt-2 text-sm text-primary-foreground/80">
                      Rufen Sie uns direkt an – wir beraten Sie gerne
                      persönlich und unverbindlich.
                    </p>
                    <a
                      href="tel:+4915168452004"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/25"
                    >
                      <Phone className="h-4 w-4" />
                      0151 68452004
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
