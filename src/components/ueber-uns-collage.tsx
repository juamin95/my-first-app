"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion"
import Image from "next/image"

type PhotoConfig = {
  src: string
  alt: string
  pos: string       // tailwind absolute positioning classes
  size: string      // width + aspect-ratio classes
  rotate: number
  parallaxRange: [number, number]
  delay: number
  zIndex: number
  hideOnMobile?: boolean
}

const photos: PhotoConfig[] = [
  {
    src: "/images/ueber-uns/hebebuehne.jpg",
    alt: "Team auf der Hebebühne bei der Baumkronenarbeit",
    pos: "top-0 left-0",
    size: "w-[54%] aspect-[3/4]",
    rotate: -3,
    parallaxRange: [30, -10],
    delay: 0,
    zIndex: 2,
  },
  {
    src: "/images/ueber-uns/olivenbaeume.jpg",
    alt: "Marvin Amini mit großen Olivenbäumen",
    pos: "top-[6%] right-0",
    size: "w-[49%] aspect-[4/5]",
    rotate: 2.5,
    parallaxRange: [10, -30],
    delay: 0.1,
    zIndex: 1,
  },
  {
    src: "/images/ueber-uns/team-collage.jpg",
    alt: "Das Grünschnitt-Team bei der Pause",
    pos: "bottom-0 left-[21%] lg:left-[4%]",
    size: "w-[58%] aspect-[4/3]",
    rotate: 1.5,
    parallaxRange: [50, 10],
    delay: 0.2,
    zIndex: 4,
  },
  {
    src: "/images/ueber-uns/collage-heckenschnitt-neu.jpg",
    alt: "Professioneller Heckenschnitt von Grünschnitt by Amini",
    pos: "bottom-[8%] right-[1%]",
    size: "w-[40%] aspect-[3/4]",
    rotate: -2,
    parallaxRange: [35, -5],
    delay: 0.15,
    zIndex: 3,
    hideOnMobile: true,
  },
]

function PhotoCard({
  photo,
  scrollYProgress,
  reducedMotion,
}: {
  photo: PhotoConfig
  scrollYProgress: MotionValue<number>
  reducedMotion: boolean
}) {
  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : photo.parallaxRange)

  return (
    <motion.div
      className={`absolute ${photo.pos} ${photo.size} overflow-hidden rounded-2xl shadow-2xl${photo.hideOnMobile ? " hidden lg:block" : ""}`}
      style={{ rotate: photo.rotate, y, zIndex: photo.zIndex }}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : photo.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* subtle white border frame */}
      <div className="absolute inset-0 z-10 rounded-2xl ring-2 ring-white/40 ring-inset pointer-events-none" />
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 50vw, 30vw"
      />
    </motion.div>
  )
}

export function UeberUnsCollage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion() ?? false

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className="relative h-[420px] w-full select-none sm:h-[500px] lg:h-[640px]">
      {photos.map((photo) => (
        <PhotoCard key={photo.src} photo={photo} scrollYProgress={scrollYProgress} reducedMotion={shouldReduce} />
      ))}
    </div>
  )
}
