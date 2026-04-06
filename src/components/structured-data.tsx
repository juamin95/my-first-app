/**
 * Structured Data (JSON-LD) components for Schema.org markup.
 * Each component renders a <script> tag with the appropriate schema.
 */

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://gruenschnitt-amini.de/#business",
    name: "Grünschnitt by Marvin Amini",
    description:
      "Professioneller Garten- und Landschaftsbau in Köln und Umgebung. Gestaltung, Pflege und Bau für Gewerbe und Privatkunden.",
    url: "https://gruenschnitt-amini.de",
    telephone: "+4915168452004",
    email: "info@gruenschnitt-amini.de",
    foundingDate: "2016",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Köln",
      addressRegion: "NRW",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.9333,
      longitude: 6.9500,
    },
    areaServed: [
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Bergisch Gladbach" },
      { "@type": "City", name: "Leverkusen" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    image: "https://gruenschnitt-amini.de/images/leistungen/gewerbe-hero.jpg",
    logo: "https://gruenschnitt-amini.de/logos/logo-amini.png",
    sameAs: [
      "https://www.facebook.com/p/Marvin-Amini-100063470666998/",
      "https://www.instagram.com/marvin_amini/",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchemaGewerbe() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gewerbliche Grünpflege & Außenanlagen Köln",
    description:
      "Ganzjährige Grünpflege, Dauerpflegeverträge und Außenanlagen für Gewerbe, Hausverwaltungen und öffentliche Hand in Köln und Umgebung.",
    provider: {
      "@type": "LocalBusiness",
      name: "Grünschnitt by Marvin Amini",
      url: "https://gruenschnitt-amini.de",
    },
    areaServed: [
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Bergisch Gladbach" },
      { "@type": "City", name: "Leverkusen" },
    ],
    serviceType: [
      "Gewerbliche Grünpflege",
      "Dauerpflegeverträge",
      "Außenanlagen Gewerbe",
      "Pflasterarbeiten",
      "Heckenschnitt",
      "Baumschnitt",
      "Laubentfernung",
    ],
    url: "https://gruenschnitt-amini.de/leistungen/gewerbe",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchemaPrivat() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gartengestaltung & Gartenpflege Köln",
    description:
      "Individuelle Gartengestaltung, Terrassenbau, Naturstein und Gartenpflege für Privatkunden in Köln, Bergisch Gladbach und Leverkusen.",
    provider: {
      "@type": "LocalBusiness",
      name: "Grünschnitt by Marvin Amini",
      url: "https://gruenschnitt-amini.de",
    },
    areaServed: [
      { "@type": "City", name: "Köln" },
      { "@type": "City", name: "Bergisch Gladbach" },
      { "@type": "City", name: "Leverkusen" },
    ],
    serviceType: [
      "Gartengestaltung",
      "Gartenpflege",
      "Terrassenbau",
      "Natursteinarbeiten",
      "Rasenpflege",
      "Bepflanzung",
      "Heckenschnitt",
    ],
    url: "https://gruenschnitt-amini.de/leistungen/privat",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://gruenschnitt-amini.de",
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: item.url,
      })),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
