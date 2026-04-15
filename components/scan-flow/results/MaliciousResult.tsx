"use client"

import { ShieldX, ShieldAlert } from "lucide-react"
import { BaseLayout } from "./BaseLayout"
import { ResultUrl } from "./ResultUrl"
import { ResultHeader } from "./ResultHeader"
import { ResultAction } from "./ResultAction"
import { type ScanResult } from "@/lib/security"

interface MaliciousResultProps {
  onClose: () => void
  result: ScanResult
}

export function MaliciousResult({ onClose, result }: MaliciousResultProps) {
  return (
    <BaseLayout className="bg-white">
      <ResultHeader title="Security Status" onBack={onClose} />

      {/* Danger area */}
      <div className="px-6 pt-8 pb-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/20 border-2 border-destructive/40">
          <ShieldX className="h-7 w-7 text-destructive" />
        </div>
        <h2 className="text-xl font-bold text-destructive font-sans uppercase tracking-wide">
          Malicious Link Detected!
        </h2>
      </div>

      {/* Description */}
      <div className="px-6 pb-5">
        <p className="text-sm text-muted-foreground leading-relaxed text-center">
          {result.advice || "Our security engine has identified this URL as a confirmed threat. Accessing this site may result in identity theft, phishing, or malware installation."}
        </p>
      </div>

      {/* Security Report */}
      <div className="mx-6 mb-4 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
        <h3 className="text-xs font-bold text-foreground font-sans uppercase tracking-wider mb-3">
          Security Report
        </h3>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Threat Level</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full ${i <= (result.threatLevel || 0) ? 'bg-destructive' : 'bg-zinc-200'}`}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Threat Type</p>
            <p className="text-sm font-semibold text-foreground font-sans">
              {result.threatType}
            </p>
          </div>
        </div>
      </div>

      <ResultUrl url={result.url} />

      <ResultAction 
        primaryLabel="Back to Safety" 
        onPrimary={onClose} 
        primaryColor="bg-destructive"
        icon={<ShieldAlert className="h-4 w-4" />}
      />
    </BaseLayout>
  )
}
