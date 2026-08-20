import Link from "next/link";
import { site } from "@/lib/site";
import { getAllResearch } from "@/lib/content";

export async function Footer() {
  const research = await getAllResearch();
  const categories = Array.from(new Set(research.map((r) => r.category))).sort();

  return (
    <footer id="contact" className="bg-navy py-[30px] text-[#dbe3df]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-3 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full border border-signal/50">
                <span className="text-lg font-extrabold tracking-[-0.05em] text-signal">
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
            <p className="max-w-[290px] text-[13px] leading-relaxed text-[#bdc7c2]">
              Learning in public. Building in public.
              <br />
              Your public research log for everything AI-driven growth.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.08em] text-white">
              Navigation
            </h4>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-1 text-xs leading-[2] text-[#c4ceca] hover:text-signal"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.08em] text-white">
              Categories
            </h4>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/research?category=${encodeURIComponent(category)}`}
                className="block py-1 text-xs leading-[2] text-[#c4ceca] hover:text-signal"
              >
                {category}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.08em] text-white">
              Legal
            </h4>
            <a href="#" className="block py-1 text-xs leading-[2] text-[#c4ceca] hover:text-signal">
              Privacy Policy
            </a>
            <a href="#" className="block py-1 text-xs leading-[2] text-[#c4ceca] hover:text-signal">
              Terms of Use
            </a>
            <a href="#" className="block py-1 text-xs leading-[2] text-[#c4ceca] hover:text-signal">
              Cookie Policy
            </a>
          </div>

          <div>
            <h4 className="mb-3 text-[11px] uppercase tracking-[0.08em] text-white">
              Search
            </h4>
            <form action="/research" className="flex overflow-hidden rounded-[4px] bg-[#142025]">
              <input
                type="search"
                name="q"
                aria-label="Search the Journal"
                placeholder="Search the Journal…"
                className="w-full bg-transparent px-3.5 py-3 text-[13px] text-white placeholder:text-white/40"
              />
              <button type="submit" aria-label="Search" className="px-3 text-white hover:text-signal">
                <svg viewBox="0 0 24 24" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-[18px] text-[10px] text-[#76817c]">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
