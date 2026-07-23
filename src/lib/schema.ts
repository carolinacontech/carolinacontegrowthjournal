import { site } from "./site";
import type { CaseStudyEntry, ResearchEntry } from "./types";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    url: site.url,
    jobTitle: site.role,
    description:
      "Builder documenting public experiments in AI, growth engineering, SEO and websites.",
    sameAs: [site.social.twitter, site.social.linkedin, site.social.github],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    author: { "@type": "Person", name: site.author },
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/research?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(entry: ResearchEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    dateModified: entry.updatedAt ?? entry.date,
    author: { "@type": "Person", name: site.author, url: site.url },
    publisher: { "@type": "Person", name: site.author },
    mainEntityOfPage: `${site.url}/research/${entry.slug}`,
    keywords: entry.tags.join(", "),
    articleSection: entry.category,
  };
}

export function caseStudySchema(entry: CaseStudyEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: entry.title,
    description: entry.summary,
    datePublished: entry.date,
    author: { "@type": "Person", name: site.author, url: site.url },
    mainEntityOfPage: `${site.url}/case-studies/${entry.slug}`,
    keywords: entry.tags.join(", "),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
