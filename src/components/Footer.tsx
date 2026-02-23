import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-secondary via-primary/95 to-secondary text-white overflow-hidden">
      {/* Sottile pattern decorativo */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/favicon.jpeg"
                alt="Logo Myzone"
                width={48}
                height={48}
                className="rounded-xl border-2 border-white/20 shadow-lg"
              />
              <span className="text-2xl font-bold">Myzone</span>
            </div>
            <p className="text-white/90 leading-relaxed mb-6 max-w-xs">
              La tua agenzia immobiliare di fiducia a Cavallermaggiore e dintorni.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-5">Link Rapidi</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/servizi', label: 'Servizi' },
                { href: '/vetrina', label: 'Vetrina Immobili' },
                { href: '/valuta-casa', label: 'Valuta la tua casa' },
                { href: '/admin/login', label: 'Accesso Admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-5">Contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/85">
                  Via Roma 78<br />
                  12030 Cavallermaggiore (CN)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:ufficio@myzone.casa" className="text-white/85 hover:text-white transition-colors">
                  ufficio@myzone.casa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Myzone Agenzia Immobiliare
          </p>
          <p className="text-white/70 text-sm">
            Realizzato da{' '}
            <a
              href="https://bitora.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              bitora.it
            </a>
          </p>
        </div>
      </div>

      {/* Bordo colorato in basso */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
    </footer>
  );
}
