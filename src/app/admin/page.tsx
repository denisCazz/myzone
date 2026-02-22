import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import { Annuncio } from '@/types';
import Link from 'next/link';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary">Gestione Annunci</h1>
            <p className="text-sm text-secondary/70 mt-1">Accesso come {session.user.email}</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/nuovo"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nuovo Annuncio
            </Link>
            <form action={logoutAction}>
              <button
                className="inline-flex items-center px-4 py-2 border border-secondary/20 rounded-md shadow-sm text-sm font-medium text-secondary bg-white hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <LogOut className="-ml-1 mr-2 h-5 w-5 text-secondary/60" aria-hidden="true" />
                Esci
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-secondary/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary/15">
              <thead className="bg-primary/5">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                    Titolo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                    Località
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                    Contratto/Stato
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                    Prezzo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                    Mq/Locali
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Azioni</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary/10">
                {annunci?.map((annuncio: Annuncio) => (
                  <tr key={annuncio.id} className="hover:bg-primary/5">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-secondary">{annuncio.titolo}</div>
                      <div className="text-xs text-secondary/65 mt-1">{annuncio.tipologia_immobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-secondary">{annuncio.comune}</div>
                      <div className="text-xs text-secondary/65">{annuncio.indirizzo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary/65">
                      <div className="text-sm text-secondary">{annuncio.tipo_contratto}</div>
                      <div className="text-xs text-secondary/65">{annuncio.stato}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary/70">
                      {formatPrice(annuncio.prezzo)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary/70">
                      {annuncio.superficie_mq} mq • {annuncio.numero_locali} locali
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/modifica/${annuncio.id}`} className="text-primary hover:text-primary/80">
                          <Edit className="h-5 w-5" />
                        </Link>
                        <form action={deleteAnnuncioAction}>
                          <input type="hidden" name="id" value={annuncio.id} />
                          <button className="text-primary/75 hover:text-primary">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!annunci || annunci.length === 0) && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-secondary/65">
                      Nessun annuncio presente. Clicca su "Nuovo Annuncio" per iniziare.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
