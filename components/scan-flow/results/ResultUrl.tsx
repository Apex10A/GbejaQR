"use client"

import { useState } from "react"
import { Link2, Copy, Check } from "lucide-react"

interface ResultUrlProps {
  url: string
  label?: string
}

export function ResultUrl({ url, label = "Destination URL" }: ResultUrlProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="px-6 pb-2">
      <div className="flex items-center gap-2.5 rounded-xl bg-zinc-50 border border-border px-4 py-3.5 group relative">
        <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">{label}</p>
          <p className="text-sm text-foreground font-mono truncate">{url}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-border shadow-sm hover:bg-zinc-50 transition-colors active:scale-95"
          title="Copy URL"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-safe" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  )
}
