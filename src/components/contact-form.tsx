"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronRight, ChevronLeft } from "lucide-react"

import { contactFormSchema, type ContactFormValues, leistungsarten, projektumfangOptionen } from "@/lib/contact-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"

type FormStatus = "idle" | "submitting" | "success" | "error"

const STEPS = [
  { label: "Kontakt" },
  { label: "Anliegen" },
  { label: "Nachricht" },
]

const STEP_FIELDS: (keyof ContactFormValues)[][] = [
  ["vorname", "nachname", "email", "telefon"],
  ["kundentyp", "leistungsart", "projektumfang"],
  ["nachricht", "datenschutz"],
]

export function ContactForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [status, setStatus] = useState<FormStatus>("idle")

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      vorname: "",
      nachname: "",
      email: "",
      telefon: "",
      kundentyp: undefined,
      leistungsart: "",
      projektumfang: undefined,
      nachricht: "",
      datenschutz: false,
      website: "",
    },
    mode: "onTouched",
  })

  async function goNext() {
    const valid = await form.trigger(STEP_FIELDS[step])
    if (!valid) return
    setDirection(1)
    setStep((s) => s + 1)
  }

  function goBack() {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  async function onSubmit(data: ContactFormValues) {
    if (data.website && data.website.length > 0) {
      setStatus("success")
      return
    }
    setStatus("submitting")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Server error")
      setStatus("success")
      form.reset()
      setStep(0)
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">Vielen Dank für Ihre Anfrage!</h3>
        <p className="mt-3 max-w-md text-muted-foreground">
          Wir haben Ihre Nachricht erhalten und melden uns in Kürze persönlich bei Ihnen.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Weitere Anfrage senden
        </Button>
      </motion.div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-8">
        {/* Honeypot */}
        <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input {...field} tabIndex={-1} autoComplete="off" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                    i < step
                      ? "bg-primary text-white"
                      : i === step
                        ? "border-2 border-primary bg-white text-primary"
                        : "border-2 border-muted bg-white text-muted-foreground"
                  )}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "mt-1.5 text-xs font-medium",
                    i === step ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mb-5 h-px flex-1 transition-all duration-500",
                    i < step ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="space-y-5"
            >
              {/* ── STEP 1: Kontaktdaten ── */}
              {step === 0 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="vorname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vorname <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Max" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nachname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nachname <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Mustermann" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-Mail <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="max@beispiel.de" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="0151 12345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {/* ── STEP 2: Anliegen ── */}
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="kundentyp"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Kundentyp <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-2 gap-3"
                          >
                            {[
                              { value: "privat", label: "Privatkunde" },
                              { value: "gewerblich", label: "Gewerblich" },
                            ].map((opt) => (
                              <label
                                key={opt.value}
                                htmlFor={opt.value}
                                className={cn(
                                  "flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200",
                                  field.value === opt.value
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/40"
                                )}
                              >
                                <RadioGroupItem value={opt.value} id={opt.value} />
                                <span className="text-sm font-medium">{opt.label}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="leistungsart"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Art der Anfrage <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-3 gap-3"
                          >
                            {leistungsarten.map((art) => (
                              <label
                                key={art}
                                htmlFor={`leistung-${art}`}
                                className={cn(
                                  "flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200",
                                  field.value === art
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/40"
                                )}
                              >
                                <RadioGroupItem value={art} id={`leistung-${art}`} />
                                <span className="text-sm font-medium">{art}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projektumfang"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Ungefährer Projektumfang <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-3 gap-3"
                          >
                            {projektumfangOptionen.map((opt) => (
                              <label
                                key={opt}
                                htmlFor={`umfang-${opt}`}
                                className={cn(
                                  "flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200",
                                  field.value === opt
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/40"
                                )}
                              >
                                <RadioGroupItem value={opt} id={`umfang-${opt}`} />
                                <span className="text-sm font-medium">{opt}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* ── STEP 3: Nachricht ── */}
              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="nachricht"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ihre Nachricht <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Beschreiben Sie kurz Ihr Projekt oder Anliegen..."
                            className="min-h-[140px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="datenschutz"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal leading-relaxed">
                            Ich stimme der Verarbeitung meiner Daten gemäß{" "}
                            <a
                              href="/datenschutz"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary underline underline-offset-2 hover:text-primary/80"
                            >
                              Datenschutzerklärung
                            </a>{" "}
                            zu. <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                        role="alert"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={goBack} className="gap-1.5">
              <ChevronLeft className="h-4 w-4" />
              Zurück
            </Button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={goNext} className="gap-1.5">
              Weiter
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={status === "submitting"} className="gap-2">
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Anfrage senden
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
