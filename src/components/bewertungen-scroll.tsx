"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ReviewCard } from "@/components/ui/review-card"

const bewertungen = [
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
    name: "mogli anish",
    tag: "Privat",
    text: "Unser Garten wurde komplett neu gestaltet und das Ergebnis ist einfach wunderschön. Das Team hat unsere Ideen toll umgesetzt und alles termingerecht fertiggestellt.",
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
    name: "Lukas Fleige",
    tag: "Privat",
    text: "Meine Terrasse und der neue Natursteinweg sind einfach geworden. Faire Beratung ohne Verkaufsdruck, saubere Arbeit – ich bin rundum begeistert.",
    rating: 5,
  },
  {
    name: "Claudia Schackert",
    tag: "Privat",
    text: "Freundliches Team, das wirklich zuhört. Die Bepflanzung und der neue Rasen sehen toll aus. Ich hätte nicht gedacht, dass mein Garten so schön werden kann!",
    rating: 5,
  },
  {
    name: "Frank Brück",
    tag: "Gewerblich",
    text: "Grünschnitt übernimmt die komplette Außenanlage unseres Bürogebäudes – Schnitt, Pflege, Winterdienst. Alles aus einer Hand, alles top. Absolut weiterempfehlenswert.",
    rating: 5,
  },
]

export function BewertungenScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth
      if (maxScroll <= 0) return
      const progress = el.scrollLeft / maxScroll
      setActiveIndex(Math.round(progress * (bewertungen.length - 1)))
    }

    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: (i / (bewertungen.length - 1)) * maxScroll, behavior: "smooth" })
  }

  return (
    <>
      <div
        ref={scrollRef}
        className="no-scrollbar -mx-4 overflow-x-auto scroll-smooth px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <div className="flex gap-5 pb-4" style={{ width: "max-content" }}>
          {bewertungen.map((review) => (
            <div
              key={review.name}
              className="w-[85vw] shrink-0 snap-start sm:w-[340px] lg:w-[360px]"
            >
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

      {/* Scroll indicator dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {bewertungen.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Zu Bewertung ${i + 1}`}
            className={cn(
              "rounded-full transition-all duration-300",
              i === activeIndex
                ? "h-2 w-6 bg-primary"
                : "h-2 w-2 bg-primary/25 hover:bg-primary/50"
            )}
          />
        ))}
      </div>
    </>
  )
}
