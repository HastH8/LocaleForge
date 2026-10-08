"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="LocaleForge home"
    >
      <Image
        src="/localeforge-mark.png"
        alt=""
        width={36}
        height={36}
        className="size-8 object-contain"
        priority
      />
      {!compact && (
        <span className="text-[15px] font-extrabold tracking-[-0.035em]">
          LocaleForge
        </span>
      )}
    </Link>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle color theme"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          />
        }
      >
        <Sun className="hidden dark:block" />
        <Moon className="block dark:hidden" />
      </TooltipTrigger>
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/82 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Brand />
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#how"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <Link
            href="/#features"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/#formats"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Formats
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button nativeButton={false} render={<Link href="/translate" />}>
            Start translating
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem render={<Link href="/#how" />}>
                  How it works
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/#features" />}>
                  Features
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/#formats" />}>
                  Formats
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/#faq" />}>
                  FAQ
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/25">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Fast, safe localization for the code developers actually ship.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">Product</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/translate" className="hover:text-foreground">
                Translator
              </Link>
              <Link href="/#features" className="hover:text-foreground">
                Features
              </Link>
              <Link href="/#formats" className="hover:text-foreground">
                Supported formats
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">Legal</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of use
              </Link>
              <Link href="/cookies" className="hover:text-foreground">
                Cookie policy
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 LocaleForge. All rights reserved.</p>
          <p>Not affiliated with Cfx.re, Rockstar Games, or Tebex.</p>
        </div>
      </div>
    </footer>
  )
}
