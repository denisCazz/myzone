"use client";

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createAnnuncioAction } from './actions';
import ImageUpload from '@/components/ImageUpload';

const initialState: { error: string; formData?: Record<string, string> } = { error: '' };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex justify-center py-2.5 px-5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Salvataggio...' : 'Salva Annuncio'}
    </button>
  );
}

const inputClass = "mt-1 w-full px-3 py-2.5 border border-primary/15 rounded-xl text-secondary bg-white placeholder:text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

export default function AdminNewForm() {
  const [state, formAction] = useActionState(createAnnuncioAction, initialState);

  return (
    <div className="bg-white rounded-2xl border border-primary/10 overflow-hidden shadow-sm">
      <div className="px-6 py-8 sm:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">+</div>
          <div>
            <h1 className="text-2xl font-bold text-secondary">Nuovo Annuncio</h1>
            <p className="text-sm text-secondary/70">Compila i campi per pubblicare l&apos;annuncio</p>
          </div>
        </div>

        {state.error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 mb-8 flex items-start gap-3">
            <span className="text-red-500 text-lg">!</span>
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}

        <form key={state.formData ? 'restored' : 'new'} action={formAction} className="space-y-8">
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Informazioni principali</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="titolo" className="block text-sm font-medium text-secondary mb-1">Titolo *</label>
                <input id="titolo" name="titolo" required className={inputClass} placeholder="Es. Appartamento luminoso in centro" defaultValue={state.formData?.titolo ?? ''} />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-secondary mb-1">Categoria *</label>
                <input id="categoria" name="categoria" defaultValue={state.formData?.categoria ?? 'RESIDENZIALE'} required className={inputClass} />
              </div>

              <div>
                <label htmlFor="tipologia_immobile" className="block text-sm font-medium text-secondary mb-1">Tipologia immobile *</label>
                <input id="tipologia_immobile" name="tipologia_immobile" placeholder="Casa indipendente" required className={inputClass} defaultValue={state.formData?.tipologia_immobile ?? ''} />
              </div>

              <div>
                <label htmlFor="tipo_contratto" className="block text-sm font-medium text-secondary mb-1">Tipo contratto *</label>
                <select id="tipo_contratto" name="tipo_contratto" defaultValue={state.formData?.tipo_contratto ?? 'IN VENDITA'} className={inputClass}>
                  <option value="IN VENDITA">IN VENDITA</option>
                  <option value="IN AFFITTO">IN AFFITTO</option>
                </select>
              </div>

              <div>
                <label htmlFor="stato" className="block text-sm font-medium text-secondary mb-1">Stato *</label>
                <select id="stato" name="stato" defaultValue={state.formData?.stato ?? 'DISPONIBILE'} className={inputClass}>
                  <option value="DISPONIBILE">DISPONIBILE</option>
                  <option value="IN TRATTATIVA">IN TRATTATIVA</option>
                  <option value="VENDUTO">VENDUTO</option>
                  <option value="AFFITTATO">AFFITTATO</option>
                </select>
              </div>

              <div>
                <label htmlFor="prezzo" className="block text-sm font-medium text-secondary mb-1">Prezzo (€) *</label>
                <input id="prezzo" name="prezzo" type="number" min="0" required className={inputClass} placeholder="0" defaultValue={state.formData?.prezzo ?? ''} />
              </div>

              <div className="sm:col-span-2">
                <ImageUpload name="immagine" label="Immagine di copertina" />
                <div className="mt-3">
                  <label htmlFor="immagine_url" className="block text-xs font-medium text-secondary/60 mb-1">Oppure URL immagine</label>
                  <input id="immagine_url" name="immagine_url" type="url" className={inputClass} placeholder="https://..." defaultValue={state.formData?.immagine_url ?? ''} />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="descrizione" className="block text-sm font-medium text-secondary mb-1">Descrizione *</label>
                <textarea id="descrizione" name="descrizione" rows={6} required className={inputClass} placeholder="Descrivi l'immobile..." defaultValue={state.formData?.descrizione ?? ''} />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Posizione</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-secondary mb-1">Provincia *</label>
                <input id="provincia" name="provincia" defaultValue={state.formData?.provincia ?? 'CUNEO'} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="comune" className="block text-sm font-medium text-secondary mb-1">Comune *</label>
                <input id="comune" name="comune" required className={inputClass} placeholder="Cavallermaggiore" defaultValue={state.formData?.comune ?? ''} />
              </div>
              <div>
                <label htmlFor="indirizzo" className="block text-sm font-medium text-secondary mb-1">Indirizzo *</label>
                <input id="indirizzo" name="indirizzo" required className={inputClass} placeholder="Via Roma 1" defaultValue={state.formData?.indirizzo ?? ''} />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Caratteristiche</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="numero_locali" className="block text-sm font-medium text-secondary mb-1">Numero locali *</label>
                <input id="numero_locali" name="numero_locali" type="number" min="0" defaultValue={state.formData?.numero_locali ?? 0} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="superficie_mq" className="block text-sm font-medium text-secondary mb-1">Superficie m² *</label>
                <input id="superficie_mq" name="superficie_mq" type="number" min="0" defaultValue={state.formData?.superficie_mq ?? 0} required className={inputClass} />
              </div>
              <div>
                <label htmlFor="bagni" className="block text-sm font-medium text-secondary mb-1">Bagni</label>
                <input id="bagni" name="bagni" type="number" min="0" defaultValue={state.formData?.bagni ?? 0} className={inputClass} />
              </div>
              <div>
                <label htmlFor="piano" className="block text-sm font-medium text-secondary mb-1">Piano</label>
                <input id="piano" name="piano" placeholder="--" className={inputClass} defaultValue={state.formData?.piano ?? ''} />
              </div>
              <div>
                <label htmlFor="ape" className="block text-sm font-medium text-secondary mb-1">APE</label>
                <input id="ape" name="ape" className={inputClass} defaultValue={state.formData?.ape ?? ''} />
              </div>
              <div>
                <label htmlFor="ipe" className="block text-sm font-medium text-secondary mb-1">IPE</label>
                <input id="ipe" name="ipe" type="number" min="0" step="0.01" className={inputClass} defaultValue={state.formData?.ipe ?? ''} />
              </div>
              <div>
                <label htmlFor="riscaldamento" className="block text-sm font-medium text-secondary mb-1">Riscaldamento</label>
                <input id="riscaldamento" name="riscaldamento" className={inputClass} defaultValue={state.formData?.riscaldamento ?? ''} />
              </div>
              <div>
                <label htmlFor="tipo_riscaldamento" className="block text-sm font-medium text-secondary mb-1">Tipo riscaldamento</label>
                <input id="tipo_riscaldamento" name="tipo_riscaldamento" className={inputClass} defaultValue={state.formData?.tipo_riscaldamento ?? ''} />
              </div>
              <div>
                <label htmlFor="sistema_radiante" className="block text-sm font-medium text-secondary mb-1">Sistema radiante</label>
                <input id="sistema_radiante" name="sistema_radiante" className={inputClass} defaultValue={state.formData?.sistema_radiante ?? ''} />
              </div>
              <div>
                <label htmlFor="cucina" className="block text-sm font-medium text-secondary mb-1">Cucina</label>
                <input id="cucina" name="cucina" className={inputClass} defaultValue={state.formData?.cucina ?? ''} />
              </div>
              <div>
                <label htmlFor="box" className="block text-sm font-medium text-secondary mb-1">Box</label>
                <input id="box" name="box" className={inputClass} defaultValue={state.formData?.box ?? ''} />
              </div>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              <label className="inline-flex items-center gap-2.5 text-sm text-secondary cursor-pointer">
                <input type="checkbox" name="giardino" defaultChecked={state.formData?.giardino === 'on'} className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary/30" />
                Giardino
              </label>
              <label className="inline-flex items-center gap-2.5 text-sm text-secondary cursor-pointer">
                <input type="checkbox" name="terrazzo" defaultChecked={state.formData?.terrazzo === 'on'} className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary/30" />
                Terrazzo
              </label>
              <label className="inline-flex items-center gap-2.5 text-sm text-secondary cursor-pointer">
                <input type="checkbox" name="ascensore" defaultChecked={state.formData?.ascensore === 'on'} className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary/30" />
                Ascensore
              </label>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-secondary">Agenzia di riferimento</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="agenzia_nome" className="block text-sm font-medium text-secondary mb-1">Nome agenzia</label>
                <input id="agenzia_nome" name="agenzia_nome" className={inputClass} defaultValue={state.formData?.agenzia_nome ?? ''} />
              </div>
              <div>
                <label htmlFor="agenzia_telefono" className="block text-sm font-medium text-secondary mb-1">Telefono</label>
                <input id="agenzia_telefono" name="agenzia_telefono" className={inputClass} defaultValue={state.formData?.agenzia_telefono ?? ''} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="agenzia_indirizzo" className="block text-sm font-medium text-secondary mb-1">Indirizzo agenzia</label>
                <input id="agenzia_indirizzo" name="agenzia_indirizzo" className={inputClass} defaultValue={state.formData?.agenzia_indirizzo ?? ''} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="agenzia_email" className="block text-sm font-medium text-secondary mb-1">Email agenzia</label>
                <input id="agenzia_email" name="agenzia_email" type="email" className={inputClass} defaultValue={state.formData?.agenzia_email ?? ''} />
              </div>
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
