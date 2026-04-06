"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"
import { kundentypStyles } from "@/lib/projekte-data"
import type { Projekt, Kundentyp } from "@/lib/projekte-data"

const filterTabs = [
  { value: "alle",       label: "Alle" },
  { value: "Gewerbe",    label: "Gewerbe" },
  { value: "Privat",     label: "Privat" },
  { value: "Öffentlich", label: "Öffentlich" },
] as const

type FilterValue = (typeof filterTabs)[number]["value"]

export function ProjektePreviewFilter({ projekte }: { projekte: Projekt[] }) {
  const [active, setActive] = useState<FilterValue>("alle")

  const filtered = projekte
    .filter((p) => active === "alle" || p.kundentyp === (active as Kundentyp))
    .slice(0, 3)

  return (
    <>
      {/* Filter pills */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200",
              active === tab.value
                ? "border-primary bg-primary text-white"
                : "border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.1} direction="up">
              <Link href={`/projekte/${p.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
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
                      <div className="flex aspect-[4/3] w-full items-center justify-center bg-brand-image-placeholder">
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
      ) : (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-brand-image-placeholder text-sm text-muted-foreground">
          Keine Projekte in dieser Kategorie vorhanden
        </div>
      )}
    </>
  )
}
