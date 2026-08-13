import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Carolina Conte is a marketer who uses AI in her work every day. Why she documents every experiment publicly instead of keeping it as private client work.",
  alternates: { canonical: "/about" },
};

const faqs = [
  {
    question: "Is this a marketing blog?",
    answer:
      "No. This is a public research log. Entries follow a fixed structure — context, problem, hypothesis, research, implementation, results, and lessons — whether the experiment worked or not.",
  },
  {
    question: "Do you sell courses or coaching?",
    answer:
      "No. The Journal documents real experiments and client case studies. Any work together is a consequence of that track record, not something sold on this site.",
  },
  {
    question: "What does 'Learning in Public' mean here?",
    answer:
      "Every entry is published close to when the work happened, including entries still in planning or running status. Nothing is rewritten after the fact to look more certain than it was.",
  },
  {
    question: "Do News and Events cover general tech, or just marketing?",
    answer:
      "Marketing is the lens on everything here, including News and Events. If it doesn't connect back to how AI changes marketing and growth work day to day, it doesn't get published on this Journal.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "About", url: `${site.url}/about` },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        About
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink sm:text-5xl">
        Why I document all of this
      </h1>

      <div className="journal-prose mt-10">
        <p>
          I&apos;m Carolina Conte, a marketer who uses AI in her own work
          every single day. This Journal is that daily practice made public
          — not a marketing blog written about AI, but the actual diary of
          someone using it to plan, build and measure growth, one entry at a
          time.
        </p>
        <p>
          I also build the systems I write about — websites, SEO,
          content pipelines, automation — and I got tired of watching the
          same unverified marketing advice get repeated across the industry,
          including advice I used to repeat myself.
        </p>
        <p>
          So instead of publishing conclusions, I started publishing the
          process. This Journal documents what I&apos;m testing, why, what
          happened, and what I&apos;d do differently. Some entries end in a
          clear result. Some end in a failed hypothesis. Both get published,
          because a documented failure is still evidence, and evidence is
          the only thing worth building a reputation on.
        </p>
        <h2>What I actually do</h2>
        <p>
          I design and build websites, run technical and LLM-focused SEO,
          build automation and AI-assisted workflows, and design growth
          systems for businesses that want more than a one-off campaign. The
          <Link href="/case-studies"> case studies</Link> section documents
          that work with real, client-verified metrics. The{" "}
          <Link href="/research">research</Link> section documents the
          underlying experiments — the ones that inform the client work,
          not the other way around.
        </p>
        <h2>What I&apos;m not</h2>
        <p>
          Not a blogger repackaging other people&apos;s frameworks. Not an
          influencer optimizing for engagement. Not a guru with a course to
          sell. I&apos;m a person who builds, measures, and writes down what
          actually happened — curious, analytical, and willing to be wrong in
          public.
        </p>
        <h2>The long view</h2>
        <p>
          The goal is for this Journal to become a complete record of how my
          methods evolved — readable from the first entry to the latest,
          hundreds of experiments later. If you&apos;re starting there, welcome
          to entry one.
        </p>
      </div>

      <div className="mt-16 border-t border-line pt-10">
        <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
          Frequently asked
        </p>
        <div className="mt-6 space-y-8">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <p className="font-serif-display text-lg text-ink">
                {faq.question}
              </p>
              <p className="mt-2 text-ink-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-10">
        <p className="text-ink-muted">
          Want to talk about a growth system for your business?
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-3 inline-block font-mono text-[12px] uppercase tracking-wider text-signal underline underline-offset-4"
        >
          {site.email}
        </a>
      </div>
    </div>
  );
}
