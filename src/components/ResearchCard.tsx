import Link from "next/link";
import { StatusDot } from "./StatusDot";
import { CoverArt } from "./CoverArt";
import type { ResearchEntry } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function ResearchCard({ entry }: { entry: ResearchEntry }) {
  return (
    <Link
      href={`/research/${entry.slug}`}
      className="group grid grid-cols-1 gap-5 border-b border-line py-8 first:pt-0 last:border-b-0 sm:grid-cols-[160px_1fr]"
    >
      <CoverArt
        seed={entry.slug}
        category={entry.category}
        className="h-[120px] w-full rounded-lg border border-line sm:h-full"
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          <StatusDot status={entry.status} />
          <span>{formatDate(entry.date)}</span>
          <span>{entry.readingTime}</span>
          <span className="text-signal-dim">{entry.category}</span>
        </div>

        <h3 className="font-serif-display text-2xl leading-snug text-ink text-balance transition-colors group-hover:text-signal sm:text-[26px]">
          {entry.title}
        </h3>

        <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          {entry.summary}
        </p>

        {entry.keyFinding && (
          <p className="border-l-2 border-signal-dim pl-3 text-sm text-ink">
            <span className="text-ink-faint">Key finding — </span>
            {entry.keyFinding}
          </p>
        )}
      </div>
    </Link>
  );
}
