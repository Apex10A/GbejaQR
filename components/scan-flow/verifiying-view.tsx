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
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
          <h2 className="mb-8 text-xl font-bold text-foreground font-sans">Authentication</h2>

          {/* Avatar */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#7B5EA7] text-white text-2xl font-bold font-sans">
            P
          </div>

          {/* Lock icon with animation */}
          <div className="mx-auto mb-6 relative flex h-16 w-16 items-center justify-center">
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-ring" />
            <div className="absolute inset-[-8px] rounded-full border border-primary/15 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card border border-border">
              <Lock className="h-7 w-7 text-muted-foreground" />
            </div>
          </div>

          {/* Status text */}
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-lg font-bold text-foreground font-sans">Verifying...</span>
          </div>
          <p className="mb-8 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Establishing a secure connection to validate your credentials.
          </p>

          {/* Progress bar */}
          <div className="mx-auto mb-8 h-1 w-48 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: "100%" }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onVerified}
              className="bg-primary text-white hover:bg-primary/90 font-sans w-full py-6"
            >
              Complete Verification
            </Button>
            {/* Cancel button */}
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-border text-foreground hover:bg-background/50 font-sans w-full py-6"
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
