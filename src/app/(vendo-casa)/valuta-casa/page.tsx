"use client";

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ValutaCasa() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    indirizzo: '',
    email: '',
    telefono: '',
    note: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Il nome è obbligatorio';
    if (!formData.cognome.trim()) newErrors.cognome = 'Il cognome è obbligatorio';
    if (!formData.indirizzo.trim()) newErrors.indirizzo = "L'indirizzo è obbligatorio";
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un indirizzo email valido';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Il telefono è obbligatorio';
    } else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.telefono)) {
      newErrors.telefono = 'Inserisci un numero di telefono valido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({
        nome: '',
        cognome: '',
        indirizzo: '',
        email: '',
        telefono: '',
        note: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 dark:bg-black">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h2 className="text-3xl font-bold text-secondary mb-4">Richiesta Inviata!</h2>
          <p className="text-secondary/80 mb-8">
            Grazie per averci contattato. Un nostro consulente ti ricontatterà al più presto per fissare un appuntamento per la valutazione del tuo immobile.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Invia un'altra richiesta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">Valuta la tua Casa</h1>
          <p className="text-lg text-secondary/80">
            Compila il modulo sottostante per richiedere una valutazione professionale e gratuita del tuo immobile a Cavallermaggiore e dintorni.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-md rounded-xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-secondary">
                  Nome *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.nome ? 'border-red-300' : 'border-primary/30'
                    } rounded-md shadow-sm placeholder-primary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                  {errors.nome && <p className="mt-2 text-sm text-red-600">{errors.nome}</p>}
                </div>
              </div>

              {/* Cognome */}
              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-secondary">
                  Cognome *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="cognome"
                    id="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.cognome ? 'border-red-300' : 'border-primary/30'
                    } rounded-md shadow-sm placeholder-primary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                  {errors.cognome && <p className="mt-2 text-sm text-red-600">{errors.cognome}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary">
                  Email *
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.email ? 'border-red-300' : 'border-primary/30'
                    } rounded-md shadow-sm placeholder-primary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              {/* Telefono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-secondary">
                  Telefono *
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.telefono ? 'border-red-300' : 'border-primary/30'
                    } rounded-md shadow-sm placeholder-primary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                  {errors.telefono && <p className="mt-2 text-sm text-red-600">{errors.telefono}</p>}
                </div>
              </div>

              {/* Indirizzo */}
              <div className="sm:col-span-2">
                <label htmlFor="indirizzo" className="block text-sm font-medium text-secondary">
                  Indirizzo dell'immobile *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="indirizzo"
                    id="indirizzo"
                    value={formData.indirizzo}
                    onChange={handleChange}
                    placeholder="Es. Via Roma 1, Cavallermaggiore"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.indirizzo ? 'border-red-300' : 'border-primary/30'
                    } rounded-md shadow-sm placeholder-primary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                  />
                  {errors.indirizzo && <p className="mt-2 text-sm text-red-600">{errors.indirizzo}</p>}
                </div>
              </div>

              {/* Note */}
              <div className="sm:col-span-2">
                <label htmlFor="note" className="block text-sm font-medium text-secondary">
                  Note aggiuntive (opzionale)
                </label>
                <div className="mt-1">
                  <textarea
                    id="note"
                    name="note"
                    rows={4}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Inserisci qui eventuali dettagli sull'immobile (es. piano, ascensore, stato di manutenzione...)"
                    className="appearance-none block w-full px-3 py-2 border border-primary/30 rounded-md shadow-sm placeholder-primary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Invio in corso...' : 'Richiedi Valutazione'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
