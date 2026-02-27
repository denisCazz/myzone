import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import EditAnnuncioForm from './EditAnnuncioForm';

export default async function ModificaAnnuncioPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    notFound();
  }

  const { data: annuncio } = await supabase
    .from('annunci')
    .select('id, titolo, descrizione, prezzo, provincia, comune, indirizzo, categoria, tipologia_immobile, tipo_contratto, stato, numero_locali, superficie_mq, piano, bagni, ape, ipe, riscaldamento, tipo_riscaldamento, sistema_radiante, cucina, box, giardino, terrazzo, ascensore, agenzia_nome, agenzia_indirizzo, agenzia_telefono, agenzia_email, immagine_url')
    .eq('id', id)
    .single();

  if (!annuncio) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin" className="inline-flex items-center gap-2 text-secondary/75 hover:text-primary mb-8 transition-colors font-medium text-sm">
          <ArrowLeft className="w-4 h-4" />
          Torna alla dashboard
        </Link>

        <EditAnnuncioForm annuncio={annuncio} />
      </div>
    </div>
  );
}
