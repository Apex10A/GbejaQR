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
import { Footer } from "@/components/footer"
import { type ScanResult, type ScanHistoryItem, verifyUrl } from "@/lib/security"

type ScanStep = "safety-tips" | "scanner" | "upload" | "verifying" | "result" | "history"

function ScanPageContent() {
  const [step, setStep] = useState<ScanStep>("safety-tips")
  const [scannedUrl, setScannedUrl] = useState<string>("")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const stepParam = searchParams.get("step")
    if (stepParam === "history") {
      setStep("history")
    }
  }, [searchParams])

  const goToHome = () => router.push("/")

  const handleScanned = async (url: string) => {
    setScannedUrl(url)
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
          {step === "safety-tips" && (
            <SafetyTips onContinue={() => setStep("scanner")} />
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
