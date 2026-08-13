export type ExperimentStatus = "planning" | "running" | "completed";

export type Difficulty = "foundational" | "intermediate" | "advanced";

export interface Faq {
  question: string;
  answer: string;
}

export interface ResearchFrontmatter {
  title: string;
  slug: string;
  date: string;
  updatedAt?: string;
  status: ExperimentStatus;
  category: string;
  tags: string[];
  summary: string;
  keyFinding?: string;
  difficulty: Difficulty;
  series?: string;
  tools: string[];
  relatedSlugs?: string[];
  faqs?: Faq[];
}

export interface ResearchEntry extends ResearchFrontmatter {
  content: string;
  readingTime: string;
  headings: { depth: number; text: string; slug: string }[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  metrics: Metric[];
  tools: string[];
  duration?: string;
  faqs?: Faq[];
}

export interface CaseStudyEntry extends CaseStudyFrontmatter {
  content: string;
  readingTime: string;
  headings: { depth: number; text: string; slug: string }[];
}

export interface NewsFrontmatter {
  title: string;
  slug: string;
  date: string;
  tag: string;
  summary: string;
}

export interface NewsEntry extends NewsFrontmatter {
  content: string;
  readingTime: string;
}

export type EventStatus = "upcoming" | "past";
export type EventFormat = "online" | "in-person";

export interface EventEntry {
  title: string;
  slug: string;
  date: string;
  status: EventStatus;
  format: EventFormat;
  location: string;
  summary: string;
  link?: string;
  linkLabel?: string;
}
