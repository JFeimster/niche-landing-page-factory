import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MoonshinePage } from "../../components/MoonshinePage";
import { getPrimaryDomain, resolvePage } from "@/lib/moonshine";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const resolved = resolvePage({ host, path: "/tools" });
  if (!resolved) {
    return {
      title: "Tools",
      description: "Tools",
    };
  }

  return {
    title: resolved.generated.seo.titleTag,
    description: resolved.generated.seo.metaDescription,
    alternates: { canonical: `https://${getPrimaryDomain()}${resolved.path}` },
    robots: resolved.seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function ToolsPage() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const resolved = resolvePage({ host, path: "/tools" });
  if (!resolved) return notFound();
  return <MoonshinePage page={resolved} />;
}
