import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllSlugs } from "@/lib/blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,                lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE_URL}/funcionalidades`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`,            lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/privacidade`,     lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/termos`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllSlugs();
    postRoutes = slugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}
