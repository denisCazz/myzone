import { Home as HomeIcon, Calculator, Wrench, Zap } from 'lucide-react';
import Link from 'next/link';

const servizi = [
  {
    titolo: 'Valutazioni',
    descrizione:
      "Valutazioni precise e realistiche del tuo immobile basate sull'andamento del mercato locale.",
    icon: HomeIcon,
  },
  {
    titolo: 'Consulenza Finanziaria',
    descrizione:
      'Ti aiutiamo a trovare il mutuo più adatto alle tue esigenze grazie ai nostri partner finanziari.',
    icon: Calculator,
  },
  {
    titolo: 'Consulenza Tecnica',
    descrizione:
      'Supporto per pratiche catastali, certificazioni energetiche (APE) e regolarizzazioni urbanistiche.',
    icon: Wrench,
  },
  {
    titolo: 'Gestione Utenze',
    descrizione:
      'Assistenza completa per volture e subentri di luce, gas e acqua per un trasloco senza pensieri.',
    icon: Zap,
  },
];

export default function ServiziPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">I Nostri Servizi</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mt-4 mb-5 tracking-tight">
            Un supporto completo
          </h1>
          <p className="text-lg text-secondary/80 max-w-2xl mx-auto leading-relaxed">
            Per vendere, acquistare o affittare casa con sicurezza e serenità.
          </p>
        </div>

        <div className="mb-14 rounded-3xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10">
          <div className="bg-gradient-to-r from-secondary via-primary/95 to-primary text-white p-10 md:p-14">
            <p className="text-sm uppercase tracking-[0.25em] text-white/80 mb-3">Myzone Experience</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
              Un unico partner, zero stress operativo
            </h2>
            <p className="text-white/90 max-w-3xl text-lg leading-relaxed">
              Coordinamento tecnico, finanziario e burocratico in un flusso unico, con aggiornamenti costanti e una strategia personalizzata per il tuo immobile.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {servizi.map((servizio, index) => {
            const Icon = servizio.icon;
            return (
              <article
                key={servizio.titolo}
                className={`bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-md shadow-primary/10 hover:shadow-xl hover:shadow-primary/15 transition-all hover:border-primary/20 ${
                  index % 2 === 1 ? 'md:flex md:flex-row-reverse' : 'md:flex'
                }`}
              >
                <div className="md:w-2/5 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/5 p-10 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-white border border-primary/15 flex items-center justify-center text-primary shadow-lg group-hover:scale-105 transition-transform">
                    <Icon className="w-12 h-12" />
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Servizio</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">{servizio.titolo}</h2>
                  <p className="text-secondary/80 leading-relaxed text-lg">{servizio.descrizione}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-primary/10 bg-white p-10 md:p-14 text-center shadow-lg shadow-primary/10">
          <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Vuoi una consulenza su misura?</h3>
          <p className="text-secondary/80 mb-8 max-w-2xl mx-auto text-lg">
            Raccontaci il tuo obiettivo: ti proponiamo il percorso più efficace per vendere o valorizzare il tuo immobile.
          </p>
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
