"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ImageIcon } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import type { Projekt } from "@/lib/projekte-data"
import { kundentypStyles } from "@/lib/projekte-data"

interface ProjektCardProps {
  projekt: Projekt
  /** Stagger index for animation delay */
  index?: number
}

export function ProjektCard({ projekt, index = 0 }: ProjektCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <FadeIn delay={index * 0.08} direction="up">
      <Link
        href={`/projekte/${projekt.slug}`}
        className="group block h-full"
        aria-label={`Projekt: ${projekt.titel}`}
      >
        <article className="overflow-hidden rounded-2xl border border-primary/10 bg-white/60 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            {projekt.coverImage && !imgError ? (
              <Image
                src={projekt.coverImage}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center bg-brand-image-placeholder">
                <ImageIcon className="h-12 w-12 text-primary/20" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${kundentypStyles[projekt.kundentyp]}`}>
                {projekt.kundentyp}
              </span>
              <span className="text-xs text-muted-foreground">{projekt.ort} · {projekt.jahr}</span>
            </div>
            <h2 className="mt-3 font-semibold leading-snug tracking-tight line-clamp-2">
              {projekt.titel}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
              {projekt.subtext}
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
              Projekt ansehen
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </article>
      </Link>
    </FadeIn>
  )
}

/** Skeleton placeholder for loading state */
export function ProjektCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white/60 backdrop-blur-sm">
      <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
      <div className="p-5 sm:p-6 space-y-3">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
