interface SectionWrapperProps {
  bgFrom: string
  bgTo: string
  children: React.ReactNode
  className?: string
  id?: string
  "aria-label"?: string
}

export function SectionWrapper({
  bgFrom,
  bgTo,
  children,
  className,
  id,
  "aria-label": ariaLabel,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={className}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${bgFrom}, ${bgTo}), var(--dot-texture, none)`,
        backgroundSize: "100% 100%, 20px 20px",
      }}
    >
      {children}
    </section>
  )
}
