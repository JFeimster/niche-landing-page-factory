# Niche Landing Page Factory (Next.js App Router)

**Goal:** ship dozens of niche landing pages from a single JSON config.

- Route: `/[vertical]` (SSG for `status: "published"` verticals)
- Config: `data/verticals.json`
- UI: Tailwind v4 + shadcn/ui-style components (Button/Card/Accordion/Badge)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Add / publish a vertical

1. Edit `data/verticals.json`
2. Add a new object under `verticals[]`
3. Set:

```json
{
  "slug": "my-vertical",
  "status": "published",
  "seo": { "noindex": false }
}
```

Build-time routes are generated from `status === "published"`.

```bash
npm run build
npm start
```

## Placeholder images

- Hero images: `public/img/heroes/*`
- OG images: `public/og/*`

Swap these with your real assets (same filenames), or point the JSON at new paths.

## shadcn/ui workflow

This repo is already set up with a `components.json` and a few base components under `components/ui/*`.

To add more shadcn components later:

```bash
npx shadcn@latest add dropdown-menu
```

## Deploy to Vercel

1. Push to GitHub
2. In Vercel: **New Project → Import**
3. Framework preset: **Next.js**
4. Build command: `npm run build`
5. Output: default (Vercel detects Next.js)

### Notes

- Node version: `>= 20.9` (see `.nvmrc` + `package.json engines`)
- Your CTA links are currently in `data/verticals.json`. Replace the `YOUR-*` placeholders.
- Keep Next.js/React patched when new security advisories ship (especially for RSC-related CVEs).
