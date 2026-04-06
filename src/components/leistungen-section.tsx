"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Scissors,
  TreePine,
  Hammer,
  Layers,
  LandPlot,
  Leaf,
  Sprout,
  Building2,
} from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"

const startseitenLeistungen = [
  {
    href: "/leistungen/gewerbe",
    badge: "Gewerbe & Öffentlich",
    icon: Building2,
    title: "Garten- & Landschaftsbau für Gewerbe & öffentliche Hand",
    image: "/images/leistungen/gewerbe-leistungen.jpg",
    leistungen: [
      { icon: Scissors,  label: "Dauerpflege & Grünpflege" },
      { icon: TreePine,  label: "Heckenschnitt & Baumschnitt" },
      { icon: Hammer,    label: "Pflasterarbeiten & Außenanlagen" },
      { icon: Building2, label: "Liegenschaften-Management" },
      { icon: LandPlot,  label: "Neugestaltung & Bau" },
    ],
  },
  {
    href: "/leistungen/privat",
    badge: "Private Gardening",
    icon: Leaf,
    title: "Private Gardening by Marvin Amini",
    image: "/images/leistungen/privat-hero.jpg",
    leistungen: [
      { icon: LandPlot, label: "Gartengestaltung & Neuanlage" },
      { icon: Layers,   label: "Terrassenbau" },
      { icon: Hammer,   label: "Natursteinarbeiten" },
      { icon: Sprout,   label: "Bepflanzung & Gartendesign" },
      { icon: Scissors, label: "Rasenpflege & Beetpflege" },
    ],
  },
] as const

type Leistung = (typeof startseitenLeistungen)[number]

function LeistungsCard({ bereich }: { bereich: Leistung }) {
  const Icon = bereich.icon
  return (
    <Link
      href={bereich.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={bereich.image}
          alt={bereich.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Hover overlay with arrow */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors duration-300 group-hover:bg-primary/15">
          <div className="rounded-full bg-white/20 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <ArrowRight className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
          <Icon className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-semibold text-white">{bereich.badge}</span>
        </div>
      </div>
      <div className="flex flex-col p-6">
        <h3 className="text-lg font-bold leading-snug tracking-tight">{bereich.title}</h3>
        <ul className="mt-4 grid grid-cols-1 gap-y-1.5">
          {bereich.leistungen.map((item) => {
            const ItemIcon = item.icon
            return (
              <li key={item.label} className="flex items-center gap-2">
                <ItemIcon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground/80">{item.label}</span>
              </li>
            )
          })}
        </ul>
        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Mehr erfahren
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}

export function LeistungenSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {startseitenLeistungen.map((bereich, i) => (
        <FadeIn key={bereich.href} delay={i * 0.1} direction="up">
          <LeistungsCard bereich={bereich} />
        </FadeIn>
      ))}
    </div>
  )
}
