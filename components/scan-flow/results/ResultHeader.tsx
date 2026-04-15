"use client"

import { ArrowLeft } from "lucide-react"

interface ResultHeaderProps {
  title: string
  onBack: () => void
}

export function ResultHeader({ title, onBack }: ResultHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
      <button onClick={onBack} className="text-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-5 w-5" />
      </button>
      <span className="text-sm font-bold text-foreground font-sans uppercase tracking-wider">
        {title}
      </span>
    </div>
  )
}
