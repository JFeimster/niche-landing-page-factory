// app/[vertical]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getVertical, loadData, type VerticalFAQ } from "@/lib/verticals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// ---------- SSG: build routes for "published" verticals ----------
export async function generateStaticParams() {
  const data = loadData();
  return data.verticals
    .filter((v) => v.status === "published")
    .map((v) => ({ vertical: v.slug }));
}

// Ensures unknown slugs 404 at build/runtime
export const dynamicParams = false;

// ---------- SEO Metadata per vertical ----------
export async function generateMetadata(
  { params }: { params: { vertical: string } }
): Promise<Metadata> {
  const found = getVertical(params.vertical);
  if (!found) return { title: "Not Found" };

  const { site, vertical } = found;
  const seo = vertical.seo;
  const canonical = seo.canonical || `https://${site.domain}/${vertical.slug}`;
  const ogImage = seo.ogImage || site.defaultOgImage;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical },
    robots: seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: site.brandName,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

// ---------- FAQ JSON-LD ----------
function faqJsonLd(faqs: VerticalFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function VerticalLandingPage({ params }: { params: { vertical: string } }) {
  const found = getVertical(params.vertical);
  if (!found) return notFound();

  const { site, vertical } = found;

  const hero = vertical.hero;
  const options = vertical.options || [];
  const decisionTree = vertical.decisionTree;
  const faqs = vertical.faqs || [];
  const spokes = vertical.internalLinks?.recommendedSpokes || [];

  // CTAs: allow vertical overrides later if you add them
  const primaryCta = site.primaryCta;
  const secondaryCta = site.secondaryCta;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* FAQ Schema */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      )}

      {/* Hero */}
      <header className="mx-auto max-w-6xl px-4 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{vertical.status.toUpperCase()}</Badge>
              {vertical.seo.noindex ? <Badge variant="outline">noindex</Badge> : null}
            </div>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              {hero?.h1 || vertical.seo.title}
            </h1>

            {hero?.subhead && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {hero.subhead}
              </p>
            )}

            {hero?.bullets?.length ? (
              <ul className="mt-5 space-y-2 text-muted-foreground">
                {hero.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 inline-block size-2 rounded-full bg-foreground" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="xl">
                <a href={primaryCta.href}>{primaryCta.label}</a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {site.compliance?.disclaimerShort || "Funding options vary by profile. Terms depend on underwriting."}
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              {hero?.image?.src ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={hero.image.src}
                    alt={hero.image.alt || ""}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center bg-muted text-muted-foreground">
                  Hero Image Placeholder
                </div>
              )}
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Best for
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {(vertical.audience?.bestFor || []).slice(0, 6).map((x, i) => (
                      <li key={i}>• {x}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Not for
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {(vertical.audience?.notFor || []).slice(0, 6).map((x, i) => (
                      <li key={i}>• {x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </header>

      <Separator />

      {/* Options */}
      {options.length > 0 && (
        <Section title="Pick Your Funding Path">
          <div className="grid gap-4 md:grid-cols-2">
            {options.map((opt) => (
              <Card key={opt.id} className="bg-muted/20">
                <CardHeader className="flex flex-row items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{opt.title}</CardTitle>
                    {opt.oneLiner && (
                      <p className="mt-2 text-sm text-muted-foreground">{opt.oneLiner}</p>
                    )}
                  </div>

                  {opt.tags?.length ? (
                    <div className="flex flex-wrap justify-end gap-2">
                      {opt.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardHeader>

                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Best for
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {(opt.bestFor || []).map((x, i) => (
                          <li key={i}>• {x}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Watch outs
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {(opt.watchOuts || []).map((x, i) => (
                          <li key={i}>• {x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {opt.cta?.href ? (
                    <div className="mt-5">
                      <Button asChild variant="outline">
                        <a href={opt.cta.href}>{opt.cta.label || "See Options"}</a>
                      </Button>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Decision Tree */}
      {decisionTree?.paths?.length ? (
        <>
          <Separator />
          <Section title={decisionTree.headline || "Decision Tree"}>
            <div className="grid gap-4 md:grid-cols-3">
              {decisionTree.paths.map((p) => (
                <Card key={p.id} className="bg-muted/20">
                  <CardHeader>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                    {p.summary && (
                      <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    {p.expect?.length ? (
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {p.expect.map((x, i) => (
                          <li key={i}>• {x}</li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-5">
                      <Button asChild>
                        <a href={p.cta?.href || primaryCta.href}>{p.cta?.label || primaryCta.label}</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </>
      ) : null}

      {/* FAQs */}
      {faqs.length > 0 && (
        <>
          <Separator />
          <Section title="FAQs">
            <Card className="bg-muted/10">
              <CardContent className="p-2">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="px-4">
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </Section>
        </>
      )}

      {/* Spokes / Related Guides */}
      {spokes.length > 0 && (
        <>
          <Separator />
          <Section title="Related Guides">
            <div className="grid gap-3 md:grid-cols-2">
              {spokes.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="rounded-xl border border-border/60 bg-muted/20 p-4 text-sm font-semibold hover:bg-accent/40"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </Section>
        </>
      )}

      {/* Reusable CTA Module */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <div className="rounded-3xl border border-border/60 bg-gradient-to-b from-muted/40 to-muted/10 p-8">
          <h2 className="text-2xl font-extrabold tracking-tight">
            {hero?.h1 ? "You’ve got deposits. Let’s route you to the right lane." : "Ready to see your best path?"}
          </h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Pick the right lane based on deposits, speed, and what you’re trying to do. We’ll route you to Apply,
            route you to Prep, or tell you No—so you don’t waste time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="xl">
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
            <Button asChild size="xl" variant="outline">
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
