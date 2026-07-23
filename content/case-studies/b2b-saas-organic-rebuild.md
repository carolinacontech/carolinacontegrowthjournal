---
title: "Rebuilding a B2B SaaS Site's Organic Funnel in 90 Days"
slug: "b2b-saas-organic-rebuild"
date: "2026-05-10"
category: "Growth Systems"
tags: ["saas", "technical-seo", "conversion", "content-architecture"]
duration: "90 days"
tools: ["Next.js", "Ahrefs", "GPT-4.1", "GA4", "Search Console", "Hotjar"]
summary: "A vertical SaaS product had strong product-market fit but an organic funnel that leaked at every stage: thin indexation, no topical structure, and a pricing page nobody found. This is the system I built to fix it."
metrics:
  - { label: "Organic Traffic", value: "+180%" }
  - { label: "Qualified Leads", value: "+42%" }
  - { label: "Time to Publish", value: "-70%" }
  - { label: "Indexed Pages", value: "+210%" }
---

## Context

The client is a vertical SaaS product serving operations teams at mid-market logistics companies. Strong retention, strong word-of-mouth, but organic traffic had been flat for over a year and nearly all inbound leads came from paid channels and outbound.

## Problem

Three compounding issues: a content library with no topical hierarchy (60 blog posts with no relationship to each other or to product pages), a pricing page buried three clicks deep with no internal links pointing to it, and a publishing process that took a writer 6+ hours per article because there was no repeatable structure.

## Hypothesis

If we rebuild the site's information architecture around topic clusters tied directly to product use cases, fix the internal linking to route authority toward commercial pages, and build a content production system that keeps quality high while cutting production time, organic traffic and qualified leads will both grow — not just traffic vanity metrics.

## Solution

**Architecture**: Restructured the content library into 6 topic clusters, each anchored by a pillar page mapped to a specific buyer use case, with every supporting article linking back to the pillar and the pillar linking to the relevant product page.

**Technical foundation**: Rebuilt the site on Next.js with static generation for content pages, fixed canonical and pagination issues that had been splitting authority across duplicate URL parameters, and shipped clean structured data (Article, Organization, BreadcrumbList).

**Production system**: Built a content workflow using GPT-4.1 for structured first drafts against a strict brief template (audience, use case, internal link targets, CTA), with every draft reviewed and substantially edited by a human writer before publishing — not auto-published.

**Conversion path**: Added contextual CTAs linking from cluster content directly to the pricing page and to a use-case-specific demo request, replacing the single generic "Book a demo" button that existed sitewide.

## Results

- Organic traffic up 180% over 90 days, verified in GA4 and Search Console, isolated from a paid traffic increase (paid spend was flat over the same period).
- Qualified leads (defined by the client's existing MQL criteria) up 42%, tracked through their CRM, not just form submissions.
- Time to publish a new article dropped from ~6 hours to under 2, using the brief-and-draft system with human review.
- Indexed pages grew 210% as duplicate-content and pagination issues were resolved, which also stopped crawl budget from being wasted on near-duplicate URLs.

## Errors

The first version of the AI-assisted draft template produced generic, keyword-stuffed copy that a human writer had to substantially rewrite rather than lightly edit — the initial brief template didn't force enough specificity about the buyer's actual situation. It took two iterations of the brief template before drafts required light editing instead of full rewrites.

We also initially pointed too many internal links at the homepage instead of the specific use-case pillar pages, diluting the effect we wanted — caught this three weeks in via a link-distribution audit and corrected it.

## What I'd change

Run the internal link audit before the migration instead of three weeks after. It would have caught the homepage-linking issue before it affected crawl priority.

## Tools used

Next.js, Ahrefs for link and keyword tracking, GPT-4.1 for structured drafting, GA4 and Search Console for measurement, Hotjar for on-page behavior on the new pricing page.
