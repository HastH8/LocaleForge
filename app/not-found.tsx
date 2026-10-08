import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Braces, Languages } from "lucide-react"

import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
}

export default function NotFound() {
  return (
    <main className="min-h-svh overflow-hidden">
      <SiteHeader />
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center border-b">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-20" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[30rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <Badge variant="outline" className="gap-2 rounded-full px-3 py-1">
              <span className="size-1.5 rounded-full bg-primary" />
              Error 404
            </Badge>
            <h1 className="mt-6 max-w-2xl text-5xl font-extrabold tracking-[-0.055em] sm:text-7xl">
              This key doesn&apos;t exist.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              The page may have moved, or the URL may contain a typo. Your code
              is safe—let&apos;s get you back somewhere useful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link href="/" />}>
                <ArrowLeft data-icon="inline-start" />
                Back home
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/translate" />}
              >
                <Languages data-icon="inline-start" />
                Open translator
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border bg-card shadow-2xl shadow-black/10">
              <div className="flex items-center gap-2 border-b px-5 py-4">
                <span className="size-2 rounded-full bg-destructive/70" />
                <span className="size-2 rounded-full bg-amber-400/70" />
                <span className="size-2 rounded-full bg-emerald-400/70" />
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  missing.locale
                </span>
              </div>
              <div className="space-y-3 p-6 font-mono text-sm sm:p-8">
                <div className="flex gap-4">
                  <span className="text-muted-foreground/50">01</span>
                  <span className="text-sky-500">const</span>
                  <span>page = findRoute(url)</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/50">02</span>
                  <span className="text-muted-foreground">&nbsp;</span>
                </div>
                <div className="flex gap-4 rounded-lg bg-destructive/8 py-2 pr-3">
                  <span className="pl-2 text-muted-foreground/50">03</span>
                  <span className="text-violet-500">throw</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    new RouteNotFound(404)
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground/50">04</span>
                  <span className="text-muted-foreground">
                    {"// try home instead"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t bg-muted/30 px-5 py-4 font-mono text-[11px] text-muted-foreground">
                <Braces className="size-3.5 text-primary" />
                LOCALEFORGE · ROUTE_MISSING
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
