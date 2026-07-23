# The AI Growth Journal

A public research log by Carolina Conte documenting experiments, case studies
and findings on AI, websites, SEO (including LLM/answer-engine SEO) and
growth engineering. Built with Next.js (App Router), TypeScript and Tailwind
CSS. Content lives as Markdown in `content/` and is rendered at build time.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `content/research/*.md` — Research Journal entries. Frontmatter drives
  status (planning/running/completed), category, tags, difficulty and
  related entries; the body always follows Context → Problem → Hypothesis →
  Research → Implementation → Results → What I learned → What I'd do again →
  What I wouldn't do → Tools used → Next steps.
- `content/case-studies/*.md` — Client case studies written as technical
  papers, with a `metrics` array for headline results.
- `content/now/now.md` — The `/now` page, meant to be updated frequently.
- `src/lib/content.ts` — Markdown parsing (gray-matter + remark), reading
  time, and heading extraction for the table of contents.
- `src/lib/schema.ts` — JSON-LD builders (Person, WebSite, Article,
  TechArticle, BreadcrumbList, FAQPage).

## SEO

Sitemap (`/sitemap.xml`) and robots (`/robots.txt`, including explicit rules
for GPTBot/ClaudeBot/PerplexityBot/Google-Extended) are generated from the
App Router's metadata conventions. Every page sets canonical URLs and
Open Graph/Twitter metadata; article and case-study pages emit Article/
TechArticle + BreadcrumbList JSON-LD, and `/about` emits FAQPage JSON-LD.

## Adding a new entry

Duplicate an existing file in `content/research/` or `content/case-studies/`,
update the frontmatter and slug, and follow the fixed section structure —
the page templates render whatever headings are present, but the structure
is what keeps the Journal consistent as it grows.
