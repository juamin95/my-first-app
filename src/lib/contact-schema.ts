import { z } from "zod"

export const contactFormSchema = z.object({
  vorname: z.string().min(1, "Bitte geben Sie Ihren Vornamen ein"),
  nachname: z.string().min(1, "Bitte geben Sie Ihren Nachnamen ein"),
  email: z
    .string()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse ein")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  telefon: z
    .string()
    .min(1, "Bitte geben Sie Ihre Telefonnummer ein")
    .regex(
      /^[+]?[\d\s\-/()]{6,20}$/,
      "Bitte geben Sie eine gültige Telefonnummer ein"
    ),
  kundentyp: z.enum(["privat", "gewerblich", "oeffentlich"], {
    message: "Bitte wählen Sie Ihren Kundentyp",
  }),
  leistungsart: z.string().min(1, "Bitte wählen Sie eine Leistungsart"),
  nachricht: z.string().min(20, "Bitte beschreiben Sie Ihr Anliegen (mind. 20 Zeichen)"),
  datenschutz: z.boolean().refine((val) => val === true, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu",
  }),
  website: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const leistungsarten = [
  "Gestaltung",
  "Gartenpflege",
] as const
