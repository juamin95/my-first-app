import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Layers } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjektGalerie } from "@/components/projekt-galerie"
import { kundentypStyles } from "@/lib/projekte-data"
import { getProjektBySlug, getAllSlugs } from "@/lib/projekte-service"
import type { Metadata } from "next"

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const projekt = await getProjektBySlug(slug)
  if (!projekt) return { title: "Projekt nicht gefunden" }

  return {
    title: `${projekt.titel} | Projekte`,
    description: projekt.subtext,
    openGraph: {
      title: projekt.titel,
      description: projekt.subtext,
      images: projekt.coverImage ? [{ url: projekt.coverImage }] : [],
    },
  }
}

export default async function ProjektDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projekt = await getProjektBySlug(slug)
  if (!projekt) notFound()

  return (
    <div className="bg-white pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <FadeIn>
          <Link
            href="/projekte"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Alle Projekte
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn direction="up" delay={0.05}>
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`text-xs ${kundentypStyles[projekt.kundentyp]}`}>
                {projekt.kundentyp}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {projekt.ort}
              </Badge>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {projekt.titel}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">{projekt.subtext}</p>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary/60" />
                {projekt.ort}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary/60" />
                {projekt.jahr}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-primary/60" />
                {projekt.leistungen.length} Leistungen
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Image gallery */}
        <FadeIn delay={0.1}>
          <div className="mt-10">
            <ProjektGalerie images={projekt.images} alt={projekt.titel} />
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.15} direction="up">
          <div className="mt-12 space-y-4">
            {projekt.beschreibung.map((abs, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {abs}
              </p>
            ))}
          </div>
        </FadeIn>

        {/* Leistungen */}
        <FadeIn delay={0.2} direction="up">
          <div className="mt-10 rounded-2xl border border-primary/10 bg-brand-green-mid p-7">
            <h2 className="font-semibold tracking-tight">Erbrachte Leistungen</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {projekt.leistungen.map((l) => (
                <li
                  key={l}
                  className="flex items-center gap-2.5 text-sm text-foreground/80"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.25}>
          <div className="mt-12 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-8 text-center sm:p-10">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Ähnliches Projekt gewünscht?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Erzählen Sie uns von Ihrem Vorhaben. Wir beraten Sie
              unverbindlich und erstellen Ihnen ein individuelles Angebot.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/kontakt">Jetzt anfragen</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projekte">Weitere Projekte ansehen</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
