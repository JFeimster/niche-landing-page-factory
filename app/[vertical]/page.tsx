import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MoonshinePage } from "../../components/MoonshinePage";
import { getPrimaryDomain, getPublishedPages, resolvePage } from "@/lib/moonshine";

type Props = {
  params: Promise<{ vertical: string }>;
};

export async function generateStaticParams() {
  return getPublishedPages()
    .filter((page) => page.slug && page.slug !== "tools")
    .map((page) => ({ vertical: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { vertical } = await params;
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const resolved = resolvePage({ host, path: `/${vertical}` });

  if (!resolved || resolved.slug === "tools") return { title: "Not Found" };

  const canonical = `https://${getPrimaryDomain()}${resolved.path}`;

  return {
    title: resolved.generated.seo.titleTag,
    description: resolved.generated.seo.metaDescription,
    alternates: { canonical },
    robots: resolved.seo.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: resolved.generated.seo.titleTag,
      description: resolved.generated.seo.metaDescription,
      url: canonical,
      siteName: resolved.control.brandName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolved.generated.seo.titleTag,
      description: resolved.generated.seo.metaDescription,
    },
  };
}

export default async function VerticalLandingPage({ params }: Props) {
  const { vertical } = await params;
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host");
  const resolved = resolvePage({ host, path: `/${vertical}` });

  if (!resolved || resolved.slug === "tools") {
    return notFound();
  }

  return <MoonshinePage page={resolved} />;
}
