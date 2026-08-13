import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCaseStudySlugs,
  getCaseStudyEntry,
} from "@/lib/content";
import { TableOfContents } from "@/components/TableOfContents";
import { CoverArt } from "@/components/CoverArt";
import { FaqBlock } from "@/components/FaqBlock";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const entry = await getCaseStudyEntry(slug);
    return {
      title: entry.title,
      description: entry.summary,
      alternates: { canonical: `/case-studies/${entry.slug}` },
      openGraph: {
        type: "article",
        title: entry.title,
        description: entry.summary,
        publishedTime: entry.date,
      },
    };
  } catch {
    return {};
  }
}

export default async function CaseStudyEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let entry;
  try {
    entry = await getCaseStudyEntry(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <JsonLd data={caseStudySchema(entry)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Case Studies", url: `${site.url}/case-studies` },
          { name: entry.title, url: `${site.url}/case-studies/${entry.slug}` },
        ])}
      />

      <nav className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        <Link href="/case-studies" className="hover:text-ink">
          Case Studies
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
              <span>{formatDate(entry.date)}</span>
              <span>{entry.readingTime}</span>
              {entry.duration && <span>{entry.duration} engagement</span>}
            </div>

            <h1 className="mt-6 font-serif-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
              {entry.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              {entry.summary}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 rounded-2xl border border-line bg-canvas-raised/40 p-6 sm:grid-cols-4">
              {entry.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="font-serif-display text-3xl text-signal">
                    {metric.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </header>

          <article
            className="journal-prose mt-10"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />

          <div className="mt-14 border-t border-line pt-8">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              Tools used
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

      <div className="mt-20 border-t border-line pt-10 text-center">
        <p className="font-serif-display text-xl text-ink">
          Want a system like this for your product?
        </p>
        <p className="mt-2 text-ink-muted">
          This is a consequence of the research, not a pitch — read a few more
          entries first if you&apos;re not sure.
        </p>
        <Link
          href="/about"
          className="mt-5 inline-block font-mono text-[12px] uppercase tracking-wider text-signal underline underline-offset-4"
        >
          Get in touch →
        </Link>
      </div>
    </div>
  );
}
