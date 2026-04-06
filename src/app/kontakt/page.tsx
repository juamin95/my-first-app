import type { Metadata } from "next"
import { Phone, Mail, Clock, MessageCircle, Star } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHero } from "@/components/ui/page-hero"
import { ContactForm } from "@/components/contact-form"
import { BreadcrumbSchema } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Gartenbau Köln anfragen | Grünschnitt by Amini",
  description:
    "Gartenbau-Anfrage stellen für Köln, Bergisch Gladbach & Leverkusen. Unverbindliches Angebot vom Profi. Jetzt Kontakt aufnehmen!",
  openGraph: {
    title: "Gartenbau Köln anfragen | Grünschnitt by Amini",
    description: "Gartenbau-Anfrage stellen für Köln, Bergisch Gladbach & Leverkusen. Unverbindliches Angebot vom Profi. Jetzt Kontakt aufnehmen!",
    url: "https://gruenschnitt-amini.de/kontakt",
    images: [{ url: "/images/leistungen/bepflanzung.jpg", width: 1200, height: 630, alt: "Kontakt Grünschnitt by Marvin Amini" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gartenbau Köln anfragen | Grünschnitt by Amini",
    description: "Gartenbau-Anfrage stellen für Köln, Bergisch Gladbach & Leverkusen. Unverbindliches Angebot vom Profi. Jetzt Kontakt aufnehmen!",
    images: ["/images/leistungen/bepflanzung.jpg"],
  },
  alternates: { canonical: "https://gruenschnitt-amini.de/kontakt" },
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
      <BreadcrumbSchema items={[{ name: "Kontakt", url: "https://gruenschnitt-amini.de/kontakt" }]} />
      <PageHero
        badge="Kontakt"
        title="Kontakt aufnehmen"
        subtitle="Haben Sie ein Projekt im Sinn? Schreiben Sie uns oder rufen Sie an – wir erstellen Ihnen ein unverbindliches Angebot."
        imageSrc="/images/leistungen/bepflanzung.jpg"
        imageAlt="Olivenbaum bei der Pflanzung im Abendlicht"
      />

      {/* ── FORM + SIDEBAR ────────────────────────────────────── */}
      <section
        className="relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white section-py"
        aria-label="Kontaktformular"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading – full width above both cards */}
          <FadeIn>
            <div className="mb-10">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 shrink-0 bg-primary/35" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">Anfrage</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Anfrage senden
              </h2>
              <p className="mt-2 text-muted-foreground">
                Füllen Sie das Formular aus und wir erstellen Ihnen ein
                unverbindliches Angebot.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Form column */}
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-muted/30 to-muted/60 p-6 backdrop-blur-sm sm:p-8">
                <ContactForm />
              </div>
            </FadeIn>

            {/* Sidebar */}
            <div>
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
                              className="block cursor-pointer transition-opacity hover:opacity-75"
                            >
                              {content}
                            </a>
                          )
                        }

                        return <div key={item.label} className="cursor-default">{content}</div>
                      })}
                    </div>
                  </div>

                  {/* Google Rating Pill */}
                  <div className="flex items-center gap-2.5 rounded-full border border-primary/10 bg-white px-4 py-2.5 shadow-sm">
                    <svg width="16" height="16" viewBox="0 0 18 18" aria-label="Google" className="shrink-0">
                      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    <div className="flex" aria-label="5 von 5 Sternen">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-brand-amber text-brand-amber" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-brand-amber">5,0</span>
                    <span className="text-sm text-muted-foreground">· 48 Bewertungen</span>
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
