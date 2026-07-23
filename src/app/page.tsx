import Link from "next/link";
import { getAllCaseStudies, getAllResearch, getNowContent } from "@/lib/content";
import { ResearchCard } from "@/components/ResearchCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { StatusDot } from "@/components/StatusDot";
import { formatDate } from "@/lib/format";

export default async function Home() {
  const [research, caseStudies] = await Promise.all([
    getAllResearch(),
    getAllCaseStudies(),
  ]);
  const { data: nowData } = getNowContent();
  const latestResearch = research.slice(0, 3);
  const featuredCaseStudies = caseStudies.slice(0, 2);
  const activeExperiments = research.filter((r) => r.status !== "completed");

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:px-8 sm:pt-28">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-signal-dim">
          Journal · Vol. 2026
        </p>
        <h1 className="mt-6 max-w-3xl font-serif-display text-4xl leading-[1.1] text-balance text-ink sm:text-6xl">
          Building Growth Systems with AI
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          A public journal documenting experiments, failures, systems and
          real-world case studies about AI, websites, SEO and business growth.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/research"
            className="rounded-full bg-signal px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-canvas transition-opacity hover:opacity-90"
          >
            Explore Research
          </Link>
          <Link
            href="/case-studies"
            className="rounded-full border border-line px-6 py-3 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-signal hover:text-signal"
          >
            View Case Studies
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          <Stat label="Experiments logged" value={String(research.length + caseStudies.length)} />
          <Stat label="Currently running" value={String(activeExperiments.length)} />
          <Stat label="Case studies" value={String(caseStudies.length)} />
          <Stat label="Journal since" value="2026" />
        </div>
      </section>

      {/* Latest research */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Latest entries"
          title="Recent research"
          href="/research"
          cta="All research"
        />
        <div className="mt-8">
          {latestResearch.map((entry) => (
            <ResearchCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      {/* Case studies */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Evidence"
          title="Case studies"
          href="/case-studies"
          cta="All case studies"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featuredCaseStudies.map((entry) => (
            <CaseStudyCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </section>

      {/* What I'm working on */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <SectionHeading
          eyebrow="Live roadmap"
          title="What I'm working on"
          href="/now"
          cta="Full Now page"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {activeExperiments.slice(0, 3).map((entry) => (
            <Link
              key={entry.slug}
              href={`/research/${entry.slug}`}
              className="flex flex-col gap-3 rounded-2xl border border-line p-6 transition-colors hover:border-signal-dim"
            >
              <StatusDot status={entry.status} />
              <p className="font-serif-display text-lg leading-snug text-ink">
                {entry.title}
              </p>
              <p className="text-sm text-ink-muted">{entry.summary}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          Now page last updated {formatDate(String(nowData.lastUpdated))}
        </p>
      </section>

      {/* Closing statement */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="border-t border-line pt-16">
          <p className="max-w-2xl font-serif-display text-2xl leading-snug text-ink text-balance sm:text-3xl">
            Learning in public. Building in public. Growing with AI.
          </p>
          <p className="mt-5 max-w-xl text-ink-muted">
            No theory-first playbooks. Every entry here is a real experiment,
            measured and documented — including the ones that failed.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block font-mono text-[12px] uppercase tracking-wider text-signal underline underline-offset-4"
          >
            Why I document all of this →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-serif-display text-3xl text-ink">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        {label}
      </p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-signal-dim">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-serif-display text-3xl text-ink">{title}</h2>
      </div>
      <Link
        href={href}
        className="font-mono text-[12px] uppercase tracking-wider text-ink-muted hover:text-ink"
      >
        {cta} →
      </Link>
    </div>
  );
}
