import { createServerClient } from "@/lib/supabase-server"
import type { Projekt, Kundentyp } from "@/lib/projekte-data"

function mapRow(row: any): Projekt {
  return {
    slug: row.slug,
    titel: row.titel,
    subtext: row.subtext,
    kundentyp: row.kundentyp as Kundentyp,
    ort: row.ort,
    jahr: row.jahr,
    beschreibung: row.beschreibung as string[],
    leistungen: row.leistungen as string[],
    coverImage: row.cover_url,
    images: row.bilder as string[],
  }
}

export async function getProjekte(): Promise<Projekt[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("projekte")
      .select("*")
      .eq("published", true)
      .order("jahr", { ascending: false })
      .order("created_at", { ascending: false })

    if (error || !data) return []
    return data.map(mapRow)
  } catch {
    return []
  }
}

export async function getProjektBySlug(slug: string): Promise<Projekt | null> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("projekte")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (error || !data) return null
    return mapRow(data)
  } catch {
    return null
  }
}

export async function getProjekteByKundentyp(kundentyp: Kundentyp, limit = 3): Promise<Projekt[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("projekte")
      .select("*")
      .eq("kundentyp", kundentyp)
      .eq("published", true)
      .order("jahr", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error || !data) return []
    return data.map(mapRow)
  } catch {
    return []
  }
}

export async function getProjekteByKundentypen(kundentypen: Kundentyp[], limit = 3): Promise<Projekt[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("projekte")
      .select("*")
      .in("kundentyp", kundentypen)
      .eq("published", true)
      .order("jahr", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error || !data) return []
    return data.map(mapRow)
  } catch {
    return []
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("projekte")
      .select("slug")
      .eq("published", true)

    if (error || !data) return []
    return data.map((row) => row.slug as string)
  } catch {
    return []
  }
}
