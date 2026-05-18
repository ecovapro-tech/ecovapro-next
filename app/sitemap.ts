import type { MetadataRoute } from "next";
import { SERVICES } from "@/content/services";
import { listSlugs } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/blog", "/privacy-policy", "/terms", "/refund-policy"];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE_URL}${p || "/"}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1.0 : 0.5,
  }));

  for (const s of SERVICES) {
    entries.push({
      url: `${SITE_URL}/${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  for (const slug of listSlugs()) {
    entries.push({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
