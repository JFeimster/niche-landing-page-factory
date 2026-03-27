import assetsJson from "@/data/moonshine/assets.json";
import bankingControlJson from "@/data/moonshine/banking.control.json";
import chiropractorsControlJson from "@/data/moonshine/chiropractors.control.json";
import creditControlJson from "@/data/moonshine/credit.control.json";
import dacTeamControlJson from "@/data/moonshine/dac-team.control.json";
import autoRepairControlJson from "@/data/moonshine/auto-repair.control.json";
import cleaningServicesControlJson from "@/data/moonshine/cleaning-services.control.json";
import daycareCentersControlJson from "@/data/moonshine/daycare-centers.control.json";
import ecomControlJson from "@/data/moonshine/ecom.control.json";
import ecomSellersControlJson from "@/data/moonshine/ecom-sellers.control.json";
import fundingControlJson from "@/data/moonshine/funding.control.json";
import gymsControlJson from "@/data/moonshine/gyms.control.json";
import hvacControlJson from "@/data/moonshine/hvac.control.json";
import landscapersControlJson from "@/data/moonshine/landscapers.control.json";
import manifestJson from "@/data/moonshine/manifest.json";
import moonshineControlJson from "@/data/moonshine/moonshine.control.json";
import movingCompaniesControlJson from "@/data/moonshine/moving-companies.control.json";
import pestControlControlJson from "@/data/moonshine/pest-control.control.json";
import plumbersControlJson from "@/data/moonshine/plumbers.control.json";
import propertyManagementControlJson from "@/data/moonshine/property-management.control.json";
import realEstateControlJson from "@/data/moonshine/real-estate.control.json";
import restaurantsControlJson from "@/data/moonshine/restaurants.control.json";
import routesJson from "@/data/moonshine/routes.json";
import salonsControlJson from "@/data/moonshine/salons.control.json";
import securityCompaniesControlJson from "@/data/moonshine/security-companies.control.json";
import solarInstallersControlJson from "@/data/moonshine/solar-installers.control.json";
import toolsControlJson from "@/data/moonshine/tools.control.json";
import veterinariansControlJson from "@/data/moonshine/veterinarians.control.json";

type Cta = { label: string; href: string };

export type VerticalProof = {
  title: string;
  description?: string;
  stat?: string;
  source?: string;
};

export type VerticalUseCase = {
  title: string;
  description: string;
  fit?: string[];
};

export type VerticalObjection = {
  q: string;
  a: string;
};

export type VerticalFAQ = {
  q: string;
  a: string;
};

export type VerticalCtaBlock = {
  label: string;
  href: string;
  description?: string;
};

export type MoonshineManifest = {
  version: string;
  generatedFor: string;
  files: Array<{ label: string; path: string; filename: string }>;
  guarantee?: string;
};

export type MoonshineRoute = {
  id: string;
  host: string;
  path: string;
  pageType?: string;
  title?: string;
  layout?: string;
  nav?: string[];
  collections?: string[];
  featuredAssets?: string[];
  assetOrder?: string[];
  heroAsset?: string;
  primaryCta?: { label?: string; type?: string; url?: string; funnelId?: string };
  secondaryCta?: { label?: string; type?: string; url?: string; funnelId?: string };
};

type MoonshineHost = {
  host: string;
  brandId: string;
  fallbackRouteId: string;
  aliases?: string[];
};

type MoonshineBrand = {
  id: string;
  name: string;
  primaryDomain: string;
  theme?: { primaryColor?: string; accentColor?: string; background?: string };
};

export type MoonshineRoutes = {
  version: string;
  defaultBrandId?: string;
  brands: MoonshineBrand[];
  hosts: MoonshineHost[];
  routes: MoonshineRoute[];
  routingRules?: {
    pathFallbackExamples?: Record<string, string>;
  };
};

export type MoonshineAsset = {
  id: string;
  type: string;
  category?: string;
  visibility?: string;
  title?: string;
  description?: string;
  url?: string;
  provider?: string;
};

export type MoonshineAssets = {
  version: string;
  generatedFor?: string;
  defaultBrandId?: string;
  assetTypes: string[];
  assets: MoonshineAsset[];
  collections: Record<string, string[]>;
};

type MoonshineContentSources = {
  notion: string[];
  repos: string[];
  sites: string[];
  templates: string[];
};

type MoonshineHero = {
  headline?: string;
  subheadline?: string;
  bullets?: string[];
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  primaryCtaType?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
};

type MoonshineSeo = {
  title?: string;
  description?: string;
  noindex?: boolean;
};

type MoonshineRouteRef = {
  host: string;
  path: string;
};

type MoonshineCtaRoutes = {
  primaryApplyUrl?: string;
  overviewUrl?: string;
  communityUrl?: string;
};

type MoonshineItem = {
  id?: string;
  title?: string;
  label?: string;
  href?: string;
  url?: string;
  summary?: string;
  description?: string;
  bestFor?: string;
};

export type MoonshineControl = {
  id: string;
  slug: string;
  label: string;
  brandId: string;
  brandName: string;
  route: MoonshineRouteRef;
  aliasPaths?: string[];
  sourceRouteId?: string;
  theme?: { primaryColor?: string; accentColor?: string; background?: string };
  contentSources: MoonshineContentSources;
  pageType?: string;
  layout?: string;
  seo?: MoonshineSeo;
  hero?: MoonshineHero;
  faqs?: VerticalFAQ[];
  navigationRouteIds?: string[];
  collections?: string[];
  featuredAssets?: string[];
  assetOrder?: string[];
  sections?: string[];
  problem?: string[];
  solution?: string;
  benefits?: string[];
  proof?: VerticalProof[];
  howItWorks?: string[];
  useCases?: VerticalUseCase[];
  objections?: VerticalObjection[];
  finalCta?: VerticalCtaBlock;
  fundingCategories?: MoonshineItem[];
  creditCategories?: MoonshineItem[];
  bankingCategories?: MoonshineItem[];
  categories?: string[];
  dealTypes?: string[];
  partners?: MoonshineItem[];
  relatedGuides?: MoonshineItem[];
  partnershipModel?: MoonshineItem[];
  ctaRoutes?: MoonshineCtaRoutes;
  leadCapture?: Record<string, string>;
  brief?: PageBrief;
};

type MoonshineData = {
  manifest: MoonshineManifest;
  routes: MoonshineRoutes;
  assets: MoonshineAssets;
  controls: MoonshineControl[];
};

type CategoryGroup = {
  title: string;
  items: string[];
};

export type PageFamily = "partner-vertical" | "location" | "comparison" | "guide";

export type PageSchemaType = "WebPage" | "FAQPage" | "Article" | "ItemList";

export type PageBrief = {
  targetKeyword: string;
  searchIntent: string;
  audience: string;
  uniqueValueProposition: string;
  proofPoints: string[];
  faqIdeas: string[];
  internalLinks: string[];
  schemaType: PageSchemaType;
  manualNotes?: string;
};

export type GeneratedPageSection = {
  key: string;
  eyebrow: string;
  title: string;
  description?: string;
  bullets?: string[];
  cards?: Array<{ title: string; description: string }>;
  cta?: Cta;
};

export type GeneratedPageContent = {
  family: PageFamily;
  brief: PageBrief;
  seo: {
    titleTag: string;
    metaDescription: string;
    h1: string;
    headingOutline: string[];
    canonicalIntent: string;
    schemaType: PageSchemaType;
  };
  sections: GeneratedPageSection[];
  internalLinks: Array<{ title: string; href: string; reason: string }>;
  safeguards: Array<{ label: string; status: "pass" | "warn"; detail: string }>;
  faqSchema: VerticalFAQ[];
};

export type ResolvedPage = {
  control: MoonshineControl;
  route: MoonshineRoute | null;
  host: string;
  path: string;
  slug: string;
  pageType: string;
  layout: string;
  brief: PageBrief;
  seo: Required<Pick<MoonshineSeo, "title" | "description">> & Pick<MoonshineSeo, "noindex">;
  generated: GeneratedPageContent;
  hero: {
    headline: string;
    subheadline?: string;
    bullets?: string[];
    primaryCta?: Cta;
    secondaryCta?: Cta;
  };
  landing: {
    problem: string[];
    solution?: string;
    benefits: string[];
    proof: VerticalProof[];
    howItWorks: string[];
    useCases: VerticalUseCase[];
    objections: VerticalObjection[];
    finalCta?: VerticalCtaBlock;
  };
  sections: string[];
  categoryGroups: CategoryGroup[];
  faqs: VerticalFAQ[];
  relatedGuides: Array<{ title: string; href: string }>;
  navigation: Array<{ title: string; href: string }>;
  collectionNames: string[];
  contentSources: MoonshineContentSources;
  resolvedAssets: MoonshineAsset[];
  collectionAssets: MoonshineAsset[];
  brand: MoonshineBrand | null;
};

type ResolvePageInput = {
  host?: string | null;
  path: string;
};

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

const manifest = manifestJson as MoonshineManifest;
const routes = routesJson as MoonshineRoutes;
const assets = assetsJson as MoonshineAssets;

const controlsByFilename: Record<string, MoonshineControl> = {
  "auto-repair.control.json": autoRepairControlJson as MoonshineControl,
  "chiropractors.control.json": chiropractorsControlJson as MoonshineControl,
  "cleaning-services.control.json": cleaningServicesControlJson as MoonshineControl,
  "daycare-centers.control.json": daycareCentersControlJson as MoonshineControl,
  "moonshine.control.json": moonshineControlJson as MoonshineControl,
  "ecom-sellers.control.json": ecomSellersControlJson as MoonshineControl,
  "real-estate.control.json": realEstateControlJson as MoonshineControl,
  "dac-team.control.json": dacTeamControlJson as MoonshineControl,
  "ecom.control.json": ecomControlJson as MoonshineControl,
  "funding.control.json": fundingControlJson as MoonshineControl,
  "gyms.control.json": gymsControlJson as MoonshineControl,
  "hvac.control.json": hvacControlJson as MoonshineControl,
  "landscapers.control.json": landscapersControlJson as MoonshineControl,
  "moving-companies.control.json": movingCompaniesControlJson as MoonshineControl,
  "pest-control.control.json": pestControlControlJson as MoonshineControl,
  "plumbers.control.json": plumbersControlJson as MoonshineControl,
  "property-management.control.json": propertyManagementControlJson as MoonshineControl,
  "tools.control.json": toolsControlJson as MoonshineControl,
  "banking.control.json": bankingControlJson as MoonshineControl,
  "credit.control.json": creditControlJson as MoonshineControl,
  "restaurants.control.json": restaurantsControlJson as MoonshineControl,
  "salons.control.json": salonsControlJson as MoonshineControl,
  "security-companies.control.json": securityCompaniesControlJson as MoonshineControl,
  "solar-installers.control.json": solarInstallersControlJson as MoonshineControl,
  "veterinarians.control.json": veterinariansControlJson as MoonshineControl,
};

function normalizeHost(host?: string | null): string {
  if (!host) return "";
  return host.toLowerCase().replace(/:\d+$/, "");
}

function normalizePath(path: string): string {
  if (!path) return "/";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

function toTitleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .map((part) => (part ? `${part[0].toUpperCase()}${part.slice(1)}` : part))
    .join(" ");
}

function toHrefFromRouteCta(cta?: { url?: string; funnelId?: string }): string | undefined {
  if (!cta) return undefined;
  if (cta.url) return cta.url;
  if (cta.funnelId) return `/${cta.funnelId}`;
  return undefined;
}

function toLabelFromRouteCta(cta?: { label?: string; type?: string }): string | undefined {
  if (cta?.label) return cta.label;
  if (cta?.type === "form") return "Apply";
  return undefined;
}

function dedupeById(items: MoonshineAsset[]): MoonshineAsset[] {
  const seen = new Set<string>();
  const deduped: MoonshineAsset[] = [];
  for (const item of items) {
    if (!item.id || seen.has(item.id)) continue;
    seen.add(item.id);
    deduped.push(item);
  }
  return deduped;
}

function findHostConfig(host: string): MoonshineHost | null {
  for (const candidate of routes.hosts || []) {
    const candidateHost = normalizeHost(candidate.host);
    if (candidateHost === host) return candidate;
    const aliases = (candidate.aliases || []).map((alias) => normalizeHost(alias));
    if (aliases.includes(host)) return candidate;
  }
  return null;
}

function findRouteById(id?: string): MoonshineRoute | null {
  if (!id) return null;
  return routes.routes.find((route) => route.id === id) || null;
}

function findControlForRoute(route: MoonshineRoute | null): MoonshineControl | null {
  if (!route) return null;
  const bySourceId = allControls.find((control) => control.sourceRouteId === route.id);
  if (bySourceId) return bySourceId;
  return (
    allControls.find(
      (control) =>
        normalizeHost(control.route.host) === normalizeHost(route.host) &&
        normalizePath(control.route.path) === normalizePath(route.path),
    ) || null
  );
}

function findControlByPath(path: string): MoonshineControl | null {
  const normalizedPath = normalizePath(path);
  const matches = allControls.filter((control) => normalizePath(control.route.path) === normalizedPath);
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) {
    const defaultHost = normalizeHost(getPrimaryDomain());
    return matches.find((control) => normalizeHost(control.route.host) === defaultHost) || matches[0];
  }
  return null;
}

function normalizeCategoryGroups(control: MoonshineControl): CategoryGroup[] {
  const groups: CategoryGroup[] = [];

  if (control.fundingCategories?.length) {
    groups.push({
      title: "Funding Categories",
      items: control.fundingCategories.map((item) => item.label || item.title || item.id || "Untitled"),
    });
  }

  if (control.creditCategories?.length) {
    groups.push({
      title: "Credit Categories",
      items: control.creditCategories.map((item) => item.label || item.title || item.id || "Untitled"),
    });
  }

  if (control.bankingCategories?.length) {
    groups.push({
      title: "Banking Categories",
      items: control.bankingCategories.map((item) => item.label || item.title || item.id || "Untitled"),
    });
  }

  if (control.categories?.length) {
    groups.push({
      title: "Categories",
      items: control.categories,
    });
  }

  if (control.dealTypes?.length) {
    groups.push({
      title: "Deal Types",
      items: control.dealTypes,
    });
  }

  if (control.partnershipModel?.length) {
    groups.push({
      title: "Partnership Models",
      items: control.partnershipModel.map((item) => {
        const name = item.label || item.title || item.id || "Untitled";
        return item.bestFor ? `${name}: ${item.bestFor}` : name;
      }),
    });
  }

  return groups;
}

function normalizeRelatedGuides(control: MoonshineControl): Array<{ title: string; href: string }> {
  if (!control.relatedGuides?.length) return [];
  return control.relatedGuides
    .map((guide) => {
      const href = toItemHref(guide);
      const title = toItemTitle(guide);
      if (!href || !title) return null;
      return { title, href };
    })
    .filter((guide): guide is { title: string; href: string } => Boolean(guide));
}

function normalizeLandingContent(control: MoonshineControl): ResolvedPage["landing"] {
  return {
    problem: control.problem || [],
    solution: control.solution,
    benefits: control.benefits || control.hero?.bullets || [],
    proof: control.proof || [],
    howItWorks: control.howItWorks || [],
    useCases: control.useCases || [],
    objections: control.objections || [],
    finalCta: control.finalCta,
  };
}

function compactStrings(values: Array<string | undefined | null>): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => (typeof value === "string" ? value.trim() : ""))
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function toItemTitle(item: MoonshineItem | string | null | undefined): string {
  if (typeof item === "string") return item;
  return item?.title || item?.label || item?.id || "";
}

function toItemHref(item: MoonshineItem | string | null | undefined): string {
  if (typeof item === "string") return "";
  return item?.href || item?.url || "";
}

function stripBrandSuffix(value: string): string {
  return value.replace(/\s*\|\s*[^|]+$/u, "").trim();
}

function inferPageFamily(control: MoonshineControl, route: MoonshineRoute | null): PageFamily {
  const path = normalizePath(control.route.path || route?.path || "");
  const host = normalizeHost(control.route.host || route?.host || "");
  const pageType = (control.pageType || route?.pageType || "").toLowerCase();
  const layout = (control.layout || route?.layout || "").toLowerCase();

  if (path.startsWith("/compare") || pageType.includes("comparison") || layout.includes("comparison")) return "comparison";
  if (path.startsWith("/location") || pageType.includes("location") || layout.includes("location")) return "location";
  if (host.startsWith("blog.") || pageType === "content-hub" || layout.includes("blog")) return "guide";
  return "partner-vertical";
}

function buildPageBrief(control: MoonshineControl, route: MoonshineRoute | null): PageBrief {
  const family = inferPageFamily(control, route);
  const heroBullets = compactStrings(control.hero?.bullets || []);
  const proofPoints = compactStrings([
    ...(control.proof || []).flatMap((item) => [item.title, item.description, item.stat, item.source]),
    ...(control.useCases || []).flatMap((item) => [item.title, item.description, ...(item.fit || [])]),
    ...(control.partnershipModel || []).flatMap((item) => [item.label, item.bestFor]),
    ...heroBullets,
  ]);
  const faqIdeas = compactStrings([
    ...(control.faqs || []).map((faq) => faq.q),
    ...(control.objections || []).map((objection) => objection.q),
  ]);
  const internalLinks = compactStrings([
    ...(control.relatedGuides || []).map((item) => toItemTitle(item)),
    ...(control.navigationRouteIds || []).map((routeId) => findRouteById(routeId)?.title || toTitleCase(routeId)),
  ]);

  const titleBase = stripBrandSuffix(control.seo?.title || control.hero?.headline || control.label);
  const targetKeyword =
    family === "guide"
      ? `${titleBase} guide`
      : family === "comparison"
        ? `${titleBase} comparison`
        : family === "location"
          ? `${titleBase} location page`
          : `${control.label} partner page`;

  const searchIntent =
    family === "guide"
      ? "Educational / informational"
      : family === "comparison"
        ? "Commercial investigation / compare options"
        : family === "location"
          ? "Local intent / service-area discovery"
          : "Commercial / partner acquisition";

  const audience =
    control.brief?.audience ||
    (family === "guide"
      ? "operators looking for practical funding guidance"
      : family === "comparison"
        ? "buyers comparing options before they choose"
        : family === "location"
          ? "buyers searching for service coverage in a region"
          : `${control.brandName} partner candidates`);

  const uniqueValueProposition =
    control.brief?.uniqueValueProposition ||
    control.seo?.description ||
    control.hero?.subheadline ||
    `${control.label} positioned with vertical-specific proof and clear next steps.`;

  const schemaType: PageSchemaType =
    control.brief?.schemaType ||
    (family === "guide" ? "Article" : faqIdeas.length > 0 ? "FAQPage" : family === "comparison" ? "ItemList" : "WebPage");

  return {
    targetKeyword,
    searchIntent,
    audience,
    uniqueValueProposition,
    proofPoints: proofPoints.slice(0, 12),
    faqIdeas: faqIdeas.slice(0, 8),
    internalLinks: internalLinks.slice(0, 8),
    schemaType,
    manualNotes: control.brief?.manualNotes,
  };
}

function buildGeneratedSections(
  family: PageFamily,
  control: MoonshineControl,
  brief: PageBrief,
  landing: ResolvedPage["landing"],
  primaryCta?: Cta,
): GeneratedPageSection[] {
  const faqCards = (control.faqs || []).map((faq) => ({ title: faq.q, description: faq.a }));
  const proofCards = landing.proof.map((item) => ({
    title: item.title,
    description: compactStrings([item.description, item.stat, item.source]).join(" • "),
  }));

  if (family === "guide") {
    return [
      {
        key: "hero",
        eyebrow: "Guide",
        title: control.hero?.headline || brief.targetKeyword,
        description: control.hero?.subheadline || brief.uniqueValueProposition,
        bullets: compactStrings([...(control.hero?.bullets || []), ...brief.proofPoints]).slice(0, 4),
      },
      {
        key: "takeaways",
        eyebrow: "Takeaways",
        title: "What the reader should learn",
        bullets: brief.proofPoints.slice(0, 4),
      },
      {
        key: "steps",
        eyebrow: "How to use it",
        title: "Actionable steps and next moves",
        bullets: compactStrings([...landing.howItWorks, ...brief.internalLinks]).slice(0, 4),
      },
      {
        key: "faq",
        eyebrow: "FAQ",
        title: "Fast answers to common questions",
        cards: faqCards.slice(0, 4),
      },
      {
        key: "cta",
        eyebrow: "CTA",
        title: "Turn the guidance into action",
        description: control.finalCta?.description || brief.uniqueValueProposition,
        cta: primaryCta,
      },
    ];
  }

  if (family === "comparison") {
    return [
      {
        key: "hero",
        eyebrow: "Comparison",
        title: control.hero?.headline || brief.targetKeyword,
        description: control.hero?.subheadline || brief.uniqueValueProposition,
        bullets: compactStrings([...(control.hero?.bullets || []), ...brief.proofPoints]).slice(0, 4),
      },
      {
        key: "alternatives",
        eyebrow: "Alternatives",
        title: "Who each option is best for",
        cards: proofCards.slice(0, 4),
      },
      {
        key: "decision",
        eyebrow: "Decision guide",
        title: "How to choose the right fit",
        bullets: compactStrings([landing.solution, ...landing.howItWorks, ...brief.internalLinks]).slice(0, 4),
      },
      {
        key: "faq",
        eyebrow: "FAQ",
        title: "What buyers usually ask before deciding",
        cards: faqCards.slice(0, 4),
      },
      {
        key: "cta",
        eyebrow: "CTA",
        title: "Move from comparison to conversion",
        description: control.finalCta?.description || brief.uniqueValueProposition,
        cta: primaryCta,
      },
    ];
  }

  if (family === "location") {
    return [
      {
        key: "hero",
        eyebrow: "Location",
        title: control.hero?.headline || brief.targetKeyword,
        description: control.hero?.subheadline || brief.uniqueValueProposition,
        bullets: compactStrings([...(control.hero?.bullets || []), ...brief.proofPoints]).slice(0, 4),
      },
      {
        key: "service-area",
        eyebrow: "Coverage",
        title: "Where this page fits in the local search journey",
        bullets: compactStrings([landing.solution, ...landing.useCases.map((useCase) => useCase.title)]).slice(0, 4),
      },
      {
        key: "proof",
        eyebrow: "Proof",
        title: "Trust signals that make the page feel local and real",
        cards: proofCards.slice(0, 4),
      },
      {
        key: "faq",
        eyebrow: "FAQ",
        title: "Local buyer questions",
        cards: faqCards.slice(0, 4),
      },
      {
        key: "cta",
        eyebrow: "CTA",
        title: "Make the next step obvious",
        description: control.finalCta?.description || brief.uniqueValueProposition,
        cta: primaryCta,
      },
    ];
  }

  return [
    {
      key: "hero",
      eyebrow: "Partner page",
      title: control.hero?.headline || brief.targetKeyword,
      description: control.hero?.subheadline || brief.uniqueValueProposition,
      bullets: compactStrings([...(control.hero?.bullets || []), ...landing.benefits]).slice(0, 4),
    },
    {
      key: "problem",
      eyebrow: "Problem",
      title: "Why the page exists",
      bullets: compactStrings([...(landing.problem || []), ...brief.proofPoints]).slice(0, 4),
    },
    {
      key: "solution",
      eyebrow: "Solution",
      title: "How the offer solves the problem",
      description: landing.solution || brief.uniqueValueProposition,
    },
    {
      key: "benefits",
      eyebrow: "Benefits",
      title: "What the reader gets",
      bullets: compactStrings([...landing.benefits, ...brief.proofPoints]).slice(0, 6),
    },
    {
      key: "proof",
      eyebrow: "Proof",
      title: "Why it should feel credible",
      cards: proofCards.slice(0, 4),
    },
    {
      key: "faq",
      eyebrow: "FAQ",
      title: "Questions that need to be answered before the CTA",
      cards: faqCards.slice(0, 4),
    },
    {
      key: "cta",
      eyebrow: "CTA",
      title: "Close with a clear next step",
      description: control.finalCta?.description || brief.uniqueValueProposition,
      cta: primaryCta,
    },
  ];
}

function buildGeneratedContent(control: MoonshineControl, route: MoonshineRoute | null, landing: ResolvedPage["landing"]): GeneratedPageContent {
  const family = inferPageFamily(control, route);
  const brief = buildPageBrief(control, route);
  const primaryCta = resolvePrimaryCta(control, route);
  const sections = buildGeneratedSections(family, control, brief, landing, primaryCta);

  const titleTag = control.seo?.title || route?.title || `${control.label} | ${control.brandName}`;
  const metaDescription =
    control.seo?.description ||
    brief.uniqueValueProposition ||
    `${control.label} designed for ${brief.audience}.`;
  const headingOutline = sections.map((section) => section.title);
  const relatedGuideTitles = compactStrings((control.relatedGuides || []).map((item) => toItemTitle(item)));
  const partnerTitles = compactStrings((control.partners || []).map((item) => toItemTitle(item)));

  const internalLinks = compactStrings([
    ...relatedGuideTitles,
    ...(control.navigationRouteIds || []).map((routeId) => findRouteById(routeId)?.title || toTitleCase(routeId)),
    ...partnerTitles,
  ]).map((title) => ({
    title,
    href:
      (control.relatedGuides || []).find((item) => toItemTitle(item) === title)?.href ||
      (control.relatedGuides || []).find((item) => toItemTitle(item) === title)?.url ||
      `/${title.toLowerCase().replace(/\s+/g, "-")}`,
    reason: "Suggested internal path to support topical depth and crawl discovery.",
  }));

  const safeguards: GeneratedPageContent["safeguards"] = [
    {
      label: "Unique angle",
      status: brief.uniqueValueProposition ? "pass" : "warn",
      detail: brief.uniqueValueProposition || "Add a vertical-specific value proposition so the page does not read like boilerplate.",
    },
    {
      label: "Proof density",
      status: brief.proofPoints.length >= 2 ? "pass" : "warn",
      detail:
        brief.proofPoints.length >= 2
          ? "Enough proof points to avoid a thin page."
          : "Add at least two proof points, trust signals, or examples.",
    },
    {
      label: "Keyword coverage",
      status: titleTag.includes(brief.targetKeyword) || headingOutline.some((line) => line.includes(brief.targetKeyword)) ? "pass" : "warn",
      detail: `Target keyword coverage: ${brief.targetKeyword} should appear in the title, H1, or at least one section heading.`,
    },
    {
      label: "Keyword stuffing guard",
      status: headingOutline.filter((line) => line.includes(brief.targetKeyword)).length <= 2 ? "pass" : "warn",
      detail: "Keep the target phrase in the title, H1, and one supporting section only.",
    },
    {
      label: "Internal links",
      status: internalLinks.length > 0 ? "pass" : "warn",
      detail: internalLinks.length > 0 ? "Internal link suggestions are present." : "Add related guides or routes to reinforce the topic cluster.",
    },
  ];

  return {
    family,
    brief,
    seo: {
      titleTag,
      metaDescription,
      h1: control.hero?.headline || brief.targetKeyword,
      headingOutline,
      canonicalIntent: brief.searchIntent,
      schemaType: brief.schemaType,
    },
    sections,
    internalLinks,
    safeguards,
    faqSchema: control.faqs || [],
  };
}

function normalizeNavigation(control: MoonshineControl, route: MoonshineRoute | null): Array<{ title: string; href: string }> {
  const navigationRouteIds = control.navigationRouteIds || route?.nav || [];
  return navigationRouteIds
    .map((routeId) => {
      const navRoute = findRouteById(routeId);
      if (!navRoute) return null;
      const href = normalizePath(navRoute.path);
      return { title: navRoute.title || toTitleCase(routeId), href };
    })
    .filter((item): item is { title: string; href: string } => Boolean(item));
}

function resolveAssets(control: MoonshineControl, route: MoonshineRoute | null): { resolvedAssets: MoonshineAsset[]; collectionAssets: MoonshineAsset[]; collectionNames: string[] } {
  const assetMap = new Map<string, MoonshineAsset>();
  for (const asset of assets.assets || []) {
    assetMap.set(asset.id, asset);
  }

  const controlAssetIds = control.assetOrder || control.featuredAssets || [];
  const routeAssetIds = route?.assetOrder || route?.featuredAssets || [];
  const directAssetIds = [...controlAssetIds, ...routeAssetIds];
  const directAssets = dedupeById(directAssetIds.map((id) => assetMap.get(id)).filter((asset): asset is MoonshineAsset => Boolean(asset)));

  const collectionNames = Array.from(new Set([...(route?.collections || []), ...(control.collections || [])]));
  const collectionAssetIds = collectionNames.flatMap((collectionName) => assets.collections?.[collectionName] || []);
  const collectionAssetsRaw = collectionAssetIds
    .map((assetId) => assetMap.get(assetId))
    .filter((asset): asset is MoonshineAsset => Boolean(asset));

  const collectionAssets = dedupeById(collectionAssetsRaw);
  return { resolvedAssets: directAssets, collectionAssets, collectionNames };
}

function resolvePrimaryCta(control: MoonshineControl, route: MoonshineRoute | null): Cta | undefined {
  const label = control.hero?.primaryCtaLabel || toLabelFromRouteCta(route?.primaryCta) || "Explore";
  const href =
    control.hero?.primaryCtaUrl ||
    control.ctaRoutes?.primaryApplyUrl ||
    toHrefFromRouteCta(route?.primaryCta) ||
    undefined;

  if (!href) return undefined;
  return { label, href };
}

function resolveSecondaryCta(control: MoonshineControl, route: MoonshineRoute | null): Cta | undefined {
  const label = control.hero?.secondaryCtaLabel || toLabelFromRouteCta(route?.secondaryCta);
  const href =
    control.hero?.secondaryCtaUrl ||
    control.ctaRoutes?.overviewUrl ||
    toHrefFromRouteCta(route?.secondaryCta) ||
    control.ctaRoutes?.communityUrl ||
    undefined;

  if (!label || !href) return undefined;
  return { label, href };
}

function toSlugFromPath(path: string): string {
  const normalizedPath = normalizePath(path);
  if (normalizedPath === "/") return "";
  return normalizedPath.replace(/^\//, "");
}

function buildResolvedPage(control: MoonshineControl, route: MoonshineRoute | null, requestedHost: string, requestedPath: string): ResolvedPage {
  const canonicalHost = normalizeHost(control.route.host) || requestedHost;
  const canonicalPath = normalizePath(requestedPath || control.route.path || route?.path || "/");
  const slug = toSlugFromPath(canonicalPath) || control.slug;
  const brand = routes.brands.find((item) => item.id === control.brandId) || null;

  const { resolvedAssets, collectionAssets, collectionNames } = resolveAssets(control, route);
  const primaryCta = resolvePrimaryCta(control, route);
  const secondaryCta = resolveSecondaryCta(control, route);
  const landing = normalizeLandingContent(control);
  const brief = buildPageBrief(control, route);
  const generated = buildGeneratedContent(control, route, landing);

  return {
    control,
    route,
    host: canonicalHost,
    path: canonicalPath,
    slug,
    pageType: control.pageType || route?.pageType || "page",
    layout: control.layout || route?.layout || "default",
    brief,
    seo: {
      title: generated.seo.titleTag,
      description: generated.seo.metaDescription,
      noindex: control.seo?.noindex,
    },
    generated,
    hero: {
      headline: control.hero?.headline || control.seo?.title || control.label,
      subheadline: control.hero?.subheadline,
      bullets: control.hero?.bullets,
      primaryCta,
      secondaryCta,
    },
    landing,
    sections: control.sections || [],
    categoryGroups: normalizeCategoryGroups(control),
    faqs: control.faqs || [],
    relatedGuides: normalizeRelatedGuides(control),
    navigation: normalizeNavigation(control, route),
    collectionNames,
    contentSources: control.contentSources,
    resolvedAssets,
    collectionAssets,
    brand,
  };
}

export const allControls: MoonshineControl[] = manifest.files
  .map((item) => controlsByFilename[item.filename])
  .filter((control): control is MoonshineControl => Boolean(control));

export function loadMoonshineData(): MoonshineData {
  return {
    manifest,
    routes,
    assets,
    controls: allControls,
  };
}

export function getPrimaryDomain(): string {
  const primaryBrand = routes.brands.find((brand) => brand.id === routes.defaultBrandId);
  if (primaryBrand?.primaryDomain) return primaryBrand.primaryDomain;
  return routes.brands[0]?.primaryDomain || "distilledfunding.com";
}

export function getSiteConfig() {
  const primaryBrand = routes.brands.find((brand) => brand.id === routes.defaultBrandId) || routes.brands[0];
  return {
    brandName: primaryBrand?.name || manifest.generatedFor || "Moonshine Capital",
    domain: primaryBrand?.primaryDomain || "distilledfunding.com",
    defaultOgImage: undefined as string | undefined,
    primaryCta: {
      label: "Check What You Qualify For",
      href: "/funding",
    },
    secondaryCta: {
      label: "Talk to a Funding Advisor",
      href: "/book",
    },
    compliance: {
      disclaimerShort: "Funding options vary by profile. Not a lender. Terms depend on underwriting.",
    },
  };
}

type BlogGuide = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  brief: PageBrief;
  sections: GeneratedPageSection[];
  faqs: VerticalFAQ[];
  relatedLinks: Array<{ title: string; href: string; reason: string }>;
};

const blogGuides: BlogGuide[] = [
  {
    slug: "instant-funding-gig-workers",
    title: "Instant Funding for Gig Workers: What Actually Works in 2026",
    description: "A practical guide to faster funding paths for gig workers, creators, and other irregular-income operators.",
    publishedAt: "2026-03-27",
    readingTime: "6 min read",
    brief: {
      targetKeyword: "instant funding for gig workers",
      searchIntent: "Informational / commercial investigation",
      audience: "gig workers, creators, and side-hustle operators",
      uniqueValueProposition: "Shows the fastest legitimate funding paths and the documents that reduce friction.",
      proofPoints: [
        "Alternative underwriting inputs can outperform tax-return-only checks.",
        "Faster approvals usually come from cleaner income documentation.",
        "Flexible funding works best when the page maps options by profile.",
      ],
      faqIdeas: [
        "What counts as gig income?",
        "Can I qualify without W-2s?",
        "Which documents speed up a decision?",
      ],
      internalLinks: ["No Tax Returns? Here’s What Lenders Use Instead", "Explore Funding"],
      schemaType: "Article",
    },
    sections: [
      {
        key: "hero",
        eyebrow: "Guide",
        title: "Know which funding paths are actually fast",
        description:
          "This guide covers the underwriting signals, document sets, and funding options that matter when income is variable.",
        bullets: ["What counts as gig income", "Which documents help most", "How to avoid slow approval paths"],
      },
      {
        key: "options",
        eyebrow: "Options",
        title: "The funding routes worth comparing",
        cards: [
          { title: "Revenue-based funding", description: "Works well when monthly cash flow is the strongest signal." },
          { title: "Bank-statement underwriting", description: "Useful when tax returns lag behind current earnings." },
          { title: "Partner-assisted capital", description: "Helpful when the seller needs speed plus guidance." },
        ],
      },
      {
        key: "prep",
        eyebrow: "Prep",
        title: "What to gather before you apply",
        bullets: ["Recent bank statements", "Payout and platform history", "A short explanation of how you earn"],
      },
      {
        key: "faq",
        eyebrow: "FAQ",
        title: "Questions gig workers ask most often",
        cards: [
          { title: "Do I need tax returns?", description: "Often no, but stronger documentation still helps." },
          { title: "Will platform income count?", description: "Yes, if it is documented and consistent." },
          { title: "How fast can this move?", description: "The cleanest profiles can move quickly once the docs are in." },
        ],
      },
    ],
    faqs: [
      { q: "What counts as gig income?", a: "Any documented platform, contract, or self-employed income that can be tied to recurring deposits or payouts." },
      { q: "Can I qualify without W-2s?", a: "Yes. Many funding paths look at bank activity, payout histories, and recent revenue instead of W-2s alone." },
      { q: "Which documents speed up the process?", a: "Recent statements, payout records, and a clear business summary usually help most." },
    ],
    relatedLinks: [
      { title: "No Tax Returns? Here’s What Lenders Use Instead", href: "/blog/no-tax-return-funding", reason: "Supporting article on alternative underwriting evidence." },
      { title: "Funding Home", href: "/funding", reason: "Primary conversion path after the guide." },
    ],
  },
  {
    slug: "no-tax-return-funding",
    title: "No Tax Returns? Here’s What Lenders Use Instead",
    description: "Learn what underwriters look at when tax returns are missing, old, or not the best proof of current cash flow.",
    publishedAt: "2026-03-27",
    readingTime: "5 min read",
    brief: {
      targetKeyword: "no tax return funding",
      searchIntent: "Informational / commercial investigation",
      audience: "operators with incomplete tax documents or newly formed businesses",
      uniqueValueProposition: "Explains the exact evidence that can replace tax returns in a faster funding workflow.",
      proofPoints: [
        "Bank statements often carry more current signal than old tax returns.",
        "Platform and payout records can replace historical documents for some profiles.",
        "A clear explanation of revenue sources reduces underwriting back-and-forth.",
      ],
      faqIdeas: [
        "Can I get funding without tax returns?",
        "What documents matter most instead?",
        "Do newer businesses qualify?",
      ],
      internalLinks: ["Instant Funding for Gig Workers: What Actually Works in 2026", "Apply for Funding"],
      schemaType: "Article",
    },
    sections: [
      {
        key: "hero",
        eyebrow: "Guide",
        title: "Tax returns are not the only proof that matters",
        description:
          "The fastest lenders often care more about current cash flow than old returns, especially when revenue is easy to verify.",
        bullets: ["Bank statements", "Payout histories", "Revenue explanation"],
      },
      {
        key: "evidence",
        eyebrow: "Evidence",
        title: "What underwriters use instead",
        cards: [
          { title: "Bank statements", description: "Show cash movement and recent revenue trends." },
          { title: "Platform histories", description: "Useful for marketplace, creator, and contractor income." },
          { title: "Invoices and contracts", description: "Helpful when recurring work is documented." },
        ],
      },
      {
        key: "process",
        eyebrow: "Process",
        title: "How to present the file cleanly",
        bullets: ["Explain income sources in plain language", "Keep deposits and payouts easy to follow", "Bundle supporting documents in one place"],
      },
      {
        key: "faq",
        eyebrow: "FAQ",
        title: "Common questions about no-tax-return funding",
        cards: [
          { title: "Do tax returns help?", description: "Yes, but they are not always required if the current signals are strong." },
          { title: "Is this only for self-employed borrowers?", description: "Mostly, though newer operators can also benefit from the same underwriting logic." },
          { title: "Will this slow things down?", description: "Not if the alternative documents are organized and current." },
        ],
      },
    ],
    faqs: [
      { q: "Can I get funding without tax returns?", a: "Yes. Many lenders accept bank statements, platform records, and invoices as current proof." },
      { q: "What documents matter most instead?", a: "Recent bank statements, payout reports, and a simple revenue summary are usually the most helpful." },
      { q: "Do newer businesses qualify?", a: "They often can if there is enough current cash flow or platform activity to underwrite." },
    ],
    relatedLinks: [
      { title: "Instant Funding for Gig Workers: What Actually Works in 2026", href: "/blog/instant-funding-gig-workers", reason: "Sibling article for broader information architecture." },
      { title: "Talk to Funding", href: "/funding", reason: "Primary CTA for readers ready to apply." },
    ],
  },
];

export function getBlogPosts() {
  return blogGuides.map(({ slug, title, description, publishedAt, readingTime }) => ({
    slug,
    title,
    description,
    publishedAt,
    readingTime,
  }));
}

export function resolveBlogPost(slug: string): BlogGuide | null {
  return blogGuides.find((guide) => guide.slug === slug) || null;
}

function resolveUsingHostFallback(host: string, path: string): ResolvedPage | null {
  const hostConfig = findHostConfig(host);
  if (!hostConfig) return null;
  const fallbackRoute = findRouteById(hostConfig.fallbackRouteId);
  const fallbackControl = findControlForRoute(fallbackRoute);
  if (!fallbackControl) return null;
  return buildResolvedPage(fallbackControl, fallbackRoute, host, path);
}

function resolveUsingPathFallback(path: string): ResolvedPage | null {
  const examples = routes.routingRules?.pathFallbackExamples || {};
  const normalizedPath = normalizePath(path);

  for (const [host, fallbackPath] of Object.entries(examples)) {
    if (normalizePath(fallbackPath) !== normalizedPath) continue;
    const hostConfig = findHostConfig(host);
    const fallbackRoute = findRouteById(hostConfig?.fallbackRouteId);
    const fallbackControl = findControlForRoute(fallbackRoute);
    if (fallbackControl) {
      return buildResolvedPage(fallbackControl, fallbackRoute, normalizeHost(host), normalizedPath);
    }
  }

  return null;
}

export function resolvePage(input: ResolvePageInput): ResolvedPage | null {
  const path = normalizePath(input.path);
  const requestedHost = normalizeHost(input.host) || normalizeHost(getPrimaryDomain());

  if (!input.host) {
    const pathOnlyControl = findControlByPath(path);
    if (pathOnlyControl) {
      const matchedRoute =
        routes.routes.find(
          (route) =>
            normalizePath(route.path) === path && normalizeHost(route.host) === normalizeHost(pathOnlyControl.route.host),
        ) || null;
      return buildResolvedPage(pathOnlyControl, matchedRoute, requestedHost, path);
    }
  }

  const exactRoute =
    routes.routes.find(
      (route) => normalizeHost(route.host) === requestedHost && normalizePath(route.path) === path,
    ) || null;
  const exactControl = findControlForRoute(exactRoute);
  if (exactControl) return buildResolvedPage(exactControl, exactRoute, requestedHost, path);

  const hostFallback = resolveUsingHostFallback(requestedHost, path);
  if (hostFallback) return hostFallback;

  const pathFallback = resolveUsingPathFallback(path);
  if (pathFallback) return pathFallback;

  return null;
}

export function getPublishedPages(): ResolvedPage[] {
  const pages: ResolvedPage[] = [];
  for (const control of allControls) {
    const route = findRouteById(control.sourceRouteId) || null;
    const controlPath = normalizePath(control.route.path);
    if (controlPath !== "/") {
      pages.push(
        buildResolvedPage(control, route, normalizeHost(control.route.host), controlPath),
      );
      continue;
    }

    const fallbackFromRules = routes.routingRules?.pathFallbackExamples?.[control.route.host];
    const fallbackPath = normalizePath(fallbackFromRules || `/${control.slug}`);
    pages.push(buildResolvedPage(control, route, normalizeHost(control.route.host), fallbackPath));
  }

  return pages;
}

export function validateMoonshineContent(): ValidationResult {
  const errors: string[] = [];
  const routeIds = new Set<string>();
  const routeByHostPath = new Set<string>();
  const assetIdSet = new Set((assets.assets || []).map((asset) => asset.id));
  const collectionNames = new Set(Object.keys(assets.collections || {}));

  for (const route of routes.routes || []) {
    if (!route.id) {
      errors.push("routes.json contains a route with missing id.");
      continue;
    }
    if (routeIds.has(route.id)) {
      errors.push(`Duplicate route id detected: ${route.id}`);
    }
    routeIds.add(route.id);

    const routeKey = `${normalizeHost(route.host)}::${normalizePath(route.path)}`;
    if (routeByHostPath.has(routeKey)) {
      errors.push(`Duplicate host/path route detected: ${route.host}${normalizePath(route.path)}`);
    }
    routeByHostPath.add(routeKey);
  }

  for (const file of manifest.files || []) {
    if (!controlsByFilename[file.filename]) {
      errors.push(`manifest.json references missing control file: ${file.filename}`);
    }
  }

  for (const control of allControls) {
    if (!control.id) errors.push("A control file is missing `id`.");
    if (!control.slug) errors.push(`Control ${control.id || "(unknown)"} is missing \`slug\`.`);
    if (!control.sourceRouteId) errors.push(`Control ${control.slug} is missing \`sourceRouteId\`.`);
    if (control.sourceRouteId && !routeIds.has(control.sourceRouteId)) {
      errors.push(`Control ${control.slug} references unknown sourceRouteId: ${control.sourceRouteId}`);
    }

    const sources = control.contentSources;
    for (const key of ["notion", "repos", "sites", "templates"] as const) {
      const value = sources?.[key];
      if (!Array.isArray(value)) {
        errors.push(`Control ${control.slug} has invalid contentSources.${key}; expected array.`);
      }
    }

    const assetIds = [
      ...(control.assetOrder || []),
      ...(control.featuredAssets || []),
    ];
    for (const assetId of assetIds) {
      if (!assetIdSet.has(assetId)) {
        errors.push(`Control ${control.slug} references unknown asset id: ${assetId}`);
      }
    }

    for (const collectionName of control.collections || []) {
      if (!collectionNames.has(collectionName)) {
        errors.push(`Control ${control.slug} references unknown collection: ${collectionName}`);
      }
    }
  }

  return { isValid: errors.length === 0, errors };
}
