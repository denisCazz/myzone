import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { cookieSections, legalContact, legalLastUpdated } from "@/lib/legal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Informativa sui cookie e sui contenuti esterni del sito ${legalContact.controllerName}.`,
  alternates: {
    canonical: "/cookie-policy",
  },
  openGraph: {
    url: "/cookie-policy",
    title: "Cookie Policy | MyZone",
    description: `Informativa sui cookie e sui contenuti esterni del sito ${legalContact.controllerName}.`,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.images.logo}`,
        width: 1200,
        height: 630,
        alt: "Cookie Policy MyZone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | MyZone",
    description: `Informativa sui cookie e sui contenuti esterni del sito ${legalContact.controllerName}.`,
    images: [`${siteConfig.url}${siteConfig.images.logo}`],
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      description="Informativa sui cookie tecnici e sui contenuti di terze parti caricati solo su richiesta dell'utente."
      lastUpdated={legalLastUpdated}
      sections={cookieSections}
    />
  );
}
