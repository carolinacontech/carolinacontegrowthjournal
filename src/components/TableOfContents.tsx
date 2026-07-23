export function TableOfContents({
  headings,
}: {
  headings: { depth: number; text: string; slug: string }[];
}) {
  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 hidden max-h-[70vh] overflow-y-auto lg:block">
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        On this page
      </p>
      <ul className="mt-4 space-y-2.5 border-l border-line pl-4 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.slug}
            style={{ paddingLeft: heading.depth === 3 ? "0.75rem" : 0 }}
          >
            <a
              href={`#${heading.slug}`}
              className="text-ink-muted transition-colors hover:text-signal"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
