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
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-white px-4 py-4 text-center sm:p-6">
      <div className="w-full max-w-sm">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary sm:mb-4 sm:h-14 sm:w-14">
          <MapPin className="h-5 w-5 sm:h-7 sm:w-7" />
        </div>
        <h3 className="text-base font-bold text-secondary sm:text-xl">Carica la mappa</h3>
        <p className="mt-2 text-sm leading-5 text-secondary/80 sm:mt-3 sm:leading-6">
          La mappa esterna non viene caricata automaticamente per maggiore privacy.
        </p>
        <p className="mt-2 text-xs leading-5 text-secondary/70 sm:mt-3 sm:text-sm sm:leading-6">
          Caricandola potresti inviare dati tecnici al servizio esterno. Dettagli nella{" "}
          <Link href="/cookie-policy" className="font-semibold text-primary hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Carica la mappa
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center px-2 py-1 text-sm font-semibold text-primary transition-colors hover:underline sm:w-auto"
          >
            Oppure apri Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
