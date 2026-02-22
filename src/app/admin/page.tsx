import { supabase } from '@/lib/supabase';
import { Annuncio } from '@/types';
import Link from 'next/link';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  // In a real app, you'd check the session here
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session) redirect('/admin/login');

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
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">Gestione Annunci</h1>
          <div className="flex gap-4">
            <Link
              href="/admin/nuovo"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nuovo Annuncio
            </Link>
            <button
              className="inline-flex items-center px-4 py-2 border border-black/20 rounded-md shadow-sm text-sm font-medium text-secondary bg-white hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <LogOut className="-ml-1 mr-2 h-5 w-5 text-black/60" aria-hidden="true" />
              Esci
            </button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-black/20">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-black/15">
              <thead className="bg-black/5">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                    Titolo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                    Tipologia
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                    Prezzo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black/60 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Azioni</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-black/10">
                {annunci?.map((annuncio: Annuncio) => (
                  <tr key={annuncio.id} className="hover:bg-black/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-secondary">{annuncio.titolo}</div>
                      <div className="text-sm text-black/60">{annuncio.mq} mq • {annuncio.numero_stanze} locali</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        annuncio.tipologia === 'vendita' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {annuncio.tipologia}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black/60">
                      {formatPrice(annuncio.prezzo)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black/60">
                      {new Date(annuncio.created_at || '').toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link href={`/admin/modifica/${annuncio.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!annunci || annunci.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-black/60">
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
