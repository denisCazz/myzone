"use client";

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type ImageCarouselProps = {
  images: string[];
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  showThumbnails?: boolean;
  thumbnailsMobileOnly?: boolean;
  roundedClassName?: string;
  enableLightbox?: boolean;
  mobileContain?: boolean;
};

function isRemoteImageUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://');
}

export default function ImageCarousel({
  images,
  alt,
  className = 'aspect-[4/3]',
  sizes = '100vw',
  priority = false,
  showThumbnails = false,
  thumbnailsMobileOnly = false,
  roundedClassName = 'rounded-2xl',
  enableLightbox = false,
  mobileContain = false,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((currentIndex) => (currentIndex - 1 + safeImages.length) % safeImages.length);
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((currentIndex) => (currentIndex + 1) % safeImages.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, safeImages.length]);

  if (safeImages.length === 0) {
    return (
      <div className={`relative overflow-hidden bg-primary/5 ${roundedClassName} ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center text-sm text-primary/60">
          Nessuna immagine disponibile
        </div>
      </div>
    );
  }

  const goTo = (index: number) => {
    const nextIndex = (index + safeImages.length) % safeImages.length;
    setActiveIndex(nextIndex);
  };

  const activeImage = safeImages[activeIndex] || safeImages[0];
  const activeImageIsRemote = isRemoteImageUrl(activeImage);
  const mainImageClassName = mobileContain
    ? 'pointer-events-none select-none object-contain object-center p-2 sm:p-0 sm:object-cover'
    : 'pointer-events-none select-none object-cover';

  return (
    <div className="space-y-3">
      <div className={`relative overflow-hidden bg-slate-100 ${roundedClassName} ${className}`}>
        {enableLightbox ? (
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute inset-0 z-[1] block cursor-zoom-in"
            aria-label={`Apri immagine ${activeIndex + 1} a schermo intero`}
          >
            <Image
              src={activeImage}
              alt={`${alt} - immagine ${activeIndex + 1}`}
              fill
              className={mainImageClassName}
              sizes={sizes}
              priority={priority}
              unoptimized={activeImageIsRemote}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              onContextMenu={(event) => event.preventDefault()}
            />
          </button>
        ) : (
          <Image
            src={activeImage}
            alt={`${alt} - immagine ${activeIndex + 1}`}
            fill
            className={mainImageClassName}
            sizes={sizes}
            priority={priority}
            unoptimized={activeImageIsRemote}
            draggable={false}
            onDragStart={(event) => event.preventDefault()}
            onContextMenu={(event) => event.preventDefault()}
          />
        )}

        {safeImages.length > 1 && (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm sm:right-4 sm:top-4">
            {activeIndex + 1} / {safeImages.length}
          </div>
        )}

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/70 sm:left-3 sm:h-10 sm:w-10"
              aria-label="Immagine precedente"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/70 sm:right-3 sm:h-10 sm:w-10"
              aria-label="Immagine successiva"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-1.5 px-3 sm:bottom-3 sm:gap-2 sm:px-4">
              {safeImages.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/60'}`}
                  aria-label={`Vai all'immagine ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {showThumbnails && safeImages.length > 1 && (
        <div className={`${thumbnailsMobileOnly ? 'sm:hidden' : ''} -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-3 sm:overflow-visible sm:px-0`}>
          {safeImages.map((imageUrl, index) => (
            <button
              key={`${imageUrl}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              className={`relative aspect-[4/3] min-w-[76px] overflow-hidden rounded-xl border transition-colors sm:min-w-0 ${index === activeIndex ? 'border-primary shadow-sm shadow-primary/20' : 'border-primary/10 hover:border-primary/30'}`}
              aria-label={`Seleziona l'immagine ${index + 1}`}
            >
              <Image
                src={imageUrl}
                alt={`${alt} miniatura ${index + 1}`}
                fill
                className="pointer-events-none select-none object-cover"
                sizes="160px"
                unoptimized={isRemoteImageUrl(imageUrl)}
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onContextMenu={(event) => event.preventDefault()}
              />
            </button>
          ))}
        </div>
      )}

      {enableLightbox && isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} a schermo intero`}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Chiudi immagine a schermo intero"
          >
            <X className="h-5 w-5" />
          </button>

          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(activeIndex - 1);
                }}
                className="absolute left-4 top-1/2 z-[101] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Immagine precedente"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(activeIndex + 1);
                }}
                className="absolute right-4 top-1/2 z-[101] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Immagine successiva"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-full max-h-[90vh] w-full">
              <Image
                src={activeImage}
                alt={`${alt} - immagine ${activeIndex + 1} a schermo intero`}
                fill
                className="object-contain"
                sizes="100vw"
                unoptimized={activeImageIsRemote}
                priority
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
                onContextMenu={(event) => event.preventDefault()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
