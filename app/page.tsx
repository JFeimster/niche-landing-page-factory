import Link from "next/link";
import { getAllVerticals } from "@/lib/verticals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const { site, verticals } = getAllVerticals();
  const published = verticals.filter((v) => v.status === "published");
  const drafts = verticals.filter((v) => v.status !== "published");

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">
        {site.brandName}: Niche Landing Page Factory
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
        One JSON file. Infinite vertical pages. Publish by flipping <code className="rounded bg-muted px-1">status</code> to{" "}
        <code className="rounded bg-muted px-1">published</code>.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {published.map((v) => (
          <Link key={v.slug} href={`/${v.slug}`} className="block">
            <Card className="transition hover:bg-accent/40">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="text-lg">{v.seo.title}</CardTitle>
                <Badge>Published</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{v.seo.description}</p>
                <p className="mt-3 text-sm font-semibold">Route: /{v.slug}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {drafts.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl font-bold tracking-tight">Drafts / Not Indexed</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {drafts.map((v) => (
              <Card key={v.slug} className="opacity-80">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-lg">{v.seo.title}</CardTitle>
                  <Badge variant="secondary">{v.status}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{v.seo.description}</p>
                  <p className="mt-3 text-sm font-semibold">Route: /{v.slug}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
