import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Tools",
  description: "Engineering-as-marketing tools, calculators, and embeds.",
};

type Tool = {
  title: string;
  desc: string;
  href: string;
  tags?: string[];
};

// Replace these with your real tools (Vercel embeds, calculators, directories, etc).
const TOOLS: Tool[] = [
  {
    title: "Inventory Turnover Accelerator",
    desc: "Calculate inventory velocity and spot cash traps.",
    href: "https://inventory-turnover-accelerator.vercel.app/",
    tags: ["inventory", "calculator"],
  },
  {
    title: "Bid Protector Inflation Adjuster",
    desc: "Adjust project bids for inflation and margin protection.",
    href: "https://core-tools.vercel.app/tools/rokfi-bid-protector-inflation-adjuster",
    tags: ["construction", "pricing"],
  },
  {
    title: "Micro-M&A Deal Analyzer",
    desc: "Score a micro acquisition deal quickly (cash flow, risk, payback).",
    href: "#",
    tags: ["acquisitions", "analysis"],
  },
  {
    title: "Funding Pathfinder (Coming Soon)",
    desc: "Route users to best-fit funding lane based on deposits and profile.",
    href: "#",
    tags: ["funding", "router"],
  },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Tools</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Engineering-as-marketing tools, calculators, and embeds you can plug into pillar pages.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {TOOLS.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="block"
            target={t.href.startsWith("http") ? "_blank" : undefined}
          >
            <Card className="transition hover:bg-accent/40">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <CardTitle className="text-lg">{t.title}</CardTitle>
                <div className="flex flex-wrap justify-end gap-2">
                  {(t.tags || []).slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
                <p className="mt-3 text-sm font-semibold">Open →</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
