import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, BadgeEuro, PhoneCall } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-20 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#b84c5c] via-[#a13644] to-[#d56d7c]"></div>
          <div className="absolute -top-20 -left-16 w-80 h-80 bg-white/15 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-16 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Agenzia premium a Cavallermaggiore</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Dai valore alla tua casa, trova il prossimo <span className="text-white">capitolo</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-2xl text-white/90">
                Myzone ti accompagna con un approccio moderno, trasparente e orientato ai risultati nel mercato di Cavallermaggiore e dintorni.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/vetrina" 
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-primary hover:bg-white/85 font-bold py-3 px-8 rounded-xl transition-colors text-lg"
                >
                  Guarda gli Annunci <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/servizi" 
                  className="inline-flex w-full sm:w-auto items-center justify-center bg-primary/40 border border-white/30 text-white hover:bg-primary/60 font-bold py-3 px-8 rounded-xl transition-colors text-lg"
                >
                  Scopri i Servizi
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-xl">
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-2xl font-bold">Esperienza</p>
                  <p className="text-sm text-white/80">Esperienza sul territorio</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <p className="text-2xl font-bold">Servizio completo</p>
                  <p className="text-sm text-white/80">Dalla valutazione al rogito</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end mt-6 md:mt-0">
              <div className="relative w-full max-w-xl bg-white/10 border border-white/20 rounded-2xl p-3 sm:p-4 backdrop-blur-sm shadow-2xl">
                <Image
                  src="/logo.jpg"
                  alt="Brand Myzone"
                  width={560}
                  height={300}
                  className="rounded-xl object-cover"
                  priority
                />
                <div className="mt-4 md:mt-0 md:absolute md:-bottom-5 md:-left-5 bg-white text-secondary rounded-xl px-4 py-3 shadow-xl border border-primary/20 max-w-[90%]">
                  <p className="text-xs uppercase tracking-wide text-primary font-semibold">Sede</p>
                  <p className="font-bold">Via Roma 78, Cavallermaggiore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/15 overflow-hidden bg-white shadow-sm">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 p-8 md:p-10 bg-gradient-to-br from-secondary to-primary text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-white/80 mb-3">Panoramica Myzone</p>
                <h2 className="text-3xl font-bold mb-8">Competenza locale, approccio completo</h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-white/75 mb-1">Zona</p>
                    <p className="text-xl font-semibold">Cavallermaggiore e dintorni</p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-white/75 mb-1">Focus</p>
                    <p className="text-xl font-semibold">Vendita, Affitto, Valutazioni</p>
                  </div>
                  <div className="rounded-xl border border-white/20 bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-white/75 mb-1">Sede</p>
                    <p className="text-xl font-semibold">Via Roma 78</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 p-8 md:p-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-primary/15 p-5 bg-white">
                    <ShieldCheck className="w-6 h-6 text-primary mb-2" />
                    <p className="font-semibold text-secondary">Affidabilità</p>
                    <p className="text-sm text-secondary/75">Assistenza chiara e continua in ogni fase.</p>
                  </div>
                  <div className="rounded-2xl border border-primary/15 p-5 bg-white">
                    <MapPin className="w-6 h-6 text-primary mb-2" />
                    <p className="font-semibold text-secondary">Conoscenza locale</p>
                    <p className="text-sm text-secondary/75">Valori reali sul mercato del territorio.</p>
                  </div>
                  <div className="rounded-2xl border border-primary/15 p-5 bg-white">
                    <BadgeEuro className="w-6 h-6 text-primary mb-2" />
                    <p className="font-semibold text-secondary">Valutazioni accurate</p>
                    <p className="text-sm text-secondary/75">Strategie concrete per massimizzare il prezzo.</p>
                  </div>
                  <div className="rounded-2xl border border-primary/15 p-5 bg-white">
                    <PhoneCall className="w-6 h-6 text-primary mb-2" />
                    <p className="font-semibold text-secondary">Supporto rapido</p>
                    <p className="text-sm text-secondary/75">Un referente dedicato per ogni pratica.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vetrina"
              className="w-full sm:w-auto text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Guarda gli Annunci
            </Link>
            <Link
              href="/valuta-casa"
              className="w-full sm:w-auto text-center bg-secondary text-white hover:bg-secondary/90 font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              Valuta la tua Casa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
