import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight">Not found</h1>
      <p className="mt-2 text-muted-foreground">
        This vertical route doesn't exist (or isn't published yet).
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </main>
  );
}
