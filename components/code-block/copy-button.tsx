"use client"

import { useEffect, useState, type ComponentProps } from "react"

import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { copyToClipboard } from "@/utils/copy"

interface CopyButtonProps extends ComponentProps<"button"> {
  content: string
  iconSize?: number
}

const CopyButton = ({
  content,
  iconSize = 14,
  className,
  ...props
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    if (!isCopied) return

    const timeout = setTimeout(() => {
      setIsCopied(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [isCopied])

  const handleCopy = async () => {
    await copyToClipboard(content)
    setIsCopied(true)
  }

  return (
    <button
      title="Copy to clipboard"
      className={cn(
        "cursor-pointer rounded-md p-1 text-code-foreground/55 transition-colors hover:bg-code-foreground/10 hover:text-code-foreground",
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      {isCopied ? (
        <CheckIcon
          size={iconSize}
          className="animate-in text-success duration-200 zoom-in-50"
        />
      ) : (
        <CopyIcon
          size={iconSize}
          className="animate-in duration-200 zoom-in-50"
        />
      )}
    </button>
  )
}

export { CopyButton }
