import type { MetadataRoute } from "next"

import { absoluteUrl } from "@/lib/site"

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/translate", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: new Date("2026-10-08"),
    changeFrequency,
    priority,
  }))
}
