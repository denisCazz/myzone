import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import ValutaCasaClient from './ValutaCasaClient';

export const metadata: Metadata = {
  title: 'Valutazione Casa Gratuita a Cavallermaggiore e dintorni',
  description:
    'Richiedi una valutazione immobiliare gratuita e senza impegno a Cavallermaggiore, Savigliano, Racconigi, Saluzzo e Fossano. MyZone: stima professionale basata sul mercato locale della provincia di Cuneo.',
  alternates: {
    canonical: '/valuta-casa',
  },
  openGraph: {
    url: '/valuta-casa',
    title: 'Valutazione Casa Gratuita a Cavallermaggiore | MyZone',
    description:
      'Valutazione immobiliare professionale e senza impegno a Cavallermaggiore e provincia di Cuneo. Compila il modulo e ricevi una stima accurata.',
    images: [
      {
        url: `${siteConfig.url}${siteConfig.images.hero}`,
        width: 1200,
        height: 630,
        alt: 'Valutazione casa gratuita MyZone a Cavallermaggiore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valutazione Casa Gratuita a Cavallermaggiore | MyZone',
    description:
      'Valutazione immobiliare senza impegno a Cavallermaggiore, Savigliano, Racconigi e provincia di Cuneo.',
    images: [`${siteConfig.url}${siteConfig.images.hero}`],
  },
};

export default function ValutaCasaPage() {
  return <ValutaCasaClient />;
}
