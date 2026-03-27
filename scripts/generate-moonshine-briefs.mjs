import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "data", "moonshine");

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function normalize(value) {
  return String(value || "").trim();
}

function titleBase(control) {
  const seoTitle = normalize(control.seo?.title);
  const heroHeadline = normalize(control.hero?.headline);
  const label = normalize(control.label || control.slug);
  const title = seoTitle || heroHeadline || label;
  return title.replace(/\s*\|\s*[^|]+$/u, "").trim();
}

function inferFamily(control) {
  const pageType = normalize(control.pageType).toLowerCase();
  const layout = normalize(control.layout).toLowerCase();
  const host = normalize(control.route?.host).toLowerCase();
  const pathName = normalize(control.route?.path);

  if (host.startsWith("blog.") || pageType === "content-hub" || layout.includes("blog")) return "guide";
  if (pageType.includes("partner") || host.startsWith("partners.")) return "partner";
  if (pageType.includes("tool") || layout.includes("tool")) return "tool";
  if (pageType.includes("bank") || pageType.includes("credit")) return "hub";
  if (pathName.startsWith("/funding/")) return "category";
  return "vertical";
}

function targetKeyword(control) {
  const family = inferFamily(control);
  const base = titleBase(control);

  if (family === "partner") return "funding partner recruitment";
  if (family === "guide") return `${base} guide`;
  if (family === "tool") return `${base} tool`;
  if (family === "hub") return `${base} hub`;
  if (family === "category") return `${base} funding`;
  return base.endsWith("Funding") ? base : `${normalize(control.label)} funding`;
}

function searchIntent(control) {
  const family = inferFamily(control);
  if (family === "partner") return "Commercial / partner acquisition";
  if (family === "guide") return "Informational / commercial investigation";
  if (family === "tool") return "Transactional / utility";
  if (family === "hub") return "Commercial / navigational";
  return "Commercial / compare options";
}

function audience(control) {
  const family = inferFamily(control);
  const label = normalize(control.label).toLowerCase();
  if (family === "partner") return "affiliate partners, independent agents, and agency builders";
  if (family === "guide") return "buyers looking for practical funding guidance";
  if (family === "tool") return "operators who want faster answers from calculators and utilities";
  if (family === "hub") return "operators comparing capital paths across a broad category";
  return `${label} operators who need working capital, growth capital, or project funding`;
}

function uniqueValueProposition(control) {
  return (
    normalize(control.hero?.subheadline) ||
    normalize(control.seo?.description) ||
    `${normalize(control.label)} positioned with vertical-specific proof, clear benefits, and a direct next step.`
  );
}

function proofPoints(control) {
  const points = [
    ...(control.problem || []).slice(0, 2),
    ...(control.benefits || []).slice(0, 3),
    ...(control.proof || []).map((item) => item.title).filter(Boolean),
    ...(control.useCases || []).map((item) => item.title).filter(Boolean),
  ];
  return Array.from(new Set(points.map(normalize).filter(Boolean))).slice(0, 5);
}

function faqIdeas(control) {
  const family = inferFamily(control);
  const base = normalize(control.label).replace(/\bFunding\b/gi, "").trim() || normalize(control.slug);
  const generic = family === "partner"
    ? ["What is the partner program?", "How do I apply?", "What support do partners get?"]
    : family === "guide"
      ? ["What should I do first?", "How do I compare options?", "What documents matter most?"]
      : [
          `How does ${base.toLowerCase()} funding work?`,
          `What makes this ${base.toLowerCase()} page different?`,
          `How fast can I get started?`,
        ];
  return Array.from(
    new Set([
      ...(control.objections || []).map((item) => item.q).filter(Boolean),
      ...(control.faqs || []).map((item) => item.q).filter(Boolean),
      ...generic,
    ].map(normalize).filter(Boolean)),
  ).slice(0, 5);
}

function internalLinks(control) {
  const links = [
    ...(control.relatedGuides || []).map((item) => (typeof item === "string" ? item : item.title || item.label || item.id)),
    ...(control.navigationRouteIds || []).map((routeId) => routeId.replace(/^route:/, "").replace(/-/g, " ")),
  ];
  if (links.length > 0) return Array.from(new Set(links.map(normalize).filter(Boolean))).slice(0, 5);

  const family = inferFamily(control);
  if (family === "partner") return ["Partner Portal", "DAC Team", "Funding Hub"];
  if (family === "guide") return ["Funding Hub", "Book a Review", "Blog & Guides"];
  if (family === "tool") return ["Funding Hub", "Book a Review", "Templates"];
  if (family === "hub") return ["Contractors", "Truckers", "Roofers"];
  return ["Funding Hub", "Book a Review", "Tools"];
}

function schemaType(control) {
  const family = inferFamily(control);
  if (family === "guide") return "Article";
  if (family === "partner") return "FAQPage";
  if (family === "tool") return "ItemList";
  if ((control.faqs || []).length || (control.objections || []).length) return "FAQPage";
  return family === "hub" ? "WebPage" : "WebPage";
}

const files = readdirSync(dataDir).filter((file) => file.endsWith(".control.json"));
let updated = 0;

for (const filename of files) {
  const filePath = path.join(dataDir, filename);
  const control = readJson(filePath);

  if (control.brief) continue;

  control.brief = {
    targetKeyword: targetKeyword(control),
    searchIntent: searchIntent(control),
    audience: audience(control),
    uniqueValueProposition: uniqueValueProposition(control),
    proofPoints: proofPoints(control),
    faqIdeas: faqIdeas(control),
    internalLinks: internalLinks(control),
    schemaType: schemaType(control),
  };

  writeJson(filePath, control);
  updated += 1;
}

console.log(`[generate-moonshine-briefs] Updated ${updated} control file(s).`);
