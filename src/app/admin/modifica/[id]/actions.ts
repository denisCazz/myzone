"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

const STORAGE_BUCKET = 'annunci-images';

type UpdateState = {
  error: string;
};

async function uploadImageToStorage(supabase: ReturnType<typeof getSupabaseAdminClient>, file: File): Promise<string | null> {
  if (!file || file.size === 0 || file.size > 5 * 1024 * 1024) return null;
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return null;
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const { data, error } = await supabase!.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return null;
  const { data: urlData } = supabase!.storage.from(STORAGE_BUCKET).getPublicUrl(data.path);
  return urlData.publicUrl;
}

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
  let immagineUrl = String(formData.get('immagine_url') || '').trim();
  const file = formData.get('immagine') as File | null;
  if (file && file.size > 0) {
    const uploadedUrl = await uploadImageToStorage(supabase, file);
    if (uploadedUrl) immagineUrl = uploadedUrl;
  }
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

  if (prezzo <= 0) {
    return { error: 'Il prezzo deve essere maggiore di 0.' };
  }

  const superficieMqInt = Math.round(superficieMq) || 0;
  const numeroLocaliInt = Math.round(numeroLocali) || 0;
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
      mq: superficieMqInt,
      superficie_mq: superficieMqInt,
      numero_stanze: numeroLocaliInt,
      numero_locali: numeroLocaliInt,
      piano: piano || null,
      bagni: Math.round(bagni) || 0,
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
    console.error('Supabase update error:', error);
    return { error: 'Errore durante l’modifica.' };
  }

  revalidatePath('/admin');
  revalidatePath('/vetrina');
  revalidatePath(`/vetrina/${id}`);
  redirect('/admin');
}
