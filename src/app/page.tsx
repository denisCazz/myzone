import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, BadgeEuro, PhoneCall, Home as HomeIcon } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenzia Immobiliare a Cavallermaggiore e dintorni',
  description:
    'Scopri MyZone: annunci in vendita e affitto, valutazioni professionali e consulenza immobiliare a Cavallermaggiore e dintorni.',
  alternates: {
    canonical: '/',
  },
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: siteConfig.name,
  image: `${siteConfig.url}${siteConfig.images.logo}`,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address,
    addressLocality: 'Cavallermaggiore',
    addressRegion: 'CN',
    postalCode: '12030',
    addressCountry: 'IT',
  },
  areaServed: ['Cavallermaggiore', 'dintorni di Cavallermaggiore'],
  slogan: siteConfig.tagline,
};

export default function Home() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {/* Hero Section - full-bleed con hero.jpg */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src={siteConfig.images.hero}
          alt="Sfondo MyZone - Agenzia Immobiliare"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay: più scuro su mobile per leggibilità */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 sm:from-primary/95 sm:via-primary/70 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent sm:from-black/60 sm:via-transparent sm:to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/25 border border-white/40 mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium text-white">Agenzia premium a Cavallermaggiore</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 sm:mb-6 leading-[1.15] tracking-tight text-white [text-shadow:_0_2px_12px_rgb(0_0_0_/_0.5)] sm:[text-shadow:_0_2px_20px_rgb(0_0_0_/_0.3)]">
              Dai valore alla tua casa,
              <br />
              trova il prossimo capitolo
            </h1>
            <div className="group mb-7 sm:mb-8 inline-block rounded-2xl border border-white/35 bg-white/10 backdrop-blur-sm px-5 py-3.5 sm:px-6 sm:py-4 shadow-lg shadow-black/20 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:border-white/55 hover:shadow-xl hover:shadow-black/30">
              <HomeIcon className="absolute right-4 top-3 w-4 h-4 text-white/0 transition-all duration-300 group-hover:text-white/80 group-hover:scale-110" />
              <p className="text-white text-2xl leading-tight sm:text-3xl md:text-4xl font-extrabold tracking-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_0.45)] transition-all duration-300 group-hover:[text-shadow:_0_0_14px_rgb(255_255_255_/_0.28),_0_2px_10px_rgb(0_0_0_/_0.45)]">
                La tua casa, la tua zona.
              </p>
              <div className="mt-2 h-[2px] w-24 rounded-full bg-white/75 transition-all duration-300 group-hover:w-40 group-hover:bg-white" />
            </div>
            <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-white leading-relaxed max-w-xl [text-shadow:_0_1px_8px_rgb(0_0_0_/_0.4)]">
              MyZone ti accompagna con un approccio moderno, trasparente e orientato ai risultati nel mercato di Cavallermaggiore e dintorni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/vetrina"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-primary hover:bg-white/95 font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-[1.02]"
              >
                Guarda gli Annunci <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/servizi"
                className="inline-flex w-full sm:w-auto items-center justify-center bg-white/15 border-2 border-white/50 text-white hover:bg-white/25 font-bold py-4 px-8 rounded-2xl transition-all"
              >
                Scopri i Servizi
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 text-white text-sm [text-shadow:_0_1px_4px_rgb(0_0_0_/_0.5)]">
              <span>{siteConfig.fullAddress}</span>
              <span className="hidden sm:inline">•</span>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione immagine cucina - showcase qualità immobili */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-primary/10 aspect-[4/3]">
              <Image
                src={siteConfig.images.cucina}
                alt="Esempio di immobile - Cucina moderna"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">I nostri immobili</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-4 mb-6 leading-tight">
                Ambienti vivibili, case pronte per la vita
              </h2>
              <p className="text-lg text-secondary/80 leading-relaxed mb-8">
                Ogni immobile che proponiamo è selezionato per qualità, posizione e potenziale. Dalle cucine moderne agli spazi living, cerchiamo case che raccontino una storia e che possano diventare la tua.
              </p>
              <Link
                href="/vetrina"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-2xl transition-all btn-glow"
              >
                Esplora la Vetrina <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10 bg-white">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 p-10 md:p-12 bg-gradient-to-br from-secondary via-primary/90 to-primary text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-4">Panoramica MyZone</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-tight">
                  Competenza locale, approccio completo
                </h2>

                <div className="space-y-4">
                  {[
                    { label: 'Zona', value: siteConfig.zone },
                    { label: 'Focus', value: 'Vendita, Affitto, Valutazioni' },
                    { label: 'Sede', value: siteConfig.address },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/20 bg-white/10 p-5 hover:bg-white/15 transition-colors">
                      <p className="text-xs uppercase tracking-widest text-white/70 mb-1">{item.label}</p>
                      <p className="text-xl font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3 p-10 md:p-12">
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: ShieldCheck, title: 'Affidabilità', desc: 'Assistenza chiara e continua in ogni fase.' },
                    { icon: MapPin, title: 'Conoscenza locale', desc: 'Valori reali sul mercato del territorio.' },
                    { icon: BadgeEuro, title: 'Valutazioni accurate', desc: 'Strategie concrete per massimizzare il prezzo.' },
                    { icon: PhoneCall, title: 'Supporto rapido', desc: 'Un referente dedicato per ogni pratica.' },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-primary/10 bg-white p-6 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                    >
                      <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <p className="font-bold text-secondary mb-2">{item.title}</p>
                      <p className="text-sm text-secondary/75 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vetrina"
              className="w-full sm:w-auto text-center bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-2xl transition-all btn-glow shadow-lg shadow-primary/25"
            >
              Guarda gli Annunci
            </Link>
            <Link
              href="/valuta-casa"
              className="w-full sm:w-auto text-center bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-10 rounded-2xl transition-all"
            >
              Valuta la tua Casa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
