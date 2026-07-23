---
title: "Getting a Local Services Brand Cited by AI Answer Engines"
slug: "local-services-llm-visibility"
date: "2026-06-30"
category: "LLM SEO"
tags: ["local-seo", "llm-seo", "answer-engines", "content-structure"]
duration: "60 days"
tools: ["Perplexity", "ChatGPT", "Claude", "Google Business Profile", "Screaming Frog"]
summary: "A regional home services company was invisible in ChatGPT and Perplexity answers even though they ranked on page one of Google for the same queries. Traditional SEO wasn't the bottleneck — content structure was."
metrics:
  - { label: "AI Citations", value: "+300%" }
  - { label: "Conversion Rate", value: "+34%" }
  - { label: "Branded Search", value: "+58%" }
---

## Context

A regional HVAC and plumbing services company with solid Google Maps and page-one organic rankings for their core service + city queries. Owner noticed that when customers described asking ChatGPT for a recommendation, competitors were mentioned and this business wasn't — despite outranking those same competitors on Google.

## Problem

Ranking well on Google didn't translate to being surfaced by answer engines for the same intent. The site's service pages were written for keyword matching (title tags stuffed with "best plumber in [city]") rather than structured to directly answer the comparison and recommendation questions people actually ask conversational AI.

## Hypothesis

Restructuring service pages to directly answer the specific questions people ask AI assistants ("who should I call for X in [city]," "how much does X typically cost," "what's the difference between X and Y service") — using the direct-answer-first structure validated in my LLM citation research — will increase AI citation frequency independent of Google ranking position.

## Solution

Rewrote the top 12 service pages using a direct-answer-first structure: each page opens with a 2-3 sentence answer to the primary question, followed by supporting detail, a pricing range table (a format the earlier citation research showed answer engines favor), and clear service-area and licensing information that answer engines could use to validate legitimacy.

Added `LocalBusiness` and `Service` schema with complete, accurate `areaServed` and `priceRange` fields — many competitor pages had this schema missing entirely or incomplete.

Set up a monthly monitoring routine: run the same 20 "who should I call for X" queries through ChatGPT, Perplexity, and Claude, and log whether the client is mentioned, cited with a link, or absent.

## Results

- AI citation rate across the 20 tracked queries went from being cited in roughly 1 in 20 monthly checks to being cited in more than 3 in 4, a ~300% relative increase over 60 days.
- Conversion rate on the rewritten service pages rose 34%, which we attribute mostly to the clearer pricing-range tables reducing pre-call uncertainty, not just the AI citation increase.
- Branded search volume (people searching the company name directly) rose 58%, consistent with more people encountering the brand through an AI answer and then searching for it directly before calling.

## Errors

The first schema implementation used a generic `priceRange` value ("$$") instead of the actual estimated ranges — technically valid schema, but not useful information for either the answer engines or the customer. Fixing it to real numeric ranges came a few weeks into the project, after the first monitoring check showed no citation improvement.

## What I'd change

Add real price ranges from day one instead of treating schema as a checkbox to complete — the vague version passed every validator while providing none of the intended signal.

## Tools used

Perplexity, ChatGPT, and Claude for query monitoring, Google Business Profile for local signals, Screaming Frog for the schema and content audit.
