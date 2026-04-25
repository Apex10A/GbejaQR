"use client"

import { useState } from "react"
import { ShieldAlert, Shield, ArrowLeft } from "lucide-react"
import { BaseLayout } from "./BaseLayout"
import { ResultUrl } from "./ResultUrl"
import { ResultAction } from "./ResultAction"
import { LinkDetails } from "./LinkDetails"
import { type ScanResult } from "@/lib/security"
import { Button } from "@/components/ui/button"

interface UnsafeResultProps {
  onClose: () => void
  result: ScanResult
}

export function UnsafeResult({ onClose, result }: UnsafeResultProps) {
  const [showDetails, setShowDetails] = useState(false)
  if (!result) return null

  const handleProceed = () => {
    window.open(result.url, "_blank", "noopener,noreferrer")
    onClose()
  }

  return (
    <BaseLayout className="bg-white">
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
          Security Status
        </span>
      </div>

      <div className={showDetails ? "hidden" : "block"}>
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
      </div>

      {showDetails && <LinkDetails result={result} />}

      <ResultAction 
        primaryLabel="Back to Safety" 
        onPrimary={onClose} 
        secondaryLabel={showDetails ? "Hide Details" : "More Details"}
        onSecondary={() => setShowDetails(!showDetails)}
        primaryColor="bg-primary"
        icon={<Shield className="h-4 w-4" />}
      />
    </BaseLayout>
  )
}
