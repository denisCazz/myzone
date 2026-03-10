import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const staticRoutes = [
  "",
  "/servizi",
  "/vetrina",
  "/valuta-casa",
  "/contatti",
  "/privacy-policy",
  "/cookie-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/vetrina" || path === "/valuta-casa" ? 0.9 : 0.7,
  }));

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return staticEntries;
  }

  const { data, error } = await supabase
    .from("annunci")
    .select("id, updated_at, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return staticEntries;
  }

  const listingEntries: MetadataRoute.Sitemap = data.map((annuncio) => ({
    url: `${siteConfig.url}/vetrina/${annuncio.id}`,
    lastModified: annuncio.updated_at ? new Date(annuncio.updated_at) : annuncio.created_at ? new Date(annuncio.created_at) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...listingEntries];
}
