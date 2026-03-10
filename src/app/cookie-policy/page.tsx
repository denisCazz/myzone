import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { cookieSections, legalContact, legalLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Informativa sui cookie e sui contenuti esterni del sito ${legalContact.controllerName}.`,
  alternates: {
    canonical: "/cookie-policy",
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
