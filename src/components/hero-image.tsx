"use client"

import Image from "next/image"
import { useState } from "react"

export function HeroImage() {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return null
  }

  return (
    <Image
      src="/images/hero-garden.jpg"
      alt="Professionell gestalteter Garten mit Terrasse und Bepflanzung"
      fill
      priority
      className="object-cover"
      sizes="100vw"
      onError={() => setHasError(true)}
    />
  )
}
