import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Building2, HeartPulse, Home, ShieldCheck, Sparkles, Truck, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPrimaryDomain, getPublishedPages, getSiteConfig } from "@/lib/moonshine";

type IndustryCard = {
  title: string;
  href: string;
  description: string;
};

type IndustryGroup = {
  key: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  items: IndustryCard[];
};

const GROUP_ORDER = [
  "home-services",
  "health-wellness",
  "operations-logistics",
  "property-local",
  "service-retail",
  "professional-services",
  "specialty-verticals",
] as const;

const GROUP_META: Record<(typeof GROUP_ORDER)[number], Omit<IndustryGroup, "items">> = {
  "home-services": {
    key: "home-services",
    title: "Home Services",
    description: "Trades and field-service businesses that need capital for crews, materials, and fast-moving jobs.",
    icon: Home,
  },
  "health-wellness": {
    key: "health-wellness",
    title: "Health & Wellness",
    description: "Practices and wellness brands with equipment, payroll, and appointment-driven cashflow needs.",
    icon: HeartPulse,
  },
  "operations-logistics": {
    key: "operations-logistics",
    title: "Operations & Logistics",
    description: "Route-based, fleet-based, and payroll-heavy operators where timing pressure matters every week.",
    icon: Truck,
  },
  "property-local": {
    key: "property-local",
    title: "Property & Local Infrastructure",
    description: "Operators working across buildings, maintenance cycles, and location-based service delivery.",
    icon: Building2,
  },
  "service-retail": {
    key: "service-retail",
    title: "Service & Retail",
    description: "Local businesses balancing equipment, buildouts, inventory, and customer acquisition.",
    icon: Utensils,
  },
  "professional-services": {
    key: "professional-services",
    title: "Professional Services",
    description: "Firms with staffing-heavy growth and revenue timing that does not always line up with expenses.",
    icon: ShieldCheck,
  },
  "specialty-verticals": {
    key: "specialty-verticals",
    title: "Specialty Verticals",
    description: "Pages that still fit the factory but do not belong in the larger operating buckets above.",
    icon: Sparkles,
  },
};

const GROUP_LOOKUP: Record<string, (typeof GROUP_ORDER)[number]> = {
  contractors: "home-services",
  roofers: "home-services",
  plumbers: "home-services",
  hvac: "home-services",
  electricians: "home-services",
  landscapers: "home-services",
  "cleaning-services": "home-services",
  "pest-control": "home-services",
  "solar-installers": "home-services",
  "auto-repair": "operations-logistics",
  truckers: "operations-logistics",
  "moving-companies": "operations-logistics",
  "security-companies": "operations-logistics",
  "property-management": "property-local",
  "real-estate": "property-local",
  "med-spa": "health-wellness",
  dentists: "health-wellness",
  chiropractors: "health-wellness",
  veterinarians: "health-wellness",
  gyms: "health-wellness",
  salons: "service-retail",
  restaurants: "service-retail",
  "daycare-centers": "service-retail",
  "law-firms": "professional-services",
  "gig-worker-loans": "specialty-verticals",
  "ecom-sellers": "specialty-verticals",
};

function toIndustryGroup(slug: string): (typeof GROUP_ORDER)[number] {
  return GROUP_LOOKUP[slug] || "specialty-verticals";
}

function toIndustryCards(): IndustryGroup[] {
  const pages = getPublishedPages()
    .filter((page) => !page.seo.noindex)
    .filter((page) => page.host === getPrimaryDomain())
    .filter((page) => page.pageType === "vertical-funnel")
    .filter((page) => page.slug !== "dac-team")
    .sort((a, b) => a.control.label.localeCompare(b.control.label));

  const grouped = new Map<(typeof GROUP_ORDER)[number], IndustryCard[]>();

  for (const page of pages) {
    const groupKey = toIndustryGroup(page.slug);
    const items = grouped.get(groupKey) || [];
    items.push({
      title: page.control.label,
      href: page.path,
      description: page.seo.description,
    });
    grouped.set(groupKey, items);
  }

  return GROUP_ORDER
    .map((key) => {
      const meta = GROUP_META[key];
      const items = grouped.get(key) || [];
      return { ...meta, items };
    })
    .filter((group) => group.items.length > 0);
}

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig();
  const canonical = `https://${site.domain}/industries`;

  return {
    title: "Industries",
    description: "Browse all current industry landing pages built in the niche landing page factory.",
    alternates: {
      canonical,
    },
    openGraph: {
      title: `Industries | ${site.brandName}`,
      description: "Browse all current industry landing pages built in the niche landing page factory.",
      url: canonical,
      siteName: site.brandName,
      type: "website",
    },
  };
}

export default function IndustriesPage() {
  const site = getSiteConfig();
  const groups = toIndustryCards();
  const totalIndustries = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_32%),linear-gradient(180deg,rgba(10,10,15,0.98),rgba(10,10,15,0.86))]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Industry Hub</Badge>
              <Badge variant="outline">{totalIndustries} live verticals</Badge>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-balance md:text-6xl">
              Explore Every Industry Page in the Factory
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              One place to browse all current niche landing pages by operating model, cashflow shape, and buyer context.
              Pick a vertical, study the angle, and ship the next page faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                {site.primaryCta.label}
                <ArrowRight className="ml-2 size-4" />
              </Link>
              <Link
                href="/funding"
                className="inline-flex items-center rounded-xl border border-border/60 px-5 py-3 text-sm font-semibold text-foreground/90 transition hover:bg-accent"
              >
                Browse Funding Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle className="text-lg">Why this page exists</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Use this hub to scan the current vertical inventory, find adjacent niches, and spot obvious whitespace for the next content wave.
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle className="text-lg">Best use</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              This works well as an internal command center, a discovery page for clients, and a launchpad for programmatic content expansion.
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle className="text-lg">Current coverage</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              The hub includes every published primary-domain vertical funnel currently registered in Moonshine.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="space-y-10">
          {groups.map((group) => {
            const Icon = group.icon;

            return (
              <section key={group.key}>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      <Icon className="size-4" />
                      {group.title}
                    </div>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{group.title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                      {group.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {group.items.length} pages
                  </Badge>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href} className="block">
                      <Card className="h-full border-border/60 bg-background/70 transition hover:-translate-y-0.5 hover:bg-accent/40">
                        <CardHeader>
                          <CardTitle className="flex items-start justify-between gap-4 text-lg">
                            <span>{item.title}</span>
                            <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                          <p className="mt-4 text-sm font-semibold">Route: {item.href}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
