import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum | Grünschnitt by Marvin Amini",
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <div className="bg-white pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Impressum</h1>
        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              Grünschnitt by Marvin Amini<br />
              Marvin Amini<br />
              In der Rather Burg 21<br />
              51107 Köln
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
            <p className="mt-2">
              Telefon: +49 151 68452004<br />
              E-Mail: info@gruenschnitt-amini.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Umsatzsteuer-ID</h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              [USt-ID]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p className="mt-2">
              Berufsbezeichnung: Garten- und Landschaftsbauer<br />
              Zuständige Kammer: [Handwerkskammer]<br />
              Verliehen in: Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Streitschlichtung</h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .<br />
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <p className="text-sm text-muted-foreground/70 border-t pt-4">
            Hinweis: Dieses Impressum ist ein Platzhalter. Bitte ergänzen Sie die fehlenden Angaben
            oder lassen Sie ein rechtssicheres Impressum erstellen.
          </p>
        </div>
      </div>
    </div>
  )
}
