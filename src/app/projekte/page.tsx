import { Suspense } from "react"
import { FolderOpen } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { PageHero } from "@/components/ui/page-hero"
import { ProjektFilter, ProjektFilterSkeleton } from "@/components/projekt-filter"
import { projekte } from "@/lib/projekte-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projekte & Referenzen | Garten- & Landschaftsbau",
  description:
    "Entdecken Sie unsere abgeschlossenen Projekte im Garten- und Landschaftsbau – gewerblich und privat in Köln, Bergisch Gladbach und Leverkusen.",
}

export default function ProjektePage() {
  // Empty state when no projects exist at all (e.g. fresh setup)
  if (projekte.length === 0) {
    return (
      <div className="bg-white pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-[#f4f7f2] px-6 py-24 text-center">
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
      <PageHero
        badge="Referenzen"
        title="Unsere Projekte"
        subtitle="Ein Auszug aus unseren abgeschlossenen Projekten – gewerblich, privat und für Hausverwaltungen in Köln, Bergisch Gladbach und Leverkusen."
        imageSrc="/images/hero/luftaufnahme.webp"
        imageAlt="Luftaufnahme eines fertiggestellten Projekts"
      />

      <section className="relative z-10 -mt-20 overflow-hidden rounded-t-[2.5rem] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ProjektFilterSkeleton />}>
            <ProjektFilter projekte={projekte} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
