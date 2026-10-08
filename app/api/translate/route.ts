import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

import { getLanguage } from "@/lib/languages"

export const runtime = "nodejs"
export const maxDuration = 60

type TranslationRequest = {
  source?: string
  sourceLanguage?: string
  targets?: string[]
  fileName?: string
  format?: string
}

const PLACEHOLDER_PATTERN =
  /(%\{[^}]+\}|\{\{[^}]+\}\}|\$\{[^}]+\}|%[-+0 #]*\d*(?:\.\d+)?[a-zA-Z]|\[[A-Z]\]|~[^~]+~|\^[0-9])/g
const requestLog = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000
const RATE_LIMIT_REQUESTS = 20

function isRateLimited(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const client =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  const now = Date.now()
  const recent = (requestLog.get(client) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  )
  if (recent.length >= RATE_LIMIT_REQUESTS) return true
  requestLog.set(client, [...recent, now])
  return false
}

function placeholders(value: string) {
  return (value.match(PLACEHOLDER_PATTERN) ?? []).sort()
}

function stripCodeFence(value: string) {
  return value
    .trim()
    .replace(/^```(?:lua|json|javascript|typescript|js|ts)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim()
}

function validateTranslation(source: string, translated: string) {
  const sourceTokens = placeholders(source)
  const translatedTokens = placeholders(translated)
  const placeholderSafe =
    JSON.stringify(sourceTokens) === JSON.stringify(translatedTokens)
  const sourceKeys = source.match(/^\s*["']?[\w.-]+["']?\s*[:=]/gm)?.length ?? 0
  const translatedKeys =
    translated.match(/^\s*["']?[\w.-]+["']?\s*[:=]/gm)?.length ?? 0

  return {
    placeholderSafe,
    keyCount: translatedKeys,
    keyCountMatches: sourceKeys === translatedKeys,
  }
}

function translationErrorMessage(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Translation request failed."

  if (/404|NOT_FOUND|no longer available|not found/i.test(message)) {
    return "The configured translation model is unavailable. Set GEMINI_MODEL=gemini-3.1-flash-lite and restart the server."
  }

  if (/429|RESOURCE_EXHAUSTED|quota|rate limit/i.test(message)) {
    return "The free translation limit has been reached. Please wait a moment and try again."
  }

  if (/503|UNAVAILABLE|high demand|overloaded/i.test(message)) {
    return "The translation service is busy right now. Please try again in a moment."
  }

  if (/timeout|timed out|abort/i.test(message)) {
    return "The translation took too long. Please try again or select fewer languages."
  }

  return "The translation service could not complete this request. Please try again."
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: "Too many translation requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = (await request.json()) as TranslationRequest
    const source = body.source?.trim()
    const targets = [...new Set(body.targets ?? [])]

    if (!source) {
      return NextResponse.json(
        { error: "Add a source file or paste code first." },
        { status: 400 }
      )
    }
    if (source.length > 100_000) {
      return NextResponse.json(
        { error: "This file is larger than the 100,000 character limit." },
        { status: 413 }
      )
    }
    if (!targets.length || targets.length > 12) {
      return NextResponse.json(
        { error: "Choose between 1 and 12 target languages." },
        { status: 400 }
      )
    }
    if (targets.some((code) => !getLanguage(code))) {
      return NextResponse.json(
        { error: "One or more target languages are not supported." },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini is not configured yet. Add GEMINI_API_KEY to .env.local and restart the server.",
        },
        { status: 503 }
      )
    }

    const ai = new GoogleGenAI({ apiKey })
    const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite"
    const format = body.format || body.fileName?.split(".").pop() || "text"
    const sourceLanguage = body.sourceLanguage || "English"

    const translateOne = async (targetCode: string) => {
      const target = getLanguage(targetCode)!
      const prompt = `You are a senior software localization engineer.

Translate the human-readable localization strings in the file below from ${sourceLanguage} to ${target.name} (${target.nativeName}).

NON-NEGOTIABLE RULES:
1. Return only the complete translated file. No markdown fences, explanations, or preamble.
2. Preserve every key, object name, nesting level, delimiter, quote style, comma, comment, and code structure.
3. Never translate identifiers, keys, event names, commands, file paths, URLs, or framework names.
4. Preserve placeholders and control tokens character-for-character, including %{name}, {{count}}, \${value}, %s, %d, [E], ~r~, and ^1.
5. Keep the same file format (${format}) and produce valid syntax.
6. Use natural, concise UI language appropriate for ${target.name}. Match the original tone.
7. Do not add or remove entries.

SOURCE FILE:
${source}`

      const response = await ai.interactions.create(
        {
          model,
          input: prompt,
          generation_config: { thinking_level: "minimal" },
          store: false,
        },
        { timeout_ms: 35_000 }
      )
      const text = stripCodeFence(response.output_text ?? "")
      if (!text)
        throw new Error(`Gemini returned an empty ${target.name} translation.`)

      return {
        code: target.code,
        name: target.name,
        nativeName: target.nativeName,
        flag: target.flag,
        content: text,
        validation: validateTranslation(source, text),
      }
    }

    const results = []
    for (let index = 0; index < targets.length; index += 3) {
      const batch = targets.slice(index, index + 3)
      results.push(...(await Promise.all(batch.map(translateOne))))
    }

    return NextResponse.json({ results, model })
  } catch (error) {
    console.error("Translation request failed", error)
    return NextResponse.json(
      { error: translationErrorMessage(error) },
      { status: 502 }
    )
  }
}
