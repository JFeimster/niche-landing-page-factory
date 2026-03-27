import Link from "next/link";
import { getPublishedPages, getSiteConfig } from "@/lib/moonshine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const site = getSiteConfig();
  const pages = getPublishedPages();
  const published = pages.filter((page) => !page.seo.noindex).sort((a, b) => a.slug.localeCompare(b.slug));
  const drafts = pages.filter((page) => page.seo.noindex);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">
        {site.brandName}: Niche Landing Page Factory
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        Moonshine controls now drive this app. Publish by adding a control file, route mapping, and asset references.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {published.map((page) => (
          <Link key={`${page.slug}-${page.path}`} href={page.path} className="block">
            <Card className="transition hover:bg-accent/40">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="text-lg">{page.seo.title}</CardTitle>
                <Badge>Published</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{page.seo.description}</p>
                <p className="mt-3 text-sm font-semibold">Route: {page.path}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {drafts.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-bold tracking-tight">Drafts / Not Indexed</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {drafts.map((page) => (
              <Card key={`${page.slug}-${page.path}`} className="opacity-80">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-lg">{page.seo.title}</CardTitle>
                  <Badge variant="secondary">noindex</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{page.seo.description}</p>
                  <p className="mt-3 text-sm font-semibold">Route: {page.path}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
