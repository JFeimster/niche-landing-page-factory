import type { MetadataRoute } from "next";
import { loadData } from "@/lib/verticals";

export default function robots(): MetadataRoute.Robots {
  const { site } = loadData();
  const base = `https://${site.domain}`;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
