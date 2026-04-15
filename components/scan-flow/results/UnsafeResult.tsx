"use client"

import { ShieldAlert, Shield } from "lucide-react"
import { BaseLayout } from "./BaseLayout"
import { ResultUrl } from "./ResultUrl"
import { ResultHeader } from "./ResultHeader"
import { ResultAction } from "./ResultAction"
import { type ScanResult } from "@/lib/security"

interface UnsafeResultProps {
  onClose: () => void
  result: ScanResult
}

export function UnsafeResult({ onClose, result }: UnsafeResultProps) {
  return (
    <BaseLayout className="bg-white">
      <ResultHeader title="Security Status" onBack={onClose} />

      {/* Danger area */}
      <div className="px-6 pt-8 pb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20 border-2 border-destructive/40">
          <ShieldAlert className="h-7 w-7 text-destructive" />
        </div>
        <h2 className="text-xl font-bold text-destructive font-sans uppercase tracking-wide">
          Unsafe Link Detected!
        </h2>
      </div>

      <ResultUrl url={result.url} />

      {/* Description */}
      <div className="px-6 pb-5">
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {result.advice || "This URL has been flagged as a potential phishing threat or contains malicious software designed to steal your information."}
        </p>
      </div>

      <ResultAction 
        primaryLabel="Back to Safety" 
        onPrimary={onClose} 
        secondaryLabel="I understand the risk, let me through"
        onSecondary={onClose}
        primaryColor="bg-primary"
        icon={<Shield className="h-4 w-4" />}
      />
    </BaseLayout>
  )
}
