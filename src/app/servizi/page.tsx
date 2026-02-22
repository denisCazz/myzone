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
    <div className="min-h-screen bg-white py-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">I Nostri Servizi</h1>
          <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
            Un supporto completo per vendere, acquistare o affittare casa con sicurezza e serenità.
          </p>
        </div>

        <div className="mb-12 rounded-3xl border border-primary/20 bg-gradient-to-r from-secondary to-primary text-white p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/80 mb-3">Myzone Experience</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Un unico partner, zero stress operativo</h2>
          <p className="text-white/85 max-w-3xl">
            Coordinamento tecnico, finanziario e burocratico in un flusso unico, con aggiornamenti costanti e una strategia personalizzata per il tuo immobile.
          </p>
        </div>

        <div className="space-y-6">
          {servizi.map((servizio, index) => {
            const Icon = servizio.icon;
            return (
              <article
                key={servizio.titolo}
                className={`bg-white rounded-2xl border border-primary/15 shadow-sm overflow-hidden ${
                  index % 2 === 1 ? 'md:flex md:flex-row-reverse' : 'md:flex'
                }`}
              >
                <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                    <Icon className="w-10 h-10" />
                  </div>
                </div>
                <div className="md:w-2/3 p-8 md:p-10">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-2">Servizio</p>
                  <h2 className="text-2xl font-bold text-secondary mb-3">{servizio.titolo}</h2>
                  <p className="text-secondary/80 leading-relaxed">{servizio.descrizione}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-primary/15 p-8 text-center bg-white">
          <h3 className="text-2xl font-bold text-secondary mb-3">Vuoi una consulenza su misura?</h3>
          <p className="text-secondary/80 mb-6">
            Raccontaci il tuo obiettivo: ti proponiamo il percorso più efficace per vendere o valorizzare il tuo immobile.
          </p>
          <Link
            href="/valuta-casa"
            className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors"
          >
            Richiedi Valutazione
          </Link>
        </div>
      </section>
    </div>
  );
}
