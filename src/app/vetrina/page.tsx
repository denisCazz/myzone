import { getSupabaseServerClient } from '@/lib/supabase-server';
import { Annuncio } from '@/types';
import { MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import VetrinaFiltri from '@/components/VetrinaFiltri';

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

  const comuni = [...new Set((annunci || []).map((a: Annuncio) => a.comune).filter(Boolean))].sort();

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        badge="Selezione Myzone"
        title="Vetrina Immobili"
        subtitle="Scopri le nostre migliori proposte immobiliari a Cavallermaggiore e dintorni."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <VetrinaFiltri annunci={annunci} comuni={comuni} />
        )}
      </div>
    </div>
  );
}
