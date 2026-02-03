import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  { title: "Instant Funding for Gig Workers (2026): Up to $20K Fast", href: "/blog/instant-funding-gig-workers" },
  { title: "No Tax Returns? Here’s What Lenders Use Instead", href: "/blog/no-tax-return-funding" },
];

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-3 text-muted-foreground">Placeholder blog index. Replace with your real content system.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.href} href={p.href} className="block">
            <Card className="transition hover:bg-accent/40">
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.href}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
