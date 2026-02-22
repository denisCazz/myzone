import { supabase } from '@/lib/supabase';
import { Annuncio } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Maximize, Euro } from 'lucide-react';

// This is a Server Component
export default async function Vetrina() {
  // Fetch data from Supabase
  const { data: annunci, error } = await supabase
    .from('annunci')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching annunci:', error);
  }

  // Format price to EUR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 rounded-3xl border border-primary/15 p-8 md:p-10 bg-white">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Selezione Myzone</p>
          <h1 className="text-4xl font-bold text-secondary mb-4">Vetrina Immobili</h1>
          <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
            Scopri le nostre migliori proposte immobiliari a Cavallermaggiore e dintorni.
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Si è verificato un errore nel caricamento degli annunci. Riprova più tardi.
                </p>
              </div>
            </div>
          </div>
        ) : !annunci || annunci.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-primary/10">
            <p className="text-primary/70 text-lg">Nessun annuncio disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {annunci.map((annuncio: Annuncio) => (
              <div key={annuncio.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/15 overflow-hidden flex flex-col hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-64 w-full bg-primary/10">
                  {annuncio.immagine_url ? (
                    <Image
                      src={annuncio.immagine_url}
                      alt={annuncio.titolo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-primary/60">
                      Nessuna immagine
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${
                      annuncio.tipologia === 'vendita' ? 'bg-primary' : 'bg-secondary'
                    }`}>
                      {annuncio.tipologia === 'vendita' ? 'In Vendita' : 'In Affitto'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-secondary mb-2 line-clamp-2 min-h-[3.5rem]">
                    {annuncio.titolo}
                  </h3>
                  
                  <div className="text-2xl font-bold text-primary mb-4">
                    {formatPrice(annuncio.prezzo)}
                    {annuncio.tipologia === 'affitto' && <span className="text-sm text-primary/70 font-normal">/mese</span>}
                  </div>

                  <div className="flex items-center gap-4 text-secondary/80 mb-6 border-t border-b border-primary/15 py-4">
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span className="text-sm font-medium">{annuncio.mq} mq</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm font-medium">{annuncio.numero_stanze} locali</span>
                    </div>
                  </div>

                  <p className="text-secondary/80 text-sm line-clamp-3 mb-6 flex-grow">
                    {annuncio.descrizione}
                  </p>

                  <Link 
                    href={`/vetrina/${annuncio.id}`}
                    className="block w-full text-center bg-secondary text-white hover:bg-primary font-medium py-2.5 rounded-lg transition-colors border border-secondary hover:border-primary"
                  >
                    Dettagli
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
