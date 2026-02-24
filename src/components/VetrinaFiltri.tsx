"use client";

import { Annuncio } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Bed, Maximize, MapPin, Building2, SlidersHorizontal, X } from "lucide-react";
import { useState, useMemo } from "react";

type Filtri = {
  tipoContratto: string;
  prezzoMin: string;
  prezzoMax: string;
  comune: string;
  superficieMin: string;
  localiMin: string;
  stato: string;
  tipologia: string;
};

const defaultFiltri: Filtri = {
  tipoContratto: "",
  prezzoMin: "",
  prezzoMax: "",
  comune: "",
  superficieMin: "",
  localiMin: "",
  stato: "",
  tipologia: "",
};

export default function VetrinaFiltri({
  annunci,
  comuni,
}: {
  annunci: Annuncio[];
  comuni: string[];
}) {
  const [filtri, setFiltri] = useState<Filtri>(defaultFiltri);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const annunciFiltrati = useMemo(() => {
    return annunci.filter((a) => {
      if (filtri.tipoContratto && a.tipo_contratto !== filtri.tipoContratto) return false;
      if (filtri.prezzoMin && a.prezzo < parseInt(filtri.prezzoMin)) return false;
      if (filtri.prezzoMax && a.prezzo > parseInt(filtri.prezzoMax)) return false;
      if (filtri.comune && !a.comune.toLowerCase().includes(filtri.comune.toLowerCase())) return false;
      if (filtri.superficieMin && (a.superficie_mq || 0) < parseInt(filtri.superficieMin)) return false;
      if (filtri.localiMin && (a.numero_locali || 0) < parseInt(filtri.localiMin)) return false;
      if (filtri.stato && a.stato !== filtri.stato) return false;
      if (filtri.tipologia && !a.tipologia_immobile?.toLowerCase().includes(filtri.tipologia.toLowerCase())) return false;
      return true;
    });
  }, [annunci, filtri]);

  const hasFiltriAttivi = Object.values(filtri).some((v) => v !== "");

  const resetFiltri = () => setFiltri(defaultFiltri);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="flex gap-8">
      {/* Sidebar filtri - desktop */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-24 rounded-2xl border border-primary/10 bg-white p-6 shadow-lg shadow-primary/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-secondary flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              Filtri
            </h3>
            {hasFiltriAttivi && (
              <button
                onClick={resetFiltri}
                className="text-sm text-primary hover:underline font-medium"
              >
                Pulisci
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Contratto</label>
              <select
                value={filtri.tipoContratto}
                onChange={(e) => setFiltri((f) => ({ ...f, tipoContratto: e.target.value }))}
                className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Tutti</option>
                <option value="IN VENDITA">In vendita</option>
                <option value="IN AFFITTO">In affitto</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Prezzo min</label>
                <input
                  type="number"
                  placeholder="€"
                  value={filtri.prezzoMin}
                  onChange={(e) => setFiltri((f) => ({ ...f, prezzoMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Prezzo max</label>
                <input
                  type="number"
                  placeholder="€"
                  value={filtri.prezzoMax}
                  onChange={(e) => setFiltri((f) => ({ ...f, prezzoMax: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Comune</label>
              <select
                value={filtri.comune}
                onChange={(e) => setFiltri((f) => ({ ...f, comune: e.target.value }))}
                className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Tutti</option>
                {comuni.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Superficie min (mq)</label>
              <input
                type="number"
                placeholder="Es. 80"
                value={filtri.superficieMin}
                onChange={(e) => setFiltri((f) => ({ ...f, superficieMin: e.target.value }))}
                className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Locali min</label>
              <select
                value={filtri.localiMin}
                onChange={(e) => setFiltri((f) => ({ ...f, localiMin: e.target.value }))}
                className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Qualsiasi</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Stato</label>
              <select
                value={filtri.stato}
                onChange={(e) => setFiltri((f) => ({ ...f, stato: e.target.value }))}
                className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Tutti</option>
                <option value="DISPONIBILE">Disponibile</option>
                <option value="IN TRATTATIVA">In trattativa</option>
                <option value="VENDUTO">Venduto</option>
                <option value="AFFITTATO">Affittato</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Tipologia</label>
              <input
                type="text"
                placeholder="Es. Appartamento"
                value={filtri.tipologia}
                onChange={(e) => setFiltri((f) => ({ ...f, tipologia: e.target.value }))}
                className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <p className="mt-4 text-sm text-secondary/70">
            {annunciFiltrati.length} annunci{annunciFiltrati.length !== 1 ? " trovati" : " trovato"}
          </p>
        </div>
      </aside>

      {/* Mobile: pulsante filtri */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40 flex justify-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-lg btn-glow"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filtri {hasFiltriAttivi && `(${annunciFiltrati.length})`}
        </button>
      </div>

      {/* Mobile: overlay filtri */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-secondary">Filtri</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Contratto</label>
                <select
                  value={filtri.tipoContratto}
                  onChange={(e) => setFiltri((f) => ({ ...f, tipoContratto: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm"
                >
                  <option value="">Tutti</option>
                  <option value="IN VENDITA">In vendita</option>
                  <option value="IN AFFITTO">In affitto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Prezzo min</label>
                <input
                  type="number"
                  value={filtri.prezzoMin}
                  onChange={(e) => setFiltri((f) => ({ ...f, prezzoMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Prezzo max</label>
                <input
                  type="number"
                  value={filtri.prezzoMax}
                  onChange={(e) => setFiltri((f) => ({ ...f, prezzoMax: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Comune</label>
                <select
                  value={filtri.comune}
                  onChange={(e) => setFiltri((f) => ({ ...f, comune: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm"
                >
                  <option value="">Tutti</option>
                  {comuni.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Superficie min (mq)</label>
                <input
                  type="number"
                  value={filtri.superficieMin}
                  onChange={(e) => setFiltri((f) => ({ ...f, superficieMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Locali min</label>
                <select
                  value={filtri.localiMin}
                  onChange={(e) => setFiltri((f) => ({ ...f, localiMin: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm"
                >
                  <option value="">Qualsiasi</option>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n}+
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Stato</label>
                <select
                  value={filtri.stato}
                  onChange={(e) => setFiltri((f) => ({ ...f, stato: e.target.value }))}
                  className="w-full px-3 py-2 border border-primary/15 rounded-xl text-sm"
                >
                  <option value="">Tutti</option>
                  <option value="DISPONIBILE">Disponibile</option>
                  <option value="IN TRATTATIVA">In trattativa</option>
                  <option value="VENDUTO">Venduto</option>
                  <option value="AFFITTATO">Affittato</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={resetFiltri}
                className="flex-1 py-3 rounded-xl border border-primary/20 text-primary font-medium"
              >
                Pulisci
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold"
              >
                Applica ({annunciFiltrati.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Griglia annunci */}
      <div className="flex-1 min-w-0 pb-24 lg:pb-0">
        {annunciFiltrati.length === 0 ? (
          <div className="text-center py-24 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5">
            <p className="text-secondary/80 text-lg font-medium">Nessun annuncio con questi filtri.</p>
            <button
              onClick={resetFiltri}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Pulisci filtri
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
            {annunciFiltrati.map((annuncio: Annuncio, i: number) => (
              <article
                key={annuncio.id}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col shadow-md shadow-primary/10 border border-primary/10 hover-lift animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
              >
                <div className="relative h-72 w-full bg-primary/5 overflow-hidden">
                  {annuncio.immagine_url ? (
                    <Image
                      src={annuncio.immagine_url}
                      alt={annuncio.titolo}
                      unoptimized
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <span className="text-primary/60 text-sm">Nessuna immagine</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg ${
                        annuncio.tipo_contratto === "IN VENDITA" ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      {annuncio.tipo_contratto}
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md ${
                        annuncio.stato === "DISPONIBILE"
                          ? "bg-white/95 text-secondary"
                          : annuncio.stato === "IN TRATTATIVA"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-black/70 text-white"
                      }`}
                    >
                      {annuncio.stato}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-secondary mb-3 line-clamp-2 min-h-[3.5rem] leading-snug">
                    {annuncio.titolo}
                  </h3>

                  <div className="flex items-start gap-2 text-secondary/75 text-sm mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="line-clamp-2">
                      {annuncio.provincia} · {annuncio.comune} · {annuncio.indirizzo}
                    </p>
                  </div>

                  <div className="text-2xl font-bold text-primary mb-5">
                    {formatPrice(annuncio.prezzo)}
                    {annuncio.tipo_contratto === "IN AFFITTO" && (
                      <span className="text-sm text-secondary/60 font-normal ml-1">/mese</span>
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-secondary/75 mb-6 py-4 border-y border-primary/10">
                    <div className="flex items-center gap-2">
                      <Maximize className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">{annuncio.superficie_mq} mq</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-primary" />
                      <span className="text-sm font-semibold">{annuncio.numero_locali} locali</span>
                    </div>
                  </div>

                  {annuncio.agenzia_nome && (
                    <div className="flex items-center gap-2 text-secondary/70 text-sm mb-4">
                      <Building2 className="w-4 h-4" />
                      <span className="line-clamp-1">{annuncio.agenzia_nome}</span>
                    </div>
                  )}

                  <p className="text-secondary/75 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {annuncio.descrizione}
                  </p>

                  <Link
                    href={`/vetrina/${annuncio.id}`}
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all btn-glow"
                  >
                    Vedi dettagli
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
