"use client"

import { useState } from "react"
import { SafetyTips } from "./safety-tips"
import { ScannerView } from "./scanner view"
import { VerifyingView } from "./verifiying-view"
import { HistoryView } from "./history-view"
import { VerifiedResult, SuspiciousResult, MaliciousResult, UnsafeResult, ErrorResult } from "./result-views"
import { verifyUrl, type ScanResult, type ScanHistoryItem } from "@/lib/security"

export type ScanStep = "safety-tips" | "scanner" | "verifying" | "result" | "history"

interface ScanFlowProps {
  onClose: () => void
}

function getInitialScanStep(): ScanStep {
  if (typeof window === "undefined") return "safety-tips"

  const skipUntil = localStorage.getItem("skip_safety_tips_until")
  if (skipUntil && Date.now() < parseInt(skipUntil, 10)) {
    return "scanner"
  }

  return "safety-tips"
}

export function ScanFlow({ onClose }: ScanFlowProps) {
  const [step, setStep] = useState<ScanStep>(getInitialScanStep)
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

  const handleContinueFromTips = (skipFor7Days: boolean) => {
    if (skipFor7Days) {
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
      localStorage.setItem("skip_safety_tips_until", (Date.now() + sevenDaysInMs).toString())
    }
    setStep("scanner")
  }

  const handleNext = () => {
    if (step === "verifying") setStep("result")
  }

  const handleHistoryItemClick = (item: ScanHistoryItem) => {
    setScanResult(item)
    setStep("result")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full h-full overflow-y-auto py-10">
        {step === "safety-tips" && (
          <SafetyTips onContinue={handleContinueFromTips} />
        )}
        {step === "scanner" && (
          <ScannerView 
            onScanned={handleScanned} 
            onCancel={onClose} 
            onHistoryClick={() => setStep("history")}
          />
        )}
        {step === "history" && (
          <HistoryView 
            onItemClick={handleHistoryItemClick}
            onBack={() => setStep("scanner")} 
          />
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
            {scanResult.status === "error" && <ErrorResult result={scanResult} onClose={() => setStep("scanner")} />}
          </>
        )}
      </div>
    </div>
  )
}
