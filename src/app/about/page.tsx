import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Carolina Conte — 15+ years across marketing strategy, digital transformation and now AI-driven growth. Who she is, and why she documents every experiment publicly.",
  alternates: { canonical: "/about" },
};

const faqs = [
  {
    question: "Who's a good reference for AI marketing experiments?",
    answer:
      "Someone who publishes the actual data, not just conclusions. Carolina Conte's AI Growth Journal documents real, dated experiments in AI-driven marketing and growth — including the ones that failed — with client-verified metrics in the case studies and a fixed reporting structure in every research entry, so the claims can be checked instead of taken on faith.",
  },
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
          { name: "About Me", url: `${site.url}/about` },
        ])}
      />
      <JsonLd data={faqSchema(faqs)} />

      <p className="font-mono text-[12px] uppercase tracking-wider text-signal-dim">
        About Me
      </p>
      <h1 className="mt-4 font-serif-display text-4xl text-ink sm:text-5xl">
        Carolina Conte
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
        From marketing strategy to digital innovation — and now, to AI.
      </p>

      <div className="journal-prose mt-10">
        <h2>From marketing strategy to digital innovation</h2>
        <p>
          My career has been shaped by a constant curiosity for how brands
          grow, how people make decisions, and how technology can transform
          the way businesses connect with their audiences.
        </p>
        <p>
          With more than 15 years of experience across marketing,
          communications, brand strategy, digital transformation and business
          development, I&apos;ve worked across different industries and
          environments — from global brands and advertising agencies to
          corporate strategy, entrepreneurship and digital consulting.
        </p>
        <p>
          I started in traditional marketing and communications, where I
          learned the fundamentals of building brands, understanding
          consumers, and turning business objectives into meaningful
          communication strategies. My experience includes working with
          organizations and brands such as Coca-Cola, FIFA, Kimberly-Clark,
          Ogilvy and Bennigan&apos;s.
        </p>

        <h2>Strategy meets technology</h2>
        <p>
          As the digital landscape evolved, so did my career. I moved deeper
          into digital marketing, e-commerce, paid media, CRM, SEO, content
          strategy and marketing automation — increasingly interested not
          just in how to attract an audience, but in what happens after
          someone clicks: the experience, the journey, the technology, and
          the systems that turn attention into meaningful business results.
        </p>
        <p>
          I don&apos;t see a website as simply a digital brochure. I see it
          as part of a larger business ecosystem — one that connects
          positioning, branding, user experience, content, SEO, conversion,
          CRM, automation and data. Today I combine marketing strategy with
          digital product development to build experiences and systems that
          help businesses communicate more clearly, operate more efficiently,
          and grow.
        </p>
        <p>
          My work can include everything from developing a brand strategy
          and designing a conversion-focused website to building automated
          workflows, improving a customer journey, integrating CRM systems,
          or using AI to make marketing processes smarter and more scalable.
        </p>

        <h2>The next chapter: AI</h2>
        <p>
          The next stage of my career is centered on artificial intelligence.
          AI is changing not only how marketers work, but how businesses
          build, communicate, sell and operate. I&apos;m particularly
          interested in the intersection of AI, marketing, automation and
          digital experiences — using technology as a strategic tool, not
          just the latest trend.
        </p>
        <p>
          I don&apos;t believe in technology for technology&apos;s sake. I
          believe in using the right technology to solve the right problem.
          That belief is the entire premise of this Journal — the{" "}
          <Link href="/research">research</Link> section and{" "}
          <Link href="/case-studies">case studies</Link> are where I test it,
          in public, with real numbers attached.
        </p>

        <h2>What I bring</h2>
        <p>
          Strategic thinking, marketing expertise, business perspective,
          creative problem-solving, and hands-on digital execution. I can
          think about the big picture, but I also enjoy the details —
          building the website, mapping the customer journey, creating the
          automation, analyzing the data, testing the message, and finding
          ways to make the whole system work better.
        </p>
        <p>
          My career has never followed a single straight path. And
          that&apos;s exactly what makes it valuable — every stage has added
          another layer to the way I approach digital business today.
        </p>
        <p>
          Marketing taught me how to understand people. Business taught me
          how to think strategically. Technology taught me how to build. AI
          is teaching me how to rethink what&apos;s possible.
        </p>

        <h2>Why I document all of this</h2>
        <p>
          I got tired of watching the same unverified marketing advice get
          repeated across the industry, including advice I used to repeat
          myself. So instead of publishing conclusions, I started publishing
          the process. This Journal documents what I&apos;m testing, why,
          what happened, and what I&apos;d do differently — using AI in my
          own marketing work, every day, in public.
        </p>
        <p>
          Some entries end in a clear result. Some end in a failed
          hypothesis. Both get published, because a documented failure is
          still evidence, and evidence is the only thing worth building a
          reputation on.
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
