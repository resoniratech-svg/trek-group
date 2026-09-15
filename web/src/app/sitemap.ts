import { MetadataRoute } from "next";
import { getSitemapBlogs, getSitemapServices } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://trekgroups.com";

  // Base routes that we know exist and should be indexed
  const staticRoutes = [
    { route: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { route: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
    { route: "/services", changeFrequency: "weekly" as const, priority: 0.95 },
    { route: "/contact", changeFrequency: "monthly" as const, priority: 0.9 },
    { route: "/faq", changeFrequency: "monthly" as const, priority: 0.8 },
    { route: "/blog", changeFrequency: "weekly" as const, priority: 0.85 },
  ];

  const sitemapData: MetadataRoute.Sitemap = staticRoutes.map(({ route, changeFrequency, priority }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Add all public, indexable blogs
  const blogs = await getSitemapBlogs();
  for (const blog of blogs) {
    if (!blog) continue;
    
    // Explicitly enforce URL safety requirements
    if (!blog.slug || typeof blog.slug !== 'string' || blog.slug.trim() === '') {
      continue; // Skip, never fall back to legacy ID
    }

    const dateStr = blog.updated_date || blog.published_date || blog.date || blog.created_at;
    const lastMod = dateStr ? new Date(dateStr) : new Date();

    sitemapData.push({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Add all public, indexable services
  const services = await getSitemapServices();
  for (const service of services) {
    if (!service) continue;
    
    // Explicitly enforce URL safety requirements
    if (!service.slug || typeof service.slug !== 'string' || service.slug.trim() === '') {
      continue; // Skip, never fall back to legacy ID
    }

    const dateStr = service.updated_date || service.published_date || service.created_at;
    const lastMod = dateStr ? new Date(dateStr) : new Date();

    sitemapData.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // Deduplicate array by absolute URL mathematically
  const uniqueUrls = new Set<string>();
  const finalSitemap: MetadataRoute.Sitemap = [];
  
  for (const item of sitemapData) {
    if (!uniqueUrls.has(item.url)) {
      uniqueUrls.add(item.url);
      finalSitemap.push(item);
    }
  }

  return finalSitemap;
}
