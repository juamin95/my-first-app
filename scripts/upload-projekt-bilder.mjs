/**
 * Lädt Projektbilder in Supabase Storage hoch und aktualisiert die DB-URLs.
 * Einmalig ausführen: node scripts/upload-projekt-bilder.mjs
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { extname } from "path"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Fehlende Umgebungsvariablen: NEXT_PUBLIC_SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY müssen gesetzt sein.")
  console.error("Tipp: node --env-file=.env.local scripts/upload-projekt-bilder.mjs")
  process.exit(1)
}
const BUCKET = "projekt-bilder"
const SLUG = "terrasse-bankirai-koeln-2026"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const bilder = [
  {
    localPath: "public/images/projekte/terrasse-bankirai-koeln-2026-cover.jpg",
    storagePath: "terrasse-bankirai-koeln-2026/cover.jpg",
    mimeType: "image/jpeg",
  },
  {
    localPath: "public/images/projekte/terrasse-bankirai-koeln-2026-material.jpg",
    storagePath: "terrasse-bankirai-koeln-2026/material.jpg",
    mimeType: "image/jpeg",
  },
  {
    localPath: "public/images/projekte/terrasse-bankirai-koeln-2026-detail.jpg",
    storagePath: "terrasse-bankirai-koeln-2026/detail.jpg",
    mimeType: "image/jpeg",
  },
]

async function upload() {
  const publicUrls = []

  for (const bild of bilder) {
    console.log(`⬆ Lade hoch: ${bild.localPath}`)
    const file = readFileSync(bild.localPath)

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(bild.storagePath, file, {
        contentType: bild.mimeType,
        upsert: true,
      })

    if (error) {
      console.error(`✗ Fehler bei ${bild.storagePath}:`, error.message)
      process.exit(1)
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(bild.storagePath)
    publicUrls.push(data.publicUrl)
    console.log(`✓ URL: ${data.publicUrl}`)
  }

  // DB aktualisieren
  console.log("\n↻ Aktualisiere Datenbankeinträge...")
  const { error: dbError } = await supabase
    .from("projekte")
    .update({
      cover_url: publicUrls[0],
      bilder: publicUrls,
    })
    .eq("slug", SLUG)

  if (dbError) {
    console.error("✗ DB-Update fehlgeschlagen:", dbError.message)
    process.exit(1)
  }

  console.log("\n✓ Fertig! Projekt-URLs aktualisiert:")
  publicUrls.forEach((url) => console.log(" ", url))
}

upload()
