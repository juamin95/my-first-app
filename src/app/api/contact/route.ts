import { NextResponse } from "next/server"
import { contactFormSchema } from "@/lib/contact-schema"
import { createServerClient } from "@/lib/supabase-server"

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

/** Resolves client IP from multiple headers (Cloudflare > x-real-ip > x-forwarded-for) */
function getIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  )
}

/** Strip HTML tags and trim whitespace to prevent stored XSS */
function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim()
}

export async function POST(request: Request) {
  try {
    const ip = getIp(request)

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

    // Supabase-based rate limiting — persistent across all serverless instances
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString()
    const { count } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ip)
      .gte("created_at", windowStart)

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 }
      )
    }

    const { error } = await supabase.from("leads").insert({
      vorname: sanitize(data.vorname),
      nachname: sanitize(data.nachname),
      email: sanitize(data.email),
      telefon: sanitize(data.telefon),
      kundentyp: data.kundentyp,
      leistungsart: sanitize(data.leistungsart),
      nachricht: sanitize(data.nachricht),
      ip_address: ip,
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
