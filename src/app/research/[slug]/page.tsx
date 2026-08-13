import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllResearch,
  getAllResearchSlugs,
  getResearchEntry,
} from "@/lib/content";
import { StatusDot } from "@/components/StatusDot";
import { TableOfContents } from "@/components/TableOfContents";
import { ResearchCard } from "@/components/ResearchCard";
import { CoverArt } from "@/components/CoverArt";
import { FaqBlock } from "@/components/FaqBlock";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { site, difficultyLabel } from "@/lib/site";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return getAllResearchSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const entry = await getResearchEntry(slug);
    return {
      title: entry.title,
      description: entry.summary,
      alternates: { canonical: `/research/${entry.slug}` },
      openGraph: {
        type: "article",
        title: entry.title,
        description: entry.summary,
        publishedTime: entry.date,
        modifiedTime: entry.updatedAt ?? entry.date,
        tags: entry.tags,
      },
    };
  } catch {
    return {};
  }
}

export default async function ResearchEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let entry;
  try {
    entry = await getResearchEntry(slug);
  } catch {
    notFound();
  }

  const all = await getAllResearch();
  const related = (entry.relatedSlugs ?? [])
    .map((s) => all.find((e) => e.slug === s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <JsonLd data={articleSchema(entry)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Research", url: `${site.url}/research` },
          { name: entry.title, url: `${site.url}/research/${entry.slug}` },
        ])}
      />

      <nav className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        <Link href="/research" className="hover:text-ink">
          Research
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink-muted">{entry.category}</span>
      </nav>

      <CoverArt
        seed={entry.slug}
        category={entry.category}
        iconSize="size-16"
        className="mt-6 h-[220px] w-full rounded-2xl border border-line sm:h-[300px]"
      />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0">
          <header className="border-b border-line pb-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              <StatusDot status={entry.status} />
              <span>Published {formatDate(entry.date)}</span>
              {entry.updatedAt && entry.updatedAt !== entry.date && (
                <span>Updated {formatDate(entry.updatedAt)}</span>
              )}
              <span>{entry.readingTime}</span>
              <span>{difficultyLabel[entry.difficulty] ?? entry.difficulty}</span>
              {entry.series && <span className="text-signal-dim">{entry.series}</span>}
            </div>

            <h1 className="mt-6 font-serif-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
              {entry.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {entry.summary}
            </p>

            {entry.keyFinding && (
              <div className="mt-6 rounded-xl border border-signal-dim/40 bg-canvas-raised p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-signal-dim">
                  Key finding
                </p>
                <p className="mt-2 text-ink">{entry.keyFinding}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <article
            className="journal-prose mt-10"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />

          <div className="mt-14 border-t border-line pt-8">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              Tools used in this entry
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-canvas-raised px-3 py-1 text-sm text-ink-muted"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <FaqBlock faqs={entry.faqs ?? []} />
        </div>

        <TableOfContents headings={entry.headings} />
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <p className="font-mono text-[11px] uppercase tracking-wider text-signal-dim">
            Related research
          </p>
          <h2 className="mt-2 font-serif-display text-2xl text-ink">
            Continue the thread
          </h2>
          <div className="mt-6">
            {related.map((r) => (
              <ResearchCard key={r.slug} entry={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
