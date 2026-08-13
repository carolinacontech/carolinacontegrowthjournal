import Link from "next/link";
import { CoverArt } from "./CoverArt";
import type { CaseStudyEntry } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function CaseStudyCard({ entry }: { entry: CaseStudyEntry }) {
  return (
    <Link
      href={`/case-studies/${entry.slug}`}
      className="group flex flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-line bg-canvas-raised/40 transition-colors hover:border-signal-dim"
    >
      <div>
        <CoverArt seed={entry.slug} category={entry.category} className="h-[120px] w-full" />
        <div className="p-7 pb-0">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            <span className="text-signal-dim">{entry.category}</span>
            <span>{formatDate(entry.date)}</span>
          </div>
          <h3 className="mt-4 font-serif-display text-xl leading-snug text-ink transition-colors group-hover:text-signal">
            {entry.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {entry.summary}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-line p-7 pt-5">
        {entry.metrics.slice(0, 3).map((metric) => (
          <div key={metric.label}>
            <p className="font-serif-display text-2xl text-signal">
              {metric.value}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </Link>
  );
}
