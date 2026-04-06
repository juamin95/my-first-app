"use client"

import { useRef, useCallback, useState } from "react"
import { ReviewCard } from "@/components/ui/review-card"
import { cn } from "@/lib/utils"

const privatRezensionen = [
  {
    name: "R A",
    tag: "Privat",
    text: "Das Team rund um Marvin Amini hat bei uns absolut professionell im Rahmen einer Erweiterung des Gartens gearbeitet. 2 Gartenlauben abgerissen, Betonfundamente und Baumwurzeln entfernt, Büsche versetzt und ein neues Fundament angelegt. Top Job!!!",
    rating: 5,
  },
  {
    name: "Niklas TT",
    tag: "Privat",
    text: "Marvin Amini hat im Rahmen des Umbaus mit seinem Team unsere Terrasse komplett auf Vordermann gebracht – wir sind super zufrieden! Sauber gearbeitet, zügig erledigt, Maschineneinsatz effizient und sinnvoll.",
    rating: 5,
  },
  {
    name: "Paul Wojtyczka",
    tag: "Privat",
    text: "Wir haben die Firma Grünschnitt unseren Vorgarten komplett neu gestalten lassen. Von der gemeinsamen Planung bis zur Ausführung waren wir rundum sehr zufrieden. Sehr kommunikativer Dienstleister, der sehr auf die Wünsche des Kunden eingeht.",
    rating: 5,
  },
  {
    name: "Lukas Fleige",
    tag: "Privat",
    text: "Herr Amini hat bei uns den Garten und Vorgarten rundum erneuert und sich dabei weder von Starkregen noch spontanen Sonderwünschen abschrecken lassen. Wir sind rundum zufrieden und werden ihn mit Sicherheit wieder beauftragen.",
    rating: 5,
  },
  {
    name: "Paul Seuthe",
    tag: "Privat",
    text: "Super Einsatz! Herr Amini und sein Team haben bei Wind und Wetter alles gegeben, um den Auftrag noch vor Weihnachten zu erledigen. Der verwilderte Garten hat nun wieder Luft zum Atmen.",
    rating: 5,
  },
  {
    name: "Holger Grashof",
    tag: "Privat",
    text: "Seit Jahren der Gärtner meines Vertrauens. Kompetent, zuverlässig und mega professionell. Mein Garten freut sich immer wenn er erscheint.",
    rating: 5,
  },
  {
    name: "Claudia Schackert",
    tag: "Privat",
    text: "Ich bin mehr als zufrieden mit diesem freundlichen und kompetenten Gartenbau-Betrieb. Der Chef ist immer mit dabei, der Umgang mit den Mitarbeitern ist vorbildlich. Man kann Herrn Amini und seine Leute nur empfehlen.",
    rating: 5,
  },
]

export function PrivatRezensionenScroll() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) { setActiveIndex(0); return }
    const progress = el.scrollLeft / maxScroll
    setActiveIndex(Math.round(progress * (privatRezensionen.length - 1)))
  }, [])

  const scrollToCard = useCallback((i: number) => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    el.scrollTo({ left: (i / (privatRezensionen.length - 1)) * maxScroll, behavior: "smooth" })
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
          {privatRezensionen.map((review) => (
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
        {privatRezensionen.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Bewertung ${i + 1} von ${privatRezensionen.length}`}
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
