import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/favicon.jpeg"
                alt="Logo Myzone"
                width={42}
                height={42}
                className="rounded-full border border-white/30"
              />
              <h3 className="text-2xl font-bold">Myzone</h3>
            </div>
            <p className="text-white/85 mb-4">
              La tua agenzia immobiliare di fiducia a Cavallermaggiore e dintorni.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/85 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white/85 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Link Rapidi</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/85 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/servizi" className="text-white/85 hover:text-white transition-colors">
                  Servizi
                </Link>
              </li>
              <li>
                <Link href="/vetrina" className="text-white/85 hover:text-white transition-colors">
                  Vetrina Immobili
                </Link>
              </li>
              <li>
                <Link href="/valuta-casa" className="text-white/85 hover:text-white transition-colors">
                  Valuta la tua casa
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-white/85 hover:text-white transition-colors">
                  Accesso Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
                <span className="text-white/85">
                  Via Roma 78<br />
                  12030 Cavallermaggiore (CN)
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href="mailto:ufficio@myzone.casa" className="text-white/85 hover:text-white transition-colors">
                  ufficio@myzone.casa
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/65 text-sm space-y-2">
          <p>&copy; {new Date().getFullYear()} Myzone Agenzia Immobiliare. Tutti i diritti riservati.</p>
          <p>
            Realizzato da{' '}
            <a
              href="https://bitora.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white underline underline-offset-4"
            >
              bitora.it
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
