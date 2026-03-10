import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { legalContact, legalLastUpdated, privacySections } from "@/lib/legal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Informativa privacy del sito ${legalContact.controllerName}.`,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    url: "/privacy-policy",
    title: "Privacy Policy | MyZone",
    description: `Informativa privacy del sito ${legalContact.controllerName}.`,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.images.logo}`,
        width: 1200,
        height: 630,
        alt: "Privacy Policy MyZone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MyZone",
    description: `Informativa privacy del sito ${legalContact.controllerName}.`,
    images: [`${siteConfig.url}${siteConfig.images.logo}`],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      description="Informativa sul trattamento dei dati personali raccolti tramite il sito e i suoi moduli di contatto."
      lastUpdated={legalLastUpdated}
      sections={privacySections}
    />
  );
}
