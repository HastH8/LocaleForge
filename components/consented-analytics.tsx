"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"

export const COOKIE_CONSENT_KEY = "localeforge-cookie-consent"
export const COOKIE_CONSENT_EVENT = "localeforge:cookie-consent"

export function ConsentedAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const syncConsent = () => {
      setEnabled(window.localStorage.getItem(COOKIE_CONSENT_KEY) === "all")
    }

    syncConsent()
    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent)
    window.addEventListener("storage", syncConsent)

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent)
      window.removeEventListener("storage", syncConsent)
    }
  }, [])

  return enabled ? <Analytics /> : null
}
