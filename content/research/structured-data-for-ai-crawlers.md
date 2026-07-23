---
title: "Auditing Structured Data Through the Eyes of an AI Crawler"
slug: "structured-data-for-ai-crawlers"
date: "2026-06-22"
status: "completed"
category: "AI SEO"
tags: ["structured-data", "json-ld", "crawlers", "technical-seo"]
difficulty: "intermediate"
tools: ["Python", "requests", "GPTBot", "Screaming Frog", "Schema.org validator"]
summary: "Instead of validating schema against Google's Rich Results Test, I checked what happens when GPTBot and ClaudeBot actually fetch a page — and found a gap between 'valid JSON-LD' and 'usable JSON-LD.'"
keyFinding: "38% of pages with 'valid' schema markup served materially different structured data to AI crawlers than to Googlebot, due to client-side rendering timing."
relatedSlugs: ["llm-citation-signals", "rebuilding-my-internal-linking-with-embeddings"]
---

## Context

Structured data checklists usually stop at "does it pass the validator." That answers whether the JSON-LD is syntactically valid, not whether the crawler that matters actually receives it.

## Problem

Most AI crawlers (GPTBot, ClaudeBot, PerplexityBot) don't execute JavaScript the way Googlebot's rendering pipeline does. If your schema is injected client-side, or depends on hydration, a validator running in a headless browser will pass it while the actual crawler sees an empty or partial `<script type="application/ld+json">` tag.

## Hypothesis

A meaningful share of sites with "valid" schema, verified through browser-based tools, are serving incomplete structured data to non-rendering AI crawlers, and this gap is invisible unless you fetch the raw HTML the way those crawlers do.

## Research

I took 40 URLs from my own client work and public sites in my niche, and fetched each one two ways: once with a headless browser (to simulate Googlebot's rendering) and once with a plain HTTP GET using each crawler's published user agent string and no JS execution. I diffed the JSON-LD payloads between the two fetches.

## Implementation

I built a small Python script that fetches both versions, extracts every `ld+json` block, normalizes them, and reports missing fields, empty arrays, or entirely absent schema in the non-rendered version. I ran it against my own site first to catch obvious issues before going wider.

## Results

- 38% of the 40 pages served incomplete or empty structured data to the raw-HTTP fetch, despite passing Google's Rich Results Test.
- The most common failure was `Article` schema populated by a client-side CMS integration that ran after page load.
- My own site had one offending page — a case study using a React component to inject FAQ schema after hydration. Moving it to a server-rendered `<script>` tag fixed it immediately, verified by re-running the raw fetch.

## What I learned

"Passes the validator" and "reaches the crawler" are two different claims, and most SEO tooling only tests the first one. For any site depending on LLM-driven discovery, structured data has to be present in the initial server response, full stop.

## What I'd do again

Testing against my own site before publishing anything about other people's mistakes. It caught a real bug.

## What I wouldn't do

I wouldn't assume this is only a schema problem — the same rendering-timing gap likely affects meta descriptions, canonical tags, and internal links on JS-heavy sites. That's the next investigation.

## Tools used

Python, `requests`, Schema.org validator, Google's Rich Results Test, a local Puppeteer script for the rendered comparison.

## Next steps

Extend the same raw-vs-rendered diff to canonical tags and internal links across the same 40-URL sample.
