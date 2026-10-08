import * as FlagIcons from "country-flag-icons/react/3x2"

import { cn } from "@/lib/utils"

const languageFlagOverrides: Record<string, keyof typeof FlagIcons> = {
  eo: "EU",
  ku: "IQ",
  cy: "GB_WLS",
  yi: "IL",
}

function countryCodeFromEmoji(flag: string) {
  const regionalIndicators = [...flag]
    .map((character) => character.codePointAt(0) ?? 0)
    .filter((point) => point >= 0x1f1e6 && point <= 0x1f1ff)

  if (regionalIndicators.length !== 2) return "EU"

  return regionalIndicators
    .map((point) => String.fromCharCode(point - 0x1f1e6 + 65))
    .join("")
}

export function LanguageFlag({
  languageCode,
  flag,
  className,
}: {
  languageCode: string
  flag?: string
  className?: string
}) {
  const countryCode =
    languageFlagOverrides[languageCode] ?? countryCodeFromEmoji(flag ?? "")
  const FlagIcon = FlagIcons[countryCode as keyof typeof FlagIcons]

  return (
    <span
      className={cn(
        "inline-flex h-4 w-6 shrink-0 overflow-hidden rounded-[4px] border bg-muted shadow-xs",
        className
      )}
      aria-hidden="true"
    >
      <FlagIcon className="size-full object-cover" />
    </span>
  )
}
