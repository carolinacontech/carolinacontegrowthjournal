import type { Metadata } from "next";
import { getAllResearch } from "@/lib/content";
import { ResearchExplorer } from "@/components/ResearchExplorer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research Journal",
  description:
    "Every experiment, hypothesis and finding on AI, SEO, growth systems and websites — logged as it happens, not cleaned up after the fact.",
  alternates: { canonical: "/research" },
};

export default async function ResearchPage() {
  const entries = await getAllResearch();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Research", url: `${site.url}/research` },
        ])}
      />
      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        Research Journal
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink sm:text-5xl">
        The research log
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Every entry follows the same structure: context, problem, hypothesis,
        research, implementation, results, and what I&apos;d do differently.
        No polish applied after the fact — planning and running entries are
        left visibly unfinished until they are.
      </p>

      <div className="mt-12">
        <ResearchExplorer entries={entries} />
      </div>
    </div>
  );
}
