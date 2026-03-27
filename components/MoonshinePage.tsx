import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, MessageSquareWarning, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ResolvedPage } from "@/lib/moonshine";

function Section({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function AssetCard({ asset }: { asset: ResolvedPage["resolvedAssets"][number] }) {
  const href = asset.url || "#";
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      className="block rounded-2xl border border-border/60 bg-background/70 p-4 transition hover:border-border hover:bg-accent/40"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{asset.type}</Badge>
        {asset.provider ? <Badge variant="secondary">{asset.provider}</Badge> : null}
        {asset.category ? <Badge variant="outline">{asset.category}</Badge> : null}
      </div>
      <h3 className="mt-3 text-base font-semibold">{asset.title || asset.id}</h3>
      {asset.description ? <p className="mt-2 text-sm text-muted-foreground">{asset.description}</p> : null}
      <p className="mt-3 text-sm font-semibold">{isExternal ? "Open resource" : "View details"}</p>
    </Link>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-border/60 bg-background/70 p-4">
          <div className="flex items-start gap-3">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="text-sm leading-6 text-foreground/90">{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function NumberedGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <Card key={item} className="border-border/60 bg-background/70">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </div>
              <CardTitle className="text-lg">Step {index + 1}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function QuoteGrid({ items }: { items: Array<{ title: string; description?: string; stat?: string; source?: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} className="border-border/60 bg-background/70">
          <CardHeader>
            {item.stat ? <Badge className="w-fit">{item.stat}</Badge> : null}
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {item.description ? <p className="text-sm leading-6 text-muted-foreground">{item.description}</p> : null}
            {item.source ? <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.source}</p> : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function UseCaseGrid({ items }: { items: ResolvedPage["landing"]["useCases"] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} className="border-border/60 bg-background/70">
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
            {item.fit?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.fit.map((fit) => (
                  <Badge key={fit} variant="outline">
                    {fit}
                  </Badge>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AccordionBlock({
  title,
  items,
}: {
  title: string;
  items: Array<{ q: string; a: string }>;
}) {
  return (
    <Card className="border-border/60 bg-background/70">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export function MoonshinePage({ page }: { page: ResolvedPage }) {
  const mergedAssets = [
    ...page.resolvedAssets,
    ...page.collectionAssets.filter((asset) => !page.resolvedAssets.some((primary) => primary.id === asset.id)),
  ];
  const finalCta = page.landing.finalCta;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_38%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_32%),linear-gradient(180deg,rgba(10,10,15,0.96),rgba(10,10,15,0.82))]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 md:pb-20 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{page.pageType}</Badge>
                <Badge variant="outline">{page.layout}</Badge>
                <Badge variant="outline">{page.host}</Badge>
                <Badge variant="outline">{page.generated.family}</Badge>
                <Badge variant="outline">{page.generated.seo.schemaType}</Badge>
                {page.seo.noindex ? <Badge variant="outline">noindex</Badge> : null}
              </div>

              <div className="max-w-4xl">
                <h1 className="text-4xl font-black tracking-tight text-balance md:text-6xl">{page.hero.headline}</h1>
                {page.hero.subheadline ? (
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{page.hero.subheadline}</p>
                ) : null}
              </div>

              {(page.hero.primaryCta || page.hero.secondaryCta) && (
                <div className="flex flex-wrap gap-3">
                  {page.hero.primaryCta ? (
                    <Button asChild size="xl">
                      <a href={page.hero.primaryCta.href}>
                        {page.hero.primaryCta.label}
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  ) : null}
                  {page.hero.secondaryCta ? (
                    <Button asChild variant="outline" size="xl">
                      <a href={page.hero.secondaryCta.href}>{page.hero.secondaryCta.label}</a>
                    </Button>
                  ) : null}
                </div>
              )}

              {page.landing.benefits.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {page.landing.benefits.slice(0, 4).map((benefit) => (
                    <Badge key={benefit} variant="outline" className="bg-background/40">
                      <Sparkles className="mr-1 size-3.5" />
                      {benefit}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>

            <Card className="border-border/60 bg-background/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Page Blueprint</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Problem</p>
                  <div className="mt-3 space-y-2">
                    {(page.landing.problem.length > 0 ? page.landing.problem : page.hero.bullets || []).slice(0, 3).map((item: string) => (
                      <div key={item} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/60 p-3">
                        <MessageSquareWarning className="mt-0.5 size-4 shrink-0 text-primary" />
                        <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {page.landing.solution ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Solution</p>
                    <p className="mt-3 text-sm leading-6 text-foreground/90">{page.landing.solution}</p>
                  </div>
                ) : null}

                {finalCta ? (
                  <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
                    {finalCta.description ? <p className="text-sm leading-6 text-foreground/90">{finalCta.description}</p> : null}
                    <div className="mt-3">
                      <Button asChild>
                        <a href={finalCta.href}>{finalCta.label}</a>
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {page.landing.problem.length > 0 ? (
        <>
          <Section
            eyebrow="Pain points"
            title="Lead with the buyer's actual frustration"
            description="The best vertical pages do not start with your product. They start with the situation the reader already wants to escape."
          >
            <BulletList items={page.landing.problem} />
          </Section>
          <Separator />
        </>
      ) : null}

      {page.landing.solution || page.landing.benefits.length > 0 ? (
        <>
          <Section
            eyebrow="Solution"
            title="Say exactly how the page solves the problem"
            description="This is where we turn the vertical-specific pain into a concrete promise and outcome."
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="border-border/60 bg-background/70">
                <CardHeader>
                  <CardTitle className="text-lg">Core positioning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {page.landing.solution ||
                      "Frame the offer in the language of the vertical, then keep the promise tight, credible, and outcome-focused."}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-background/70">
                <CardHeader>
                  <CardTitle className="text-lg">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(page.landing.benefits.length > 0 ? page.landing.benefits : page.hero.bullets || []).map((benefit: string) => (
                      <Badge key={benefit} variant="outline" className="py-1.5">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>
          <Separator />
        </>
      ) : null}

      {page.landing.proof.length > 0 ? (
        <>
          <Section
            eyebrow="Proof"
            title="Give the page enough evidence to feel real"
            description="Proof can be metrics, process, testimonials, or anything that reduces risk for the buyer."
          >
            <QuoteGrid items={page.landing.proof} />
          </Section>
          <Separator />
        </>
      ) : null}

      {page.landing.howItWorks.length > 0 ? (
        <>
          <Section
            eyebrow="How it works"
            title="Make the process feel obvious"
            description="Three clear steps usually beat a long explanation."
          >
            <NumberedGrid items={page.landing.howItWorks} />
          </Section>
          <Separator />
        </>
      ) : null}

      {page.landing.useCases.length > 0 ? (
        <>
          <Section
            eyebrow="Use cases"
            title="Show where this vertical page fits in the real world"
            description="Use cases help the reader picture the offer in their own context, which makes the page feel tailored instead of templated."
          >
            <UseCaseGrid items={page.landing.useCases} />
          </Section>
          <Separator />
        </>
      ) : null}

      {page.landing.objections.length > 0 ? (
        <>
          <Section
            eyebrow="Objections"
            title="Answer the reasons they hesitate"
            description="The fastest way to strengthen a vertical page is to remove the obvious objections before the CTA."
          >
            <AccordionBlock title="Common objections" items={page.landing.objections} />
          </Section>
          <Separator />
        </>
      ) : null}

      {page.faqs.length > 0 ? (
        <>
          <Section eyebrow="FAQ" title="Quick answers for the final doubts">
            <AccordionBlock title="Frequently asked questions" items={page.faqs} />
          </Section>
          <Separator />
        </>
      ) : null}

      {page.sections.length > 0 && (
        <>
          <Section eyebrow="Supporting content" title="Extra sections from the control file">
            <div className="grid gap-3 md:grid-cols-3">
              {page.sections.map((section) => (
                <Card key={section} className="border-border/60 bg-background/70">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold">{section}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
          <Separator />
        </>
      )}

      {page.categoryGroups.length > 0 && (
        <>
          <Section eyebrow="Categories" title="Organize the vertical by buyer intent">
            <div className="grid gap-4 md:grid-cols-2">
              {page.categoryGroups.map((group) => (
                <Card key={group.title} className="border-border/60 bg-background/70">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {group.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
          <Separator />
        </>
      )}

      {mergedAssets.length > 0 && (
        <>
          <Section eyebrow="Assets" title="Recommended resources">
            <div className="grid gap-4 md:grid-cols-2">
              {mergedAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </Section>
          <Separator />
        </>
      )}

      {page.navigation.length > 0 && (
        <>
          <Section eyebrow="Navigation" title="Related routes">
            <div className="grid gap-3 md:grid-cols-2">
              {page.navigation.map((navItem) => (
                <Link
                  key={`${navItem.title}-${navItem.href}`}
                  href={navItem.href}
                  className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm font-semibold transition hover:bg-accent/40"
                >
                  {navItem.title}
                </Link>
              ))}
            </div>
          </Section>
          <Separator />
        </>
      )}

      {page.relatedGuides.length > 0 && (
        <>
          <Section eyebrow="Related" title="Spokes that support the page">
            <div className="grid gap-3 md:grid-cols-2">
              {page.relatedGuides.map((guide) => (
                <Link
                  key={`${guide.title}-${guide.href}`}
                  href={guide.href}
                  className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm font-semibold transition hover:bg-accent/40"
                >
                  {guide.title}
                </Link>
              ))}
            </div>
          </Section>
          <Separator />
        </>
      )}

      <Section eyebrow="SEO blueprint" title="Generated metadata and structure">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle className="text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Title tag</p>
                <p className="mt-1 text-foreground/90">{page.generated.seo.titleTag}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Meta description</p>
                <p className="mt-1 text-foreground/90">{page.generated.seo.metaDescription}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">H1</p>
                  <p className="mt-1 text-foreground/90">{page.generated.seo.h1}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Intent</p>
                  <p className="mt-1 text-foreground/90">{page.generated.seo.canonicalIntent}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Schema</p>
                  <p className="mt-1 text-foreground/90">{page.generated.seo.schemaType}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle className="text-lg">Outline and links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Heading outline</p>
                <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {page.generated.seo.headingOutline.map((heading, index) => (
                    <li key={heading} className="flex gap-2">
                      <span className="font-semibold text-foreground/90">{index + 1}.</span>
                      <span>{heading}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Internal link suggestions</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {page.generated.internalLinks.map((link) => (
                    <Badge key={`${link.title}-${link.href}`} variant="outline" className="max-w-full text-left">
                      {link.title}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Safeguards</p>
                <div className="mt-2 space-y-2">
                  {page.generated.safeguards.map((signal) => (
                    <div key={signal.label} className="rounded-xl border border-border/60 bg-background/60 p-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={signal.status === "pass" ? "secondary" : "outline"}>{signal.status}</Badge>
                        <p className="text-sm font-semibold text-foreground/90">{signal.label}</p>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{signal.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
      <Separator />

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <Card className="border-border/60 bg-background/70">
          <CardHeader>
            <CardTitle className="text-xl">Content Sources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {(["notion", "repos", "sites", "templates"] as const).map((sourceType) => (
              <div key={sourceType}>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {sourceType}
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {page.contentSources[sourceType].slice(0, 8).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                  {page.contentSources[sourceType].length === 0 ? <li>• none</li> : null}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
