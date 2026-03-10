import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import ValutaCasaClient from './ValutaCasaClient';

export const metadata: Metadata = {
  title: 'Valuta la tua casa',
  description:
    'Richiedi una valutazione immobiliare professionale con MyZone a Cavallermaggiore e dintorni. Compila il modulo e ricevi una stima senza impegno.',
  alternates: {
    canonical: '/valuta-casa',
  },
  openGraph: {
    url: '/valuta-casa',
    title: 'Valuta la tua casa | MyZone',
    description:
      'Richiedi una valutazione immobiliare senza impegno con supporto professionale e conoscenza del mercato locale.',
    images: [
      {
        url: `${siteConfig.url}${siteConfig.images.hero}`,
        width: 1200,
        height: 630,
        alt: 'Valutazione casa MyZone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valuta la tua casa | MyZone',
    description:
      'Richiedi una valutazione immobiliare senza impegno a Cavallermaggiore e dintorni.',
    images: [`${siteConfig.url}${siteConfig.images.hero}`],
  },
};

export default function ValutaCasaPage() {
  return <ValutaCasaClient />;
}
