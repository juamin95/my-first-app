"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  value: string
  className?: string
}

function parseValue(str: string) {
  const hasSuffix = str.endsWith("+")
  const suffix = hasSuffix ? "+" : ""
  const isDecimal = str.includes(",")
  const normalized = str
    .replace("+", "")
    .replace(/\./g, "")   // German thousands separator
    .replace(",", ".")    // German decimal → JS
  return { num: parseFloat(normalized), suffix, isDecimal }
}

function formatValue(n: number, isDecimal: boolean, suffix: string): string {
  if (isDecimal) return n.toFixed(1).replace(".", ",") + suffix
  if (n >= 1000) return Math.floor(n).toLocaleString("de-DE") + suffix
  return Math.floor(n) + suffix
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [current, setCurrent] = useState(0)
  const { num, suffix, isDecimal } = parseValue(value)

  useEffect(() => {
    if (!isInView) return
    const duration = 1600
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * num)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, num])

  return (
    <span ref={ref} className={className}>
      {formatValue(current, isDecimal, suffix)}
    </span>
  )
}
