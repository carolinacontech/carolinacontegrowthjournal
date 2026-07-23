import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-6 py-32 sm:px-8">
      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        404
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink">
        This entry doesn&apos;t exist yet
      </h1>
      <p className="mt-4 text-ink-muted">
        It might not have been logged, or the experiment was scrapped before
        publishing.
      </p>
      <Link
        href="/research"
        className="mt-8 font-mono text-[12px] uppercase tracking-wider text-signal underline underline-offset-4"
      >
        Back to the Journal →
      </Link>
    </div>
  );
}
