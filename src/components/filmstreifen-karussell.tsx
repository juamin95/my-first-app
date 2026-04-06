"use client"

import { useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { useReducedMotion } from "framer-motion"

const ITEM_W = 280
const GAP = 20
const STEP = ITEM_W + GAP
const REPS = 4
const SPEED = 0.25 // px per rAF ≈ 15 px/s at 60 fps

interface Shot {
  src: string
  alt: string
  label: string
}

export function FilmstreifenKarussell({ shots }: { shots: Shot[] }) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const offsetRef = useRef(0)
  const pausedRef = useRef(false)
  const dragging = useRef(false)
  const lastX = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    const container = containerRef.current
    if (!container) return

    const cycle = shots.length * STEP
    const total = shots.length * REPS
    let rafId: number

    const tick = () => {
      if (!pausedRef.current && !dragging.current) {
        offsetRef.current = (offsetRef.current + SPEED) % cycle
      }

      const containerW = container.offsetWidth
      const center = containerW / 2

      for (let i = 0; i < total; i++) {
        const el = itemsRef.current[i]
        if (!el) continue

        const x = i * STEP - offsetRef.current + center - ITEM_W / 2
        const dist = (x + ITEM_W / 2 - center) / STEP

        if (x > containerW + ITEM_W || x + ITEM_W < -ITEM_W) {
          el.style.visibility = "hidden"
          continue
        }
        el.style.visibility = "visible"

        const absD = Math.abs(dist)
        const scale = Math.max(0.72, 1.08 - 0.23 * absD)
        const opacity = Math.max(0.4, 1.0 - 0.3 * absD)
        const rotateY = -dist * 22

        el.style.left = `${x}px`
        el.style.zIndex = String(Math.max(1, Math.round(50 - absD * 15)))
        el.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`
        el.style.opacity = String(opacity)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    lastX.current = e.clientX
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const dx = lastX.current - e.clientX
    const cycle = shots.length * STEP
    offsetRef.current = ((offsetRef.current + dx) % cycle + cycle) % cycle
    lastX.current = e.clientX
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  // Reduced motion: static grid fallback
  if (prefersReducedMotion) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {shots.map((shot) => (
            <div key={shot.src} className="relative aspect-video overflow-hidden rounded-xl">
              <Image src={shot.src} alt={shot.alt} fill className="object-cover" sizes="300px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-xs font-semibold text-white/90">
                {shot.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const allShots = Array.from({ length: REPS }, () => shots).flat()

  return (
    <div
      ref={containerRef}
      className="relative h-56 sm:h-80 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {allShots.map((shot, idx) => (
        <div
          key={`item-${idx}`}
          ref={(el) => { itemsRef.current[idx] = el }}
          className="absolute top-0 bottom-0"
          style={{
            width: ITEM_W,
            transformOrigin: "center center",
            willChange: "transform, opacity",
            visibility: "hidden",
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              className="object-cover pointer-events-none"
              sizes="320px"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/90 pointer-events-none">
              {shot.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
