import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/content";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real engagements documented as technical papers: context, problem, hypothesis, solution, results and errors — with real metrics, not vanity numbers.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const entries = await getAllCaseStudies();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Case Studies", url: `${site.url}/case-studies` },
        ])}
      />
      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        Evidence
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink sm:text-5xl">
        Case studies
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
        Each case study reads like a technical paper: hypothesis, solution,
        measured results, and the mistakes made along the way. Metrics are
        client-verified, never invented for the write-up.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {entries.map((entry) => (
          <CaseStudyCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
