"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { SafetyTips } from "@/components/scan-flow/safety-tips"
import { ScannerView } from "@/components/scan-flow/scanner view"
import { VerifyingView } from "@/components/scan-flow/verifiying-view"
import { 
  VerifiedResult, 
  SuspiciousResult, 
  MaliciousResult, 
  UnsafeResult,
  ErrorResult 
} from "@/components/scan-flow/result-views"
import { UploadView } from "@/components/scan-flow/upload-view"
import { HistoryView } from "@/components/scan-flow/history-view"
import { type ScanResult, type ScanHistoryItem, verifyUrl } from "@/lib/security"

type ScanStep = "safety-tips" | "scanner" | "upload" | "verifying" | "result" | "history"

function resolveInitialStep(stepParam: string | null): ScanStep {
  if (stepParam === "history") return "history"

  const skipUntil = localStorage.getItem("skip_safety_tips_until")
  if (skipUntil && Date.now() < parseInt(skipUntil, 10)) {
    return "scanner"
  }

  return "safety-tips"
}

function ScanPageContent() {
  const [step, setStep] = useState<ScanStep>("safety-tips")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setStep(resolveInitialStep(searchParams.get("step")))
      setIsInitialized(true)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [searchParams])

  const goToHome = () => router.push("/")

  const handleContinueFromTips = (skipFor7Days: boolean) => {
    if (skipFor7Days) {
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
      localStorage.setItem("skip_safety_tips_until", (Date.now() + sevenDaysInMs).toString())
    }
    setStep("scanner")
  }

  const handleScanned = async (url: string) => {
    setStep("verifying")
    try {
      const result = await verifyUrl(url)
      setScanResult(result)
    } catch (error) {
      console.error("Verification failed:", error)
    }
  }

  const handleVerified = () => {
    setStep("result")
  }

  const handleHistoryItemClick = (item: ScanHistoryItem) => {
    setScanResult(item)
    setStep("result")
  }

  const renderResult = () => {
    if (!scanResult) return null

    switch (scanResult.status) {
      case "verified":
        return <VerifiedResult result={scanResult} onClose={goToHome} />
      case "suspicious":
        return <SuspiciousResult result={scanResult} onClose={goToHome} />
      case "malicious":
        return <MaliciousResult result={scanResult} onClose={goToHome} />
      case "unsafe":
        return <UnsafeResult result={scanResult} onClose={goToHome} />
      case "error":
        return <ErrorResult result={scanResult} onClose={() => setStep("scanner")} />
      default:
        return <VerifiedResult result={scanResult} onClose={goToHome} />
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar 
        onScanClick={() => setStep("safety-tips")} 
        onHistoryClick={() => setStep("history")}
      />
      
      <div className="flex-1 pt-20">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {!isInitialized ? (
            <div className="min-h-screen flex items-center justify-center">Loading...</div>
          ) : (
            <>
              {step === "safety-tips" && (
                <SafetyTips onContinue={handleContinueFromTips} />
              )}
              {step === "scanner" && (
                <ScannerView 
                    onScanned={handleScanned} 
                    onCancel={goToHome} 
                    onUploadClick={() => setStep("upload")}
                    onHistoryClick={() => setStep("history")}
                />
              )}
              {step === "upload" && (
                <UploadView 
                    onUploaded={handleScanned} 
                    onCancel={() => setStep("scanner")} 
                />
              )}
              {step === "history" && (
                <HistoryView 
                    onItemClick={handleHistoryItemClick}
                    onBack={() => setStep("scanner")} 
                />
              )}
              {step === "verifying" && (
                <VerifyingView 
                    onVerified={handleVerified} 
                    onCancel={() => setStep("scanner")} 
                    isReady={!!scanResult}
                />
              )}
              {step === "result" && renderResult()}
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default function ScanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ScanPageContent />
    </Suspense>
  )
}
