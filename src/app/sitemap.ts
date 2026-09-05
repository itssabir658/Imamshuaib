import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";

/**
 * Generated from the same content modules the pages render, so a new service
 * cannot be published and then quietly left out of the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.8 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/donate"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: url(s.href),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
