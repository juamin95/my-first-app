"use client"

import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"

interface LeistungsCardProps {
  /** Card title */
  title: string
  /** Short description (2-3 sentences) */
  description: string
  /** Image path in /public, or null for gradient placeholder */
  image: string | null
  /** Stagger delay for FadeIn animation */
  delay?: number
}

export function LeistungsCard({
  title,
  description,
  image,
  delay = 0,
}: LeistungsCardProps) {
  return (
    <FadeIn delay={delay} direction="up">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
        {/* Image / Placeholder */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a632b]/20 via-[#6db33f]/15 to-[#90d170]/10"
              aria-hidden="true"
            >
              <svg
                className="h-12 w-12 text-primary/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                />
              </svg>
            </div>
          )}
          {/* Subtle gradient overlay at bottom for text readability continuity */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/40 to-transparent" />
        </div>

        {/* Text content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}
