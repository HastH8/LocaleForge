"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import JSZip from "jszip"
import {
  ArrowLeft,
  Braces,
  ChevronDown,
  Clipboard,
  Download,
  FileCode2,
  FileUp,
  LanguagesIcon,
  Loader2,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Brand, ThemeToggle } from "@/components/site-shell"
import { LanguageFlag } from "@/components/language-flag"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/toast"
import { getLanguage, languages } from "@/lib/languages"
import { cn } from "@/lib/utils"

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

const SAMPLE = `Locales["en"] = {
  welcome = "Welcome, %{name}!",
  vehicle_stored = "Vehicle stored successfully",
  insufficient_funds = "You need $%{amount} more",
  open_menu = "Press [E] to open the menu",
  players_online = "%{count} players online",
}`

type TranslationResult = {
  code: string
  name: string
  nativeName: string
  flag: string
  content: string
  validation: {
    placeholderSafe: boolean
    keyCount: number
    keyCountMatches: boolean
  }
}

function countEntries(source: string) {
  return source.match(/^\s*["']?[\w.-]+["']?\s*[:=]/gm)?.length ?? 0
}

function editorLanguage(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase()
  if (extension === "json") return "json"
  if (extension === "js") return "javascript"
  if (extension === "ts") return "typescript"
  return "lua"
}

function LanguageDialog({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (next: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  function toggle(code: string) {
    if (selected.includes(code))
      onChange(selected.filter((value) => value !== code))
    else if (selected.length < 12) onChange([...selected, code])
    else
      toast.add({
        title: "12 language limit",
        description: "Translate up to 12 languages in one run.",
        type: "warning",
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <LanguagesIcon data-icon="inline-start" />
        Choose languages
        <ChevronDown data-icon="inline-end" />
      </DialogTrigger>
      <DialogContent className="h-[min(84svh,46rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="gap-1 px-6 pt-6 pr-14 pb-5">
          <div className="flex flex-wrap items-center gap-3">
            <DialogTitle className="text-xl">
              Choose target languages
            </DialogTitle>
            <Badge variant="secondary">{selected.length} of 12 selected</Badge>
          </div>
          <DialogDescription>
            Search by English name, native name, or locale code.
          </DialogDescription>
        </DialogHeader>
        <Command className="min-h-0 rounded-none! border-y p-0">
          <div className="border-b bg-muted/25 px-4 py-3 [&_[data-slot=command-input-wrapper]]:p-0 [&_[data-slot=input-group]]:h-10!">
            <CommandInput placeholder="Search 104 languages and locales..." />
          </div>
          <CommandList className="max-h-none flex-1 p-2">
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup
              className="p-0 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2.5 **:[[cmdk-group-items]]:grid **:[[cmdk-group-items]]:grid-cols-1 sm:**:[[cmdk-group-items]]:grid-cols-2 sm:**:[[cmdk-group-items]]:gap-1"
              heading={`${languages.length} languages and regional variants`}
            >
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={`${language.name} ${language.nativeName} ${language.code}`}
                  onSelect={() => toggle(language.code)}
                  data-checked={selected.includes(language.code)}
                  className="min-h-14 gap-3 px-3 py-2.5"
                >
                  <LanguageFlag
                    languageCode={language.code}
                    flag={language.flag}
                    className="h-5 w-7"
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">
                      {language.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {language.nativeName} · {language.code}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <DialogFooter className="mx-0 mb-0 flex-row items-center justify-between rounded-none bg-muted/25 px-6 py-4 sm:justify-between">
          <span className="text-sm text-muted-foreground">
            Choose up to 12 translation targets
          </span>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <Button variant="ghost" onClick={() => onChange([])}>
                Clear
              </Button>
            )}
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function CodeEditor({
  value,
  onChange,
  fileName,
  readOnly = false,
}: {
  value: string
  onChange?: (value: string) => void
  fileName: string
  readOnly?: boolean
}) {
  const { resolvedTheme } = useTheme()
  return (
    <Editor
      height="100%"
      language={editorLanguage(fileName)}
      value={value}
      onChange={(next) => onChange?.(next ?? "")}
      theme={resolvedTheme === "light" ? "vs-light" : "vs-dark"}
      loading={
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading editor…
        </div>
      }
      options={{
        readOnly,
        minimap: { enabled: false },
        fontFamily: "Geist Mono, monospace",
        fontSize: 13,
        lineHeight: 22,
        padding: { top: 18, bottom: 18 },
        scrollBeyondLastLine: false,
        renderLineHighlight: "line",
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        wordWrap: "on",
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        automaticLayout: true,
      }}
    />
  )
}

export function TranslatorPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [source, setSource] = useState(SAMPLE)
  const [fileName, setFileName] = useState("locales.lua")
  const [selected, setSelected] = useState(["fr-FR", "es-ES", "de"])
  const [results, setResults] = useState<TranslationResult[]>([])
  const [activeCode, setActiveCode] = useState("fr-FR")
  const [isTranslating, setIsTranslating] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [translationProgress, setTranslationProgress] = useState(0)
  const entryCount = useMemo(() => countEntries(source), [source])
  const activeResult = results.find((result) => result.code === activeCode)

  useEffect(() => {
    if (!isTranslating) return

    const startedAt = Date.now()
    const timer = window.setInterval(() => {
      const elapsedMilliseconds = Date.now() - startedAt
      setElapsedSeconds(Math.floor(elapsedMilliseconds / 1000))
      setTranslationProgress(
        Math.min(92, 6 + (elapsedMilliseconds / 15_000) * 86)
      )
    }, 200)

    return () => window.clearInterval(timer)
  }, [isTranslating])

  function loadFile(file?: File) {
    if (!file) return
    const extension = file.name.split(".").pop()?.toLowerCase()
    if (!extension || !["lua", "json", "js", "ts"].includes(extension)) {
      toast.add({
        title: "Unsupported file",
        description: "Choose a .lua, .json, .js, or .ts file.",
        type: "error",
      })
      return
    }
    if (file.size > 500_000) {
      toast.add({
        title: "File is too large",
        description: "Choose a file smaller than 500 KB.",
        type: "error",
      })
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setSource(String(reader.result ?? ""))
      setFileName(file.name)
      setResults([])
      toast.add({
        title: "File loaded",
        description: `${file.name} is ready to translate.`,
        type: "success",
      })
    }
    reader.readAsText(file)
  }

  async function translate() {
    if (!source.trim()) {
      toast.add({ title: "Add source code first", type: "warning" })
      return
    }
    if (!selected.length) {
      toast.add({
        title: "Choose at least one target language",
        type: "warning",
      })
      return
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 45_000)

    setElapsedSeconds(0)
    setTranslationProgress(6)
    setIsTranslating(true)
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          source,
          sourceLanguage: "English",
          targets: selected,
          fileName,
          format: editorLanguage(fileName),
        }),
      })
      const payload = (await response.json()) as {
        results?: TranslationResult[]
        error?: string
      }
      if (!response.ok || !payload.results)
        throw new Error(payload.error || "Translation failed.")

      setTranslationProgress(100)
      await new Promise((resolve) => window.setTimeout(resolve, 300))
      setResults(payload.results)
      setActiveCode(payload.results[0].code)
      const issues = payload.results.filter(
        (result) =>
          !result.validation.placeholderSafe ||
          !result.validation.keyCountMatches
      ).length
      toast.add({
        title: issues
          ? "Translations ready with warnings"
          : "Translations ready",
        description: issues
          ? `Review ${issues} validation ${issues === 1 ? "warning" : "warnings"} before downloading.`
          : `${payload.results.length} files passed validation.`,
        type: issues ? "warning" : "success",
      })
    } catch (error) {
      toast.add({
        title: "Could not translate",
        description:
          error instanceof DOMException && error.name === "AbortError"
            ? "The request took longer than 45 seconds. Try fewer languages or try again."
            : error instanceof Error
              ? error.message
              : "Please try again.",
        type: "error",
      })
    } finally {
      window.clearTimeout(timeout)
      setIsTranslating(false)
    }
  }

  function updateActiveResult(value: string) {
    setResults((current) =>
      current.map((result) =>
        result.code === activeCode ? { ...result, content: value } : result
      )
    )
  }

  function resultName(code: string) {
    const extensionIndex = fileName.lastIndexOf(".")
    return extensionIndex > -1
      ? `${fileName.slice(0, extensionIndex)}.${code}${fileName.slice(extensionIndex)}`
      : `${fileName}.${code}`
  }

  async function copyActive() {
    if (!activeResult) return
    await navigator.clipboard.writeText(activeResult.content)
    toast.add({ title: "Copied to clipboard", type: "success" })
  }

  function downloadActive() {
    if (!activeResult) return
    const url = URL.createObjectURL(
      new Blob([activeResult.content], { type: "text/plain;charset=utf-8" })
    )
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = resultName(activeResult.code)
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function downloadAll() {
    const zip = new JSZip()
    results.forEach((result) =>
      zip.file(resultName(result.code), result.content)
    )
    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "localeforge-translations.zip"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="flex min-h-svh flex-col bg-muted/20">
      <header className="border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Brand />
            <span className="hidden h-5 w-px bg-border sm:block" />
            <span className="hidden text-sm font-semibold text-muted-foreground sm:block">
              Translator
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href="/" />}
            >
              <ArrowLeft data-icon="inline-start" /> Home
            </Button>
          </div>
        </div>
      </header>

      <div className="editor-grid flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 py-6 sm:px-6">
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  <span className="mr-1 size-1.5 rounded-full bg-success" />
                  TRANSLATOR READY
                </Badge>
                {/* <Badge variant="secondary">NO ACCOUNT</Badge> */}
              </div>
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Translate your localization file
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Add source, choose languages, then review every file before
                download.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".lua,.json,.js,.ts"
                className="sr-only"
                onChange={(event) => loadFile(event.target.files?.[0])}
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <FileUp data-icon="inline-start" />
                Upload file
              </Button>
              <LanguageDialog
                selected={selected}
                onChange={(next) => {
                  setSelected(next)
                  setResults([])
                }}
              />
              <Button onClick={translate} disabled={isTranslating}>
                {isTranslating ? (
                  <Loader2 className="animate-spin" data-icon="inline-start" />
                ) : (
                  <Sparkles data-icon="inline-start" />
                )}
                {isTranslating
                  ? "Translating…"
                  : `Translate ${selected.length || ""}`}
              </Button>
            </div>
          </div>

          <div className="mb-4 flex min-h-8 flex-wrap items-center gap-2">
            <Badge variant="outline" className="gap-1.5 py-1.5">
              <LanguageFlag languageCode="en-US" flag="🇺🇸" />
              English <span className="text-muted-foreground">source</span>
            </Badge>
            {selected.map((code) => {
              const language = getLanguage(code)
              return (
                <Badge
                  key={code}
                  variant="secondary"
                  className="gap-1.5 py-1.5"
                >
                  {language && (
                    <LanguageFlag
                      languageCode={language.code}
                      flag={language.flag}
                    />
                  )}
                  {language?.name}
                  <button
                    aria-label={`Remove ${language?.name}`}
                    className="rounded-sm hover:text-destructive"
                    onClick={() => {
                      setSelected((current) =>
                        current.filter((item) => item !== code)
                      )
                      setResults([])
                    }}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              )
            })}
          </div>

          {isTranslating && (
            <div className="mb-4 rounded-xl border bg-card p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold">
                  Translating and validating your files…
                </span>
                <span className="text-muted-foreground">
                  {Math.round(translationProgress)}% · {elapsedSeconds}s ·{" "}
                  {selected.length} languages
                </span>
              </div>
              <Progress
                value={translationProgress}
                aria-label={`${Math.round(translationProgress)}% translated`}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Free-tier translations usually finish in 5–15 seconds.
              </p>
            </div>
          )}

          <div className="grid flex-1 gap-4 xl:h-[660px] xl:grid-cols-2">
            <section className="flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm xl:min-h-0">
              <div className="flex h-14 items-center justify-between border-b px-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileCode2 className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{fileName}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {editorLanguage(fileName).toUpperCase()} · {entryCount}{" "}
                      strings
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Clear source"
                  onClick={() => {
                    setSource("")
                    setResults([])
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
              <div className="min-h-0 flex-1">
                <CodeEditor
                  value={source}
                  onChange={(value) => {
                    setSource(value)
                    setResults([])
                  }}
                  fileName={fileName}
                />
              </div>
              <div className="flex h-10 items-center justify-between border-t bg-muted/35 px-4 font-mono text-[10px] text-muted-foreground">
                <span>SOURCE · ENGLISH</span>
                <span>{source.length.toLocaleString()} CHARACTERS</span>
              </div>
            </section>

            <section className="flex min-h-[560px] min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-sm xl:min-h-0">
              <div className="flex h-14 items-center justify-between gap-3 border-b px-4">
                {activeResult ? (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" />}>
                        <LanguageFlag
                          languageCode={activeResult.code}
                          flag={activeResult.flag}
                        />
                        {activeResult.name}
                        <ChevronDown data-icon="inline-end" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          {results.map((result) => (
                            <DropdownMenuItem
                              key={result.code}
                              onClick={() => setActiveCode(result.code)}
                            >
                              <LanguageFlag
                                languageCode={result.code}
                                flag={result.flag}
                              />
                              {result.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Copy translation"
                        onClick={copyActive}
                      >
                        <Clipboard />
                      </Button>
                      <Button variant="outline" onClick={downloadActive}>
                        <Download data-icon="inline-start" />
                        File
                      </Button>
                      {results.length > 1 && (
                        <Button onClick={downloadAll}>
                          <Download data-icon="inline-start" />
                          ZIP
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <LanguagesIcon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Translation</p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        RESULTS APPEAR HERE
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="min-h-0 flex-1">
                {activeResult ? (
                  <CodeEditor
                    value={activeResult.content}
                    onChange={updateActiveResult}
                    fileName={resultName(activeResult.code)}
                  />
                ) : (
                  <div className="flex h-full min-h-[520px] items-center justify-center p-8 text-center">
                    <div className="max-w-sm">
                      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Sparkles className="size-6" />
                      </span>
                      <h2 className="mt-5 text-lg font-extrabold">
                        Ready when you are
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Choose your target languages and press translate. Each
                        result will open here in a full code editor.
                      </p>
                      <Button className="mt-5" onClick={translate}>
                        <Sparkles data-icon="inline-start" />
                        Translate file
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex h-10 items-center justify-between border-t bg-muted/35 px-4 font-mono text-[10px] text-muted-foreground">
                {activeResult ? (
                  <>
                    <span className="flex items-center gap-2">
                      <ShieldCheck
                        className={cn(
                          "size-3.5",
                          activeResult.validation.placeholderSafe
                            ? "text-success"
                            : "text-destructive"
                        )}
                      />
                      {activeResult.validation.placeholderSafe
                        ? "PLACEHOLDERS SAFE"
                        : "REVIEW PLACEHOLDERS"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Braces
                        className={cn(
                          "size-3.5",
                          activeResult.validation.keyCountMatches
                            ? "text-success"
                            : "text-destructive"
                        )}
                      />
                      {activeResult.validation.keyCount} KEYS
                    </span>
                  </>
                ) : (
                  <span>NO RESULT YET</span>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
