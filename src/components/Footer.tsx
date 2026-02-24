import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/vetrina", label: "Vetrina" },
  { href: "/valuta-casa", label: "Valuta casa" },
  { href: "/contatti", label: "Contatti" },
  { href: "/admin/login", label: "Accesso Admin" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
        <Link href="/" className="inline-block mb-8">
          <Image
            src={siteConfig.images.logo}
            alt={siteConfig.name}
            width={220}
            height={80}
            className="h-14 md:h-16 w-auto object-contain mx-auto drop-shadow-lg"
          />
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-white/85 mb-8">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.fullAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <MapPin className="w-4 h-4" />
            {siteConfig.fullAddress}
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
            {siteConfig.email}
          </a>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} {siteConfig.name} ·{" "}
          <a href="https://bitora.it" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
            bitora.it
          </a>
        </p>
      </div>
    </footer>
  );
}
