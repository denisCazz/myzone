import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, BadgeEuro, PhoneCall } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24 sm:py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8a2d39] via-[#a13644] to-[#c45a68]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.15),transparent_70%)]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_0%_100%,rgba(161,54,68,0.3),transparent_70%)]" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 mb-8">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Agenzia premium a Cavallermaggiore</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                Dai valore alla tua casa,
                <br />
                <span className="text-white drop-shadow-lg">trova il prossimo capitolo</span>
              </h1>
              <p className="text-lg md:text-xl mb-10 max-w-xl text-white/90 leading-relaxed">
                Myzone ti accompagna con un approccio moderno, trasparente e orientato ai risultati nel mercato di Cavallermaggiore e dintorni.
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
                  className="inline-flex w-full sm:w-auto items-center justify-center bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 font-bold py-4 px-8 rounded-2xl transition-all"
                >
                  Scopri i Servizi
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 max-w-xl">
                <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 hover:bg-white/15 transition-colors">
                  <p className="text-xl font-bold">Esperienza</p>
                  <p className="text-sm text-white/80 mt-0.5">Esperienza sul territorio</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 hover:bg-white/15 transition-colors">
                  <p className="text-xl font-bold">Servizio completo</p>
                  <p className="text-sm text-white/80 mt-0.5">Dalla valutazione al rogito</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="relative w-full max-w-lg">
                <div className="relative bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl">
                  <Image
                    src="/logo.jpg"
                    alt="Brand Myzone"
                    width={560}
                    height={300}
                    className="rounded-xl object-cover w-full"
                    priority
                  />
                  <div className="mt-4 md:absolute md:mt-0 md:-bottom-4 md:-left-4 bg-white text-secondary rounded-2xl px-5 py-4 shadow-2xl border border-primary/20 max-w-[90%]">
                    <p className="text-xs uppercase tracking-wider text-primary font-bold">Sede</p>
                    <p className="font-bold text-lg">Via Roma 78, Cavallermaggiore</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10 bg-white">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 p-10 md:p-12 bg-gradient-to-br from-secondary via-primary/90 to-primary text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-white/70 mb-4">Panoramica Myzone</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-tight">
                  Competenza locale, approccio completo
                </h2>

                <div className="space-y-4">
                  {[
                    { label: 'Zona', value: 'Cavallermaggiore e dintorni' },
                    { label: 'Focus', value: 'Vendita, Affitto, Valutazioni' },
                    { label: 'Sede', value: 'Via Roma 78' },
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
