# SEO Strategy: Created Verticals + Future Pages

Project: Moonshine Capital (`distilledfunding.com`)  
Date: 2026-03-27  
Scope: existing vertical pages, queued vertical control files, blog, tools, and book funnels.

## 1) Discovery Summary

- Current published verticals:
  - `gig-worker-loans` (published, indexable)
- Current draft verticals:
  - `electricians` (draft, currently `noindex: true`)
- Existing route model:
  - Dynamic vertical route: `/[vertical]`
  - Supporting routes: `/blog`, `/blog/[slug]`, `/tools`, `/book`
- Expansion inventory from `data/moonshine/*.control.json`:
  - Local service and SMB financing clusters (auto-repair, contractors, dentists, HVAC, landscapers, law-firms, med-spa, pest-control, plumbers, restaurants, roofers, solar-installers, truckers, etc.)
  - Core financing hubs (funding, banking, credit, ecom, ecom-sellers, tools)

## 2) Strategic Direction

Primary growth motion:
- Build a hub-and-spoke SEO system where each vertical page is a conversion-first hub.
- Support each hub with high-intent blog spokes mapped to one job-to-be-done.
- Cross-link hubs by funding type (instant advance, RBF, MCA, LOC prep path) to improve topical authority and crawl depth.

Positioning:
- Practical financing guidance for irregular cashflow businesses and operators.
- "Apply, Prep, or No" framework as trust differentiator.

## 3) SEO Objectives (12 months)

- Grow non-brand organic sessions by vertical intent.
- Rank page-one for at least 20 high-intent long-tail terms across created verticals.
- Convert vertical traffic into applications and booked advisor calls.
- Scale from 2 active vertical pages to 15+ quality-controlled vertical pages.

## 4) KPI Targets

| Metric | Baseline | 3 Month | 6 Month | 12 Month |
|--------|----------|---------|---------|----------|
| Organic sessions/month | low/early | +100% | +250% | +500% |
| Ranking keywords (Top 20) | minimal | 40 | 120 | 300 |
| Ranking keywords (Top 10) | minimal | 10 | 35 | 90 |
| Qualified organic leads/month | baseline TBD | +50% | +150% | +300% |
| Indexed high-quality pages | current core | 25 | 60 | 140 |
| CWV pass rate (mobile) | baseline TBD | 80% | 90% | 95% |

## 5) Content Model

Page classes:
- Vertical landing pages (`/[vertical]`) for conversion + topical breadth.
- Blog explainers (`/blog/[slug]`) for supporting long-tail intents.
- Tool pages (`/tools`) for linkable utility content.
- Booking page (`/book`) optimized for branded and bottom-funnel intent.

Publishing ratio:
- For each new vertical: 1 hub page + 3 spokes in first 45 days.
- Ongoing cadence: 2-4 new spokes/week distributed across active vertical clusters.

## 6) E-E-A-T Plan

- Add author entities for financing guidance content with bios and review timestamps.
- Add transparent underwriting disclaimers and "not a lender" context across templates.
- Include real scenario patterns (cashflow profiles, prep checklists, approval timelines).
- Add editorial QA checklist per publish: factual consistency, compliance wording, CTA validity.

## 7) Technical SEO Foundation

- Keep dynamic route generation deterministic and include all indexable slugs in sitemap.
- Maintain canonical self-reference for each live vertical.
- Enforce indexation guardrails:
  - Draft or thin pages stay `noindex`.
  - Only pages that meet quality gate move to indexable.
- Schema baseline:
  - `WebPage` + `FAQPage` (when FAQs exist)
  - `BreadcrumbList` for blog and future nested structures
  - `Organization` sitewide entity

## 8) Created Verticals Plan (Now)

`gig-worker-loans`:
- Expand semantic coverage: "gig worker business funding", "no tax return funding", "deposit based financing", "self employed cash advance."
- Add 4 new FAQ entries tied to objections and timeline expectations.
- Add 3 contextual links to supporting blog spokes and one link to tools.

`electricians`:
- Keep `noindex` until minimum quality gate:
  - complete options section
  - add FAQs (5+)
  - unique proof or examples section
  - complete internal links block
- Flip to indexable only after gate completion and schema coverage.

## 9) Future Vertical Rollout Framework

Wave 1 (next 30-45 days):
- contractors
- hvac
- plumbers
- roofers
- auto-repair

Wave 2 (45-90 days):
- dentists
- med-spa
- landscapers
- pest-control
- law-firms

Wave 3 (90-150 days):
- restaurants
- truckers
- solar-installers
- ecom-sellers
- real-estate

Each wave rule:
- Launch only pages that pass quality gate.
- Publish matching spokes within 14 days of hub launch.

## 10) Risks and Mitigations

- Risk: duplicate or templated sameness across verticals.
  - Mitigation: mandatory unique pain-point section and unique FAQ set per vertical.
- Risk: index bloat from drafts.
  - Mitigation: strict `noindex` default for incomplete pages.
- Risk: weak internal linking as page count grows.
  - Mitigation: use fixed linking blocks (parent hub, sibling hubs, 2-3 spokes).

