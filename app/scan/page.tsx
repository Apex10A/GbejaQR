"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { SafetyTips } from "@/components/scan-flow/safety-tips"
import { ScannerView } from "@/components/scan-flow/scanner view"
import { VerifyingView } from "@/components/scan-flow/verifiying-view"
import { VerifiedResult } from "@/components/scan-flow/result-views"
import { UploadView } from "@/components/scan-flow/upload-view"
import { Footer } from "@/components/footer"

type ScanStep = "safety-tips" | "scanner" | "upload" | "verifying" | "result"

export default function ScanPage() {
  const [step, setStep] = useState<ScanStep>("safety-tips")
  const router = useRouter()

  const goToHome = () => router.push("/")

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
                onScanned={() => setStep("verifying")} 
                onCancel={goToHome} 
                onUploadClick={() => setStep("upload")}
            />
          )}
          {step === "upload" && (
            <UploadView 
                onUploaded={() => setStep("verifying")} 
                onCancel={() => setStep("scanner")} 
            />
          )}
          {step === "verifying" && (
            <VerifyingView 
                onVerified={() => setStep("result")} 
                onCancel={() => setStep("scanner")} 
            />
          )}
          {step === "result" && (
            <VerifiedResult onClose={goToHome} />
          )}
        </div>
      </div>

      {/* <Footer /> */}
    </main>
  )
}
