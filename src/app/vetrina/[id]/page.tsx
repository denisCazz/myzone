import { getSupabaseServerClient } from '@/lib/supabase-server';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bed, Maximize, Euro, MapPin, Calendar, Building2, Phone, Mail, Bath, Trees, Building } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function DettaglioAnnuncio({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    notFound();
  }

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

  const prezzoAlMq = Math.round(annuncio.prezzo / Math.max(annuncio.superficie_mq || 1, 1));

  return (
    <div className="min-h-screen bg-white">
      {/* Header con hero */}
      <div className="bg-white border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/vetrina"
            className="inline-flex items-center gap-2 text-secondary/75 hover:text-primary font-medium text-sm transition-colors mb-6 px-3 py-2 rounded-lg hover:bg-primary/5"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla vetrina
          </Link>

          {/* Hero immagine */}
          <div className="relative h-72 sm:h-[28rem] lg:h-[34rem] rounded-2xl overflow-hidden bg-primary/5 shadow-xl shadow-primary/10">
            {annuncio.immagine_url ? (
              <Image
                src={annuncio.immagine_url}
                alt={annuncio.titolo}
                unoptimized
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-primary/50">
                Nessuna immagine disponibile
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute top-5 left-5 right-5 flex flex-wrap justify-between items-start gap-2">
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl ${
                  annuncio.tipo_contratto === 'IN VENDITA' ? 'bg-primary' : 'bg-secondary'
                }`}>
                  {annuncio.tipo_contratto}
                </span>
                <span className={`px-3 py-2 rounded-xl text-xs font-semibold shadow-lg ${
                  annuncio.stato === 'DISPONIBILE'
                    ? 'bg-white/95 text-secondary'
                    : annuncio.stato === 'IN TRATTATIVA'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-black/60 text-white'
                }`}>
                  {annuncio.stato}
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-2xl">
                {annuncio.titolo}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-white/90 text-sm sm:text-base">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {annuncio.comune} ({annuncio.provincia})
                </span>
                <span className="hidden sm:inline text-white/30">•</span>
                <span>{annuncio.indirizzo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenuto */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-14">
          <div className="space-y-10">
            {/* Prezzo */}
            <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-white to-primary/5 p-8 sm:p-10 shadow-lg shadow-primary/10">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary/60 mb-2">Prezzo richiesto</p>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  {formatPrice(annuncio.prezzo)}
                </span>
                {annuncio.tipo_contratto === 'IN AFFITTO' && (
                  <span className="text-sm text-secondary/60 font-normal">/mese</span>
                )}
              </div>
              <p className="mt-2 text-sm text-secondary/70">Circa {prezzoAlMq} €/mq</p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <FeatureCard icon={Maximize} label="Superficie" value={`${annuncio.superficie_mq} mq`} />
              <FeatureCard icon={Bed} label="Locali" value={String(annuncio.numero_locali)} />
              <FeatureCard icon={Bath} label="Bagni" value={String(annuncio.bagni)} />
              <FeatureCard icon={Building} label="Piano" value={annuncio.piano || '--'} />
            </div>

            {/* Descrizione */}
            <section className="rounded-2xl border border-primary/10 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-secondary mb-4">Descrizione</h2>
              <p className="text-secondary/80 leading-relaxed whitespace-pre-wrap">{annuncio.descrizione}</p>
            </section>

            {/* Dettagli */}
            <section>
              <h2 className="text-xl font-bold text-secondary mb-4">Dettaglio annuncio</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <DetailItem label="Categoria" value={annuncio.categoria} />
                <DetailItem label="Tipologia" value={annuncio.tipologia_immobile} />
                <DetailItem label="Tipo contratto" value={annuncio.tipo_contratto} />
                <DetailItem label="Stato" value={annuncio.stato} />
                <DetailItem label="Indirizzo" value={annuncio.indirizzo} />
                <DetailItem label="APE" value={annuncio.ape || '--'} />
                <DetailItem label="IPE" value={annuncio.ipe ? String(annuncio.ipe) : '--'} />
                <DetailItem label="Riscaldamento" value={annuncio.riscaldamento || '--'} />
                <DetailItem label="Tipo riscaldamento" value={annuncio.tipo_riscaldamento || '--'} />
                <DetailItem label="Sistema radiante" value={annuncio.sistema_radiante || '--'} />
                <DetailItem label="Cucina" value={annuncio.cucina || '--'} />
                <DetailItem label="Box" value={annuncio.box || '--'} />
              </div>
            </section>

            {/* Dotazioni */}
            <section className="rounded-2xl border border-primary/10 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-secondary mb-4">Dotazioni</h2>
              <div className="flex flex-wrap gap-3">
                <DotazionePill active={annuncio.giardino} text="Giardino" icon={Trees} />
                <DotazionePill active={annuncio.terrazzo} text="Terrazzo" icon={Building} />
                <DotazionePill active={annuncio.ascensore} text="Ascensore" icon={Building2} />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 h-fit space-y-6">
            <div className="rounded-2xl border border-primary/10 p-6 bg-white shadow-lg shadow-primary/10">
              <h3 className="text-lg font-bold text-secondary mb-4">Informazioni rapide</h3>
              <ul className="space-y-3 text-sm text-secondary/80">
                <li className="flex items-center gap-3">
                  <Euro className="w-5 h-5 text-primary flex-shrink-0" />
                  {formatPrice(annuncio.prezzo)}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  {annuncio.comune}
                </li>
                <li className="flex items-center gap-3">
                  <Maximize className="w-5 h-5 text-primary flex-shrink-0" />
                  {annuncio.superficie_mq} mq
                </li>
                <li className="flex items-center gap-3">
                  <Bed className="w-5 h-5 text-primary flex-shrink-0" />
                  {annuncio.numero_locali} locali
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  {new Date(annuncio.created_at || '').toLocaleDateString('it-IT')}
                </li>
              </ul>
            </div>

            {(annuncio.agenzia_nome || annuncio.agenzia_telefono || annuncio.agenzia_email) && (
              <div className="rounded-2xl border border-primary/20 p-6 bg-primary/5">
                <h3 className="text-lg font-semibold text-secondary mb-4">Agenzia di riferimento</h3>
                <div className="space-y-3 text-sm text-secondary/80">
                  {annuncio.agenzia_nome && (
                    <p className="flex items-center gap-3"><Building2 className="w-4 h-4 text-primary flex-shrink-0" /> {annuncio.agenzia_nome}</p>
                  )}
                  {annuncio.agenzia_indirizzo && (
                    <p className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary flex-shrink-0" /> {annuncio.agenzia_indirizzo}</p>
                  )}
                  {annuncio.agenzia_telefono && (
                    <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary flex-shrink-0" /> {annuncio.agenzia_telefono}</p>
                  )}
                  {annuncio.agenzia_email && (
                    <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary flex-shrink-0" /> {annuncio.agenzia_email}</p>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-primary/10 p-6 bg-white shadow-lg shadow-primary/10">
              <h3 className="text-lg font-bold text-secondary mb-2">Ti interessa?</h3>
              <p className="text-secondary/75 text-sm mb-5">Contattaci per maggiori informazioni o per fissare una visita.</p>
              <div className="space-y-3">
                <a
                  href="tel:+390000000000"
                  className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all btn-glow"
                >
                  Chiama Ora
                </a>
                <a
                  href={`mailto:ufficio@myzone.casa?subject=Richiesta info per: ${annuncio.titolo}`}
                  className="block w-full text-center bg-white text-secondary border-2 border-primary/15 hover:border-primary/30 hover:bg-primary/5 font-semibold py-3 rounded-xl transition-colors"
                >
                  Invia Email
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-primary/10 p-5 bg-white hover:border-primary/25 hover:shadow-md transition-all group">
      <Icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
      <p className="text-xs uppercase tracking-wider text-secondary/60 mb-1">{label}</p>
      <p className="font-bold text-secondary">{value}</p>
    </div>
  );
}

function DotazionePill({ active, text, icon: Icon }: { active: boolean; text: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 border ${
        active ? 'bg-primary/10 text-primary border-primary/25' : 'bg-primary/5 text-secondary/60 border-primary/10'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{text}: {active ? 'Sì' : 'No'}</span>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-primary/10 p-4 bg-white hover:border-primary/20 transition-colors">
      <p className="text-xs uppercase tracking-wider text-secondary/60 mb-1">{label}</p>
      <p className="font-semibold text-secondary">{value}</p>
    </div>
  );
}
