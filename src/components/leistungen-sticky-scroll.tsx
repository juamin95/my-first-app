"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  LandPlot,
  Hammer,
  Layers,
  Fence,
  Sprout,
  Shovel,
  Scissors,
  TreePine,
  Leaf,
  Flower2,
  Trash2,
  Droplets,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"

export interface Leistung {
  icon: LucideIcon
  title: string
  desc: string
}

export interface Kategorie {
  label: string
  title: string
  image: string
  imageAlt: string
  bg: string
  cornerColor: string
  leistungen: Leistung[]
}

export const gewerbeKategorien: Kategorie[] = [
  {
    label: "Einmalige Projekte",
    title: "Gestaltung & Bau",
    image: "/images/leistungen/gewerbe-leistungen-2.jpg",
    imageAlt: "Pflasterarbeiten und Außengestaltung",
    bg: "bg-[#eef6e8]",
    cornerColor: "#ffffff",
    leistungen: [
      {
        icon: Shovel,
        title: "Erdarbeiten & Rodungen",
        desc: "Geländevorbereitung für Neubauprojekte – Abtragungen, Planierungen und Rodungen.",
      },
      {
        icon: Hammer,
        title: "Pflasterarbeiten & Steinarbeiten",
        desc: "Langlebige Pflaster- und Betonarbeiten für gewerbliche Höfe, Parkplätze und Zufahrten.",
      },
      {
        icon: LandPlot,
        title: "Neugestaltung & Außenanlagen",
        desc: "Anlage von Vegetationsflächen, Gestaltung urbaner Freiräume und kompletter Betriebsgelände.",
      },
      {
        icon: Layers,
        title: "Terrassenbau",
        desc: "Repräsentative Außenflächen für Büro- und Gewerbeobjekte.",
      },
      {
        icon: Fence,
        title: "Zäune & Sichtschutz",
        desc: "Sichere Einfriedungen und diskreter Sichtschutz für gewerbliche Grundstücke.",
      },
      {
        icon: Sprout,
        title: "Bepflanzungen",
        desc: "Saisonal oder dauerhaft – Beete, Kübel und Fassadenbegrünung für Ihren Außenbereich.",
      },
    ],
  },
  {
    label: "Wiederkehrende Leistungen",
    title: "Pflege & Instandhaltung",
    image: "/images/leistungen/pflege-gewerbe.jpg",
    imageAlt: "Grünpflege und Instandhaltung",
    bg: "bg-[#ddebd5]",
    cornerColor: "#eef6e8",
    leistungen: [
      {
        icon: Leaf,
        title: "Dauerpflege & Grünpflege",
        desc: "Regelmäßige, vertraglich gesicherte Pflege Ihrer Außenanlagen – zuverlässig und dokumentiert.",
      },
      {
        icon: Flower2,
        title: "Rasen- & Beetpflege",
        desc: "Mähen, düngen, nachsäen – damit Ihre Grünflächen das ganze Jahr über gepflegt wirken.",
      },
      {
        icon: Scissors,
        title: "Heckenschnitt",
        desc: "Fachgerechter Formschnitt für ein gepflegtes Erscheinungsbild Ihrer Liegenschaft.",
      },
      {
        icon: TreePine,
        title: "Baumschnitt & Baumfällung",
        desc: "Professionelle Baumpflege und sichere Fällungen nach anerkannten Fachregeln.",
      },
      {
        icon: Trash2,
        title: "Laubentfernung & Entsorgung",
        desc: "Systematische Laubreinigung großer Flächen inkl. fachgerechter Entsorgung.",
      },
      {
        icon: Droplets,
        title: "Steinreinigung",
        desc: "Professionelle Reinigung von Pflaster-, Terrassen- und Wegeflächen.",
      },
    ],
  },
]

export const privatKategorien: Kategorie[] = [
  {
    label: "Gartengestaltung & Bau",
    title: "Gestaltung & Bau",
    image: "/images/leistungen/privat-gestaltung-2.jpg",
    imageAlt: "Gartengestaltung und Terrassenbau",
    bg: "bg-[#eef6e8]",
    cornerColor: "#ffffff",
    leistungen: [
      {
        icon: Shovel,
        title: "Erdarbeiten & Rodungen",
        desc: "Geländevorbereitung für Ihren neuen Garten – Abtragungen, Planierungen und Rodungen.",
      },
      {
        icon: Hammer,
        title: "Pflasterarbeiten & Steinarbeiten",
        desc: "Langlebige Wege, Einfahrten und Flächen aus Naturstein oder Pflaster.",
      },
      {
        icon: LandPlot,
        title: "Neugestaltung & Gartenanlage",
        desc: "Komplette Neuanlage Ihres Gartens – vom ersten Konzept bis zur fertigen Fläche.",
      },
      {
        icon: Layers,
        title: "Terrassenbau",
        desc: "Naturstein, Holz oder Beton – Ihre Terrasse als Herzstück des Gartens.",
      },
      {
        icon: Fence,
        title: "Zäune & Sichtschutz",
        desc: "Einfriedungen und Sichtschutz, die zu Ihrem Garten und Ihrer Nachbarschaft passen.",
      },
      {
        icon: Sprout,
        title: "Bepflanzungen",
        desc: "Saisonal oder dauerhaft – Beete, Kübel und Bepflanzungen abgestimmt auf Ihren Stil.",
      },
    ],
  },
  {
    label: "Gartenpflege",
    title: "Pflege & Instandhaltung",
    image: "/images/leistungen/privat-pflege.jpg",
    imageAlt: "Gartenpflege und Rasenmähen",
    bg: "bg-[#ddebd5]",
    cornerColor: "#eef6e8",
    leistungen: [
      {
        icon: Leaf,
        title: "Dauerpflege & Grünpflege",
        desc: "Regelmäßige Pflege Ihres Gartens – zuverlässig, termingerecht und sorgfältig.",
      },
      {
        icon: Flower2,
        title: "Rasen- & Beetpflege",
        desc: "Mähen, düngen, nachsäen – damit Ihr Garten das ganze Jahr über begeistert.",
      },
      {
        icon: Scissors,
        title: "Heckenschnitt",
        desc: "Fachgerechter Formschnitt für ein gepflegtes, sauberes Erscheinungsbild.",
      },
      {
        icon: TreePine,
        title: "Baumschnitt & Baumfällung",
        desc: "Professionelle Baumpflege und sichere Fällungen nach anerkannten Fachregeln.",
      },
      {
        icon: Trash2,
        title: "Laubentfernung & Entsorgung",
        desc: "Gründliche Reinigung Ihrer Gartenflächen inkl. fachgerechter Entsorgung.",
      },
      {
        icon: Droplets,
        title: "Steinreinigung",
        desc: "Terrassen, Wege und Pflasterflächen professionell gereinigt – wie neu.",
      },
    ],
  },
]

interface LeistungenStickyScrollProps {
  kategorien?: Kategorie[]
}

export function LeistungenStickyScroll({ kategorien = gewerbeKategorien }: LeistungenStickyScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative -mt-8 rounded-t-[2.5rem] bg-[#ddebd5] sage-texture section-wave-top">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,158,64,0.10),transparent)]" />
      {/* Mobile: normal gestapelt */}
      <div className="flex flex-col lg:hidden">
        {kategorien.map((kat) => (
          <KarteInline key={kat.title} kat={kat} />
        ))}
      </div>

      {/* Desktop: Sticky-Scroll */}
      <div className="hidden lg:block">
        {/* Karte 1 sticky – max-h verhindert Abschneiden auf kleinen Viewports */}
        <div className="sticky top-0 z-10 max-h-screen overflow-y-auto">
          <KarteDesktop kat={kategorien[0]} />
        </div>
        {/* Karte 2 scrollt darüber – Schatten nur oben, nicht unten */}
        {/* clipPath und boxShadow auf getrennten Elementen, damit der Schatten nicht über den Corner-Spans rendert */}
        <div className="relative z-20" style={{ clipPath: "inset(-40px 0 0 0)" }}>
          <div style={{ boxShadow: "0 -8px 32px -4px rgba(0,0,0,0.12)" }}>
            <KarteDesktop kat={kategorien[1]} />
          </div>
        </div>
      </div>
    </section>
  )
}

function KarteDesktop({ kat }: { kat: Kategorie }) {
  return (
    <div className={`${kat.bg} relative rounded-t-[2.5rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24`}>
      {/* Ecken-Overlay: füllt die abgerundeten Ecken mit der Farbe der vorherigen Section */}
      <span
        className="pointer-events-none absolute left-0 top-0 h-10 w-10"
        style={{ background: `radial-gradient(circle at 100% 100%, transparent 40px, ${kat.cornerColor} 40px)` }}
      />
      <span
        className="pointer-events-none absolute right-0 top-0 h-10 w-10"
        style={{ background: `radial-gradient(circle at 0% 100%, transparent 40px, ${kat.cornerColor} 40px)` }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Links: Text + Leistungsliste */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 shrink-0 bg-primary/35" />
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                {kat.label}
              </span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {kat.title}
            </h2>

            <ul className="mt-10 divide-y divide-border">
              {kat.leistungen.map((item, index) => (
                <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                  <FadeIn direction="up" delay={index * 0.05}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold leading-snug">{item.title}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button asChild size="lg" className="group bg-brand-green-cta text-white hover:bg-brand-green-cta-hover">
                <Link href="/kontakt">
                  Angebot anfragen
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Rechts: Bild */}
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
            {kat.image ? (
              <Image
                src={kat.image}
                alt={kat.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-image-placeholder">
                <span className="text-sm text-muted-foreground">Bild folgt</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function KarteInline({ kat }: { kat: Kategorie }) {
  return (
    <div className={`${kat.bg} relative rounded-t-[2.5rem] px-4 py-14 sm:px-6`}>
      <span
        className="pointer-events-none absolute left-0 top-0 h-10 w-10"
        style={{ background: `radial-gradient(circle at 100% 100%, transparent 40px, ${kat.cornerColor} 40px)` }}
      />
      <span
        className="pointer-events-none absolute right-0 top-0 h-10 w-10"
        style={{ background: `radial-gradient(circle at 0% 100%, transparent 40px, ${kat.cornerColor} 40px)` }}
      />
      <div className="flex items-center gap-3">
        <div className="h-px w-8 shrink-0 bg-primary/35" />
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          {kat.label}
        </span>
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
        {kat.title}
      </h2>

      <div className="group mt-6 relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
        {kat.image ? (
          <Image
            src={kat.image}
            alt={kat.imageAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-image-placeholder">
            <span className="text-sm text-muted-foreground">Bild folgt</span>
          </div>
        )}
      </div>

      <ul className="mt-8 divide-y divide-border">
        {kat.leistungen.map((item, index) => (
          <li key={item.title} className="py-4 first:pt-0 last:pb-0">
            <FadeIn direction="up" delay={index * 0.05}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold leading-snug">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button asChild size="lg" className="group">
          <Link href="/kontakt">
            Angebot anfragen
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
