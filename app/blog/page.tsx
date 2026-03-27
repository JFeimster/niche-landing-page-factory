import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPosts } from "@/lib/moonshine";

const posts = getBlogPosts();

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <Badge variant="secondary">Blog & Guides</Badge>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Generated guides for high-intent search</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Each article is built from a structured brief so the page has a distinct search angle, supporting sections,
          and a clear path to the conversion pages.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <Card className="h-full transition hover:border-border hover:bg-accent/30">
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{post.readingTime}</Badge>
                  <Badge variant="outline">{post.publishedAt}</Badge>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{post.description}</p>
                <p className="mt-4 text-sm font-semibold text-foreground">Read guide</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
