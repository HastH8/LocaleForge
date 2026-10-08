import type { ComponentProps } from "react"

import { FileIcon } from "@react-symbols/icons/utils"
import { TypeScript } from "@react-symbols/icons/files"

import { cn } from "@/lib/utils"

const CodeBlock = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "not-prose",
        "flex w-full flex-col overflow-clip rounded-xl border bg-code text-code-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type CodeBlockHeaderProps = ComponentProps<"div">

const CodeBlockHeader = ({
  children,
  className,
  ...props
}: CodeBlockHeaderProps) => {
  return (
    <div
      className={cn(
        "not-prose flex h-10 items-center justify-between border-b border-code-foreground/10 px-3",
        "font-sans text-xs font-medium text-code-foreground/65",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CodeBlockIconProps extends ComponentProps<"div"> {
  language?: string
}

const CodeBlockIcon = ({ language, className }: CodeBlockIconProps) => {
  return (
    <FileIcon
      width={16}
      height={16}
      fileName={`.${language ?? ""}`}
      autoAssign={true}
      className={cn(className)}
      // For Prismjs, uses "typescript" as the language
      editFileExtensionData={{
        typescript: TypeScript,
      }}
    />
  )
}

type CodeBlockGroupProps = ComponentProps<"div">

const CodeBlockGroup = ({
  children,
  className,
  ...props
}: CodeBlockGroupProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs font-medium text-code-foreground/65",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CodeBlockContent = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "max-h-96 overflow-auto bg-code font-mono text-xs leading-6 whitespace-pre",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockIcon,
  CodeBlockGroup,
  CodeBlockContent,
}
