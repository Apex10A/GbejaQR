"use client"

import { Link2 } from "lucide-react"

interface ResultUrlProps {
  url: string
  label?: string
}

export function ResultUrl({ url, label = "Destination URL" }: ResultUrlProps) {
  return (
    <div className="px-6 pb-2">
      <div className="flex items-center gap-2.5 rounded-xl bg-zinc-50 border border-border px-4 py-3.5">
        <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="min-w-0 w-full">
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">{label}</p>
          <p className="text-sm text-foreground font-mono truncate">{url}</p>
        </div>
      </div>
    </div>
  )
}
