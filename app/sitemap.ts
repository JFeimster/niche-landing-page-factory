import type { MetadataRoute } from "next";
import { loadData } from "@/lib/verticals";

export default function sitemap(): MetadataRoute.Sitemap {
  const { site, verticals } = loadData();

  const base = `https://${site.domain}`;
  const published = verticals.filter((v) => v.status === "published" && !v.seo.noindex);

  return [
    { url: base, lastModified: new Date() },
    ...published.map((v) => ({
      url: v.seo.canonical || `${base}/${v.slug}`,
      lastModified: new Date(),
    })),
  ];
}
