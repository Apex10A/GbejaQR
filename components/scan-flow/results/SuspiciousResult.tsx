"use client"

import { AlertTriangle, Shield } from "lucide-react"
import { BaseLayout } from "./BaseLayout"
import { ResultUrl } from "./ResultUrl"
import { ResultHeader } from "./ResultHeader"
import { ResultAction } from "./ResultAction"
import { type ScanResult } from "@/lib/security"

interface SuspiciousResultProps {
  onClose: () => void
  result: ScanResult
}

export function SuspiciousResult({ onClose, result }: SuspiciousResultProps) {
  return (
    <BaseLayout className="bg-white">
      <ResultHeader title="Security Status" onBack={onClose} />

      {/* Warning area */}
      <div className="px-6 pt-8 pb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warning/20 border-2 border-warning/40">
          <AlertTriangle className="h-7 w-7 text-warning" />
        </div>
        <h2 className="text-xl font-bold text-warning font-sans uppercase tracking-wide">
          Suspicious Link Detected!
        </h2>
      </div>

      {/* Description */}
      <div className="px-6 pb-5">
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {result.advice || "This URL leads to an untrusted source. Our system cannot confirm its safety. Please proceed with extreme caution."}
        </p>
      </div>

      <ResultUrl url={result.url} />

      <ResultAction 
        primaryLabel="Back to Safety" 
        onPrimary={onClose} 
        secondaryLabel="I understand the risk, let me through"
        onSecondary={onClose}
        primaryVariant="default"
        primaryColor="bg-primary"
        icon={<Shield className="h-4 w-4" />}
      />
    </BaseLayout>
  )
}
