import type { Metadata } from "next";
import Link from "next/link";
import { getAllNews } from "@/lib/content";
import { CoverArt } from "@/components/CoverArt";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Short, dated updates from a marketer's daily AI practice — site changes, shipped tools, and product news, always through a marketing lens.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "News", url: `${site.url}/news` },
        ])}
      />
      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        News &amp; Updates
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink sm:text-5xl">
        What&apos;s new
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
        Short updates from a marketer&apos;s daily AI practice — site
        changes, shipped tooling, and product news. Not research, just log
        entries, always tied back to marketing.
      </p>

      <div className="mt-12">
        {news.map((entry) => (
          <Link
            key={entry.slug}
            href={`/news/${entry.slug}`}
            className="group grid grid-cols-1 gap-4 border-b border-line py-7 first:pt-0 last:border-b-0 sm:grid-cols-[140px_1fr]"
          >
            <CoverArt
              seed={entry.slug}
              className="h-[100px] w-full rounded-lg border border-line sm:h-full"
              iconSize="size-7"
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                <span>{formatDate(entry.date)}</span>
                <span className="text-signal-dim">{entry.tag}</span>
              </div>
              <h2 className="font-serif-display text-xl text-ink transition-colors group-hover:text-signal">
                {entry.title}
              </h2>
              <p className="text-sm leading-relaxed text-ink-muted">
                {entry.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
