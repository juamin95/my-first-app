"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "pflege", label: "Pflegeleistungen" },
  { id: "bau", label: "Bauleistungen" },
] as const

export function StickyServiceTabs() {
  const [activeTab, setActiveTab] = useState<string>("pflege")

  // Track which section is currently in viewport
  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id))
    if (sections.some((s) => !s)) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    // Offset: header (80px) + breathing room
    const offset = 80 + 16
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <nav
      className="sticky top-[84px] z-30 border-b border-primary/10 bg-white/90 py-2 backdrop-blur-md"
      aria-label="Leistungskategorien"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-4 py-2 sm:px-6 lg:px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollTo(tab.id)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
            )}
            aria-current={activeTab === tab.id ? "true" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
