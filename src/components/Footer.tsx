import Link from "next/link";
import { site } from "@/lib/site";
import { getAllResearch } from "@/lib/content";

export async function Footer() {
  const research = await getAllResearch();
  const categories = Array.from(new Set(research.map((r) => r.category))).sort();

  return (
    <footer id="contact" className="bg-navy text-white/80">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full border border-signal/50">
                <span className="font-serif-display text-lg font-semibold tracking-tighter text-signal">
                  AI
                </span>
              </span>
              <span className="flex flex-col leading-none tracking-[0.28em] text-[13px] text-white">
                GROWTH
                <span className="mt-1 text-[9px] tracking-[0.42em] text-signal">
                  JOURNAL
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-[290px] text-[13px] leading-relaxed text-white/60">
              Learning in public. Building in public. Growing with AI.
              <br />
              Your source for real, documented experiments in AI-driven
              growth.
            </p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-white">
              Journal
            </p>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-1 text-[12px] text-white/70 hover:text-signal"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-white">
              Categories
            </p>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/research?category=${encodeURIComponent(category)}`}
                className="block py-1 text-[12px] text-white/70 hover:text-signal"
              >
                {category}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-white">
              Elsewhere
            </p>
            <a href={site.social.linkedin} className="block py-1 text-[12px] text-white/70 hover:text-signal">
              LinkedIn
            </a>
            <a href={site.social.twitter} className="block py-1 text-[12px] text-white/70 hover:text-signal">
              X / Twitter
            </a>
            <a href={site.social.github} className="block py-1 text-[12px] text-white/70 hover:text-signal">
              GitHub
            </a>
          </div>

          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-white">
              Search
            </p>
            <form
              action="/research"
              className="flex overflow-hidden rounded-[4px] bg-white/5"
            >
              <input
                type="search"
                name="q"
                placeholder="Search the Journal…"
                className="w-full bg-transparent px-3.5 py-3 text-[13px] text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                aria-label="Search"
                className="px-3 text-white/70 hover:text-signal"
              >
                <svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-wider text-white/40">
          &copy; {new Date().getFullYear()} Carolina Conte. Log entry ongoing. No theory, only evidence.
        </div>
      </div>
    </footer>
  );
}
