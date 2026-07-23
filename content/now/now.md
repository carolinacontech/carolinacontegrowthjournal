---
lastUpdated: "2026-07-23"
---

## Currently researching

Whether an autonomous agent can run a full technical SEO audit end-to-end without a human reviewing the prioritization step — see [_Can an AI Agent Run a Technical SEO Audit Without Me?_](/research/testing-ai-agents-for-technical-seo-audits). Still in the setup phase: defining the scoring rubric before running a single test.

In parallel, rebuilding this Journal's internal linking system to use embeddings instead of manual `relatedSlugs` tagging — tracked in [_Rebuilding Internal Linking with Embeddings_](/research/rebuilding-my-internal-linking-with-embeddings).

## Goals for this week

- Finalize the audit scoring rubric and select the 5 comparison sites for the agent-audit study.
- Publish 3 more Journal entries so the embeddings-based related-content test has enough data to be meaningful.
- Re-run the 60-query LLM citation sample from the July study to check for drift after Perplexity's retrieval update.

## Tools I'm currently evaluating

- **Claude Agent SDK** — as the orchestration layer for the technical-audit agent experiment.
- **pgvector** — storing and querying content embeddings for internal linking.
- **Screaming Frog CLI** — scriptable crawling to feed both the audit-agent experiment and the LLM-citation monitoring routine.

## Ideas I've discarded

- **Auto-publishing AI-drafted Journal entries.** Tried a draft-to-publish pipeline with light human review for a case study rewrite; the output read as generic and impersonal even after editing. This Journal is explicitly about documenting my own judgment, so anything past "assisted first draft" undermines the point.
- **A generic "AI visibility score" widget.** Considered building one for client reporting, but the LLM-citation research showed most of these tools measure mentions, not citations — I don't want to ship a metric I don't trust myself.

## What I learned recently

Direct-answer paragraph structure predicts LLM citation far better than schema markup alone — schema seems to be a proxy signal, not a cause. Full writeup: [_What Actually Gets a Page Cited by ChatGPT and Perplexity_](/research/llm-citation-signals).
