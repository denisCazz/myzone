import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Facebook, Instagram, Clock } from "lucide-react";
import ExternalMapEmbed from "@/components/ExternalMapEmbed";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contatta MyZone a Cavallermaggiore: indirizzo, telefono, email, orari d'ufficio e link ai profili social.",
  alternates: {
    canonical: "/contatti",
  },
  openGraph: {
    url: "/contatti",
    title: "Contatti | MyZone",
    description: "Indirizzo, telefono, email e orari di MyZone a Cavallermaggiore.",
    images: [
      {
        url: `${siteConfig.url}${siteConfig.images.logo}`,
        width: 1200,
        height: 630,
        alt: "Contatti MyZone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti | MyZone",
    description: "Indirizzo, telefono, email e orari di MyZone a Cavallermaggiore.",
    images: [`${siteConfig.url}${siteConfig.images.logo}`],
  },
};

export default function ContattiPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.fullAddress)}`;

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">Contattaci</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mt-4 mb-5 tracking-tight">
            Siamo qui per te
          </h1>
          <p className="text-base sm:text-lg text-secondary/80 max-w-2xl mx-auto leading-relaxed">
            Passa a trovarci in sede, chiamaci o scrivici. Saremo lieti di aiutarti.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info e contatti */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-primary/10 bg-white p-5 sm:p-8 shadow-lg shadow-primary/5">
              <div className="flex items-center gap-4 mb-8">
                <Image
                  src={siteConfig.images.logo}
                  alt={siteConfig.name}
                  width={180}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              </div>

              <div className="space-y-6">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">Indirizzo</p>
                    <p className="text-secondary/80">
                      {siteConfig.address}
                      <br />
                      {siteConfig.city}
                    </p>
                    <p className="text-primary text-sm mt-2 font-medium group-hover:underline">Apri in Google Maps →</p>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">Telefono</p>
                    <p className="text-secondary/80">{siteConfig.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">Email</p>
                    <p className="text-secondary/80">{siteConfig.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">Orari</p>
                    <p className="text-secondary/80">
                      Lun - Ven: 9:00 - 12:30, 15:00 - 19:00
                      <br />
                      Sabato: 9:00 - 12:30, pomeriggio su appuntamento
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="text-sm font-bold">IVA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">P. IVA</p>
                    <p className="text-secondary/80">{siteConfig.vatNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-white p-5 sm:p-8">
              <h3 className="text-xl font-bold text-secondary mb-6">Seguici sui social</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white border border-primary/10 hover:border-primary/25 hover:shadow-lg transition-all group"
                >
                  <Facebook className="w-6 h-6 text-primary" />
                  <span className="font-medium text-secondary group-hover:text-primary transition-colors">Facebook</span>
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white border border-primary/10 hover:border-primary/25 hover:shadow-lg transition-all group"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                  <span className="font-medium text-secondary group-hover:text-primary transition-colors">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mappa */}
          <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-xl shadow-primary/10 h-[320px] sm:h-[450px] lg:h-[550px]">
            <ExternalMapEmbed
              embedUrl="https://www.openstreetmap.org/export/embed.html?bbox=7.668%2C44.699%2C7.698%2C44.719&layer=mapnik&marker=44.709%2C7.683"
              title="Mappa - MyZone Cavallermaggiore"
              mapsUrl={mapsUrl}
            />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/valuta-casa"
            className="inline-flex w-full sm:w-auto items-center justify-center bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-2xl transition-all btn-glow shadow-lg shadow-primary/25"
          >
            Valuta subito!
          </Link>
        </div>
      </section>
    </div>
  );
}
