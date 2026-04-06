"use client"

import { useRef, useCallback, useState } from "react"
import { ReviewCard } from "@/components/ui/review-card"
import { cn } from "@/lib/utils"

const gewerbeRezensionen = [
  {
    name: "E.B.",
    tag: "Gewerblich",
    text: "Wir beauftragen Grünschnitt regelmäßig für die Pflege unserer Gewerbeanlagen – pünktlich, zuverlässig und stets top gepflegt. Klare Empfehlung für Hausverwaltungen.",
    rating: 5,
  },
  {
    name: "Sebastian Gopp",
    tag: "Gewerblich",
    text: "Als Bauunternehmer schätze ich Verlässlichkeit – und genau das liefert Grünschnitt. Saubere Ausführung, faire Preise, professionelle Kommunikation. Gerne wieder!",
    rating: 5,
  },
  {
    name: "Lehr und Sohn",
    tag: "Gewerblich",
    text: "Professioneller Betrieb mit echtem Qualitätsbewusstsein. Für unsere Liegenschaften gibt es keine bessere Wahl – seit Jahren unser verlässlicher Grünpflegepartner.",
    rating: 5,
  },
  {
    name: "Eray Süerdem",
    tag: "Gewerblich",
    text: "Sehr kompetentes Team, das auch bei größeren Projekten den Überblick behält. Kommunikation auf Augenhöhe und das Ergebnis hat alle Erwartungen übertroffen.",
    rating: 5,
  },
  {
    name: "Frank Brück",
    tag: "Gewerblich",
    text: "Grünschnitt übernimmt die komplette Außenanlage unseres Bürogebäudes – Schnitt, Pflege, Winterdienst. Alles aus einer Hand, alles top. Absolut weiterempfehlenswert.",
    rating: 5,
  },
]

export function GewerbeRezensionenScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) { setActiveIndex(0); return }
    const progress = el.scrollLeft / maxScroll
    setActiveIndex(Math.round(progress * (gewerbeRezensionen.length - 1)))
  }, [])

  const scrollToCard = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: (i / (gewerbeRezensionen.length - 1)) * maxScroll, behavior: "smooth" })
  }, [])

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-smooth scroll-pl-4 sm:scroll-pl-6"
        aria-label="Kundenbewertungen – scrollbar"
      >
        <div className="flex gap-5 pb-4 pl-4 pr-4 sm:pl-6 sm:pr-6" style={{ width: "max-content" }}>
          {gewerbeRezensionen.map((review) => (
            <div key={review.name} className="w-[85vw] shrink-0 snap-start sm:w-[340px] lg:w-[360px]">
              <ReviewCard
                name={review.name}
                tag={review.tag}
                text={review.text}
                rating={review.rating}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {gewerbeRezensionen.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Bewertung ${i + 1} von ${gewerbeRezensionen.length}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === activeIndex ? "w-6 bg-primary" : "w-2 bg-primary/30"
            )}
          />
        ))}
      </div>
    </>
  )
}
