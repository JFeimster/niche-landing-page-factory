# Niche Landing Page Factory (Next.js App Router)

**Goal:** ship dozens of niche landing pages from Moonshine JSON configs.

- Route: `/[vertical]` and `/tools` (Moonshine resolver-backed)
- Config: `data/moonshine/*.json`
- UI: Tailwind v4 + shadcn/ui-style components (Button/Card/Accordion/Badge)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Sync Moonshine content

```bash
npm run content:import
npm run content:validate
```

Use `MOONSHINE_SOURCE_DIR` to override import source path:

```bash
MOONSHINE_SOURCE_DIR=/path/to/json npm run content:import
```

Build-time routes are generated from `manifest.json` + route/control mapping.

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
- Moonshine files are treated as source-of-truth in this app.
- Keep Next.js/React patched when new security advisories ship (especially for RSC-related CVEs).
