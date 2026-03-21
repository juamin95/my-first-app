"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ProjektGalerieProps {
  images: string[]
  alt: string
}

export function ProjektGalerie({ images, alt }: ProjektGalerieProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }, [])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  if (images.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-[#e8f0e4]">
        <ImageIcon className="h-16 w-16 text-primary/20" />
      </div>
    )
  }

  return (
    <>
      {/* Gallery grid */}
      <div className="grid gap-3">
        {/* Main image */}
        <button
          onClick={() => openLightbox(0)}
          className="group relative aspect-video w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={`${alt} - Bild 1 von ${images.length} vergroessern`}
        >
          <Image
            src={images[0]}
            alt={`${alt} - Hauptbild`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          {images.length > 1 && (
            <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              1 / {images.length}
            </span>
          )}
        </button>

        {/* Thumbnail row */}
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.slice(1, 5).map((src, i) => (
              <button
                key={src}
                onClick={() => openLightbox(i + 1)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Bild ${i + 2} von ${images.length} vergroessern`}
              >
                <Image
                  src={src}
                  alt={`${alt} - Bild ${i + 2}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, 200px"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                {/* Show "+N more" on the last visible thumbnail if there are more */}
                {i === 3 && images.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
                    +{images.length - 5} mehr
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl border-0 bg-black/95 p-0 sm:rounded-2xl">
          <DialogTitle className="sr-only">
            {alt} - Bild {activeIndex + 1} von {images.length}
          </DialogTitle>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Galerie schliessen"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Image */}
          <div className="relative flex min-h-[50vh] items-center justify-center p-4 sm:min-h-[70vh] sm:p-8">
            <div className="relative h-full w-full max-h-[80vh]">
              <Image
                src={images[activeIndex]}
                alt={`${alt} - Bild ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Naechstes Bild"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
