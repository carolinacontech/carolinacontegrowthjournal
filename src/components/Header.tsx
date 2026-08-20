"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

function Brand({ dark }: { dark?: boolean }) {
  return (
    <Link href="/" className="inline-flex w-max items-center gap-3.5 py-3.5" aria-label={site.name}>
      <span className="relative grid size-[54px] place-items-center rounded-full border border-signal/55 shadow-[inset_0_0_30px_rgba(121,201,68,.13)]">
        <span className="font-serif-display text-[27px] font-semibold tracking-[-0.05em] text-signal">
          AI
        </span>
        <span className="absolute right-px top-1 size-1 rounded-full bg-[#d8ff79] shadow-[0_0_12px_#d8ff79]" />
      </span>
      <span
        className={`flex flex-col leading-none tracking-[0.28em] text-sm ${dark ? "text-paper-ink" : "text-white"}`}
      >
        GROWTH
        <span className="mt-[5px] text-[9px] tracking-[0.42em] text-signal">
          JOURNAL
        </span>
      </span>
    </Link>
  );
}

function NavLinks({
  className = "",
  pathname,
  activeClassName = "text-signal-dim",
}: {
  className?: string;
  pathname: string;
  activeClassName?: string;
}) {
  return (
    <div className={`flex gap-6 text-[12px] font-bold uppercase tracking-[0.04em] ${className}`}>
      {site.nav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`hover:text-signal-dim ${isActive ? activeClassName : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  if (isHome) {
    return (
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_minmax(620px,900px)] items-start gap-6 px-6 pt-[18px] sm:px-8 max-lg:flex max-lg:justify-between max-lg:items-center">
          <Brand />

          <nav
            aria-label="Main navigation"
            className="hidden h-[72px] items-center justify-between rounded-bl-[18px] bg-white px-8 shadow-[0_3px_14px_rgba(0,0,0,.06)] lg:flex"
          >
            <NavLinks
              className="text-paper-ink"
              pathname={pathname}
              activeClassName="text-signal-dim underline underline-offset-4"
            />
            <Link href="/research?focus=search" aria-label="Search" className="ml-6 text-paper-ink hover:text-signal-dim">
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </Link>
          </nav>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center text-2xl text-white lg:hidden"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {open && (
          <nav className="flex flex-col gap-6 bg-navy px-6 py-8 text-lg font-bold text-white lg:hidden">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`hover:text-signal ${pathname === item.href ? "text-signal" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-8">
        <Brand />
        <NavLinks
          className="hidden text-white/75 lg:flex"
          pathname={pathname}
          activeClassName="text-signal underline underline-offset-4"
        />
        <div className="flex items-center gap-3">
          <Link href="/research?focus=search" aria-label="Search" className="hidden text-white/75 hover:text-signal sm:inline-flex">
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
            className="grid size-9 place-items-center text-white lg:hidden"
          >
            <span className="text-2xl leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-6 border-t border-white/10 bg-navy px-6 py-8 text-lg font-bold lg:hidden">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`hover:text-signal ${pathname === item.href ? "text-signal" : "text-white"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
