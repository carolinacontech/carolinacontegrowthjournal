---
title: "Rebuilding Internal Linking with Embeddings Instead of Guesswork"
slug: "rebuilding-my-internal-linking-with-embeddings"
date: "2026-07-20"
status: "running"
category: "Growth Engineering"
tags: ["internal-linking", "embeddings", "automation", "information-architecture"]
difficulty: "advanced"
tools: ["OpenAI embeddings API", "Python", "Next.js", "Postgres + pgvector"]
summary: "Manual internal linking doesn't scale past a few dozen entries. I'm building a pipeline that embeds every Journal entry and suggests related links by semantic similarity, then measuring whether it actually beats my manual choices."
keyFinding: null
relatedSlugs: ["llm-citation-signals", "structured-data-for-ai-crawlers"]
---

## Context

This Journal is designed to grow to hundreds of entries over the next few years. Manually deciding which older entries to link from a new one already takes longer than writing the "What I learned" section, and it will only get worse.

## Problem

Category and tag-based "related content" widgets are shallow — they surface entries that share a label, not entries that are actually conceptually related. I want links that reflect real topical proximity, not metadata overlap.

## Hypothesis

Embedding each entry's full content and surfacing the nearest neighbors by cosine similarity will produce more relevant "related research" links than the current tag-based system, and will keep working correctly as the archive grows without manual curation.

## Research

I'm generating embeddings for every entry (title + summary + full body) using OpenAI's embedding model, storing the vectors in Postgres with `pgvector`, and comparing the top-5 nearest neighbors against the manually curated `relatedSlugs` I've been setting by hand. Baseline: how often does the embedding model surface the same links I would have picked myself, and where does it disagree?

## Implementation

Pipeline so far: a build step reads every markdown file, generates an embedding, upserts it into a `research_embeddings` table, and a query function returns the nearest neighbors for a given slug. Not yet wired into the live "Related Research" component — currently running in parallel with the manual system so I can compare outputs before switching over.

## Results

Early and incomplete — only 3 entries currently exist, which isn't enough for embeddings to outperform manual tagging. This section will be replaced with real numbers once the archive has enough entries (targeting 15+) to get a meaningful nearest-neighbor comparison.

## What I learned so far

Even with a tiny corpus, the embedding similarity between the LLM-SEO entry and the structured-data entry is high, which matches my manual judgment — a good sign the approach is directionally sound, even if it's too early to call it validated.

## Tools used

OpenAI embeddings API, Python for the pipeline, Postgres with the `pgvector` extension, Next.js for the eventual live integration.

## Next steps

Ship 10 more entries, then run the full manual-vs-embedding comparison and publish the actual precision numbers instead of a placeholder. If embeddings win, replace `relatedSlugs` frontmatter with a generated field.
