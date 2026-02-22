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
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/vetrina" className="inline-flex items-center text-secondary hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Torna alla vetrina
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-primary/15 overflow-hidden">
          <div className="relative h-80 sm:h-[28rem] w-full bg-primary/10">
            {annuncio.immagine_url ? (
              <Image
                src={annuncio.immagine_url}
                alt={annuncio.titolo}
                unoptimized
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-secondary/60">
                Nessuna immagine disponibile
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5 sm:top-6 sm:left-6 flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md ${
                annuncio.tipo_contratto === 'IN VENDITA' ? 'bg-primary' : 'bg-secondary'
              }`}>
                {annuncio.tipo_contratto}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider ${
                annuncio.stato === 'DISPONIBILE'
                  ? 'bg-white text-secondary'
                  : annuncio.stato === 'IN TRATTATIVA'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-black/70 text-white'
              }`}>
                {annuncio.stato}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white">
              <h1 className="text-2xl sm:text-4xl font-bold mb-3">{annuncio.titolo}</h1>
              <div className="flex flex-wrap items-center gap-3 text-white/90">
                <span className="inline-flex items-center gap-1.5 text-sm sm:text-base">
                  <MapPin className="w-4 h-4" />
                  {annuncio.comune} ({annuncio.provincia})
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="text-sm sm:text-base">{annuncio.indirizzo}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-10">
              <div>
                <div className="mb-8 rounded-2xl border border-primary/15 bg-primary/5 p-6">
                  <div className="text-sm uppercase tracking-[0.2em] text-secondary/60 mb-2">Prezzo richiesto</div>
                  <div className="text-4xl font-bold text-primary">
                    {formatPrice(annuncio.prezzo)}
                    {annuncio.tipo_contratto === 'IN AFFITTO' && <span className="text-base text-primary/70 font-normal">/mese</span>}
                  </div>
                  <div className="mt-2 text-secondary/70 text-sm">Circa {prezzoAlMq} €/mq</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <Feature icon={Maximize} label="Superficie" value={`${annuncio.superficie_mq} mq`} />
                  <Feature icon={Bed} label="Locali" value={String(annuncio.numero_locali)} />
                  <Feature icon={Bath} label="Bagni" value={String(annuncio.bagni)} />
                  <Feature icon={Building} label="Piano" value={annuncio.piano || '--'} />
                </div>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-secondary mb-4">Descrizione</h2>
                  <p className="text-secondary/85 leading-relaxed whitespace-pre-wrap">{annuncio.descrizione}</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-secondary mb-4">Dettaglio annuncio</h2>
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

                <section className="mb-10 rounded-2xl border border-primary/15 p-6">
                  <h2 className="text-2xl font-bold text-secondary mb-4">Dotazioni</h2>
                  <div className="grid sm:grid-cols-3 gap-3 text-sm">
                    <FlagPill active={annuncio.giardino} text="Giardino" icon={Trees} />
                    <FlagPill active={annuncio.terrazzo} text="Terrazzo" icon={Building} />
                    <FlagPill active={annuncio.ascensore} text="Ascensore" icon={Building2} />
                  </div>
                </section>
              </div>

              <aside className="lg:sticky lg:top-28 h-fit space-y-5">
                <div className="rounded-2xl border border-primary/15 p-5 bg-white">
                  <h3 className="text-lg font-semibold text-secondary mb-3">Informazioni rapide</h3>
                  <ul className="space-y-2 text-sm text-secondary/80">
                    <li className="flex items-center gap-2"><Euro className="w-4 h-4 text-primary" /> {formatPrice(annuncio.prezzo)}</li>
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {annuncio.comune}</li>
                    <li className="flex items-center gap-2"><Maximize className="w-4 h-4 text-primary" /> {annuncio.superficie_mq} mq</li>
                    <li className="flex items-center gap-2"><Bed className="w-4 h-4 text-primary" /> {annuncio.numero_locali} locali</li>
                    <li className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(annuncio.created_at || '').toLocaleDateString('it-IT')}</li>
                  </ul>
                </div>

                {(annuncio.agenzia_nome || annuncio.agenzia_telefono || annuncio.agenzia_email) && (
                  <div className="rounded-2xl border border-primary/15 p-5 bg-primary/5">
                    <h3 className="text-lg font-semibold text-secondary mb-3">Agenzia di riferimento</h3>
                    <div className="space-y-2 text-secondary/85 text-sm">
                      {annuncio.agenzia_nome && (
                        <p className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {annuncio.agenzia_nome}</p>
                      )}
                      {annuncio.agenzia_indirizzo && (
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {annuncio.agenzia_indirizzo}</p>
                      )}
                      {annuncio.agenzia_telefono && (
                        <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {annuncio.agenzia_telefono}</p>
                      )}
                      {annuncio.agenzia_email && (
                        <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {annuncio.agenzia_email}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-primary/20 p-5 bg-white">
                  <h3 className="text-lg font-semibold text-secondary mb-2">Ti interessa questo immobile?</h3>
                  <p className="text-secondary/75 text-sm mb-4">Contattaci per maggiori informazioni o per fissare una visita.</p>
                  <div className="space-y-3">
                    <a
                      href="tel:+390000000000"
                      className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition-colors"
                    >
                      Chiama Ora
                    </a>
                    <a
                      href={`mailto:ufficio@myzone.casa?subject=Richiesta info per: ${annuncio.titolo}`}
                      className="block w-full text-center bg-white text-secondary border border-primary/20 hover:bg-primary/5 font-semibold py-2.5 rounded-lg transition-colors"
                    >
                      Invia Email
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-primary/15 p-4 bg-white">
      <Icon className="w-5 h-5 text-primary mb-2" />
      <p className="text-xs uppercase tracking-wider text-secondary/60 mb-1">{label}</p>
      <p className="font-semibold text-secondary">{value}</p>
    </div>
  );
}

function FlagPill({
  active,
  text,
  icon: Icon,
}: {
  active: boolean;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 border ${
        active ? 'bg-primary/10 text-primary border-primary/25' : 'bg-white text-secondary/60 border-primary/15'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{text}: {active ? 'Sì' : 'No'}</span>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-primary/15 rounded-xl p-4 bg-white">
      <p className="text-xs uppercase tracking-wider text-secondary/60 mb-1">{label}</p>
      <p className="font-semibold text-secondary">{value}</p>
    </div>
  );
}
