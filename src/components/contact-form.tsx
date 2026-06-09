"use client"

import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronRight, ChevronLeft, ImageIcon, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

import { contactFormSchema, type ContactFormValues, leistungsarten } from "@/lib/contact-schema"
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

interface UploadedFile {
  file: File
  previewUrl: string
  storagePath: string | null
  uploading: boolean
  error: boolean
}

const STEPS = [
  { label: "Kontakt" },
  { label: "Anliegen" },
  { label: "Nachricht" },
]

const STEP_FIELDS: (keyof ContactFormValues)[][] = [
  ["vorname", "nachname", "email", "telefon"],
  ["kundentyp", "leistungsart"],
  ["nachricht", "datenschutz"],
]

export function ContactForm() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      vorname: "",
      nachname: "",
      email: "",
      telefon: "",
      adresse: "",
      kundentyp: undefined,
      leistungsart: "",
      nachricht: "",
      bilder_urls: [],
      datenschutz: false,
      website: "",
    },
    mode: "onTouched",
  })

  async function handleFiles(files: FileList | File[]) {
    const arr = Array.from(files)
    const remaining = 5 - uploadedFiles.length
    const toProcess = arr.slice(0, remaining)

    const newEntries: UploadedFile[] = toProcess
      .filter((f) => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024)
      .map((f) => ({
        file: f,
        previewUrl: URL.createObjectURL(f),
        storagePath: null,
        uploading: true,
        error: false,
      }))

    if (newEntries.length === 0) return

    setUploadedFiles((prev) => {
      const updated = [...prev, ...newEntries]
      form.setValue("bilder_urls", updated.filter((f) => f.storagePath).map((f) => f.storagePath!))
      return updated
    })

    const startIndex = uploadedFiles.length
    await Promise.all(
      newEntries.map(async (entry, i) => {
        const idx = startIndex + i
        const ext = entry.file.name.split(".").pop() ?? "jpg"
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { data, error } = await supabase.storage
          .from("lead-attachments")
          .upload(path, entry.file, { upsert: false })

        setUploadedFiles((prev) => {
          const updated = prev.map((f, fi) =>
            fi === idx
              ? { ...f, uploading: false, storagePath: error ? null : data!.path, error: !!error }
              : f
          )
          form.setValue("bilder_urls", updated.filter((f) => f.storagePath).map((f) => f.storagePath!))
          return updated
        })
      })
    )
  }

  function removeFile(index: number) {
    setUploadedFiles((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl)
      const updated = prev.filter((_, i) => i !== index)
      form.setValue("bilder_urls", updated.filter((f) => f.storagePath).map((f) => f.storagePath!))
      return updated
    })
  }

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
      uploadedFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl))
      setUploadedFiles([])
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
        <div>
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
                            <Input placeholder="Max" autoComplete="given-name" {...field} />
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
                            <Input placeholder="Mustermann" autoComplete="family-name" {...field} />
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
                            <Input type="email" placeholder="max@beispiel.de" autoComplete="email" {...field} />
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
                            <Input type="tel" placeholder="0151 12345678" autoComplete="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="adresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Projektadresse <span className="text-muted-foreground font-normal">(optional)</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Musterstraße 12, 51107 Köln" autoComplete="street-address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                            className="grid grid-cols-1 gap-3"
                          >
                            {[
                              { value: "privat", label: "Privat" },
                              { value: "gewerblich", label: "Gewerblich" },
                              { value: "oeffentlich", label: "Öffentlich" },
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
                            className="grid grid-cols-1 gap-3"
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
                  {/* Image Upload */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium leading-none">
                      Bilder anhängen{" "}
                      <span className="font-normal text-muted-foreground">(optional, max. 5)</span>
                    </p>
                    {uploadedFiles.length < 5 && (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files) }}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/40 hover:bg-primary/[0.02]"
                        )}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <ImageIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Fotos hier ablegen oder klicken</p>
                          <p className="text-xs text-muted-foreground">JPG, PNG, WebP · max. 5 MB pro Bild</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => e.target.files && handleFiles(e.target.files)}
                        />
                      </div>
                    )}
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {uploadedFiles.map((f, i) => (
                          <div key={i} className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                            {f.uploading ? (
                              <div className="flex h-full items-center justify-center">
                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                              </div>
                            ) : f.error ? (
                              <div className="flex h-full items-center justify-center p-1">
                                <p className="text-xs text-destructive text-center">Fehler</p>
                              </div>
                            ) : (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={f.previewUrl} alt="" className="h-full w-full object-cover" />
                            )}
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                              aria-label="Bild entfernen"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

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
            <Button type="button" onClick={goNext} className="gap-1.5 bg-brand-green-cta text-white hover:bg-brand-green-cta-hover">
              Weiter
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={status === "submitting"} className="gap-2 bg-brand-green-cta text-white hover:bg-brand-green-cta-hover">
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
