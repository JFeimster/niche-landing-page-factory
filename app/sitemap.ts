import type { MetadataRoute } from "next";
import { getBlogPosts, getPublishedPages, getSiteConfig } from "@/lib/moonshine";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const base = `https://${site.domain}`;

  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/book`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/industries`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const verticalUrls: MetadataRoute.Sitemap = getPublishedPages()
    .filter((page) => !page.seo.noindex)
    .map((page) => ({
      url: `${base}${page.path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const blogUrls: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticUrls, ...verticalUrls, ...blogUrls];
}
