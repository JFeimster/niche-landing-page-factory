import type { MetadataRoute } from "next";
import { loadData } from "@/lib/verticals";

export default function sitemap(): MetadataRoute.Sitemap {
  const data = loadData();
  const base = data.site.domain.startsWith("http")
    ? data.site.domain
    : `https://${data.site.domain}`;

  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const verticalUrls: MetadataRoute.Sitemap = data.verticals
    .filter((v) => v.status === "published" && !v.seo?.noindex)
    .map((v) => ({
      url: `${base}/${v.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticUrls, ...verticalUrls];
}
