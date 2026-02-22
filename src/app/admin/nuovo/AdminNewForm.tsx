"use client";

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createAnnuncioAction } from './actions';

const initialState = { error: '' };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Salvataggio...' : 'Salva Annuncio'}
    </button>
  );
}

export default function AdminNewForm() {
  const [state, formAction] = useActionState(createAnnuncioAction, initialState);

  return (
    <div className="bg-white shadow-sm rounded-xl border border-secondary/20 overflow-hidden">
      <div className="px-6 py-8 sm:p-10">
        <h1 className="text-3xl font-bold text-secondary mb-8">Nuovo Annuncio</h1>

        {state.error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <p className="text-sm text-red-700">{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-8 [&_input]:text-secondary [&_input]:bg-white [&_input]:placeholder:text-secondary/45 [&_select]:text-secondary [&_select]:bg-white [&_textarea]:text-secondary [&_textarea]:bg-white [&_textarea]:placeholder:text-secondary/45">
          <section>
            <h2 className="text-lg font-semibold text-secondary mb-4">Informazioni principali</h2>
            <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="titolo" className="block text-sm font-medium text-secondary">Titolo *</label>
                <input id="titolo" name="titolo" required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-secondary">Categoria *</label>
                <input id="categoria" name="categoria" defaultValue="RESIDENZIALE" required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
              </div>

              <div>
                <label htmlFor="tipologia_immobile" className="block text-sm font-medium text-secondary">Tipologia immobile *</label>
                <input id="tipologia_immobile" name="tipologia_immobile" placeholder="Casa indipendente" required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
              </div>

              <div>
                <label htmlFor="tipo_contratto" className="block text-sm font-medium text-secondary">Tipo contratto *</label>
                <select id="tipo_contratto" name="tipo_contratto" defaultValue="IN VENDITA" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="IN VENDITA">IN VENDITA</option>
                  <option value="IN AFFITTO">IN AFFITTO</option>
                </select>
              </div>

              <div>
                <label htmlFor="stato" className="block text-sm font-medium text-secondary">Stato *</label>
                <select id="stato" name="stato" defaultValue="DISPONIBILE" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="DISPONIBILE">DISPONIBILE</option>
                  <option value="IN TRATTATIVA">IN TRATTATIVA</option>
                  <option value="VENDUTO">VENDUTO</option>
                  <option value="AFFITTATO">AFFITTATO</option>
                </select>
              </div>

              <div>
                <label htmlFor="prezzo" className="block text-sm font-medium text-secondary">Prezzo (€) *</label>
                <input id="prezzo" name="prezzo" type="number" min="0" required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
              </div>

              <div>
                <label htmlFor="immagine_url" className="block text-sm font-medium text-secondary">URL immagine</label>
                <input id="immagine_url" name="immagine_url" type="url" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="descrizione" className="block text-sm font-medium text-secondary">Descrizione *</label>
                <textarea id="descrizione" name="descrizione" rows={6} required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-secondary mb-4">Posizione</h2>
            <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-3">
              <div>
                <label htmlFor="provincia" className="block text-sm font-medium text-secondary">Provincia *</label>
                <input id="provincia" name="provincia" defaultValue="CUNEO" required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="comune" className="block text-sm font-medium text-secondary">Comune *</label>
                <input id="comune" name="comune" required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="indirizzo" className="block text-sm font-medium text-secondary">Indirizzo *</label>
                <input id="indirizzo" name="indirizzo" required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-secondary mb-4">Caratteristiche</h2>
            <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-3">
              <div>
                <label htmlFor="numero_locali" className="block text-sm font-medium text-secondary">Numero locali *</label>
                <input id="numero_locali" name="numero_locali" type="number" min="0" defaultValue={0} required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="superficie_mq" className="block text-sm font-medium text-secondary">Superficie m² *</label>
                <input id="superficie_mq" name="superficie_mq" type="number" min="0" defaultValue={0} required className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="bagni" className="block text-sm font-medium text-secondary">Bagni</label>
                <input id="bagni" name="bagni" type="number" min="0" defaultValue={0} className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>

              <div>
                <label htmlFor="piano" className="block text-sm font-medium text-secondary">Piano</label>
                <input id="piano" name="piano" placeholder="--" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="ape" className="block text-sm font-medium text-secondary">APE</label>
                <input id="ape" name="ape" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="ipe" className="block text-sm font-medium text-secondary">IPE</label>
                <input id="ipe" name="ipe" type="number" min="0" step="0.01" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>

              <div>
                <label htmlFor="riscaldamento" className="block text-sm font-medium text-secondary">Riscaldamento</label>
                <input id="riscaldamento" name="riscaldamento" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="tipo_riscaldamento" className="block text-sm font-medium text-secondary">Tipo riscaldamento</label>
                <input id="tipo_riscaldamento" name="tipo_riscaldamento" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="sistema_radiante" className="block text-sm font-medium text-secondary">Sistema radiante</label>
                <input id="sistema_radiante" name="sistema_radiante" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>

              <div>
                <label htmlFor="cucina" className="block text-sm font-medium text-secondary">Cucina</label>
                <input id="cucina" name="cucina" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="box" className="block text-sm font-medium text-secondary">Box</label>
                <input id="box" name="box" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-5">
              <label className="inline-flex items-center gap-2 text-sm text-secondary"><input type="checkbox" name="giardino" className="h-4 w-4" /> Giardino</label>
              <label className="inline-flex items-center gap-2 text-sm text-secondary"><input type="checkbox" name="terrazzo" className="h-4 w-4" /> Terrazzo</label>
              <label className="inline-flex items-center gap-2 text-sm text-secondary"><input type="checkbox" name="ascensore" className="h-4 w-4" /> Ascensore</label>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-secondary mb-4">Agenzia di riferimento</h2>
            <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="agenzia_nome" className="block text-sm font-medium text-secondary">Nome agenzia</label>
                <input id="agenzia_nome" name="agenzia_nome" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div>
                <label htmlFor="agenzia_telefono" className="block text-sm font-medium text-secondary">Telefono</label>
                <input id="agenzia_telefono" name="agenzia_telefono" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="agenzia_indirizzo" className="block text-sm font-medium text-secondary">Indirizzo agenzia</label>
                <input id="agenzia_indirizzo" name="agenzia_indirizzo" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="agenzia_email" className="block text-sm font-medium text-secondary">Email agenzia</label>
                <input id="agenzia_email" name="agenzia_email" type="email" className="mt-1 w-full px-3 py-2 border border-black/20 rounded-md" />
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-secondary/15 flex justify-end gap-4">
            <Link href="/admin" className="bg-white py-2 px-4 border border-secondary/20 rounded-md shadow-sm text-sm font-medium text-secondary hover:bg-primary/5">Annulla</Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
