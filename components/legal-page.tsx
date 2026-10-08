import type { ReactNode } from "react"

import { SiteFooter, SiteHeader } from "@/components/site-shell"

export function LegalPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <main className="min-h-svh">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          {description}
        </p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Last updated: October 8, 2026
        </p>
        <article className="mt-12 flex flex-col gap-9 text-sm leading-7 text-muted-foreground [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-foreground [&_p+p]:mt-3 [&_ul]:ml-5 [&_ul]:list-disc">
          {children}
        </article>
      </div>
      <SiteFooter />
    </main>
  )
}
