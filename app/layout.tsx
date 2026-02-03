import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { loadData } from "@/lib/verticals";

export async function generateMetadata(): Promise<Metadata> {
  const { site } = loadData();
  const url = `https://${site.domain}`;
  return {
    title: {
      default: site.brandName,
      template: `%s | ${site.brandName}`,
    },
    metadataBase: new URL(url),
    openGraph: {
      title: site.brandName,
      url,
      siteName: site.brandName,
      images: site.defaultOgImage ? [{ url: site.defaultOgImage }] : undefined,
      type: "website",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { site } = loadData();

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        <div className="border-b border-border/60 bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              {site.brandName}
            </Link>
            <div className="flex items-center gap-2">
              <a
                href={site.primaryCta.href}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                {site.primaryCta.label}
              </a>
              <a
                href={site.secondaryCta.href}
                className="rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold text-foreground/90 hover:bg-accent"
              >
                {site.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        {children}

        <footer className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} {site.brandName}</div>
              <div>{site.compliance?.disclaimerShort ?? "Funding options vary by profile. Not a lender. Terms depend on underwriting."}</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
