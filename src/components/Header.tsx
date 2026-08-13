"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3.5" aria-label={site.name}>
          <span className="relative grid size-11 place-items-center rounded-full border border-signal/50 shadow-[inset_0_0_20px_rgba(121,201,68,.15)]">
            <span className="font-serif-display text-lg font-semibold tracking-tighter text-signal">
              AI
            </span>
            <span className="absolute right-0.5 top-1 size-1 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
          </span>
          <span className="flex flex-col leading-none tracking-[0.28em] text-[13px] text-white">
            GROWTH
            <span className="mt-1 text-[9px] tracking-[0.42em] text-signal">
              JOURNAL
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/75 transition-colors hover:text-signal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/research?focus=search"
            aria-label="Search"
            className="hidden text-white/75 transition-colors hover:text-signal sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>
          <Link
            href="/research"
            className="hidden rounded-[4px] bg-gradient-to-b from-signal to-signal-dim px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(81,177,40,.25)] transition-transform hover:-translate-y-px md:inline-block"
          >
            Explore Research
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center text-white md:hidden"
          >
            <span className="text-2xl leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-6 border-t border-white/10 bg-navy px-6 py-8 text-lg font-bold md:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-white transition-colors hover:text-signal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
