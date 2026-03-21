import Image from "next/image"
import { FadeIn } from "@/components/ui/fade-in"

interface PageHeroProps {
  badge: string
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt: string
  /** Overlay opacity, default 0.55 */
  overlayOpacity?: number
  /** Tailwind object-position class, default "object-center" */
  objectPosition?: string
}

export function PageHero({
  badge,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  overlayOpacity = 0.55,
  objectPosition = "object-center",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden sm:min-h-[52vh]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className={`object-cover ${objectPosition}`}
        priority
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6">
        <FadeIn direction="none">
          <span className="inline-block rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            {badge}
          </span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
              {subtitle}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
