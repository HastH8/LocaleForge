const fallbackUrl = "https://locale.hastherish.com"

function normalizeUrl(url: string) {
  const value = url.trim().replace(/\/$/, "")

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value
  }

  return `https://${value}`
}

export const siteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    fallbackUrl
)

export const siteConfig = {
  name: "LocaleForge",
  title: "LocaleForge — Translate Localization Files Without Breaking Code",
  shortDescription:
    "AI localization for Lua, JSON, JavaScript, and TypeScript files.",
  description:
    "Translate localization files with AI while preserving keys, placeholders, code structure, and developer formatting. No account required.",
  url: siteUrl,
  ogImage: "/opengraph-image.png",
  keywords: [
    "localization",
    "translation tool",
    "AI translation",
    "Lua localization",
    "JSON translation",
    "JavaScript localization",
    "TypeScript localization",
    "i18n",
    "developer tools",
    "FiveM localization",
  ],
} as const

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString()
}
