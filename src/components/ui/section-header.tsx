import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/ui/fade-in"

interface SectionHeaderProps {
  badge: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center"

  return (
    <FadeIn>
      <div className={cn(isCenter && "text-center", className)}>
        <div className={cn("flex items-center gap-3", isCenter && "justify-center")}>
          <div className="h-px w-8 shrink-0 bg-primary/35" />
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {badge}
          </span>
          {isCenter && <div className="h-px w-8 shrink-0 bg-primary/35" />}
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-muted-foreground",
              isCenter ? "mx-auto max-w-xl" : "max-w-3xl"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  )
}
