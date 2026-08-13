export const site = {
  name: "The AI Growth Journal",
  author: "Carolina Conte",
  role: "Marketer & Growth Engineer",
  url: "https://theaigrowthjournal.com",
  description:
    "A marketer's daily journal of building with AI — real experiments, failures, systems and case studies on AI, websites, SEO and marketing-driven growth.",
  email: "carolina@carolinaconte.com",
  social: {
    twitter: "https://x.com/carolinaconte",
    linkedin: "https://www.linkedin.com/in/carolinaconte",
    github: "https://github.com/carolinaconte",
  },
  nav: [
    { label: "Research", href: "/research" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "News", href: "/news" },
    { label: "Events", href: "/events" },
    { label: "Now", href: "/now" },
    { label: "About", href: "/about" },
  ],
};

export const statusLabel: Record<string, string> = {
  planning: "Planning",
  running: "Running",
  completed: "Completed",
};

export const statusColor: Record<string, string> = {
  planning: "var(--color-amber)",
  running: "var(--color-signal)",
  completed: "var(--color-ink-muted)",
};

export const difficultyLabel: Record<string, string> = {
  foundational: "Foundational",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
