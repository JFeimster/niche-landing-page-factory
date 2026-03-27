# Site Structure and URL Architecture

Project: `distilledfunding.com`  
Date: 2026-03-27

## 1) Current Core Structure

- `/` home
- `/[vertical]` dynamic vertical hub pages
- `/blog` blog index
- `/blog/[slug]` supporting content
- `/tools` utility pages/tools index
- `/book` advisor booking page

## 2) Vertical Hub Taxonomy

Created verticals:
- `/gig-worker-loans` (published)
- `/electricians` (draft, promote after quality gate)

Planned vertical candidates from control files:
- `/contractors`
- `/hvac`
- `/plumbers`
- `/roofers`
- `/auto-repair`
- `/dentists`
- `/med-spa`
- `/landscapers`
- `/pest-control`
- `/law-firms`
- `/restaurants`
- `/truckers`
- `/solar-installers`
- `/ecom-sellers`
- `/real-estate`

Supporting financing hubs (as needed):
- `/funding`
- `/credit`
- `/banking`
- `/ecom`
- `/tools`

## 3) URL Rules

- Use short, hyphenated slugs only.
- One canonical URL per intent cluster.
- Avoid date-based URLs for evergreen finance pages.
- Keep vertical pages on root-level slugs for clarity and authority consolidation.

## 4) Internal Linking Blueprint

From each vertical hub:
- Link to 2-3 relevant spoke posts in `/blog/[slug]`.
- Link to one adjacent vertical where intent overlap is high.
- Link to `/tools` when a calculator/checklist supports the decision stage.

From each spoke post:
- Primary CTA link to its parent vertical hub.
- Secondary link to one comparison page or adjacent spoke.
- Footer block: "related funding guides" (2-4 links).

Cross-cluster links:
- service-business verticals should cross-link by funding type, not only by industry.

## 5) Sitemap and Indexation Gates

Include in sitemap:
- all indexable vertical hubs
- all spoke posts that pass quality checks
- key conversion routes (`/book`, `/tools`)

Exclude or keep `noindex`:
- drafts
- near-duplicate thin pages
- pages missing required schema/FAQ/internal links

## 6) Schema Per Page Type

Home:
- `Organization`
- `WebSite`

Vertical hubs:
- `WebPage`
- `FAQPage` (when FAQs are present)

Blog posts:
- `Article`
- `BreadcrumbList`

Tools:
- `WebPage` (or `SoftwareApplication` where truly applicable)

## 7) Future Nested Architecture (Optional)

If scale requires clearer clusters, add optional nested pattern:
- `/verticals/[vertical]`
- `/guides/[topic]`

Do not migrate unless:
- existing root slugs are stable with redirects planned
- migration can preserve rankings with clean 301 mapping

