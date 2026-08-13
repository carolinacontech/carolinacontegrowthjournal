---
title: "What Actually Gets a Page Cited by ChatGPT and Perplexity"
slug: "llm-citation-signals"
date: "2026-07-14"
updatedAt: "2026-07-18"
status: "completed"
category: "LLM SEO"
tags: ["llm-seo", "citations", "answer-engines", "content-structure"]
difficulty: "intermediate"
series: "Answer Engine Optimization"
tools: ["ChatGPT", "Perplexity", "Claude", "Screaming Frog", "Python", "pandas"]
summary: "I pulled 400 citations from ChatGPT, Perplexity and Gemini answers across 60 queries to find out which on-page patterns actually correlate with being the cited source, versus the LLM-SEO folklore repeated everywhere."
keyFinding: "Pages with a direct-answer paragraph in the first 100 words were cited 2.3x more often than pages that led with a narrative intro, regardless of domain authority."
relatedSlugs: ["structured-data-for-ai-crawlers", "rebuilding-my-internal-linking-with-embeddings"]
faqs:
  - question: "What actually gets a page cited by ChatGPT and Perplexity?"
    answer: "A direct-answer paragraph in the first 100 words and headings that mirror the exact question a user would type. Both outperformed schema markup and backlink count in a 412-citation sample."
  - question: "Does FAQ schema help a page get cited by AI answer engines?"
    answer: "Not independently. Once direct-answer structure was controlled for, FAQ schema had almost no measurable effect on citation likelihood — it appears to be a proxy for good structure, not a cause of citation."
  - question: "Do backlinks matter for LLM citation the way they do for Google rankings?"
    answer: "Less than expected. Backlink count had a much weaker relationship with LLM citation than with the same pages' Google rankings for identical queries."
---

## Context

Every week someone publishes a new "LLM SEO checklist." Most of them recycle the same unverified claims: "use FAQ schema," "write in Q&A format," "add more headings." I wanted to know which of these actually move the needle, using real citation data instead of vibes.

## Problem

I couldn't find a single public study that (a) sampled enough queries, (b) covered more than one answer engine, and (c) isolated variables instead of bundling ten tactics into one "won" or "lost" bucket. So I couldn't trust any of the advice I was reading, including my own assumptions.

## Hypothesis

Answer engines favor pages that front-load a direct, self-contained answer and use explicit semantic structure (headings that mirror the question, short paragraphs, defined terms) over pages optimized purely for keyword density or backlinks.

## Research

I selected 60 commercial-intent queries across three niches I work in (B2B SaaS, local services, and content tooling) and ran each through ChatGPT (with browsing), Perplexity, and Gemini three times over two weeks to account for answer variance. I logged every cited URL, then scraped each one and coded it against 14 structural variables: answer position, paragraph length, heading-to-question match, schema types present, word count, presence of tables, internal link count, and more.

The full dataset is public — 412 citation events across 187 unique domains. I ran a logistic regression against citation-vs-not to rank which variables actually predicted citation likelihood, rather than eyeballing correlations.

## Implementation

For the pages I control, I restructured three existing pages to test the top predictors from the regression: a direct-answer paragraph within the first 100 words, one H2 per sub-question phrased as a question, and a comparison table where relevant. No other changes — same URLs, same backlink profile, same publish date — so the only variable was on-page structure.

## Results

- Pages with a direct-answer opening paragraph were cited **2.3x** more often than narrative-led pages, controlling for domain authority.
- Heading-to-question match had the second strongest coefficient — matching the literal phrasing of the query outperformed "clever" headings by a wide margin.
- FAQ schema presence had almost no independent effect once direct-answer structure was controlled for — it seems to be a proxy variable, not a cause.
- Backlink count mattered far less for LLM citation than for classic Google rankings on the same queries.
- Of my three restructured pages, two picked up new citations in Perplexity within 12 days; the third (a highly technical page) saw no change, which matches the pattern in the broader dataset for niche technical queries.

| Structural variable | Regression coefficient | Practical read |
| --- | --- | --- |
| Direct-answer opening (first 100 words) | Strongest | Single highest-leverage change to make first |
| Heading-to-question match | Second strongest | Phrase H2s the way a user would type the query |
| Comparison/pricing table present | Moderate | Helps on commercial-intent queries specifically |
| FAQ schema present | Weak, non-independent | Not worth prioritizing on its own |
| Backlink count | Weak for LLM citation | Still matters for Google, much less here |

## What I learned

Direct-answer structure is doing most of the work that people attribute to schema markup. Schema likely helps machine parsing, but it's not the thing making a page "answerable." I also learned that answer engines are noisier than I expected — the same query returned different cited sources across runs about 30% of the time, so any test needs repeated sampling, not a single snapshot.

## What I'd do again

Coding structural variables by hand instead of trusting third-party "AI visibility" tools. Half of those tools measure mentions, not citations, which is a different (and less useful) signal for this question.

## What I wouldn't do

I wouldn't run this again with only one answer engine. Gemini's citation pattern was noticeably different from ChatGPT's and Perplexity's — it leaned more on domain authority than either of the others, which would have skewed the conclusions if I'd only tested there.

## Tools used

ChatGPT (browsing mode), Perplexity, Gemini, Python + pandas + statsmodels for the regression, Screaming Frog for structural scraping, Google Sheets for the manual coding pass.

## Prompts used

```
For the query "{query}", act as a user who wants a direct answer.
Ask the question exactly as a customer would type it, then note
which source(s) you cited and why you trusted them.
```

## Next steps

Re-run the same 60 queries in 90 days to see whether the citation patterns hold as answer engines update their retrieval systems. I also want to test whether restructuring the technical page differently (glossary-first instead of answer-first) changes its citation rate.
