"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { SafetyTips } from "@/components/scan-flow/safety-tips"
import { ScannerView } from "@/components/scan-flow/scanner view"
import { VerifyingView } from "@/components/scan-flow/verifiying-view"
import { 
  VerifiedResult, 
  SuspiciousResult, 
  MaliciousResult, 
  UnsafeResult 
} from "@/components/scan-flow/result-views"
import { UploadView } from "@/components/scan-flow/upload-view"
import { Footer } from "@/components/footer"
import { type ScanResult, verifyUrl } from "@/lib/security"

type ScanStep = "safety-tips" | "scanner" | "upload" | "verifying" | "result"

export default function ScanPage() {
  const [step, setStep] = useState<ScanStep>("safety-tips")
  const [scannedUrl, setScannedUrl] = useState<string>("")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const router = useRouter()

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
      default:
        return <VerifiedResult result={scanResult} onClose={goToHome} />
    }
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar onScanClick={() => setStep("safety-tips")} />
      
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
            />
          )}
          {step === "upload" && (
            <UploadView 
                onUploaded={handleScanned} 
                onCancel={() => setStep("scanner")} 
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

      {/* <Footer /> */}
    </main>
  )
}
