import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/moonshine";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig();
  const base = `https://${site.domain}`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
