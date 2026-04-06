export type Kundentyp = "Gewerbe" | "Privat" | "Öffentlich"

export type Projekt = {
  slug: string
  titel: string
  subtext: string
  kundentyp: Kundentyp
  ort: string
  jahr: number
  beschreibung: string[]
  leistungen: string[]
  coverImage: string
  images: string[]
}

export const filterTabs = [
  { value: "alle", label: "Alle" },
  { value: "gewerbe", label: "Gewerbe" },
  { value: "privat", label: "Privat" },
  { value: "oeffentlich", label: "Öffentlich" },
] as const

export type FilterValue = (typeof filterTabs)[number]["value"]

export function filterProjekte(
  projekte: Projekt[],
  filter: FilterValue
): Projekt[] {
  if (filter === "alle") return projekte
  if (filter === "gewerbe") return projekte.filter((p) => p.kundentyp === "Gewerbe")
  if (filter === "privat") return projekte.filter((p) => p.kundentyp === "Privat")
  if (filter === "oeffentlich") return projekte.filter((p) => p.kundentyp === "Öffentlich")
  return projekte
}

/** @deprecated Statische Daten – Projekte werden jetzt aus Supabase geladen (projekte-service.ts) */
export const projekte: Projekt[] = [
  {
    slug: "kindergarten-koeln-lindenthal",
    titel: "Kindergarten Grünanlage Köln-Lindenthal",
    subtext:
      "Komplette Neugestaltung der Außenanlage einer öffentlichen Einrichtung – inklusive Wegeführung, Bepflanzung und Spielbereich.",
    kundentyp: "Öffentlich",
    ort: "Köln-Lindenthal",
    jahr: 2024,
    coverImage: "/images/hero/luftaufnahme.webp",
    images: [
      "/images/hero/luftaufnahme.webp",
      "/images/hero/terasse.jpg",
      "/images/hero/garten.jpg",
      "/images/hero/einfahrt.jpg",
    ],
    beschreibung: [
      "Im Auftrag der Hausverwaltung wurde die komplette Außenanlage eines großen Wohnkomplexes in Köln-Lindenthal neu gestaltet. Ziel war es, eine repräsentative, pflegeleichte und gleichzeitig einladende Umgebung für die Bewohner zu schaffen.",
      "Wir haben alle Bereiche von der Planung bis zur finalen Bepflanzung übernommen – termingerecht und in enger Abstimmung mit der Verwaltung.",
    ],
    leistungen: [
      "Erdarbeiten & Planierung",
      "Wegeführung in Naturstein",
      "Rasenneuanlage",
      "Bepflanzung Eingangsbereich",
      "Spielbereich Anlage",
      "Laufende Dauerpflege",
    ],
  },
  {
    slug: "privatgarten-bergisch-gladbach",
    titel: "Privatgarten Bergisch Gladbach",
    subtext:
      "Neugestaltung eines verwilderten Gartens mit Terrasse, Natursteinmauer und mehrjähriger Bepflanzung.",
    kundentyp: "Privat",
    ort: "Bergisch Gladbach",
    jahr: 2023,
    coverImage: "/images/hero/terasse2.jpg",
    images: [
      "/images/hero/terasse2.jpg",
      "/images/hero/terasse.jpg",
      "/images/leistungen/naturstein.jpg",
      "/images/leistungen/bepflanzung.jpg",
    ],
    beschreibung: [
      "Für eine Familie in Bergisch Gladbach haben wir einen ungenutzten, verwilderten Garten in einen modernen Wohlfühlgarten verwandelt.",
      "Der Fokus lag auf einer pflegeleichten Gestaltung mit heimischen Stauden, einer neuen Terrasse und einer Natursteinmauer als Sichtschutz.",
    ],
    leistungen: [
      "Rodung & Bestandsbeseitigung",
      "Terrassenbau in Naturstein",
      "Natursteinmauer",
      "Rasenneuanlage",
      "Stauden- & Gehölzbepflanzung",
      "Bewässerungsanlage",
    ],
  },
  {
    slug: "gewerbeflaeche-leverkusen",
    titel: "Gewerbefläche Leverkusen-Manfort",
    subtext:
      "Dauerpflegevertrag für ein Industriegelände mit 8.000 m² Außenfläche – Schnitt, Pflege und Winterdienst.",
    kundentyp: "Gewerbe",
    ort: "Leverkusen-Manfort",
    jahr: 2023,
    coverImage: "/images/hero/rollrasen-edit.jpg",
    images: [
      "/images/hero/rollrasen-edit.jpg",
      "/images/leistungen/pflege-v2.jpg",
      "/images/leistungen/laubentfernung.jpg",
      "/images/leistungen/winterdienst.jpg",
    ],
    beschreibung: [
      "Ein mittelständisches Unternehmen in Leverkusen beauftragte uns mit der ganzjährigen Pflege seines Betriebsgeländes. Die Außenanlage umfasst Rasenflächen, Hecken, Bäume und befestigte Flächen.",
      "Wir übernehmen Schnitt, Pflege, Laubbeseitigung und Winterdienst – verlässlich und nach einem festen Pflegeplan.",
    ],
    leistungen: [
      "Rasenpflege & -schnitt",
      "Heckenschnitt",
      "Baumschnitt & -pflege",
      "Laubbeseitigung",
      "Unkrautbekämpfung",
      "Winterdienst",
    ],
  },
  {
    slug: "naturstein-terrasse-koeln-suelbz",
    titel: "Naturstein-Terrasse Köln-Sülz",
    subtext:
      "Hochwertige Terrassenanlage mit Natursteinplatten, integrierter LED-Beleuchtung und Staudenbeet.",
    kundentyp: "Privat",
    ort: "Köln-Sülz",
    jahr: 2024,
    coverImage: "/images/hero/terasse.jpg",
    images: [
      "/images/hero/terasse.jpg",
      "/images/leistungen/naturstein.jpg",
      "/images/hero/garten.jpg",
    ],
    beschreibung: [
      "Für ein Einfamilienhaus in Köln-Sülz haben wir eine großzügige Terrasse mit hochwertigen Natursteinplatten realisiert. Die Terrasse wurde mit einer dezenten LED-Bodenbeleuchtung ausgestattet.",
      "Ergänzend wurde ein umlaufendes Staudenbeet mit ganzjähriger Blühfolge angelegt, das die Terrasse optisch einrahmt.",
    ],
    leistungen: [
      "Planung & Entwurf",
      "Erdarbeiten & Unterbau",
      "Natursteinverlegung",
      "LED-Beleuchtung",
      "Staudenbepflanzung",
    ],
  },
  {
    slug: "hausverwaltung-koeln-ehrenfeld",
    titel: "Dauerpflege Hausverwaltung Ehrenfeld",
    subtext:
      "Ganzjährige Grünpflege für 12 Wohnobjekte einer Kölner Hausverwaltung – zuverlässig und termingerecht.",
    kundentyp: "Gewerbe",
    ort: "Köln-Ehrenfeld",
    jahr: 2024,
    coverImage: "/images/leistungen/pflege-v2.jpg",
    images: [
      "/images/leistungen/pflege-v2.jpg",
      "/images/leistungen/laubentfernung.jpg",
      "/images/hero/rollrasen-edit.jpg",
    ],
    beschreibung: [
      "Eine große Kölner Hausverwaltung beauftragte uns mit der Dauerpflege sämtlicher Außenanlagen ihrer Wohnliegenschaften im Stadtgebiet Ehrenfeld.",
      "Wir betreuen 12 Objekte ganzjährig – von der Rasenpflege über Heckenschnitt bis zum kompletten Winterdienst. Durch feste Ansprechpartner und einen verlässlichen Pflegeplan konnten wir die Zusammenarbeit langfristig sichern.",
    ],
    leistungen: [
      "Rasenpflege 12 Objekte",
      "Heckenschnitt & Formschnitt",
      "Laubbeseitigung",
      "Winterdienst & Streuen",
      "Baumkontrolle",
      "Saisonale Bepflanzung",
    ],
  },
  {
    slug: "vorgarten-neugestaltung-leverkusen",
    titel: "Vorgarten-Neugestaltung Leverkusen",
    subtext:
      "Moderner Vorgarten mit Einfahrt, Natursteinmauer und pflegeleichter Bepflanzung für ein Einfamilienhaus.",
    kundentyp: "Privat",
    ort: "Leverkusen",
    jahr: 2023,
    coverImage: "/images/hero/einfahrt.jpg",
    images: [
      "/images/hero/einfahrt.jpg",
      "/images/hero/zaun.jpg",
      "/images/leistungen/erdarbeiten.jpg",
    ],
    beschreibung: [
      "Die Eigentümer wünschten sich einen repräsentativen Vorgarten, der gleichzeitig pflegeleicht und modern wirkt. Die bestehende Einfahrt wurde komplett erneuert.",
      "Wir haben eine Kombination aus Natursteinmauer, Kiesbeet und immergrüner Bepflanzung realisiert, die das ganze Jahr über ansprechend wirkt.",
    ],
    leistungen: [
      "Bestandsrodung",
      "Erdarbeiten & Planierung",
      "Einfahrt in Betonsteinpflaster",
      "Natursteinmauer",
      "Kiesbeet-Anlage",
      "Immergrüne Bepflanzung",
    ],
  },
]

export const kundentypStyles: Record<Kundentyp, string> = {
  Gewerbe: "bg-primary/10 text-primary border border-primary/20",
  Privat: "bg-stone-100 text-stone-600 border border-stone-300",
  Öffentlich: "bg-stone-200 text-stone-700 border border-stone-300",
}
