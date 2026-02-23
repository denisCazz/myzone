import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import { Annuncio } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, LogOut, LayoutDashboard, ImageIcon, MapPin, Euro } from 'lucide-react';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin-auth';
import { deleteAnnuncioAction, logoutAction } from './actions';

export default async function AdminDashboard() {
  const session = await requireAdminSession();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    redirect('/admin/login');
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
    <div className="min-h-screen bg-white">
      {/* Header moderno */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary">Gestione Annunci</h1>
                <p className="text-sm text-secondary/60">{session.user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/nuovo"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm transition-colors shadow-sm shadow-primary/20"
              >
                <Plus className="w-4 h-4" />
                Nuovo Annuncio
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/15 text-secondary/75 hover:bg-primary/5 hover:text-secondary font-medium text-sm transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Esci
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-lg">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Errore nel caricamento</h3>
              <p className="text-sm text-red-700 mt-1">Si è verificato un errore nel caricamento degli annunci. Verifica la configurazione Supabase.</p>
            </div>
          </div>
        ) : !annunci || annunci.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-secondary mb-2">Nessun annuncio</h2>
            <p className="text-secondary/70 mb-8 max-w-sm mx-auto">Inizia aggiungendo il tuo primo annuncio immobiliare.</p>
            <Link
              href="/admin/nuovo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" />
              Crea annuncio
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {annunci.map((annuncio: Annuncio, i: number) => (
              <article
                key={annuncio.id}
                className="group bg-white rounded-2xl border border-primary/10 overflow-hidden hover:shadow-xl hover:shadow-primary/15 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative aspect-[4/3] bg-primary/5">
                  {annuncio.immagine_url ? (
                    <Image
                      src={annuncio.immagine_url}
                      alt={annuncio.titolo}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-primary/50">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                      annuncio.tipo_contratto === 'IN VENDITA' ? 'bg-primary text-white' : 'bg-secondary text-white'
                    }`}>
                      {annuncio.tipo_contratto}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                      annuncio.stato === 'DISPONIBILE'
                        ? 'bg-white/95 text-secondary'
                        : annuncio.stato === 'IN TRATTATIVA'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-black/60 text-white'
                    }`}>
                      {annuncio.stato}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-secondary line-clamp-2 mb-2 min-h-[2.5rem]">
                    {annuncio.titolo}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-secondary/70 mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{annuncio.comune} · {annuncio.indirizzo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-bold text-primary mb-4">
                    <Euro className="w-4 h-4" />
                    {formatPrice(annuncio.prezzo)}
                    {annuncio.tipo_contratto === 'IN AFFITTO' && (
                      <span className="text-sm font-normal text-secondary/60">/mese</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary/70 mb-5">
                    <span>{annuncio.superficie_mq} mq</span>
                    <span>·</span>
                    <span>{annuncio.numero_locali} locali</span>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                    <Link
                      href={`/vetrina/${annuncio.id}`}
                      target="_blank"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Visualizza
                    </Link>
                    <Link
                      href={`/admin/modifica/${annuncio.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium text-sm transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Modifica
                    </Link>
                    <form action={deleteAnnuncioAction} className="ml-auto">
                      <input type="hidden" name="id" value={annuncio.id} />
                      <button
                        type="submit"
                        onClick={(e) => {
                          if (!confirm('Eliminare questo annuncio?')) e.preventDefault();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium text-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Elimina
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
