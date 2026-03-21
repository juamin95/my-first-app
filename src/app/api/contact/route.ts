import { NextResponse } from "next/server"
import { contactFormSchema } from "@/lib/contact-schema"
import { createServerClient } from "@/lib/supabase-server"

// Simple in-memory rate limiter: max 3 submissions per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) return false

  entry.count++
  return true
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      "unknown"

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Honeypot check before schema validation — silent success for bots
    if (body.website && body.website.length > 0) {
      return NextResponse.json({ success: true })
    }

    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Ungültige Formulardaten" },
        { status: 400 }
      )
    }

    const data = result.data

    const supabase = createServerClient()
    const { error } = await supabase.from("leads").insert({
      vorname: data.vorname,
      nachname: data.nachname,
      email: data.email,
      telefon: data.telefon,
      kundentyp: data.kundentyp,
      leistungsart: data.leistungsart,
      projektumfang: data.projektumfang,
      nachricht: data.nachricht,
    })

    if (error) {
      console.error("[Supabase Insert Error]", error)
      return NextResponse.json({ error: "Datenbankfehler" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    console.error("[Contact API Error]")
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
