import type { Metadata } from "next";
import { getAllEvents } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/format";
import type { EventEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Events",
  description: "Talks, office hours and workshops where the Journal's research gets discussed live.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const events = getAllEvents();
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Events", url: `${site.url}/events` },
        ])}
      />
      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        Events
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink sm:text-5xl">
        Talks &amp; office hours
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
        Live sessions where the Journal&apos;s research gets discussed,
        questioned and occasionally proven wrong in real time.
      </p>

      <section className="mt-12">
        <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          Upcoming
        </h2>
        <div className="mt-4">
          {upcoming.length === 0 && (
            <p className="py-6 text-ink-muted">Nothing scheduled right now — check back soon.</p>
          )}
          {upcoming.map((event) => (
            <EventRow key={event.slug} event={event} />
          ))}
        </div>
      </section>

      {past.length > 0 && (
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            Past
          </h2>
          <div className="mt-4">
            {past.map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function EventRow({ event }: { event: EventEntry }) {
  const content = (
    <>
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
        <span>{formatDate(event.date)}</span>
        <span className="text-signal-dim">
          {event.format === "online" ? "Online" : "In person"}
        </span>
        <span>{event.location}</span>
      </div>
      <h3 className="font-serif-display text-xl text-ink transition-colors group-hover:text-signal">
        {event.title}
      </h3>
      <p className="text-sm leading-relaxed text-ink-muted">{event.summary}</p>
      {event.link && event.status === "upcoming" && (
        <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-signal underline underline-offset-4">
          {event.linkLabel ?? "Learn more"} →
        </span>
      )}
    </>
  );

  const className = "group flex flex-col gap-2 border-b border-line py-7 first:pt-0 last:border-b-0";

  if (event.link && event.status === "upcoming") {
    return (
      <a href={event.link} className={className}>
        {content}
      </a>
    );
  }
  return <div className={className}>{content}</div>;
}
