"use client";

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateAnnuncioAction } from './actions';
import ImageUpload from '@/components/ImageUpload';

type AnnuncioForm = {
  id: string;
  titolo: string;
  descrizione: string;
  prezzo: number;
  provincia: string;
  comune: string;
  indirizzo: string;
  categoria: string;
  tipologia_immobile: string;
  tipo_contratto: 'IN VENDITA' | 'IN AFFITTO';
  stato: 'DISPONIBILE' | 'IN TRATTATIVA' | 'VENDUTO' | 'AFFITTATO';
  numero_locali: number;
  superficie_mq: number;
  piano: string | null;
  bagni: number;
  ape: string | null;
  ipe: number | null;
  riscaldamento: string | null;
  tipo_riscaldamento: string | null;
  sistema_radiante: string | null;
  cucina: string | null;
  box: string | null;
  giardino: boolean;
  terrazzo: boolean;
  ascensore: boolean;
  agenzia_nome: string | null;
  agenzia_indirizzo: string | null;
  agenzia_telefono: string | null;
  agenzia_email: string | null;
  immagine_url: string | null;
};

const initialState: { error: string; formData?: Record<string, string> } = { error: '' };

const inputClass = "mt-1 w-full px-3 py-2.5 border border-primary/15 rounded-xl text-secondary bg-white placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex justify-center py-2.5 px-5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Salvataggio...' : 'Salva Modifiche'}
    </button>
  );
}

export default function EditAnnuncioForm({ annuncio }: { annuncio: AnnuncioForm }) {
  const [state, formAction] = useActionState(updateAnnuncioAction.bind(null, annuncio.id), initialState);

  return (
    <div className="bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm">
      <div className="px-6 py-8 sm:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">✎</div>
          <div>
            <h1 className="text-2xl font-bold text-secondary">Modifica Annuncio</h1>
            <p className="text-sm text-secondary/70">Aggiorna i dati dell&apos;annuncio</p>
          </div>
        </div>

        {state.error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 mb-8 flex items-start gap-3">
            <span className="text-red-500 text-lg">!</span>
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}

        <form key={state.formData ? 'restored' : annuncio.id} action={formAction} className="space-y-8">
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Informazioni principali</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="titolo" className="block text-sm font-medium text-secondary mb-1">Titolo *</label>
                <input id="titolo" name="titolo" required defaultValue={state.formData?.titolo ?? annuncio.titolo} className={inputClass} />
              </div>
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-secondary mb-1">Categoria *</label>
                <input id="categoria" name="categoria" required defaultValue={state.formData?.categoria ?? annuncio.categoria} className={inputClass} />
              </div>
              <div>
                <label htmlFor="tipologia_immobile" className="block text-sm font-medium text-secondary mb-1">Tipologia immobile *</label>
                <input id="tipologia_immobile" name="tipologia_immobile" required defaultValue={state.formData?.tipologia_immobile ?? annuncio.tipologia_immobile} className={inputClass} />
              </div>
              <div>
                <label htmlFor="tipo_contratto" className="block text-sm font-medium text-secondary mb-1">Tipo contratto *</label>
                <select id="tipo_contratto" name="tipo_contratto" defaultValue={state.formData?.tipo_contratto ?? annuncio.tipo_contratto} className={inputClass}>
                  <option value="IN VENDITA">IN VENDITA</option>
                  <option value="IN AFFITTO">IN AFFITTO</option>
                </select>
              </div>
              <div>
                <label htmlFor="stato" className="block text-sm font-medium text-secondary mb-1">Stato *</label>
                <select id="stato" name="stato" defaultValue={state.formData?.stato ?? annuncio.stato} className={inputClass}>
                  <option value="DISPONIBILE">DISPONIBILE</option>
                  <option value="IN TRATTATIVA">IN TRATTATIVA</option>
                  <option value="VENDUTO">VENDUTO</option>
                  <option value="AFFITTATO">AFFITTATO</option>
                </select>
              </div>
              <div>
                <label htmlFor="prezzo" className="block text-sm font-medium text-secondary mb-1">Prezzo (€) *</label>
                <input id="prezzo" name="prezzo" type="number" min="0" required defaultValue={state.formData?.prezzo ?? annuncio.prezzo} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <ImageUpload name="immagine" currentUrl={annuncio.immagine_url} label="Immagine di copertina" />
                <div className="mt-3">
                  <label htmlFor="immagine_url" className="block text-xs font-medium text-secondary/60 mb-1">Oppure URL immagine</label>
                  <input id="immagine_url" name="immagine_url" type="url" defaultValue={state.formData?.immagine_url ?? annuncio.immagine_url ?? ''} className={inputClass} placeholder="https://..." />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="descrizione" className="block text-sm font-medium text-secondary mb-1">Descrizione *</label>
                <textarea id="descrizione" name="descrizione" rows={6} required defaultValue={state.formData?.descrizione ?? annuncio.descrizione} className={inputClass} />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Posizione</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-secondary mb-1">Provincia *</label>
                <input id="provincia" name="provincia" required defaultValue={state.formData?.provincia ?? annuncio.provincia} className={inputClass} />
              </div>
              <div>
                <label htmlFor="comune" className="block text-sm font-medium text-secondary mb-1">Comune *</label>
                <input id="comune" name="comune" required defaultValue={state.formData?.comune ?? annuncio.comune} className={inputClass} />
              </div>
              <div>
                <label htmlFor="indirizzo" className="block text-sm font-medium text-secondary mb-1">Indirizzo *</label>
                <input id="indirizzo" name="indirizzo" required defaultValue={state.formData?.indirizzo ?? annuncio.indirizzo} className={inputClass} />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Caratteristiche</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div><label htmlFor="numero_locali" className="block text-sm font-medium text-secondary mb-1">Numero locali *</label><input id="numero_locali" name="numero_locali" type="number" min="0" required defaultValue={state.formData?.numero_locali ?? annuncio.numero_locali} className={inputClass} /></div>
              <div><label htmlFor="superficie_mq" className="block text-sm font-medium text-secondary mb-1">Superficie m² *</label><input id="superficie_mq" name="superficie_mq" type="number" min="0" required defaultValue={state.formData?.superficie_mq ?? annuncio.superficie_mq} className={inputClass} /></div>
              <div><label htmlFor="bagni" className="block text-sm font-medium text-secondary mb-1">Bagni</label><input id="bagni" name="bagni" type="number" min="0" defaultValue={state.formData?.bagni ?? annuncio.bagni} className={inputClass} /></div>
              <div><label htmlFor="piano" className="block text-sm font-medium text-secondary mb-1">Piano</label><input id="piano" name="piano" defaultValue={state.formData?.piano ?? annuncio.piano ?? ''} className={inputClass} /></div>
              <div><label htmlFor="ape" className="block text-sm font-medium text-secondary mb-1">APE</label><input id="ape" name="ape" defaultValue={state.formData?.ape ?? annuncio.ape ?? ''} className={inputClass} /></div>
              <div><label htmlFor="ipe" className="block text-sm font-medium text-secondary mb-1">IPE</label><input id="ipe" name="ipe" type="number" min="0" step="0.01" defaultValue={state.formData?.ipe ?? annuncio.ipe ?? 0} className={inputClass} /></div>
              <div><label htmlFor="riscaldamento" className="block text-sm font-medium text-secondary mb-1">Riscaldamento</label><input id="riscaldamento" name="riscaldamento" defaultValue={state.formData?.riscaldamento ?? annuncio.riscaldamento ?? ''} className={inputClass} /></div>
              <div><label htmlFor="tipo_riscaldamento" className="block text-sm font-medium text-secondary mb-1">Tipo riscaldamento</label><input id="tipo_riscaldamento" name="tipo_riscaldamento" defaultValue={state.formData?.tipo_riscaldamento ?? annuncio.tipo_riscaldamento ?? ''} className={inputClass} /></div>
              <div><label htmlFor="sistema_radiante" className="block text-sm font-medium text-secondary mb-1">Sistema radiante</label><input id="sistema_radiante" name="sistema_radiante" defaultValue={state.formData?.sistema_radiante ?? annuncio.sistema_radiante ?? ''} className={inputClass} /></div>
              <div><label htmlFor="cucina" className="block text-sm font-medium text-secondary mb-1">Cucina</label><input id="cucina" name="cucina" defaultValue={state.formData?.cucina ?? annuncio.cucina ?? ''} className={inputClass} /></div>
              <div><label htmlFor="box" className="block text-sm font-medium text-secondary mb-1">Box</label><input id="box" name="box" defaultValue={state.formData?.box ?? annuncio.box ?? ''} className={inputClass} /></div>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="inline-flex items-center gap-2.5 text-sm text-secondary cursor-pointer">
                <input type="checkbox" name="giardino" defaultChecked={state.formData ? state.formData.giardino === 'on' : annuncio.giardino} className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary/30" />
                Giardino
              </label>
              <label className="inline-flex items-center gap-2.5 text-sm text-secondary cursor-pointer">
                <input type="checkbox" name="terrazzo" defaultChecked={state.formData ? state.formData.terrazzo === 'on' : annuncio.terrazzo} className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary/30" />
                Terrazzo
              </label>
              <label className="inline-flex items-center gap-2.5 text-sm text-secondary cursor-pointer">
                <input type="checkbox" name="ascensore" defaultChecked={state.formData ? state.formData.ascensore === 'on' : annuncio.ascensore} className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary/30" />
                Ascensore
              </label>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Agenzia di riferimento</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div><label htmlFor="agenzia_nome" className="block text-sm font-medium text-secondary mb-1">Nome agenzia</label><input id="agenzia_nome" name="agenzia_nome" defaultValue={state.formData?.agenzia_nome ?? annuncio.agenzia_nome ?? ''} className={inputClass} /></div>
              <div><label htmlFor="agenzia_telefono" className="block text-sm font-medium text-secondary mb-1">Telefono</label><input id="agenzia_telefono" name="agenzia_telefono" defaultValue={state.formData?.agenzia_telefono ?? annuncio.agenzia_telefono ?? ''} className={inputClass} /></div>
              <div className="sm:col-span-2"><label htmlFor="agenzia_indirizzo" className="block text-sm font-medium text-secondary mb-1">Indirizzo agenzia</label><input id="agenzia_indirizzo" name="agenzia_indirizzo" defaultValue={state.formData?.agenzia_indirizzo ?? annuncio.agenzia_indirizzo ?? ''} className={inputClass} /></div>
              <div className="sm:col-span-2"><label htmlFor="agenzia_email" className="block text-sm font-medium text-secondary mb-1">Email agenzia</label><input id="agenzia_email" name="agenzia_email" type="email" defaultValue={state.formData?.agenzia_email ?? annuncio.agenzia_email ?? ''} className={inputClass} /></div>
            </div>
          </section>

          <div className="pt-8 border-t border-primary/10 flex flex-wrap justify-end gap-3">
            <Link href="/admin" className="px-5 py-2.5 rounded-xl border border-primary/15 text-secondary/75 hover:bg-primary/5 font-medium text-sm transition-colors">
              Annulla
            </Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
