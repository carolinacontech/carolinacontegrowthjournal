export const site = {
  name: "The AI Growth Journal",
  author: "Carolina Conte",
  role: "Growth Engineer",
  url: "https://theaigrowthjournal.com",
  description:
    "A public journal documenting experiments, failures, systems and real-world case studies about AI, websites, SEO and business growth.",
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
