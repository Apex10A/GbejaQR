"use client"

import { useState } from "react"
import { SafetyTips } from "./safety-tips"
import { ScannerView } from "./scanner view"
import { VerifyingView } from "./verifiying-view"
import { VerifiedResult } from "./result-views"

export type ScanStep = "safety-tips" | "scanner" | "verifying" | "result"

interface ScanFlowProps {
  onClose: () => void
}

export function ScanFlow({ onClose }: ScanFlowProps) {
  const [step, setStep] = useState<ScanStep>("safety-tips")

  const handleNext = () => {
    if (step === "safety-tips") setStep("scanner")
    else if (step === "scanner") setStep("verifying")
    else if (step === "verifying") setStep("result")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full h-full overflow-y-auto py-10">
        {step === "safety-tips" && (
          <SafetyTips onContinue={handleNext} />
        )}
        {step === "scanner" && (
          <ScannerView onScanned={handleNext} onCancel={onClose} />
        )}
        {step === "verifying" && (
          <VerifyingView onVerified={handleNext} onCancel={onClose} />
        )}
        {step === "result" && (
          <VerifiedResult onClose={onClose} />
        )}
      </div>
    </div>
  )
}
