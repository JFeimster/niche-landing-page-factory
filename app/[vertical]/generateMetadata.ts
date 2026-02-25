import type { Metadata } from "next";
import { getVerticalConfig } from "../../lib/verticals";

export async function generateMetadata({ params }: { params: { vertical: string } }): Promise<Metadata> {
  const config = getVerticalConfig(params.vertical);
  if (!config) return { title: "", description: "" };

  return {
    title: config.seoTitle,
    description: config.metaDescription,
    openGraph: {
      title: config.seoTitle,
      description: config.metaDescription,
    },
  };
}
