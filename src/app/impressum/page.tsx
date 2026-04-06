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
        <div className="mt-8 space-y-8 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              Marvin Marcel Amini<br />
              Garten- und Landschaftsbau<br />
              Farnweg 4<br />
              51107 Köln
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Kontakt</h2>
            <p className="mt-2">
              Telefon: <a href="tel:+4915168452004" className="text-primary hover:underline">015168452004</a><br />
              E-Mail: <a href="mailto:info@gruenschnitt-amini.de" className="text-primary hover:underline">info@gruenschnitt-amini.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Steuernummer</h2>
            <p className="mt-2">
              Steuernummer: 216/5003/3671<br />
              Zuständiges Finanzamt: Finanzamt Köln-Porz
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Angaben zur Berufshaftpflichtversicherung</h2>
            <p className="mt-2">
              Angaben zur Berufshaftpflichtversicherung liegen vor und können auf Anfrage mitgeteilt werden.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
