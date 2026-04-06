import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"

interface CTASectionProps {
  title: string
  subtitle: string
  primaryLabel?: string
  badge?: string
}

export function CTASection({
  title,
  subtitle,
  primaryLabel = "Jetzt Angebot anfragen",
  badge,
}: CTASectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-white section-py"
      aria-label="Kontakt aufnehmen"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-brand-green-deep shadow-xl">
            <Image
              src="/images/cta-bg.jpg"
              alt="Professioneller Gartenbau aus der Vogelperspektive"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="relative px-10 py-20 sm:px-16 sm:py-24 lg:max-w-[60%]">
              {badge && (
                <span className="text-sm font-semibold uppercase tracking-widest text-white/60">
                  {badge}
                </span>
              )}
              <h2 className={`${badge ? "mt-3" : ""} text-3xl font-bold text-white sm:text-4xl lg:text-5xl`}>
                {title}
              </h2>
              <p className="mt-4 max-w-md text-lg text-white/80">{subtitle}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unverbindliches Angebot
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/60">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Persönliche Beratung vor Ort
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-green-cta text-white hover:bg-brand-green-cta-hover"
                >
                  <Link href="/kontakt">{primaryLabel}</Link>
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
  )
}
