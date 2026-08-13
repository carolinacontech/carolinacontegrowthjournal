import Link from "next/link";
import { getAllCaseStudies, getAllResearch } from "@/lib/content";
import { StatusDot } from "@/components/StatusDot";
import { CategoryIcon } from "@/components/CategoryIcon";
import { NewsletterForm } from "@/components/NewsletterForm";
import { statusLabel } from "@/lib/site";
import { formatDate } from "@/lib/format";

const imageTreatments = [
  "bg-[radial-gradient(circle_at_20%_16%,rgba(121,201,68,.55)_0_1px,transparent_2px),radial-gradient(circle_at_60%_60%,rgba(121,201,68,.4)_0_1.5px,transparent_2px)] bg-[length:38px_27px,55px_38px]",
  "bg-[linear-gradient(45deg,transparent_45%,rgba(121,201,68,.16)_46%_54%,transparent_55%)] bg-[length:44px_44px]",
  "bg-[radial-gradient(ellipse_at_10%_70%,rgba(121,201,68,.55),transparent_45%),linear-gradient(160deg,#081318_20%,#1c5d38_65%,#081318_100%)]",
];

export default async function Home() {
  const [research, caseStudies] = await Promise.all([
    getAllResearch(),
    getAllCaseStudies(),
  ]);

  const latest = research[0];
  const recentResearch = research.slice(0, 3);
  const featuredCaseStudies = caseStudies.slice(0, 2);

  const categoryCounts = new Map<string, number>();
  for (const entry of [...research, ...caseStudies]) {
    categoryCounts.set(entry.category, (categoryCounts.get(entry.category) ?? 0) + 1);
  }
  const categories = Array.from(categoryCounts.entries());

  const tools = Array.from(
    new Set([...research, ...caseStudies].flatMap((e) => e.tools))
  );

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_88%_58%,rgba(121,201,68,.16),transparent_45%),linear-gradient(180deg,#061014_0%,#071315_100%)] text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-4 font-mono text-[12px] font-bold uppercase tracking-[0.15em] text-signal">
              Latest Research
            </p>
            <h1 className="max-w-xl font-serif-display text-[42px] leading-[1.02] tracking-tight text-balance sm:text-6xl">
              {latest.title}
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/70">
              {latest.summary}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={`/research/${latest.slug}`}
                className="inline-flex items-center gap-3 rounded-[4px] bg-gradient-to-b from-signal to-signal-dim px-6 py-3.5 font-mono text-[12px] font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(81,177,40,.25)] transition-transform hover:-translate-y-px"
              >
                Read Research <span>→</span>
              </Link>
              <Link
                href="/case-studies"
                className="font-mono text-[12px] font-bold uppercase tracking-wider text-white/70 hover:text-signal"
              >
                View Case Studies
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 font-mono text-[12px] text-white/50">
              <span>01</span>
              <span className="relative h-px w-[72px] bg-white/15">
                <span className="absolute inset-y-0 left-0 w-1/2 bg-signal" />
              </span>
              <span>{String(recentResearch.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="grid min-h-[260px] grid-cols-[1fr_auto_1fr] items-center rounded-[18px] border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.015] p-9 shadow-[0_25px_60px_rgba(0,0,0,.25)] backdrop-blur-sm">
            <div className="mx-auto flex flex-col items-center gap-3 text-center">
              <span className="grid size-[100px] place-items-center rounded-full border-[6px] border-signal/60 bg-signal/5">
                <StatusDot status={latest.status} />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                {statusLabel[latest.status]}
              </p>
            </div>
            <span className="px-4 font-serif-display text-3xl text-white/30">→</span>
            <div className="mx-auto flex flex-col items-center gap-3 text-center">
              <span className="grid size-[100px] place-items-center rounded-[28px] border border-signal/40 bg-gradient-to-br from-signal/20 to-signal-dim/10">
                <CategoryIcon category={latest.category} />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                {latest.category}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeader
            title="Explore Categories"
            href="/research"
            cta="View All Research"
          />
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map(([category, count]) => (
              <Link
                key={category}
                href={`/research?category=${encodeURIComponent(category)}`}
                className="flex min-h-[126px] flex-col items-center justify-center gap-2.5 rounded-lg border border-paper-line px-4 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-[0_10px_30px_rgba(0,0,0,.05)]"
              >
                <span className="text-signal-dim">
                  <CategoryIcon category={category} />
                </span>
                <strong className="text-[13px] text-paper-ink">{category}</strong>
                <small className="font-mono text-[11px] text-paper-muted">
                  {count} {count === 1 ? "entry" : "entries"}
                </small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS STRIP (placeholder) */}
      <section className="bg-white pb-4">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="flex items-center justify-between border-b border-paper-line pb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper-muted">
              Tools referenced in this Journal
            </p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-paper-muted/70">
              Placeholder strip — updates as entries are published
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-3 lg:grid-cols-6">
            {tools.slice(0, 12).map((tool) => (
              <div
                key={tool}
                className="flex min-h-[50px] items-center justify-center text-center font-serif-display text-[15px] tracking-tight text-paper-ink/70"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT RESEARCH */}
      <section className="bg-white py-14" id="articles">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeader
            title="Recent Research"
            href="/research"
            cta="View All Research"
          />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {recentResearch.map((entry, i) => (
              <Link
                key={entry.slug}
                href={`/research/${entry.slug}`}
                className="grid grid-cols-[46%_54%] overflow-hidden rounded-lg border border-paper-line transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,.06)]"
              >
                <div className={`min-h-[160px] bg-navy ${imageTreatments[i % imageTreatments.length]}`} />
                <div className="p-5">
                  <p className="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-signal-dim">
                    {entry.category}
                  </p>
                  <h3 className="mb-4 text-[16px] font-semibold leading-snug text-paper-ink">
                    {entry.title}
                  </h3>
                  <p className="font-mono text-[10px] text-paper-muted">
                    {formatDate(entry.date)} &nbsp;·&nbsp; {entry.readingTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-soft py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <SectionHeader
            title="Case Studies"
            href="/case-studies"
            cta="View All Case Studies"
          />
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {featuredCaseStudies.map((entry) => (
              <Link
                key={entry.slug}
                href={`/case-studies/${entry.slug}`}
                className="flex flex-col justify-between gap-7 rounded-lg border border-paper-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,.06)]"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-paper-muted">
                    <span className="text-signal-dim">{entry.category}</span>
                    <span>{formatDate(entry.date)}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-paper-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-paper-muted">
                    {entry.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-6 border-t border-paper-line pt-5">
                  {entry.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.label}>
                      <p className="font-serif-display text-2xl text-signal-dim">
                        {metric.value}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-paper-muted">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid items-center gap-8 rounded-lg border border-paper-line bg-soft p-7 sm:grid-cols-[1fr_1.2fr] sm:p-9">
            <div className="grid grid-cols-[auto_1fr] items-center gap-4">
              <span className="grid size-[58px] place-items-center rounded-full bg-gradient-to-b from-signal to-signal-dim text-white">
                <svg viewBox="0 0 48 48" className="size-[30px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="11" width="34" height="26" rx="2" />
                  <path d="m8 13 16 13 16-13" />
                </svg>
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-paper-ink">
                  Stay ahead of the curve
                </h3>
                <p className="mt-1 text-[13px] text-paper-muted">
                  New research entries delivered as they&apos;re published — no digest, no fluff.
                </p>
              </div>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  href,
  cta,
}: {
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-paper-ink">
        {title}
      </h2>
      <Link
        href={href}
        className="font-mono text-[11px] font-bold uppercase tracking-wider text-signal-dim hover:text-paper-ink"
      >
        {cta} →
      </Link>
    </div>
  );
}
