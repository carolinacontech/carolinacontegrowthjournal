export type ExperimentStatus = "planning" | "running" | "completed";

export type Difficulty = "foundational" | "intermediate" | "advanced";

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
}

export interface CaseStudyEntry extends CaseStudyFrontmatter {
  content: string;
  readingTime: string;
  headings: { depth: number; text: string; slug: string }[];
}
