import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBlogPosts, getPrimaryDomain, resolveBlogPost } from "@/lib/moonshine";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = resolveBlogPost(slug);

  if (!post) return { title: "Not Found" };

  const canonical = `https://${getPrimaryDomain()}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: "Moonshine Capital",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function SectionCard({
  eyebrow,
  title,
  description,
  bullets,
  cards,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  bullets?: string[];
  cards?: Array<{ title: string; description: string }>;
}) {
  return (
    <section className="py-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight">{title}</h2>
      {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      {bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
          {bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      ) : null}
      {cards?.length ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Card key={card.title} className="border-border/60 bg-background/70">
              <CardHeader>
                <CardTitle className="text-lg">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = resolveBlogPost(slug);

  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <Badge variant="secondary">Guide</Badge>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{post.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge variant="outline">{post.readingTime}</Badge>
        <Badge variant="outline">{post.publishedAt}</Badge>
        <Badge variant="outline">{post.brief.schemaType}</Badge>
      </div>

      <section className="mt-8 rounded-3xl border border-border/60 bg-background/70 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Brief</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Keyword</p>
            <p className="mt-1 text-sm text-foreground/90">{post.brief.targetKeyword}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Intent</p>
            <p className="mt-1 text-sm text-foreground/90">{post.brief.searchIntent}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Audience</p>
            <p className="mt-1 text-sm text-foreground/90">{post.brief.audience}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Angle</p>
            <p className="mt-1 text-sm text-foreground/90">{post.brief.uniqueValueProposition}</p>
          </div>
        </div>
      </section>

      {post.sections.map((section) => (
        <SectionCard
          key={section.key}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          bullets={section.bullets}
          cards={section.cards}
        />
      ))}

      <Separator className="my-6" />

      {post.faqs.length > 0 ? (
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">FAQ</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {post.faqs.map((faq) => (
              <Card key={faq.q} className="border-border/60 bg-background/70">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {post.relatedLinks.length > 0 ? (
        <section className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Related links</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {post.relatedLinks.map((link) => (
              <Link
                key={`${link.title}-${link.href}`}
                href={link.href}
                className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm font-semibold transition hover:bg-accent/40"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
