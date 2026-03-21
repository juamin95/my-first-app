"use client"

import { useState } from "react"
import { FolderOpen } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { ProjektCard, ProjektCardSkeleton } from "@/components/projekt-card"
import {
  type Projekt,
  type FilterValue,
  filterTabs,
  filterProjekte,
} from "@/lib/projekte-data"

interface ProjektFilterProps {
  projekte: Projekt[]
}

export function ProjektFilter({ projekte }: ProjektFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("alle")

  const filtered = filterProjekte(projekte, activeFilter)

  return (
    <>
      {/* Filter tabs */}
      <FadeIn delay={0.1}>
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Projekte filtern"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeFilter === tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === tab.value
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Results grid */}
      <div className="mt-10">
        {filtered.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProjektCard key={p.slug} projekt={p} index={i} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <FadeIn>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/20 bg-[#f4f7f2] px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <FolderOpen className="h-7 w-7 text-primary/60" />
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">
                Keine Projekte in dieser Kategorie
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Aktuell sind keine Projekte für den Filter &quot;
                {filterTabs.find((t) => t.value === activeFilter)?.label}
                &quot; vorhanden. Schauen Sie bald wieder vorbei.
              </p>
              <button
                onClick={() => setActiveFilter("alle")}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                Alle Projekte anzeigen
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </>
  )
}

/** Full page loading skeleton */
export function ProjektFilterSkeleton() {
  return (
    <>
      {/* Filter skeleton */}
      <div className="mt-10 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-28 animate-pulse rounded-full bg-muted"
          />
        ))}
      </div>
      {/* Grid skeleton */}
      <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjektCardSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
