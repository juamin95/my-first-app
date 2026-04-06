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
        <div className="mt-8 space-y-8 text-muted-foreground leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Datenschutz auf einen Blick</h2>
            <h3 className="mt-3 font-semibold text-foreground/80">Allgemeine Hinweise</h3>
            <p className="mt-2">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
              Text aufgeführten Datenschutzerklärung.
            </p>
            <h3 className="mt-4 font-semibold text-foreground/80">Datenerfassung auf dieser Website</h3>
            <p className="mt-2">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Abschnitt &bdquo;Verantwortlicher&ldquo; in dieser
              Datenschutzerklärung entnehmen.
            </p>
            <p className="mt-2">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen – z. B.
              durch Eingabe in das Kontaktformular. Andere Daten werden automatisch beim Besuch der
              Website durch unsere IT-Systeme erfasst (technische Daten wie Browser, Betriebssystem,
              Uhrzeit des Seitenaufrufs).
            </p>
            <h3 className="mt-4 font-semibold text-foreground/80">Ihre Rechte</h3>
            <p className="mt-2">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger
              und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht
              auf Berichtigung oder Löschung dieser Daten. Wenn Sie eine Einwilligung zur
              Datenverarbeitung erteilt haben, können Sie diese jederzeit für die Zukunft widerrufen.
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Verantwortlicher</h2>
            <p className="mt-2">
              Marvin Marcel Amini<br />
              Garten- und Landschaftsbau<br />
              Farnweg 4<br />
              51107 Köln<br />
              Telefon: <a href="tel:+4915168452004" className="text-primary hover:underline">015168452004</a><br />
              E-Mail: <a href="mailto:info@gruenschnitt-amini.de" className="text-primary hover:underline">info@gruenschnitt-amini.de</a>
            </p>
            <p className="mt-2">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
              gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
              personenbezogenen Daten entscheidet.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Speicherdauer</h2>
            <p className="mt-2">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
              wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
              Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen
              oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
              sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung haben
              (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen). Im letztgenannten Fall
              erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Allgemeine Hinweise zur Datenverarbeitung</h2>
            <h3 className="mt-3 font-semibold text-foreground/80">SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="mt-2">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
              Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
              Sie daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt
              und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die SSL- bzw. TLS-Verschlüsselung
              aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten
              mitgelesen werden.
            </p>
            <h3 className="mt-4 font-semibold text-foreground/80">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p className="mt-2">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
              möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
              Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt
              vom Widerruf unberührt.
            </p>
            <h3 className="mt-4 font-semibold text-foreground/80">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
            <p className="mt-2 uppercase text-sm leading-relaxed">
              Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO
              erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen
              Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch
              einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.
              Die jeweilige Rechtsgrundlage, auf der eine Verarbeitung beruht, entnehmen Sie
              dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre
              betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können
              zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen,
              Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung,
              Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
            </p>
            <h3 className="mt-4 font-semibold text-foreground/80">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p className="mt-2">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei
              einer Aufsichtsbehörde zu. Zuständig ist die Landesbeauftragte für Datenschutz und
              Informationsfreiheit Nordrhein-Westfalen (LDI NRW),{" "}
              <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.ldi.nrw.de
              </a>.
            </p>
            <h3 className="mt-4 font-semibold text-foreground/80">Recht auf Datenübertragbarkeit</h3>
            <p className="mt-2">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
              Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten
              in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
            </p>
            <h3 className="mt-4 font-semibold text-foreground/80">Recht auf Einschränkung der Verarbeitung</h3>
            <p className="mt-2">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen
              Daten zu verlangen, wenn Sie die Richtigkeit der Daten bestreiten, die Verarbeitung
              unrechtmäßig ist, wir die Daten nicht mehr benötigen oder Sie einen Widerspruch nach
              Art. 21 Abs. 1 DSGVO eingelegt haben.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Hosting (Vercel)</h2>
            <p className="mt-2">
              Diese Website wird gehostet bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco,
              CA 94104, USA. Bei jedem Aufruf erfasst Vercel automatisch Server-Logfiles mit
              folgenden Daten:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>IP-Adresse des anfragenden Geräts</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Aufgerufene Seite / Datei</li>
              <li>Browsertyp und -version</li>
              <li>Betriebssystem</li>
              <li>HTTP-Statuscode</li>
            </ul>
            <p className="mt-2">
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technisch fehlerfreien
              Bereitstellung der Website). Vercel verarbeitet Daten in der EU und den USA auf
              Basis von Standardvertragsklauseln (SCCs) gemäß Art. 46 DSGVO. Weitere Informationen:{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Datenerfassung auf dieser Website</h2>
            <h3 className="mt-3 font-semibold text-foreground/80">Cookies</h3>
            <p className="mt-2">
              Diese Website verwendet keine Tracking-Cookies und keine Analyse- oder Werbedienste.
              Es werden ausschließlich technisch notwendige Daten für den Betrieb der Website
              verarbeitet. Ein Cookie-Banner ist daher nicht erforderlich.
            </p>

            <h3 className="mt-4 font-semibold text-foreground/80">Kontaktformular</h3>
            <p className="mt-2">
              Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, werden folgende
              Daten erhoben und gespeichert:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Vor- und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Kundentyp (Privat oder Gewerblich)</li>
              <li>Art der angefragten Leistung</li>
              <li>Ungefährer Projektumfang (optional)</li>
              <li>Ihre Nachricht</li>
              <li>IP-Adresse (zur Missbrauchsprävention)</li>
            </ul>
            <p className="mt-2">
              Die Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage und für eventuelle
              Rückfragen genutzt und nicht ohne Ihre Einwilligung an Dritte weitergegeben.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) sowie
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Die Daten werden gelöscht,
              sobald sie für die Erreichung des Zwecks nicht mehr erforderlich sind, spätestens
              nach 3 Jahren oder auf Anfrage.
            </p>

            <h3 className="mt-4 font-semibold text-foreground/80">Anfrage per E-Mail oder Telefon</h3>
            <p className="mt-2">
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller
              daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der
              Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-2">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der
              Erfüllung eines Vertrags zusammenhängt, oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der effektiven Bearbeitung von Anfragen). Die Daten verbleiben bei uns,
              bis der Zweck der Speicherung entfällt oder Sie zur Löschung auffordern.
              Gesetzliche Aufbewahrungsfristen bleiben unberührt.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Datenbank (Supabase)</h2>
            <p className="mt-2">
              Zur Speicherung von Kontaktanfragen nutzen wir den Dienst Supabase der Supabase Inc.
              Die Datenspeicherung erfolgt auf Servern in Irland (EU-West-1, Amazon Web Services),
              sodass Ihre Daten die Europäische Union nicht verlassen. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen:{" "}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                supabase.com/privacy
              </a>
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Ihre Rechte im Überblick</h2>
            <p className="mt-2">Sie haben gegenüber uns folgende Rechte:</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:info@gruenschnitt-amini.de" className="text-primary hover:underline">
                info@gruenschnitt-amini.de
              </a>
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-semibold text-foreground">9. Aktualität dieser Datenschutzerklärung</h2>
            <p className="mt-2">
              Diese Datenschutzerklärung hat den Stand März 2026. Durch die Weiterentwicklung
              unserer Website kann es notwendig werden, diese Erklärung anzupassen. Die jeweils
              aktuelle Version finden Sie stets auf dieser Seite.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
