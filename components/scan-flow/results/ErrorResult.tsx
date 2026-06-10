"use client"

import { AlertTriangle, ArrowLeft } from "lucide-react"
import { BaseLayout } from "./BaseLayout"
import { ResultUrl } from "./ResultUrl"
import { ResultAction } from "./ResultAction"
import { type ScanResult } from "@/lib/security"
import { Button } from "@/components/ui/button"

interface ErrorResultProps {
  onClose: () => void
  result: ScanResult
}

export function ErrorResult({ onClose, result }: ErrorResultProps) {
  if (!result) return null

  return (
    <BaseLayout>
      {/* Top Navigation */}
      <div className="flex items-center px-4 py-3 border-b border-border/50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="ml-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest font-sans">
          Scan Error
        </span>
      </div>

      <div className="bg-destructive/5 px-6 py-10 text-center">
        <h2 className="text-2xl font-bold text-foreground font-sans tracking-tight">Scan Error</h2>
        <p className="mt-1.5 text-[10px] font-bold text-destructive uppercase tracking-[0.2em]">
          Request Failed
        </p>
      </div>

      <div className="px-6 py-8">
        <div className="flex items-start gap-3 rounded-xl bg-destructive/5 border border-destructive/10 px-4 py-4">
          <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
          <div>
            <p className="text-xs font-bold text-foreground font-sans uppercase tracking-wider">Error Details</p>
            <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
              {result.advice || "An unexpected error occurred while analyzing the URL. Please try again."}
            </p>
          </div>
        </div>
      </div>

      <ResultUrl url={result.url} label="Attempted URL" />

      <ResultAction 
        primaryLabel="Try Again" 
        onPrimary={onClose} 
        primaryColor="bg-primary"
      />
    </BaseLayout>
  )
}
