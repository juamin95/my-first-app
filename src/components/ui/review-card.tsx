"use client"

import { useState } from "react"
import { Star } from "lucide-react"

type ReviewCardProps = {
  name: string
  tag: string
  text: string
  rating: number
}

export function ReviewCard({ name, tag, text, rating }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 120
  const textId = `review-text-${name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`

  return (
    <div className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
      {/* Tag */}
      <span className={`mb-4 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        tag === "Gewerblich" ? "bg-primary/10 text-primary" : "bg-primary/5 text-primary/70"
      }`}>
        {tag}
      </span>

      {/* Quote */}
      <div className="flex-1">
        <p id={isLong ? textId : undefined} className={`text-sm leading-relaxed text-foreground/80 ${!expanded && isLong ? "line-clamp-3" : ""}`}>
          &bdquo;{text}&ldquo;
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={textId}
            className="mt-1 text-xs font-semibold text-primary hover:underline"
          >
            {expanded ? "weniger" : "mehr lesen"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-3 border-t border-primary/10 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {name.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <div className="mt-0.5 flex">
            {Array.from({ length: rating }).map((_, j) => (
              <Star key={j} className="h-3.5 w-3.5 fill-brand-amber text-brand-amber" />
            ))}
          </div>
        </div>
        {/* Google "G" */}
        <svg width="16" height="16" viewBox="0 0 18 18" className="shrink-0 opacity-60" aria-label="Google Bewertung">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
        </svg>
      </div>
    </div>
  )
}
