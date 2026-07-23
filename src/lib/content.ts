import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import type {
  CaseStudyEntry,
  CaseStudyFrontmatter,
  ResearchEntry,
  ResearchFrontmatter,
} from "./types";

const RESEARCH_DIR = path.join(process.cwd(), "content/research");
const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");
const NOW_PATH = path.join(process.cwd(), "content/now/now.md");

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown: string) {
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const headings: { depth: number; text: string; slug: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    headings.push({ depth, text, slug: slugify(text) });
  }
  return headings;
}

async function renderMarkdown(markdown: string) {
  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  let result = processed.toString();
  // Inject anchor ids into h2/h3 so the TOC can link to them.
  result = result.replace(
    /<h([23])>(.*?)<\/h\1>/g,
    (_m, level, inner) => {
      const plain = inner.replace(/<[^>]+>/g, "");
      const slug = slugify(plain);
      return `<h${level} id="${slug}">${inner}</h${level}>`;
    }
  );
  return result;
}

function getSlugsFromDir(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllResearchSlugs() {
  return getSlugsFromDir(RESEARCH_DIR);
}

export function getAllCaseStudySlugs() {
  return getSlugsFromDir(CASE_STUDIES_DIR);
}

export async function getResearchEntry(slug: string): Promise<ResearchEntry> {
  const fullPath = path.join(RESEARCH_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const rendered = await renderMarkdown(content);
  const frontmatter = data as ResearchFrontmatter;
  return {
    ...frontmatter,
    slug: frontmatter.slug ?? slug,
    content: rendered,
    readingTime: stats.text,
    headings: extractHeadings(content),
  };
}

export async function getCaseStudyEntry(slug: string): Promise<CaseStudyEntry> {
  const fullPath = path.join(CASE_STUDIES_DIR, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const rendered = await renderMarkdown(content);
  const frontmatter = data as CaseStudyFrontmatter;
  return {
    ...frontmatter,
    slug: frontmatter.slug ?? slug,
    content: rendered,
    readingTime: stats.text,
    headings: extractHeadings(content),
  };
}

export async function getAllResearch(): Promise<ResearchEntry[]> {
  const slugs = getAllResearchSlugs();
  const entries = await Promise.all(slugs.map((slug) => getResearchEntry(slug)));
  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllCaseStudies(): Promise<CaseStudyEntry[]> {
  const slugs = getAllCaseStudySlugs();
  const entries = await Promise.all(
    slugs.map((slug) => getCaseStudyEntry(slug))
  );
  return entries.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNowContent() {
  const fileContents = fs.readFileSync(NOW_PATH, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content };
}

export async function renderNowMarkdown(markdown: string) {
  return renderMarkdown(markdown);
}
