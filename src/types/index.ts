export interface Annuncio {
  id: string;
  titolo: string;
  descrizione: string;
  prezzo: number;
  mq: number;
  numero_stanze: number;
  immagine_url: string;
  tipologia: 'vendita' | 'affitto';
  created_at?: string;
}
