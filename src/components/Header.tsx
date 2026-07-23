import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2 font-serif-display text-[15px] font-semibold tracking-tight text-ink"
        >
          <span className="inline-block size-1.5 rounded-full bg-signal transition-transform group-hover:scale-125" />
          The AI Growth Journal
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[12px] uppercase tracking-wider text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/research?focus=search"
            className="hidden font-mono text-[12px] uppercase tracking-wider text-ink-muted transition-colors hover:text-ink sm:inline"
          >
            Search
          </Link>
          <Link
            href="/research"
            className="hidden rounded-full border border-line px-4 py-1.5 font-mono text-[12px] uppercase tracking-wider text-ink transition-colors hover:border-signal hover:text-signal md:inline"
          >
            Explore Research
          </Link>
        </div>
      </div>
      <nav className="flex items-center gap-6 overflow-x-auto border-t border-line/60 px-6 py-2 md:hidden">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap font-mono text-[11px] uppercase tracking-wider text-ink-muted hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
