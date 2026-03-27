import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dataDir = path.join(root, "data", "moonshine");

function fail(message) {
  console.error(`[content:validate] ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`Failed to parse JSON: ${filePath}\n${error}`);
  }
}

if (!existsSync(dataDir)) {
  fail(`Moonshine data directory not found: ${dataDir}`);
}

const manifestPath = path.join(dataDir, "manifest.json");
const routesPath = path.join(dataDir, "routes.json");
const assetsPath = path.join(dataDir, "assets.json");

for (const requiredPath of [manifestPath, routesPath, assetsPath]) {
  if (!existsSync(requiredPath)) {
    fail(`Required file missing: ${requiredPath}`);
  }
}

const manifest = readJson(manifestPath);
const routes = readJson(routesPath);
const assets = readJson(assetsPath);

const errors = [];

if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
  errors.push("manifest.json must contain a non-empty files array.");
}

const routeIds = new Set();
const hostPathKeys = new Set();

for (const route of routes.routes || []) {
  if (!route.id) {
    errors.push("routes.json contains a route with missing id.");
    continue;
  }

  if (routeIds.has(route.id)) {
    errors.push(`Duplicate route id: ${route.id}`);
  }
  routeIds.add(route.id);

  const hostPath = `${String(route.host || "").toLowerCase()}::${String(route.path || "")}`;
  if (hostPathKeys.has(hostPath)) {
    errors.push(`Duplicate route host/path: ${route.host}${route.path}`);
  }
  hostPathKeys.add(hostPath);
}

const assetIds = new Set((assets.assets || []).map((asset) => asset.id));
const collectionNames = new Set(Object.keys(assets.collections || {}));
const allowedSchemaTypes = new Set(["WebPage", "FAQPage", "Article", "ItemList"]);

for (const manifestFile of manifest.files || []) {
  const controlPath = path.join(dataDir, manifestFile.filename);
  if (!existsSync(controlPath)) {
    errors.push(`manifest.json references missing control file: ${manifestFile.filename}`);
    continue;
  }

  const control = readJson(controlPath);
  const slug = control.slug || manifestFile.filename;

  if (!control.id) errors.push(`${manifestFile.filename}: missing id`);
  if (!control.slug) errors.push(`${manifestFile.filename}: missing slug`);
  if (!control.sourceRouteId) errors.push(`${manifestFile.filename}: missing sourceRouteId`);
  if (control.sourceRouteId && !routeIds.has(control.sourceRouteId)) {
    errors.push(`${manifestFile.filename}: unknown sourceRouteId "${control.sourceRouteId}"`);
  }

  const contentSources = control.contentSources || {};
  for (const key of ["notion", "repos", "sites", "templates"]) {
    if (!Array.isArray(contentSources[key])) {
      errors.push(`${manifestFile.filename}: contentSources.${key} must be an array`);
    }
  }

  for (const assetId of [...(control.assetOrder || []), ...(control.featuredAssets || [])]) {
    if (!assetIds.has(assetId)) {
      errors.push(`${manifestFile.filename}: unknown asset id "${assetId}"`);
    }
  }

  for (const collectionName of control.collections || []) {
    if (!collectionNames.has(collectionName)) {
      errors.push(`${manifestFile.filename}: unknown collection "${collectionName}"`);
    }
  }

  if (!control.route?.host || !control.route?.path) {
    errors.push(`${manifestFile.filename}: route.host and route.path are required`);
  }

  if (!control.seo?.title || !control.seo?.description) {
    errors.push(`${manifestFile.filename}: seo.title and seo.description are required`);
  }

  if (!control.hero?.headline) {
    errors.push(`${manifestFile.filename}: hero.headline is recommended`);
  }

  if (control.brief != null) {
    const brief = control.brief || {};
    if (typeof brief.targetKeyword !== "string" || !brief.targetKeyword.trim()) {
      errors.push(`${manifestFile.filename}: brief.targetKeyword must be a non-empty string`);
    }
    if (typeof brief.searchIntent !== "string" || !brief.searchIntent.trim()) {
      errors.push(`${manifestFile.filename}: brief.searchIntent must be a non-empty string`);
    }
    if (typeof brief.audience !== "string" || !brief.audience.trim()) {
      errors.push(`${manifestFile.filename}: brief.audience must be a non-empty string`);
    }
    if (typeof brief.uniqueValueProposition !== "string" || !brief.uniqueValueProposition.trim()) {
      errors.push(`${manifestFile.filename}: brief.uniqueValueProposition must be a non-empty string`);
    }
    if (!Array.isArray(brief.proofPoints)) {
      errors.push(`${manifestFile.filename}: brief.proofPoints must be an array`);
    }
    if (!Array.isArray(brief.faqIdeas)) {
      errors.push(`${manifestFile.filename}: brief.faqIdeas must be an array`);
    }
    if (!Array.isArray(brief.internalLinks)) {
      errors.push(`${manifestFile.filename}: brief.internalLinks must be an array`);
    }
    if (typeof brief.schemaType !== "string" || !allowedSchemaTypes.has(brief.schemaType)) {
      errors.push(`${manifestFile.filename}: brief.schemaType must be one of ${Array.from(allowedSchemaTypes).join(", ")}`);
    }
  }

  if (!slug || typeof slug !== "string") {
    errors.push(`${manifestFile.filename}: invalid slug`);
  }
}

if (errors.length > 0) {
  console.error("[content:validate] Validation failed with blocking errors:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("[content:validate] All Moonshine content checks passed.");
