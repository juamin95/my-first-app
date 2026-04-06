"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, Star } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function HeroScroll() {
  const shouldReduce = useReducedMotion()
  const [videoReady, setVideoReady] = useState(false)

  // Returns motion props or empty object (immediate visibility) when reduced motion is preferred
  const reveal = (delay: number) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        }

  return (
    <div className="relative h-[calc(100dvh+2rem)] overflow-hidden bg-[#1a2e1a]">
      {/* Mobile: static image (fast LCP, no video overhead) */}
      <Image
        src="/images/hero/luftaufnahme.webp"
        alt=""
        fill
        priority
        className="object-cover md:hidden"
        sizes="100vw"
      />

      {/* Desktop: background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-700 md:block ${videoReady ? "opacity-100" : "opacity-0"}`}
      >
        <source src="/images/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">

        {/* Heading */}
        <motion.h1
          className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          {...reveal(0.08)}
        >
          Professioneller Garten- &amp;{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-brand-green-soft to-brand-green-pale bg-clip-text text-transparent">
            Landschaftsbau Betrieb
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-white/85"
          {...reveal(0.16)}
        >
          Wir gestalten Außenanlagen, die begeistern – für gewerbliche und
          private Kunden in Köln, Bergisch Gladbach und Leverkusen.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex w-full max-w-sm flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center"
          {...reveal(0.24)}
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto sm:min-w-[220px] bg-brand-green-cta text-white hover:bg-brand-green-cta-hover"
          >
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[220px] border-white/30 bg-white/15 text-white hover:bg-white/25 hover:text-white"
          >
            <a href="tel:+4915168452004">
              <Phone className="mr-2 h-4 w-4" />
              Direkt anrufen
            </a>
          </Button>
        </motion.div>

        {/* Trust logos */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-6"
          {...reveal(0.32)}
        >
          <div className="h-px w-12 bg-white/20" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/ihk-koeln.svg"
            alt="IHK Köln Mitglied"
            width={88}
            height={44}
            className="h-11 w-auto opacity-70"
          />
          <div className="h-px w-12 bg-white/20" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-2 animate-scroll-bounce">
        <span className="text-xs font-medium text-white/60 tracking-widest uppercase">Scrollen</span>
        <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
