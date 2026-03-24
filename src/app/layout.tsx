import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "MyZone | Agenzia Immobiliare a Cavallermaggiore, Savigliano, Racconigi e dintorni",
    template: "%s | MyZone Immobiliare Cavallermaggiore",
  },
  description:
    "MyZone è l'agenzia immobiliare di riferimento a Cavallermaggiore e dintorni: vendita, affitto e valutazioni professionali a Savigliano, Racconigi, Saluzzo, Fossano, Bra e provincia di Cuneo.",
  keywords: [
    "agenzia immobiliare Cavallermaggiore",
    "case in vendita Cavallermaggiore",
    "case in affitto Cavallermaggiore",
    "valutazione casa Cavallermaggiore",
    "immobiliare Savigliano",
    "case in vendita Savigliano",
    "immobiliare Racconigi",
    "case in vendita Racconigi",
    "immobiliare Saluzzo",
    "case in vendita Fossano",
    "immobiliare Bra",
    "agenzia immobiliare provincia Cuneo",
    "case in vendita provincia Cuneo",
    "valutazione immobiliare Cuneo",
    "appartamenti Cavallermaggiore",
    "vendita case Cavallermaggiore e dintorni",
    "affitto appartamenti Cavallermaggiore",
    "MyZone immobiliare",
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: siteConfig.name,
    title:
      "MyZone | Agenzia Immobiliare a Cavallermaggiore, Savigliano e dintorni",
    description:
      "Vendita, affitto e valutazioni immobiliari a Cavallermaggiore, Savigliano, Racconigi, Saluzzo, Fossano e provincia di Cuneo. Consulenza trasparente e supporto completo.",
    images: [
      {
        url: `${siteConfig.url}${siteConfig.images.logo}`,
        width: 1200,
        height: 630,
        alt: "MyZone - Agenzia Immobiliare a Cavallermaggiore e provincia di Cuneo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "MyZone | Agenzia Immobiliare a Cavallermaggiore e dintorni",
    description:
      "Vendita, affitto e valutazioni immobiliari a Cavallermaggiore, Savigliano, Racconigi e provincia di Cuneo.",
    images: [`${siteConfig.url}${siteConfig.images.logo}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "geo.region": "IT-CN",
    "geo.placename": "Cavallermaggiore",
    "geo.position": "44.7093;7.6830",
    ICBM: "44.7093, 7.6830",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
