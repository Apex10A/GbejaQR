"use client"

import { ShieldX, AlertTriangle } from "lucide-react"
import { BaseLayout } from "./BaseLayout"
import { ResultUrl } from "./ResultUrl"
import { ResultAction } from "./ResultAction"
import { type ScanResult } from "@/lib/security"

interface ErrorResultProps {
  onClose: () => void
  result: ScanResult
}

export function ErrorResult({ onClose, result }: ErrorResultProps) {
  return (
    <BaseLayout>
      <div className="bg-destructive/5 px-6 py-10 text-center">
        {/* <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 border-2 border-destructive/20">
          <ShieldX className="h-8 w-8 text-destructive" />
        </div> */}
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
        secondaryLabel="Go Back"
        onSecondary={onClose}
        primaryColor="bg-primary"
      />
    </BaseLayout>
  )
}
