"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NuovoAnnuncio() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titolo: '',
    descrizione: '',
    prezzo: '',
    mq: '',
    numero_stanze: '',
    immagine_url: '',
    tipologia: 'vendita'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('annunci')
        .insert([
          {
            titolo: formData.titolo,
            descrizione: formData.descrizione,
            prezzo: Number(formData.prezzo),
            mq: Number(formData.mq),
            numero_stanze: Number(formData.numero_stanze),
            immagine_url: formData.immagine_url,
            tipologia: formData.tipologia
          }
        ]);

      if (supabaseError) throw supabaseError;

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      console.error('Error creating annuncio:', err);
      setError(err.message || 'Si è verificato un errore durante il salvataggio.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center text-secondary hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna alla dashboard
        </Link>

        <div className="bg-white shadow-sm rounded-xl border border-black/20 overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h1 className="text-3xl font-bold text-secondary mb-8">Nuovo Annuncio</h1>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                {/* Titolo */}
                <div className="sm:col-span-2">
                  <label htmlFor="titolo" className="block text-sm font-medium text-secondary">
                    Titolo Annuncio *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="titolo"
                      id="titolo"
                      required
                      value={formData.titolo}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm placeholder-black/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>

                {/* Tipologia */}
                <div>
                  <label htmlFor="tipologia" className="block text-sm font-medium text-secondary">
                    Tipologia *
                  </label>
                  <div className="mt-1">
                    <select
                      id="tipologia"
                      name="tipologia"
                      required
                      value={formData.tipologia}
                      onChange={handleChange}
                      className="block w-full pl-3 pr-10 py-2 text-base border-black/20 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                      <option value="vendita">Vendita</option>
                      <option value="affitto">Affitto</option>
                    </select>
                  </div>
                </div>

                {/* Prezzo */}
                <div>
                  <label htmlFor="prezzo" className="block text-sm font-medium text-secondary">
                    Prezzo (€) *
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="prezzo"
                      id="prezzo"
                      required
                      min="0"
                      value={formData.prezzo}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm placeholder-black/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>

                {/* Metri Quadri */}
                <div>
                  <label htmlFor="mq" className="block text-sm font-medium text-secondary">
                    Metri Quadri *
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="mq"
                      id="mq"
                      required
                      min="1"
                      value={formData.mq}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm placeholder-black/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>

                {/* Numero Stanze */}
                <div>
                  <label htmlFor="numero_stanze" className="block text-sm font-medium text-secondary">
                    Numero Locali *
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="numero_stanze"
                      id="numero_stanze"
                      required
                      min="1"
                      value={formData.numero_stanze}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm placeholder-black/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>

                {/* Immagine URL */}
                <div className="sm:col-span-2">
                  <label htmlFor="immagine_url" className="block text-sm font-medium text-secondary">
                    URL Immagine Principale
                  </label>
                  <div className="mt-1">
                    <input
                      type="url"
                      name="immagine_url"
                      id="immagine_url"
                      value={formData.immagine_url}
                      onChange={handleChange}
                      placeholder="https://esempio.com/immagine.jpg"
                      className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm placeholder-black/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>

                {/* Descrizione */}
                <div className="sm:col-span-2">
                  <label htmlFor="descrizione" className="block text-sm font-medium text-secondary">
                    Descrizione *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="descrizione"
                      name="descrizione"
                      rows={6}
                      required
                      value={formData.descrizione}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm placeholder-black/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/15 flex justify-end gap-4">
                <Link
                  href="/admin"
                  className="bg-white py-2 px-4 border border-black/20 rounded-md shadow-sm text-sm font-medium text-secondary hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Annulla
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Salvataggio...' : 'Salva Annuncio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
