import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getSupabaseServerClient } from "@/lib/supabase-server";

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/vetrina", changeFrequency: "daily", priority: 0.95 },
  { path: "/servizi", changeFrequency: "monthly", priority: 0.9 },
  { path: "/valuta-casa", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contatti", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
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
