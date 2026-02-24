import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Contatti | Myzone",
  description: "Contatta Myzone - Agenzia Immobiliare a Cavallermaggiore. Indirizzo, telefono, email e social.",
};

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">Contattaci</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mt-4 mb-5 tracking-tight">
            Siamo qui per te
          </h1>
          <p className="text-lg text-secondary/80 max-w-2xl mx-auto leading-relaxed">
            Passa a trovarci in sede, chiamaci o scrivici. Saremo lieti di aiutarti.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info e contatti */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-primary/10 bg-white p-8 shadow-lg shadow-primary/5">
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
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.fullAddress)}`}
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
                      Sabato: su appuntamento
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-white p-8">
              <h3 className="text-xl font-bold text-secondary mb-6">Seguici sui social</h3>
              <div className="flex gap-4">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-primary/10 hover:border-primary/25 hover:shadow-lg transition-all group"
                >
                  <Facebook className="w-6 h-6 text-primary" />
                  <span className="font-medium text-secondary group-hover:text-primary transition-colors">Facebook</span>
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white border border-primary/10 hover:border-primary/25 hover:shadow-lg transition-all group"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                  <span className="font-medium text-secondary group-hover:text-primary transition-colors">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mappa */}
            <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-xl shadow-primary/10 h-[450px] lg:h-[550px]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=7.668%2C44.699%2C7.698%2C44.719&layer=mapnik&marker=44.709%2C7.683"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa - Myzone Cavallermaggiore"
            />
            <div className="p-4 bg-white border-t border-primary/10">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                <MapPin className="w-4 h-4" />
                Apri in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/valuta-casa"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-2xl transition-all btn-glow shadow-lg shadow-primary/25"
          >
            Richiedi Valutazione
          </Link>
        </div>
      </section>
    </div>
  );
}
