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
    default: "MyZone | Agenzia Immobiliare a Cavallermaggiore",
    template: "%s | MyZone",
  },
  description:
    "MyZone è l'agenzia immobiliare di riferimento a Cavallermaggiore e dintorni per vendita, affitto e valutazioni immobiliari professionali.",
  keywords: [
    "agenzia immobiliare Cavallermaggiore",
    "case in vendita Cavallermaggiore",
    "case in affitto Cavallermaggiore",
    "valutazione casa Cavallermaggiore",
    "immobiliare dintorni Cavallermaggiore",
    "MyZone",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: siteConfig.name,
    title: "MyZone | Agenzia Immobiliare a Cavallermaggiore",
    description:
      "Vendita, affitto e valutazioni immobiliari a Cavallermaggiore e dintorni con supporto completo e consulenza trasparente.",
    images: [
      {
        url: `${siteConfig.url}${siteConfig.images.logo}`,
        width: 1200,
        height: 630,
        alt: "Logo MyZone - Agenzia immobiliare a Cavallermaggiore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyZone | Agenzia Immobiliare a Cavallermaggiore",
    description:
      "Vendita, affitto e valutazioni immobiliari a Cavallermaggiore e dintorni.",
    images: [`${siteConfig.url}${siteConfig.images.logo}`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: ["/favicon.ico"],
    apple: ["/favicon.ico"],
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
