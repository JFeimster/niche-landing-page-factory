import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROOT_REWRITE_BY_HOST: Record<string, string> = {
  "tools.distilledfunding.com": "/tools",
  "partners.distilledfunding.com": "/dac-team",
  "banking.distilledfunding.com": "/banking",
  "credit.distilledfunding.com": "/credit",
  "ecom.distilledfunding.com": "/ecom",
};

function normalizeHost(host: string): string {
  return host.toLowerCase().replace(/:\d+$/, "");
}

function isBypassPath(pathname: string): boolean {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return true;
  }

  return /\.[a-z0-9]+$/i.test(pathname);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (isBypassPath(pathname)) return NextResponse.next();

  const rawHost = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const host = normalizeHost(rawHost);
  const rewritePath = ROOT_REWRITE_BY_HOST[host];

  if (rewritePath && pathname === "/") {
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = rewritePath;
    return NextResponse.rewrite(rewritten);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
