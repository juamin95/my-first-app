"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroScroll() {
  return (
    <div className="relative h-[calc(100vh+2rem)] overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/titelbild.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/images/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-medium text-white">
          10+ Jahre Erfahrung &middot; 3.000+ Projekte &middot; 5,0 Sterne
        </span>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Professioneller Garten- &amp;{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#90d170] to-[#c8f0a8] bg-clip-text text-transparent">
            Landschaftsbau Betrieb
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
          Wir gestalten Außenanlagen, die begeistern – für gewerbliche und
          private Kunden in Köln, Bergisch Gladbach und Leverkusen.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto sm:min-w-[220px] bg-primary text-primary-foreground hover:bg-primary/90"
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
        </div>

        {/* Trust logos */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <div className="h-px w-12 bg-white/20" />
          <div className="flex items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/galabau-nrw.svg"
              alt="GaLaBau NRW Mitglied"
              className="h-14 w-auto opacity-70 brightness-0 invert"
            />
            <div className="h-8 w-px bg-white/20" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/ihk-koeln.svg"
              alt="IHK Köln Mitglied"
              className="h-11 w-auto opacity-70"
            />
          </div>
          <div className="h-px w-12 bg-white/20" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs font-medium text-white/60 tracking-widest uppercase">Scrollen</span>
        <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
