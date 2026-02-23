import { getSupabaseServerClient } from '@/lib/supabase-server';
import { Annuncio } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Maximize, MapPin, Building2 } from 'lucide-react';

// This is a Server Component
export default async function Vetrina() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-primary/15 p-10 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-secondary mb-3">Configurazione Supabase mancante</h1>
          <p className="text-secondary/80">
            Imposta <strong>NEXT_PUBLIC_SUPABASE_URL</strong> e <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong> nel file <strong>.env.local</strong>.
          </p>
        </div>
      </div>
    );
  }

  const { data: annunci, error } = await supabase
    .from('annunci')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching annunci:', error);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Selezione Myzone</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-5 tracking-tight">
            Vetrina Immobili
          </h1>
          <p className="text-lg text-secondary/80 max-w-2xl mx-auto leading-relaxed">
            Scopri le nostre migliori proposte immobiliari a Cavallermaggiore e dintorni.
          </p>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 mb-8 flex items-start gap-5 shadow-sm">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600 text-xl font-bold">!</div>
            <div>
              <p className="font-bold text-red-800 text-lg">Errore nel caricamento</p>
              <p className="text-red-700 mt-1">Si è verificato un errore nel caricamento degli annunci. Riprova più tardi.</p>
            </div>
          </div>
        ) : !annunci || annunci.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <p className="text-secondary/80 text-lg font-medium">Nessun annuncio disponibile al momento.</p>
            <p className="text-secondary/60 text-sm mt-2">Torna a controllare presto per nuove proposte.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {annunci.map((annuncio: Annuncio, i: number) => (
              <article
                key={annuncio.id}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col shadow-md shadow-primary/10 border border-primary/10 hover-lift animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative h-72 w-full bg-primary/5 overflow-hidden">
                  {annuncio.immagine_url ? (
                    <Image
                      src={annuncio.immagine_url}
                      alt={annuncio.titolo}
                      unoptimized
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <span className="text-primary/60 text-sm">Nessuna immagine</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg ${
                      annuncio.tipo_contratto === 'IN VENDITA' ? 'bg-primary' : 'bg-secondary'
                    }`}>
                      {annuncio.tipo_contratto}
                    </span>
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md ${
                      annuncio.stato === 'DISPONIBILE'
                        ? 'bg-white/95 text-secondary'
                        : annuncio.stato === 'IN TRATTATIVA'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-black/70 text-white'
                    }`}>
                      {annuncio.stato}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-secondary mb-3 line-clamp-2 min-h-[3.5rem] leading-snug">
                    {annuncio.titolo}
                  </h3>

                  <div className="flex items-start gap-2 text-secondary/75 text-sm mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="line-clamp-2">
                      {annuncio.provincia} · {annuncio.comune} · {annuncio.indirizzo}
                    </p>
                  </div>

                  <div className="text-2xl font-bold text-primary mb-5">
                    {formatPrice(annuncio.prezzo)}
                    {annuncio.tipo_contratto === 'IN AFFITTO' && (
                      <span className="text-sm text-secondary/60 font-normal ml-1">/mese</span>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-secondary/75 mb-6 py-4 border-y border-primary/10">
                    <div className="flex items-center gap-2">
                      <Maximize className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">{annuncio.superficie_mq} mq</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">{annuncio.numero_locali} locali</span>
                    </div>
                  </div>

                  {annuncio.agenzia_nome && (
                    <div className="flex items-center gap-2 text-secondary/70 text-sm mb-4">
                      <Building2 className="w-4 h-4" />
                      <span className="line-clamp-1">{annuncio.agenzia_nome}</span>
                    </div>
                  )}

                  <p className="text-secondary/75 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {annuncio.descrizione}
                  </p>

                  <Link
                    href={`/vetrina/${annuncio.id}`}
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all btn-glow"
                  >
                    Vedi dettagli
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
