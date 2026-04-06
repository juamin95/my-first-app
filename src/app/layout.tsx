import type { Metadata } from "next";
import { Spectral, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gruenschnitt-amini.de"),
  title: {
    default: "Garten- und Landschaftsbau Köln | Grünschnitt by Amini",
    template: "%s | Grünschnitt by Amini",
  },
  description:
    "Professioneller Garten- & Landschaftsbau in Köln. Gestaltung, Pflege und Bau für Gewerbe & Privat. Jetzt unverbindlich anfragen!",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.gruenschnitt-amini.de",
    siteName: "Grünschnitt by Marvin Amini",
    title: "Garten- und Landschaftsbau Köln | Grünschnitt by Amini",
    description:
      "Professioneller Garten- & Landschaftsbau in Köln. Gestaltung, Pflege und Bau für Gewerbe & Privat. Jetzt unverbindlich anfragen!",
    images: [{ url: "/images/leistungen/gewerbe-hero.jpg", width: 1200, height: 630, alt: "Grünschnitt by Marvin Amini – Garten- und Landschaftsbau Köln" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garten- und Landschaftsbau Köln | Grünschnitt by Amini",
    description:
      "Professioneller Garten- & Landschaftsbau in Köln. Gestaltung, Pflege und Bau für Gewerbe & Privat. Jetzt unverbindlich anfragen!",
    images: ["/images/leistungen/gewerbe-hero.jpg"],
  },
  alternates: {
    canonical: "https://www.gruenschnitt-amini.de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${spectral.variable} ${inter.variable} ${inter.className} antialiased flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <SpeedInsights />
      </body>
    </html>
  );
}
