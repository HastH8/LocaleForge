"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Cookie } from "lucide-react"

import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from "@/components/consented-analytics"
import { Button } from "@/components/ui/button"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setVisible(!window.localStorage.getItem(COOKIE_CONSENT_KEY))
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  function choose(value: "essential" | "all") {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border bg-card p-4 shadow-2xl shadow-foreground/10 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Cookie className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">A small note about cookies</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            We use essential storage for your theme and cookie choice. Optional
            analytics help improve LocaleForge. Read our{" "}
            <Link
              className="underline underline-offset-2 hover:text-foreground"
              href="/cookies"
            >
              cookie policy
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => choose("all")}>
              Accept all
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => choose("essential")}
            >
              Essential only
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
