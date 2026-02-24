"use client";

import Image from "next/image";
import { useState } from "react";
import { Home, Calculator, Wrench, Zap } from "lucide-react";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  valutazioni: Home,
  consulenzaFinanziaria: Calculator,
  consulenzaTecnica: Wrench,
  gestioneUtenze: Zap,
};

type Props = {
  src: string;
  alt: string;
  fallbackIconKey: keyof typeof icons;
  className?: string;
  fill?: boolean;
  sizes?: string;
};

export default function ServizioImage({ src, alt, fallbackIconKey, className, fill, sizes }: Props) {
  const [hasError, setHasError] = useState(false);
  const Icon = icons[fallbackIconKey] ?? Home;

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5">
        <div className="w-20 h-20 rounded-2xl bg-white/80 border border-primary/20 flex items-center justify-center text-primary shadow-lg">
          <Icon className="w-10 h-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent md:from-primary/70 md:via-primary/30 md:to-transparent pointer-events-none" />
    </>
  );
}
