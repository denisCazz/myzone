import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
};

export default function PageHero({ badge, title, subtitle }: Props) {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <Image
        src={siteConfig.images.hero}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-white/90 font-bold mb-4">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight [text-shadow:_0_2px_12px_rgb(0_0_0_/_0.5)]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-white/95 max-w-2xl mx-auto [text-shadow:_0_1px_6px_rgb(0_0_0_/_0.4)]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
