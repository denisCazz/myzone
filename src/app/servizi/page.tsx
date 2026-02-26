import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import ServizioImage from '@/components/ServizioImage';

const servizi = [
  {
    titolo: 'Valutazioni',
    descrizione:
      "Valutazioni precise e realistiche del tuo immobile basate sull'andamento del mercato locale.",
    iconKey: 'valutazioni' as const,
    image: siteConfig.images.servizi.valutazioni,
  },
  {
    titolo: 'Consulenza Finanziaria',
    descrizione:
      'Ti aiutiamo a trovare il mutuo più adatto alle tue esigenze grazie ai nostri partner finanziari.',
    iconKey: 'consulenzaFinanziaria' as const,
    image: siteConfig.images.servizi.consulenzaFinanziaria,
  },
  {
    titolo: 'Consulenza Tecnica',
    descrizione:
      'Supporto per pratiche catastali, certificazioni energetiche (APE) e regolarizzazioni urbanistiche.',
    iconKey: 'consulenzaTecnica' as const,
    image: siteConfig.images.servizi.consulenzaTecnica,
  },
  {
    titolo: 'Gestione Utenze',
    descrizione:
      'Assistenza completa per volture e subentri di luce, gas e acqua per un trasloco senza pensieri.',
    iconKey: 'gestioneUtenze' as const,
    image: siteConfig.images.servizi.gestioneUtenze,
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

        <div className="mb-14 rounded-3xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10 hover-lift">
          <div className="bg-gradient-to-r from-secondary via-primary/95 to-primary text-white p-10 md:p-14">
            <p className="text-sm uppercase tracking-[0.25em] text-white/80 mb-3">MyZone Experience</p>
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
            const isReversed = index % 2 === 1;
            return (
              <article
                key={servizio.titolo}
                className={`rounded-2xl overflow-hidden shadow-xl shadow-primary/10 border border-primary/10 hover-lift ${
                  isReversed ? 'md:flex md:flex-row-reverse' : 'md:flex'
                }`}
              >
                {/* Area immagine - stile hero con overlay */}
                <div className="relative aspect-[16/10] md:aspect-auto md:w-2/5 md:min-h-[280px]">
                  <ServizioImage
                    src={servizio.image}
                    alt={servizio.titolo}
                    fallbackIconKey={servizio.iconKey}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/90 font-bold">Servizio</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-0 [text-shadow:_0_2px_8px_rgb(0_0_0_/_0.5)]">
                      {servizio.titolo}
                    </h2>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-2">Cosa offriamo</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4 md:hidden">{servizio.titolo}</h2>
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
            Valuta subito!
          </Link>
        </div>
      </section>
    </div>
  );
}
