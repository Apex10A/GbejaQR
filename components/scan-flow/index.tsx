"use client"

import { useState } from "react"
import { SafetyTips } from "./safety-tips"
import { ScannerView } from "./scanner view"
import { VerifyingView } from "./verifiying-view"
import { VerifiedResult, SuspiciousResult, MaliciousResult, UnsafeResult } from "./result-views"
import { verifyUrl, type ScanResult } from "@/lib/security"

export type ScanStep = "safety-tips" | "scanner" | "verifying" | "result"

interface ScanFlowProps {
  onClose: () => void
}

export function ScanFlow({ onClose }: ScanFlowProps) {
  const [step, setStep] = useState<ScanStep>("safety-tips")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  const handleScanned = async (url: string) => {
    console.log("handleScanned triggered with URL:", url);
    setStep("verifying")
    try {
      const result = await verifyUrl(url)
      console.log("verifyUrl completed with result:", result);
      setScanResult(result)
    } catch (error) {
      console.error("handleScanned error:", error);
    }
  }

  const handleNext = () => {
    if (step === "safety-tips") setStep("scanner")
    else if (step === "verifying") setStep("result")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full h-full overflow-y-auto py-10">
        {step === "safety-tips" && (
          <SafetyTips onContinue={handleNext} />
        )}
        {step === "scanner" && (
          <ScannerView onScanned={handleScanned} onCancel={onClose} />
        )}
        {step === "verifying" && (
          <VerifyingView onVerified={handleNext} onCancel={onClose} isReady={!!scanResult} />
        )}
        {step === "result" && scanResult && (
          <>
            {scanResult.status === "verified" && <VerifiedResult result={scanResult} onClose={onClose} />}
            {scanResult.status === "suspicious" && <SuspiciousResult result={scanResult} onClose={onClose} />}
            {scanResult.status === "malicious" && <MaliciousResult result={scanResult} onClose={onClose} />}
            {scanResult.status === "unsafe" && <UnsafeResult result={scanResult} onClose={onClose} />}
          </>
        )}
      </div>
    </div>
  )
}

