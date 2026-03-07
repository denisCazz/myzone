import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "**",
  },
  {
    protocol: "http",
    hostname: "**",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
];

if (process.env.CLOUDFLARE_R2_PUBLIC_URL) {
  try {
    const publicUrl = new URL(process.env.CLOUDFLARE_R2_PUBLIC_URL);
    remotePatterns.push({
      protocol: publicUrl.protocol.replace(":", "") as "http" | "https",
      hostname: publicUrl.hostname,
      pathname: `${publicUrl.pathname.replace(/\/$/, "") || ""}/**`,
    });
  } catch {
    // Ignora URL non valide in fase di build.
  }
}

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: "64mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80],
    remotePatterns,
  },
};

export default nextConfig;
