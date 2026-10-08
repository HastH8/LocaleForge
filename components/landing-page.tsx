"use client"

import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  FileCode2,
  Languages,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  WandSparkles,
  Zap,
} from "lucide-react"

import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
} from "@/components/code-block/code-block"
import { CodeblockShiki } from "@/components/code-block/client/shiki"
import { CopyButton } from "@/components/code-block/copy-button"
import { SiteFooter, SiteHeader } from "@/components/site-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const originalLines = [
  'Locales["en"] = {',
  '  welcome = "Welcome, %{name}!",',
  '  vehicle_stored = "Vehicle stored",',
  '  open_menu = "Press [E] to open",',
  "}",
]

const translatedLines = [
  'Locales["fr"] = {',
  '  welcome = "Bienvenue, %{name} !",',
  '  vehicle_stored = "Véhicule rangé",',
  '  open_menu = "Appuyez sur [E]",',
  "}",
]

function MiniEditor({
  title,
  locale,
  lines,
}: {
  title: string
  locale: string
  lines: string[]
}) {
  const code = lines.join("\n")

  return (
    <CodeBlock className="min-w-0">
      <CodeBlockHeader>
        <CodeBlockGroup>
          <CodeBlockIcon language="lua" />
          <span>{title}</span>
          <span className="rounded-md bg-code-foreground/8 px-1.5 py-0.5 font-mono text-[10px] text-code-foreground/55">
            {locale}
          </span>
        </CodeBlockGroup>
        <CopyButton content={code} />
      </CodeBlockHeader>
      <CodeBlockContent className="min-h-44">
        <CodeblockShiki code={code} language="lua" lineNumbers />
      </CodeBlockContent>
    </CodeBlock>
  )
}

function ProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.34, duration: 0.55 }}
      className="relative mx-auto mt-16 max-w-5xl px-3 sm:mt-20"
    >
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-primary/10 blur-3xl" />
      <div className="overflow-hidden rounded-2xl border bg-card p-2 shadow-2xl shadow-foreground/10 sm:p-3">
        <div className="flex items-center justify-between px-2 py-2 sm:px-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-primary/55" />
            <span className="size-2.5 rounded-full bg-success/70" />
          </div>
          <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-success" /> Structure
            protected
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            locales.lua
          </span>
        </div>
        <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr]">
          <MiniEditor title="Original" locale="EN" lines={originalLines} />
          <div className="flex items-center justify-center py-1 md:py-0">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <ArrowRight className="size-4 rotate-90 md:rotate-0" />
            </span>
          </div>
          <MiniEditor title="Translated" locale="FR" lines={translatedLines} />
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-3">
          <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-success" /> 4 keys matched
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-success" /> Placeholders
              safe
            </span>
            <span className="flex items-center gap-1.5">
              <Braces className="size-3.5 text-success" /> Structure valid
            </span>
          </div>
          <Badge variant="secondary">Ready to download</Badge>
        </div>
      </div>
    </motion.div>
  )
}

const steps = [
  {
    icon: UploadCloud,
    title: "Add your file",
    copy: "Drop in a Lua, JSON, JavaScript, or TypeScript localization file—or paste your code.",
  },
  {
    icon: Languages,
    title: "Pick languages",
    copy: "Search the complete language list and select every locale you want to generate.",
  },
  {
    icon: WandSparkles,
    title: "Review and export",
    copy: "The translator handles the text while LocaleForge checks keys, variables, and code structure.",
  },
]

const features = [
  {
    icon: ShieldCheck,
    title: "Placeholder protection",
    copy: "Variables like %{name}, {{count}}, and ${value} remain exactly where your code expects them.",
  },
  {
    icon: ScanSearch,
    title: "Structure-aware",
    copy: "Only readable strings are translated. Keys, nesting, comments, and formatting remain intact.",
  },
  {
    icon: Zap,
    title: "Made for one-off jobs",
    copy: "No account, workspace, database, or setup flow. Open the translator and get the files you need.",
  },
  {
    icon: LockKeyhole,
    title: "Private by default",
    copy: "Files are processed for your request and are not saved to a user profile or translation history.",
  },
]

export function LandingPage() {
  return (
    <main className="min-h-svh overflow-x-clip">
      <SiteHeader />

      <section className="relative overflow-hidden border-b">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="secondary" className="rounded-full border px-3">
                <Sparkles data-icon="inline-start" />
                Built for structured localization
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-7 text-5xl leading-[0.97] font-extrabold tracking-[-0.065em] sm:text-7xl"
            >
              Translate the words.
              <br />
              <span className="text-gradient">Never break the code.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
            >
              A focused localization tool for Lua, JSON, and app language files.
              Translate into multiple languages while preserving every key,
              variable, and line of structure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/translate" />}
              >
                Translate a file <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="#how" />}
              >
                See how it works
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              className="mt-4 text-xs text-muted-foreground"
            >
              No account · no database · files are not saved
            </motion.p>
          </div>
          <ProductPreview />
        </div>
      </section>

      <section className="border-b bg-muted/25">
        <div className="mx-auto grid max-w-6xl divide-y px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["100+", "languages ready"],
            ["4", "developer file formats"],
            ["12", "languages per run"],
          ].map(([value, label]) => (
            <div key={label} className="py-9 text-center">
              <p className="text-4xl font-extrabold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Three steps. Nothing else in the way.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The workflow is the product upload, choose, translate.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={step.title} className="h-full">
                <CardHeader>
                  <div className="mb-7 flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {step.copy}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      <section id="features" className="border-y bg-muted/25">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
                Built for code
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Translation that understands what not to touch.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                General translators see words. LocaleForge sees a file your
                application must still be able to run.
              </p>
              <Button
                className="mt-7"
                nativeButton={false}
                render={<Link href="/translate" />}
              >
                Try the translator <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="h-full">
                    <CardHeader>
                      <span className="mb-5 flex size-10 items-center justify-center rounded-xl border bg-background text-primary">
                        <Icon className="size-4" />
                      </span>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="leading-6">
                        {feature.copy}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="formats" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="overflow-hidden rounded-3xl border bg-card px-6 py-10 shadow-sm sm:px-12 sm:py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge variant="outline">
                <FileCode2 data-icon="inline-start" />
                Supported formats
              </Badge>
              <h2 className="mt-5 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                The files behind FiveM, RedM, web apps, and games.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                Start with Lua or JSON. JavaScript and TypeScript localization
                objects work just as well.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["lua", "Lua"],
                ["json", "JSON"],
                ["js", "JavaScript"],
                ["ts", "TypeScript"],
              ].map(([format, name]) => (
                <div
                  key={format}
                  className="flex min-w-36 items-center gap-3 rounded-2xl border bg-muted/35 px-4 py-3.5"
                >
                  <span className="flex size-9 items-center justify-center rounded-xl border bg-background">
                    <CodeBlockIcon language={format} />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">{name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      .{format}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t bg-muted/25">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:py-28">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-primary uppercase">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Good to know before you translate.
            </h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              [
                "Are my files stored?",
                "No user account, project history, or translation database is used. The file is processed for the current request.",
              ],
              [
                "What does the translator change?",
                "Only human-readable strings. The translation instructions explicitly protect keys, placeholders, comments, and structure.",
              ],
              [
                "Can I edit the result?",
                "Yes. Every generated file opens in a full Monaco code editor before you download it.",
              ],
              [
                "Can I translate several languages?",
                "Yes. Select multiple languages, review each result, and download them individually or together as a ZIP.",
              ],
            ].map(([question, answer]) => (
              <Card key={question}>
                <CardHeader>
                  <CardTitle>{question}</CardTitle>
                  <CardDescription className="leading-6">
                    {answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Sparkles className="mx-auto size-5 text-primary" />
            <h3 className="mt-4 text-2xl font-extrabold">
              Ready to localize your file?
            </h3>
            <Button
              className="mt-5"
              size="lg"
              nativeButton={false}
              render={<Link href="/translate" />}
            >
              Open LocaleForge <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
