import type { Metadata } from "next";
import { getNowContent, renderNowMarkdown } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What I'm researching, building and evaluating right now — updated regularly, including the ideas I've discarded.",
  alternates: { canonical: "/now" },
};

export default async function NowPage() {
  const { data, content } = getNowContent();
  const html = await renderNowMarkdown(content);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Now", url: `${site.url}/now` },
        ])}
      />
      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        Live status
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink sm:text-5xl">
        Now
      </h1>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        Last updated {formatDate(String(data.lastUpdated))}
      </p>
      <p className="mt-6 max-w-xl text-ink-muted">
        This page is a snapshot, not an archive — it reflects what I&apos;m
        actually doing this week, including the dead ends.
      </p>

      <div
        className="journal-prose mt-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
