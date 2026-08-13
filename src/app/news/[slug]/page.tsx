import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNewsSlugs, getNewsEntry } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const entry = await getNewsEntry(slug);
    return {
      title: entry.title,
      description: entry.summary,
      alternates: { canonical: `/news/${entry.slug}` },
    };
  } catch {
    return {};
  }
}

export default async function NewsEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let entry;
  try {
    entry = await getNewsEntry(slug);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "News", url: `${site.url}/news` },
          { name: entry.title, url: `${site.url}/news/${entry.slug}` },
        ])}
      />
      <nav className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        <Link href="/news" className="hover:text-ink">
          News
        </Link>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        <span>{formatDate(entry.date)}</span>
        <span className="text-signal-dim">{entry.tag}</span>
        <span>{entry.readingTime}</span>
      </div>

      <h1 className="mt-5 font-serif-display text-3xl leading-tight text-ink text-balance sm:text-4xl">
        {entry.title}
      </h1>

      <article
        className="journal-prose mt-10"
        dangerouslySetInnerHTML={{ __html: entry.content }}
      />
    </div>
  );
}
