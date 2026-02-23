"use client";

import { useState, type ChangeEvent, type ComponentType } from 'react';
import { CheckCircle2, Home, Clock3, ShieldCheck } from 'lucide-react';

export default function ValutaCasa() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    indirizzo: '',
    comune: '',
    email: '',
    telefono: '',
    tipologia: '',
    statoImmobile: '',
    metratura: '',
    tempistiche: '',
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
    if (!formData.comune.trim()) newErrors.comune = 'Il comune è obbligatorio';
    if (!formData.tipologia) newErrors.tipologia = 'Seleziona una tipologia';
    if (!formData.statoImmobile) newErrors.statoImmobile = "Seleziona lo stato dell'immobile";
    if (!formData.tempistiche) newErrors.tempistiche = 'Seleziona la tempistica di vendita';
    
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({
        nome: '',
        cognome: '',
        indirizzo: '',
        comune: '',
        email: '',
        telefono: '',
        tipologia: '',
        statoImmobile: '',
        metratura: '',
        tempistiche: '',
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
      <div className="min-h-[70vh] flex items-center justify-center bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-primary/15 shadow-xl shadow-primary/10 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-secondary mb-4">Richiesta Inviata!</h2>
          <p className="text-secondary/80 mb-8 leading-relaxed">
            Grazie per averci contattato. Un nostro consulente ti ricontatterà al più presto per fissare un appuntamento per la valutazione del tuo immobile.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="w-full flex justify-center py-3.5 px-4 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-all btn-glow"
          >
            Invia un&apos;altra richiesta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl border border-primary/10 bg-white p-10 md:p-12 mb-10 shadow-lg shadow-primary/10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">Vendere con Myzone</p>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4 tracking-tight">Valuta la tua casa</h1>
          <p className="text-lg text-secondary/80 max-w-3xl leading-relaxed">
            Richiedi una valutazione professionale e senza impegno. Ti ricontattiamo con una stima coerente con il mercato locale e una strategia di vendita concreta.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1.6fr] gap-8">
          <aside className="space-y-4">
            <ValueCard
              icon={Home}
              title="Valutazione mirata"
              text="Analizziamo zona, tipologia e stato dell'immobile per una stima realistica."
            />
            <ValueCard
              icon={Clock3}
              title="Risposta rapida"
              text="Ti contattiamo in tempi brevi per raccogliere dettagli e proporti il percorso migliore."
            />
            <ValueCard
              icon={ShieldCheck}
              title="Consulenza trasparente"
              text="Nessun impegno iniziale: prima valutiamo insieme l'opportunità migliore per vendere."
            />
          </aside>

          <div className="bg-white py-8 px-6 border border-primary/10 shadow-lg shadow-primary/10 rounded-2xl sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 [&_input]:text-secondary [&_input]:bg-white [&_input]:placeholder:text-secondary/45 [&_select]:text-secondary [&_select]:bg-white [&_textarea]:text-secondary [&_textarea]:bg-white [&_textarea]:placeholder:text-secondary/45"
            >
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
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
                        errors.nome ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                    />
                    {errors.nome && <p className="mt-2 text-sm text-red-600">{errors.nome}</p>}
                  </div>
                </div>

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
                        errors.cognome ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                    />
                    {errors.cognome && <p className="mt-2 text-sm text-red-600">{errors.cognome}</p>}
                  </div>
                </div>

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
                        errors.email ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

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
                        errors.telefono ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                    />
                    {errors.telefono && <p className="mt-2 text-sm text-red-600">{errors.telefono}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="indirizzo" className="block text-sm font-medium text-secondary">
                    Indirizzo immobile *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="indirizzo"
                      id="indirizzo"
                      value={formData.indirizzo}
                      onChange={handleChange}
                      placeholder="Es. Via Roma 1"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.indirizzo ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                    />
                    {errors.indirizzo && <p className="mt-2 text-sm text-red-600">{errors.indirizzo}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="comune" className="block text-sm font-medium text-secondary">
                    Comune *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="comune"
                      id="comune"
                      value={formData.comune}
                      onChange={handleChange}
                      placeholder="Es. Cavallermaggiore"
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.comune ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                    />
                    {errors.comune && <p className="mt-2 text-sm text-red-600">{errors.comune}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="tipologia" className="block text-sm font-medium text-secondary">
                    Tipologia immobile *
                  </label>
                  <div className="mt-1">
                    <select
                      name="tipologia"
                      id="tipologia"
                      value={formData.tipologia}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.tipologia ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white`}
                    >
                      <option value="">Seleziona</option>
                      <option value="APPARTAMENTO">Appartamento</option>
                      <option value="VILLA">Villa</option>
                      <option value="CASA INDIPENDENTE">Casa indipendente</option>
                      <option value="RUSTICO">Rustico</option>
                      <option value="LOCALE COMMERCIALE">Locale commerciale</option>
                    </select>
                    {errors.tipologia && <p className="mt-2 text-sm text-red-600">{errors.tipologia}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="statoImmobile" className="block text-sm font-medium text-secondary">
                    Stato immobile *
                  </label>
                  <div className="mt-1">
                    <select
                      name="statoImmobile"
                      id="statoImmobile"
                      value={formData.statoImmobile}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.statoImmobile ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white`}
                    >
                      <option value="">Seleziona</option>
                      <option value="NUOVO">Nuovo</option>
                      <option value="BUONO">Buono stato</option>
                      <option value="DA RISTRUTTURARE">Da ristrutturare</option>
                    </select>
                    {errors.statoImmobile && <p className="mt-2 text-sm text-red-600">{errors.statoImmobile}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="metratura" className="block text-sm font-medium text-secondary">
                    Metratura indicativa (mq)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      min={0}
                      name="metratura"
                      id="metratura"
                      value={formData.metratura}
                      onChange={handleChange}
                      placeholder="Es. 120"
                      className="appearance-none block w-full px-3 py-2 border border-primary/15 rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="tempistiche" className="block text-sm font-medium text-secondary">
                    Quando vuoi vendere? *
                  </label>
                  <div className="mt-1">
                    <select
                      name="tempistiche"
                      id="tempistiche"
                      value={formData.tempistiche}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        errors.tempistiche ? 'border-red-300' : 'border-primary/15'
                      } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white`}
                    >
                      <option value="">Seleziona</option>
                      <option value="SUBITO">Subito</option>
                      <option value="ENTRO 3 MESI">Entro 3 mesi</option>
                      <option value="ENTRO 6 MESI">Entro 6 mesi</option>
                      <option value="STO VALUTANDO">Sto valutando</option>
                    </select>
                    {errors.tempistiche && <p className="mt-2 text-sm text-red-600">{errors.tempistiche}</p>}
                  </div>
                </div>

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
                      placeholder="Inserisci qui eventuali dettagli sull'immobile (piano, ascensore, stato di manutenzione, ecc.)"
                      className="appearance-none block w-full px-3 py-2 border border-primary/15 rounded-md shadow-sm placeholder-secondary/40 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3.5 px-4 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-all btn-glow ${
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
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-md shadow-primary/10 hover:border-primary/20 hover:shadow-lg transition-all">
      <Icon className="w-6 h-6 text-primary mb-3" />
      <h3 className="font-bold text-secondary mb-2">{title}</h3>
      <p className="text-sm text-secondary/80 leading-relaxed">{text}</p>
    </div>
  );
}
