import { Suspense } from "react"
import { FolderOpen } from "lucide-react"
import { PageHero } from "@/components/ui/page-hero"
import { SectionHeader } from "@/components/ui/section-header"
import { ProjektFilter, ProjektFilterSkeleton } from "@/components/projekt-filter"
import { CTASection } from "@/components/cta-section"
import { BreadcrumbSchema } from "@/components/structured-data"
import { getProjekte } from "@/lib/projekte-service"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Gartenprojekte Köln – Referenzen | Grünschnitt Amini",
  description:
    "Referenzen & abgeschlossene Gartenprojekte in Köln, Bergisch Gladbach und Leverkusen. Gewerblich & privat. Lassen Sie sich inspirieren!",
  openGraph: {
    title: "Gartenprojekte Köln – Referenzen | Grünschnitt Amini",
    description: "Referenzen & abgeschlossene Gartenprojekte in Köln, Bergisch Gladbach und Leverkusen. Gewerblich & privat. Lassen Sie sich inspirieren!",
    url: "https://gruenschnitt-amini.de/projekte",
    images: [{ url: "/images/hero/luftaufnahme.webp", width: 1200, height: 630, alt: "Gartenprojekte Köln – Referenzen Grünschnitt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gartenprojekte Köln – Referenzen | Grünschnitt Amini",
    description: "Referenzen & abgeschlossene Gartenprojekte in Köln, Bergisch Gladbach und Leverkusen. Gewerblich & privat. Lassen Sie sich inspirieren!",
    images: ["/images/hero/luftaufnahme.webp"],
  },
  alternates: { canonical: "https://gruenschnitt-amini.de/projekte" },
}

export default async function ProjektePage() {
  const projekte = await getProjekte()

  if (projekte.length === 0) {
    return (
      <div className="bg-white pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-brand-green-mid px-6 py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FolderOpen className="h-8 w-8 text-primary/60" />
            </div>
            <h1 className="mt-6 text-2xl font-bold tracking-tight">
              Projekte werden bald hinzugefügt
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">
              Wir arbeiten gerade daran, unsere besten Projekte hier zu
              präsentieren. Schauen Sie bald wieder vorbei.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <BreadcrumbSchema items={[{ name: "Projekte", url: "https://gruenschnitt-amini.de/projekte" }]} />
      <PageHero
        badge="Referenzen"
        title="Unsere Projekte"
        subtitle="Ein Auszug aus unseren abgeschlossenen Projekten – gewerblich, privat und für Hausverwaltungen in Köln, Bergisch Gladbach und Leverkusen."
        imageSrc="/images/hero/luftaufnahme.webp"
        imageAlt="Luftaufnahme eines fertiggestellten Projekts"
      />

      <section className="relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white section-py" aria-label="Projektgalerie">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Unsere Arbeiten"
            title="Einblicke in abgeschlossene Projekte"
            description="Gewerblich, privat und für Hausverwaltungen – ein Auszug aus unseren Referenzen in Köln und Umgebung."
            className="mb-2"
          />
          <Suspense fallback={<ProjektFilterSkeleton />}>
            <ProjektFilter projekte={projekte} />
          </Suspense>
        </div>
      </section>

      <CTASection
        badge="Interesse geweckt?"
        title="Ihr Projekt könnte das nächste sein"
        subtitle="Erzählen Sie uns von Ihrem Vorhaben – wir beraten Sie persönlich und erstellen Ihnen ein unverbindliches Angebot."
        primaryLabel="Kontakt aufnehmen"
      />
    </div>
  )
}
