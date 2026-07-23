import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs, getAllResearchSlugs } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/research", "/case-studies", "/now", "/about"].map(
    (route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "/now" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
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

  return [...staticRoutes, ...researchRoutes, ...caseStudyRoutes];
}
