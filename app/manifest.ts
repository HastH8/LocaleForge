import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LocaleForge — AI Localization",
    short_name: "LocaleForge",
    description:
      "Translate localization files while preserving keys, placeholders, and code structure.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080d",
    theme_color: "#7c5cff",
    categories: ["developer", "productivity", "utilities"],
    icons: [
      {
        src: "/icon.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
