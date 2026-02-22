import { supabase } from '@/lib/supabase';
import { Annuncio } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bed, Maximize, Euro, MapPin, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function DettaglioAnnuncio({ params }: { params: { id: string } }) {
  const { data: annuncio, error } = await supabase
    .from('annunci')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !annuncio) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 dark:bg-black">
      <div className="max-w-5xl mx-auto">
        <Link href="/vetrina" className="inline-flex items-center text-secondary hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna alla vetrina
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-black/10 overflow-hidden">
          {/* Image Header */}
          <div className="relative h-96 w-full bg-black/10">
            {annuncio.immagine_url ? (
              <Image
                src={annuncio.immagine_url}
                alt={annuncio.titolo}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-black/50">
                Nessuna immagine disponibile
              </div>
            )}
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-md ${
                annuncio.tipologia === 'vendita' ? 'bg-primary' : 'bg-secondary'
              }`}>
                {annuncio.tipologia === 'vendita' ? 'In Vendita' : 'In Affitto'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                  {annuncio.titolo}
                </h1>
                <div className="flex items-center text-black/60">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Cavallermaggiore e dintorni</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-4xl font-bold text-primary">
                  {formatPrice(annuncio.prezzo)}
                  {annuncio.tipologia === 'affitto' && <span className="text-lg text-black/60 font-normal">/mese</span>}
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-black/10 mb-8">
              <div className="flex flex-col items-center justify-center p-4 bg-black/5 rounded-xl">
                <Maximize className="w-8 h-8 text-primary mb-2" />
                <span className="text-2xl font-bold text-secondary">{annuncio.mq}</span>
                <span className="text-sm text-black/60">Metri Quadri</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-black/5 rounded-xl">
                <Bed className="w-8 h-8 text-primary mb-2" />
                <span className="text-2xl font-bold text-secondary">{annuncio.numero_stanze}</span>
                <span className="text-sm text-black/60">Locali</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-black/5 rounded-xl">
                <Euro className="w-8 h-8 text-primary mb-2" />
                <span className="text-2xl font-bold text-secondary">
                  {Math.round(annuncio.prezzo / annuncio.mq)}€
                </span>
                <span className="text-sm text-black/60">Prezzo/mq</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-black/5 rounded-xl">
                <Calendar className="w-8 h-8 text-primary mb-2" />
                <span className="text-lg font-bold text-secondary text-center">
                  {new Date(annuncio.created_at || '').toLocaleDateString('it-IT')}
                </span>
                <span className="text-sm text-black/60">Data Inserimento</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-secondary mb-4">Descrizione</h2>
              <div className="prose max-w-none text-black/80 whitespace-pre-wrap">
                {annuncio.descrizione}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/10">
              <h3 className="text-2xl font-bold text-secondary mb-4">Ti interessa questo immobile?</h3>
              <p className="text-black/80 mb-6 max-w-2xl mx-auto">
                Contattaci per maggiori informazioni o per prenotare una visita. Il nostro team è a tua disposizione.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="tel:+390000000000" 
                  className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Chiama Ora
                </a>
                <a 
                  href={`mailto:ufficio@myzone.casa?subject=Richiesta info per: ${annuncio.titolo}`} 
                  className="bg-white text-secondary border border-black/20 hover:bg-black/5 font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Invia Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
