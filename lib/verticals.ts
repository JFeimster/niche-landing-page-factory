import fs from "node:fs";
import path from "node:path";

// ---------- Types ----------
export type SiteConfig = {
  brandName: string;
  domain: string;
  defaultOgImage?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  compliance?: { disclaimerShort?: string };
};

export type VerticalSEO = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
};

export type VerticalHero = {
  h1: string;
  subhead?: string;
  bullets?: string[];
  image?: { src: string; alt: string };
};

export type VerticalOption = {
  id: string;
  title: string;
  oneLiner?: string;
  bestFor?: string[];
  watchOuts?: string[];
  cta?: { label: string; href: string };
  tags?: string[];
};

export type DecisionPath = {
  id: string;
  title: string;
  summary?: string;
  expect?: string[];
  cta?: { label: string; href: string };
};

export type VerticalDecisionTree = {
  headline?: string;
  paths?: DecisionPath[];
};

export type VerticalFAQ = { q: string; a: string };

export type InternalLink = { title: string; href: string };

export type VerticalConfig = {
  slug: string;
  status: "published" | "draft" | "archived";
  seo: VerticalSEO;
  hero?: VerticalHero;
  audience?: {
    bestFor?: string[];
    notFor?: string[];
  };
  options?: VerticalOption[];
  decisionTree?: VerticalDecisionTree;
  internalLinks?: {
    hubAnchors?: string[];
    recommendedSpokes?: InternalLink[];
  };
  faqs?: VerticalFAQ[];
  widgets?: {
    tallyEmbedUrl?: string;
    calendlyUrl?: string;
    chatWidget?: { provider?: string; enabled?: boolean };
  };
};

export type DataFile = {
  site: SiteConfig;
  verticals: VerticalConfig[];
};

// ---------- Data Loader ----------
export function loadData(): DataFile {
  const filePath = path.join(process.cwd(), "data", "verticals.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as DataFile;
}

export function getVertical(slug: string): { site: SiteConfig; vertical: VerticalConfig } | null {
  const data = loadData();
  const vertical = data.verticals.find((v) => v.slug === slug);
  if (!vertical) return null;
  return { site: data.site, vertical };
}

export function getPublishedVerticals(): { site: SiteConfig; verticals: VerticalConfig[] } {
  const data = loadData();
  return { site: data.site, verticals: data.verticals.filter((v) => v.status === "published") };
}

export function getAllVerticals(): { site: SiteConfig; verticals: VerticalConfig[] } {
  const data = loadData();
  return { site: data.site, verticals: data.verticals };
}
