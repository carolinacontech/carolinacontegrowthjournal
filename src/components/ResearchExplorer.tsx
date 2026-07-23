"use client";

import { useMemo, useState } from "react";
import { ResearchCard } from "./ResearchCard";
import type { ResearchEntry } from "@/lib/types";

export function ResearchExplorer({ entries }: { entries: ResearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(
    () => Array.from(new Set(entries.map((e) => e.category))).sort(),
    [entries]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      if (status !== "all" && entry.status !== status) return false;
      if (category !== "all" && entry.category !== category) return false;
      if (!q) return true;
      const haystack = `${entry.title} ${entry.summary} ${entry.tags.join(
        " "
      )}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, query, status, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search research entries…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-line bg-canvas-raised px-5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-signal-dim focus:outline-none sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <FilterGroup
            label="Status"
            value={status}
            onChange={setStatus}
            options={["all", "planning", "running", "completed"]}
          />
          <FilterGroup
            label="Category"
            value={category}
            onChange={setCategory}
            options={["all", ...categories]}
          />
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      <div className="mt-2">
        {filtered.length === 0 && (
          <p className="py-16 text-center text-ink-muted">
            No entries match those filters yet.
          </p>
        )}
        {filtered.map((entry) => (
          <ResearchCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border border-line bg-canvas-raised px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-ink-muted focus:border-signal-dim focus:outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "all" ? `All ${label}` : option}
        </option>
      ))}
    </select>
  );
}
