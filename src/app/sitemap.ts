import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs, getAllNewsSlugs, getAllResearchSlugs } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/research", "/case-studies", "/news", "/events", "/now", "/about"].map(
    (route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "/now" || route === "/news" || route === "/events"
        ? "weekly"
        : "monthly") as "weekly" | "monthly",
      priority: route === "" ? 1 : 0.8,
    })
  );

  const researchRoutes = getAllResearchSlugs().map((slug) => ({
    url: `${site.url}/research/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = getAllCaseStudySlugs().map((slug) => ({
    url: `${site.url}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsRoutes = getAllNewsSlugs().map((slug) => ({
    url: `${site.url}/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...researchRoutes, ...caseStudyRoutes, ...newsRoutes];
}
