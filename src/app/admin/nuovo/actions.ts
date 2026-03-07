"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';
import { parseExistingImagesJson, parseImageUrlsFromText, MAX_ANNUNCIO_IMAGES, normalizeImageUrls } from '@/lib/annuncio-images';
import { getCloudflareR2ConfigStatus, uploadImagesToCloudflareR2 } from '@/lib/cloudflare-images';

export type CreateState = {
  error: string;
  formData?: Record<string, string>;
};

function formDataToObject(formData: FormData): Record<string, string> {
  const obj: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (typeof value === 'string') obj[key] = value;
  });
  return obj;
}

export async function createAnnuncioAction(_: CreateState, formData: FormData): Promise<CreateState> {
  await requireAdminSession();

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return { error: 'Configurazione server Supabase mancante.', formData: formDataToObject(formData) };
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
  const existingImages = parseExistingImagesJson(formData.get('existing_image_urls'));
  const manualImages = parseImageUrlsFromText(String(formData.get('manual_image_urls') || ''));
  const uploadFiles = formData.getAll('immagini').filter((value): value is File => value instanceof File && value.size > 0);
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
    return { error: 'Compila correttamente i campi obbligatori.', formData: formDataToObject(formData) };
  }

  if (!['IN VENDITA', 'IN AFFITTO'].includes(tipoContratto)) {
    return { error: 'Tipo contratto non valido.', formData: formDataToObject(formData) };
  }

  if (prezzo <= 0) {
    return { error: 'Il prezzo deve essere maggiore di 0.', formData: formDataToObject(formData) };
  }

  if (existingImages.length + manualImages.length + uploadFiles.length > MAX_ANNUNCIO_IMAGES) {
    return { error: `Puoi salvare al massimo ${MAX_ANNUNCIO_IMAGES} immagini per annuncio.`, formData: formDataToObject(formData) };
  }

  if (uploadFiles.length > 0) {
    const cloudflareConfig = getCloudflareR2ConfigStatus();
    if (!cloudflareConfig.hasAccountId || !cloudflareConfig.hasAccessKeyId || !cloudflareConfig.hasSecretAccessKey || !cloudflareConfig.hasBucketName || !cloudflareConfig.hasPublicUrl) {
      return {
        error: 'Configurazione Cloudflare R2 mancante. Inserisci account ID, chiavi R2, bucket e URL pubblico.',
        formData: formDataToObject(formData),
      };
    }
  }

  let uploadedImages: string[] = [];

  try {
    uploadedImages = await uploadImagesToCloudflareR2(uploadFiles);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore durante l\'upload immagini su Cloudflare R2.';
    return { error: message, formData: formDataToObject(formData) };
  }

  const immaginiUrls = normalizeImageUrls([...existingImages, ...manualImages, ...uploadedImages]);
  const immagineUrl = immaginiUrls[0] || null;

  const superficieMqInt = Math.round(superficieMq) || 0;
  const tipologia = tipoContratto === 'IN AFFITTO' ? 'affitto' : 'vendita';
  const { error } = await supabase.from('annunci').insert({
    titolo,
    descrizione,
    prezzo,
    categoria,
    tipologia,
    tipologia_immobile: tipologiaImmobile,
    tipo_contratto: tipoContratto,
    stato,
    provincia,
    comune,
    indirizzo,
    mq: superficieMqInt,
    superficie_mq: superficieMqInt,
    numero_stanze: Math.round(numeroLocali) || 0,
    numero_locali: Math.round(numeroLocali) || 0,
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
    immagine_url: immagineUrl,
    immagini_urls: immaginiUrls,
  });

  if (error) {
    console.error('Supabase insert error:', error);
    const msg = error.message || 'Errore durante il salvataggio annuncio.';
    return { error: msg, formData: formDataToObject(formData) };
  }

  revalidatePath('/admin');
  revalidatePath('/vetrina');
  redirect('/admin');
}
