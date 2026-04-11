"use client"

import { useEffect } from "react"
import { Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VerifyingViewProps {
  onVerified: () => void
  onCancel: () => void
}

export function VerifyingView({ onVerified, onCancel }: VerifyingViewProps) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8 bg-zinc-50">
      <div className="w-full max-w-md text-center">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-10">
          <h2 className="mb-8 text-xl font-bold text-foreground font-sans">Authentication</h2>

          {/* Lock icon with animation */}
          <div className="mx-auto mb-6 relative flex h-16 w-16 items-center justify-center">
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring" />
            <div className="absolute inset-[-8px] rounded-full border border-primary/15 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-border">
              <Lock className="h-7 w-7 text-muted-foreground" />
            </div>
          </div>

          {/* Status text */}
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-base sm:text-lg font-bold text-foreground font-sans text-nowrap">Verifying...</span>
          </div>
          <p className="mb-8 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Establishing a secure connection to validate your credentials.
          </p>

          {/* Progress bar */}
          <div className="mx-auto mb-10 h-1.5 w-40 sm:w-48 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onVerified}
              className="bg-primary text-white hover:bg-primary/90 font-sans w-full py-7 text-base shadow-lg shadow-primary/20 active:scale-[0.98]"
            >
              Complete Verification
            </Button>
            {/* Cancel button */}
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-border text-foreground hover:bg-zinc-50 font-sans w-full py-7 text-base active:scale-[0.98]"
            >
              <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
              Cancel Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
