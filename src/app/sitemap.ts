import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { siteConfig } from "@/data/site-config";

const STATIC_PAGES = [
  { path: "", priority: 1, changeFrequency: "daily" as const },
  { path: "/available-properties", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/how-buying-works", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/apply", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/buyer-list", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/sold-properties", priority: 0.5, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/financing-disclaimer", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/accessibility-statement", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties
    .filter((p) => p.status !== "hidden")
    .map((p) => ({
      url: `${base}/properties/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: p.status === "sold" ? "yearly" : "weekly",
      priority: p.status === "sold" ? 0.3 : 0.8,
    }));

  return [...staticEntries, ...propertyEntries];
}
