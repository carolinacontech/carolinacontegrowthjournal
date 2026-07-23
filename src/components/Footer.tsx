import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-serif-display text-lg text-ink">The AI Growth Journal</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
              A public research log on AI, websites, SEO and growth systems.
              Learning in public. Building in public. Growing with AI.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              Journal
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              Elsewhere
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>
                <a href={site.social.linkedin} className="hover:text-ink">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.social.twitter} className="hover:text-ink">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href={site.social.github} className="hover:text-ink">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-wider text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Carolina Conte. Log entry ongoing.</p>
          <p>No theory. Only evidence.</p>
        </div>
      </div>
    </footer>
  );
}
