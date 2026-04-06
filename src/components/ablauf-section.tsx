"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { ClipboardCheck, FileText, HardHat } from "lucide-react"

const steps = [
  {
    num: 1,
    title: "Vor-Ort-Besichtigung",
    desc: "Wir schauen uns Ihr Grundstück gemeinsam an, hören Ihre Wünsche und machen uns ein genaues Bild von den Gegebenheiten.",
    icon: ClipboardCheck,
  },
  {
    num: 2,
    title: "Angebotserstellung",
    desc: "Auf Basis der Besichtigung erhalten Sie ein transparentes, faires Angebot – ohne versteckte Kosten.",
    icon: FileText,
  },
  {
    num: 3,
    title: "Umsetzung",
    desc: "Unser Team setzt Ihr Projekt termingerecht und sauber um – Sie lehnen sich zurück.",
    icon: HardHat,
  },
]

const THRESHOLDS = [0.05, 0.45, 0.82]

// Circle width is w-16 = 64px → center at 32px from left edge
const LINE_OFFSET = "ml-[31px]"

function Step({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[0]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const t = THRESHOLDS[index]
  const tNext = index < THRESHOLDS.length - 1 ? THRESHOLDS[index + 1] : 1

  const circleProgress = useTransform(scrollYProgress, [t - 0.1, t], [0, 1])
  const textOpacity    = useTransform(scrollYProgress, [t - 0.1, t + 0.08], [0.35, 1])
  const textY          = useTransform(scrollYProgress, [t - 0.1, t], [12, 0])
  const lineScale      = useTransform(scrollYProgress, [t, tNext], [0, 1])

  const circleBg     = useTransform(circleProgress, [0, 1], ["rgba(58,99,43,0)", "rgba(58,99,43,1)"])
  const circleBorder = useTransform(circleProgress, [0, 1], ["rgba(58,99,43,0.35)", "rgba(58,99,43,1)"])
  const iconColor    = useTransform(circleProgress, [0, 1], ["rgba(58,99,43,1)", "rgba(255,255,255,1)"])

  const isLast = index === steps.length - 1
  const Icon = step.icon

  return (
    <div>
      {/* Row: icon centered to card */}
      <div className="flex items-center gap-6">
        {/* Icon circle */}
        <motion.div
          className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2"
          style={{ backgroundColor: circleBg, borderColor: circleBorder }}
        >
          <motion.span style={{ color: iconColor, display: "flex" }}>
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </motion.span>
        </motion.div>

        {/* Card */}
        <motion.div
          className="flex-1"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="rounded-2xl border border-primary/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {step.num}
              </span>
              <h3 className="text-lg font-bold leading-snug">{step.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
        </motion.div>
      </div>

      {/* Connecting line between steps – centered under the icon circle */}
      {!isLast && (
        <div className={`${LINE_OFFSET} relative my-2 h-10 w-0.5 overflow-hidden rounded-full bg-primary/15`}>
          <motion.div
            className="absolute inset-x-0 top-0 w-full bg-primary origin-top"
            style={{ scaleY: lineScale, height: "100%" }}
          />
        </div>
      )}
    </div>
  )
}

export function AblaufSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  })

  return (
    <section
      ref={containerRef}
      className="relative section-py"
      style={{ background: "linear-gradient(to bottom, var(--section-sage), var(--section-white))" }}
      aria-label="Ablauf"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 shrink-0 bg-primary/35" />
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              So funktioniert es
            </span>
            <div className="h-px w-8 shrink-0 bg-primary/35" />
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Ihr Weg zum Traumgarten
          </h2>
          <p className="mt-4 text-muted-foreground">
            Von der ersten Besichtigung bis zur fertigen Umsetzung – so arbeiten wir.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {steps.map((step, i) => (
            <Step
              key={step.title}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
