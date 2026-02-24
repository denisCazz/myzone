"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/vetrina", label: "Vetrina" },
  { href: "/valuta-casa", label: "Valuta casa" },
  { href: "/contatti", label: "Contatti" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/98 border-b border-primary/10 shadow-sm">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <div className="flex justify-between items-center h-16 md:h-[72px]">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.jpg"
              alt={siteConfig.name}
              width={140}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2.5 rounded-xl text-secondary/80 hover:text-primary hover:bg-primary/5 font-medium text-[15px] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="ml-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold text-sm transition-colors btn-glow"
            >
              <Phone className="w-4 h-4" />
              Chiamaci
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl text-secondary/80 hover:text-primary hover:bg-primary/5 transition-colors"
            aria-label="Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-primary/10 bg-white animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 rounded-xl text-secondary/80 hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              <Phone className="w-5 h-5" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
