import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Simple stub so internalLinks don't 404.
// Replace with a real CMS/blog later.

export const dynamicParams = true;

export default function BlogPostStub({ params }: { params: { slug: string } }) {
  if (!params.slug) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight">Blog: {params.slug}</h1>
      <p className="mt-3 text-muted-foreground">
        This is a placeholder page. Wire your real blog here (MDX, CMS, etc.).
      </p>

      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
