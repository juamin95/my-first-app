import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Grünschnitt by Marvin Amini",
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <div className="bg-white pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight">Datenschutzerklärung</h1>
        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Datenschutz auf einen Blick</h2>
            <h3 className="mt-3 font-semibold text-foreground/80">Allgemeine Hinweise</h3>
            <p className="mt-2">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Verantwortlicher</h2>
            <p className="mt-2">
              Grünschnitt by Marvin Amini<br />
              Marvin Amini<br />
              In der Rather Burg 21<br />
              51107 Köln<br />
              E-Mail: info@gruenschnitt-amini.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Datenerfassung auf dieser Website</h2>
            <h3 className="mt-3 font-semibold text-foreground/80">Kontaktformular</h3>
            <p className="mt-2">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-2">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
              sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
              vorvertraglicher Maßnahmen erforderlich ist.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der
              Datenverarbeitung. Sie haben außerdem ein Recht auf Berichtigung, Sperrung oder
              Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können
              Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <p className="text-sm text-muted-foreground/70 border-t pt-4">
            Hinweis: Dies ist eine vereinfachte Platzhalter-Datenschutzerklärung. Bitte lassen Sie
            eine vollständige, rechtssichere Datenschutzerklärung durch einen Anwalt oder einen
            DSGVO-Generator erstellen.
          </p>
        </div>
      </div>
    </div>
  )
}
