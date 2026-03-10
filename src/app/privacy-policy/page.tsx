import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { legalContact, legalLastUpdated, privacySections } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Informativa privacy del sito ${legalContact.controllerName}.`,
  alternates: {
    canonical: "/privacy-policy",
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
