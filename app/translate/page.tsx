import type { Metadata } from "next"

import { TranslatorPage } from "@/components/translator-page"

export const metadata: Metadata = {
  title: "AI Localization File Translator",
  description:
    "Translate localization files with Gemini while preserving code structure and placeholders.",
  alternates: { canonical: "/translate" },
}

export default function Page() {
  return <TranslatorPage />
}
