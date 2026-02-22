"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <Image
                src="/favicon.jpeg"
                alt="Logo Myzone"
                width={44}
                height={44}
                className="rounded-full border-2 border-primary/30"
              />
              <span className="text-3xl font-bold text-primary tracking-tight">Myzone</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="/servizi" className="text-secondary hover:text-primary font-medium transition-colors">
              Servizi
            </Link>
            <Link href="/vetrina" className="text-secondary hover:text-primary font-medium transition-colors">
              Vetrina
            </Link>
            
            {/* Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                className="flex items-center text-secondary hover:text-primary font-medium transition-colors"
              >
                Vendo Casa <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <Link 
                    href="/valuta-casa" 
                    className="block px-4 py-2 text-sm text-secondary hover:bg-black/5 hover:text-primary"
                  >
                    Valuta casa
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary hover:bg-black/5 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-black/5"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/servizi" 
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-black/5"
              onClick={() => setIsOpen(false)}
            >
              Servizi
            </Link>
            <Link 
              href="/vetrina" 
              className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-black/5"
              onClick={() => setIsOpen(false)}
            >
              Vetrina
            </Link>
            <div className="px-3 py-2">
              <div className="text-base font-medium text-secondary mb-2">Vendo Casa</div>
              <Link 
                href="/valuta-casa" 
                className="block pl-4 py-2 rounded-md text-sm font-medium text-secondary hover:text-primary hover:bg-black/5"
                onClick={() => setIsOpen(false)}
              >
                Valuta casa
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
