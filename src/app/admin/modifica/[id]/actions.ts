"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

type UpdateState = {
  error: string;
};

export async function updateAnnuncioAction(id: string, _: UpdateState, formData: FormData): Promise<UpdateState> {
  await requireAdminSession();

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return { error: 'Configurazione server Supabase mancante.' };
  }

  const titolo = String(formData.get('titolo') || '').trim();
  const descrizione = String(formData.get('descrizione') || '').trim();
  const categoria = String(formData.get('categoria') || '').trim() || 'RESIDENZIALE';
  const tipologiaImmobile = String(formData.get('tipologia_immobile') || '').trim();
  const tipoContratto = String(formData.get('tipo_contratto') || '').trim();
  const stato = String(formData.get('stato') || '').trim() || 'DISPONIBILE';
  const provincia = String(formData.get('provincia') || '').trim();
  const comune = String(formData.get('comune') || '').trim();
  const indirizzo = String(formData.get('indirizzo') || '').trim();
  const immagineUrl = String(formData.get('immagine_url') || '').trim();
  const piano = String(formData.get('piano') || '').trim();
  const ape = String(formData.get('ape') || '').trim();
  const riscaldamento = String(formData.get('riscaldamento') || '').trim();
  const tipoRiscaldamento = String(formData.get('tipo_riscaldamento') || '').trim();
  const sistemaRadiante = String(formData.get('sistema_radiante') || '').trim();
  const cucina = String(formData.get('cucina') || '').trim();
  const box = String(formData.get('box') || '').trim();
  const agenziaNome = String(formData.get('agenzia_nome') || '').trim();
  const agenziaIndirizzo = String(formData.get('agenzia_indirizzo') || '').trim();
  const agenziaTelefono = String(formData.get('agenzia_telefono') || '').trim();
  const agenziaEmail = String(formData.get('agenzia_email') || '').trim();

  const prezzo = Number(formData.get('prezzo') || 0);
  const superficieMq = Number(formData.get('superficie_mq') || 0);
  const numeroLocali = Number(formData.get('numero_locali') || 0);
  const bagni = Number(formData.get('bagni') || 0);
  const ipe = Number(formData.get('ipe') || 0);

  const giardino = formData.get('giardino') === 'on';
  const terrazzo = formData.get('terrazzo') === 'on';
  const ascensore = formData.get('ascensore') === 'on';

  if (!titolo || !descrizione || !tipologiaImmobile || !provincia || !comune || !indirizzo) {
    return { error: 'Compila correttamente i campi obbligatori.' };
  }

  if (!['IN VENDITA', 'IN AFFITTO'].includes(tipoContratto)) {
    return { error: 'Tipo contratto non valido.' };
  }

  const { error } = await supabase
    .from('annunci')
    .update({
      titolo,
      descrizione,
      prezzo,
      categoria,
      tipologia_immobile: tipologiaImmobile,
      tipo_contratto: tipoContratto,
      stato,
      provincia,
      comune,
      indirizzo,
      superficie_mq: superficieMq,
      numero_locali: numeroLocali,
      piano: piano || null,
      bagni,
      ape: ape || null,
      ipe: ipe > 0 ? ipe : null,
      riscaldamento: riscaldamento || null,
      tipo_riscaldamento: tipoRiscaldamento || null,
      sistema_radiante: sistemaRadiante || null,
      cucina: cucina || null,
      box: box || null,
      giardino,
      terrazzo,
      ascensore,
      agenzia_nome: agenziaNome || null,
      agenzia_indirizzo: agenziaIndirizzo || null,
      agenzia_telefono: agenziaTelefono || null,
      agenzia_email: agenziaEmail || null,
      immagine_url: immagineUrl || null,
    })
    .eq('id', id);

  if (error) {
    return { error: 'Errore durante l’aggiornamento annuncio.' };
  }

  revalidatePath('/admin');
  revalidatePath('/vetrina');
  revalidatePath(`/vetrina/${id}`);
  redirect('/admin');
}
