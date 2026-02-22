import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import EditAnnuncioForm from './EditAnnuncioForm';

export default async function ModificaAnnuncioPage({ params }: { params: { id: string } }) {
  await requireAdminSession();

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    notFound();
  }

  const { data: annuncio } = await supabase
    .from('annunci')
    .select('id, titolo, descrizione, prezzo, provincia, comune, indirizzo, categoria, tipologia_immobile, tipo_contratto, stato, numero_locali, superficie_mq, piano, bagni, ape, ipe, riscaldamento, tipo_riscaldamento, sistema_radiante, cucina, box, giardino, terrazzo, ascensore, agenzia_nome, agenzia_indirizzo, agenzia_telefono, agenzia_email, immagine_url')
    .eq('id', params.id)
    .single();

  if (!annuncio) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center text-secondary hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna alla dashboard
        </Link>

        <EditAnnuncioForm annuncio={annuncio} />
      </div>
    </div>
  );
}
