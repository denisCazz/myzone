"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin } from "lucide-react";

type ExternalMapEmbedProps = {
  embedUrl: string;
  title: string;
  mapsUrl: string;
};

export default function ExternalMapEmbed({
  embedUrl,
  title,
  mapsUrl,
}: ExternalMapEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
        <div className="p-4 bg-white border-t border-primary/10">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <MapPin className="w-4 h-4" />
            Apri in Google Maps
          </a>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-white p-6 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MapPin className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-bold text-secondary">Carica la mappa</h3>
        <p className="mt-3 text-sm leading-relaxed text-secondary/80">
          Per tutelare meglio la privacy, la mappa esterna non viene caricata automaticamente. Premendo il
          pulsante qui sotto potresti inviare dati tecnici al servizio cartografico esterno.
        </p>
        <p className="mt-3 text-sm text-secondary/80">
          Maggiori dettagli sono disponibili nella{" "}
          <Link href="/cookie-policy" className="font-semibold text-primary hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Carica la mappa
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-primary/15 px-5 py-3 font-semibold text-secondary transition-colors hover:border-primary/30 hover:text-primary"
          >
            Apri direttamente in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
