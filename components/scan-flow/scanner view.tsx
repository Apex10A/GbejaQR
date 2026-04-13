"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, Camera, Image, History, AlertCircle } from "lucide-react"

interface ScannerViewProps {
  onScanned: (url: string) => void
  onCancel: () => void
}

export function ScannerView({ onScanned, onCancel, onUploadClick }: ScannerViewProps & { onUploadClick?: () => void }) {
  const [scanning, setScanning] = useState(false)
  const [demoUrl, setDemoUrl] = useState("https://google.com")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasCamera, setHasCamera] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setHasCamera(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setCameraError("Unable to access camera. Please ensure permissions are granted.")
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col bg-zinc-50">
      {/* Header bar removed as it's now a page */}
      
      {/* Title area */}
      <div className="px-5 pb-2 text-center pt-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground font-sans">Scan QR Code</h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Align the QR code within the frame to scan. For this demo, you can also enter a URL below to test the security engine.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 px-5 py-6">
        <button 
          onClick={onUploadClick}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 sm:px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-primary/10 hover:border-primary/30 active:scale-95"
        >
          <Image className="h-4 w-4 text-primary" />
          Upload
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 sm:px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-zinc-50 active:scale-95">
          <History className="h-4 w-4 text-primary" />
          History
        </button>
      </div>

      {/* Viewfinder area */}
      <div className="flex flex-1 items-center justify-center px-8 py-6">
        <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl bg-black shadow-xl">
          {/* Camera Feed */}
          {hasCamera ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="h-full w-full object-cover opacity-80"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900 px-6 text-center">
              {cameraError ? (
                <>
                  <AlertCircle className="mb-3 h-10 w-10 text-destructive" />
                  <p className="text-xs text-zinc-400">{cameraError}</p>
                </>
              ) : (
                <>
                  <Camera className="mb-3 h-10 w-10 text-zinc-700 animate-pulse" />
                  <p className="text-xs text-zinc-500">Initializing camera...</p>
                </>
              )}
            </div>
          )}

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 h-14 w-14 border-t-[3px] border-l-[3px] border-primary rounded-tl-2xl z-10" />
          <div className="absolute top-0 right-0 h-14 w-14 border-t-[3px] border-r-[3px] border-primary rounded-tr-2xl z-10" />
          <div className="absolute bottom-0 left-0 h-14 w-14 border-b-[3px] border-l-[3px] border-primary rounded-bl-2xl z-10" />
          <div className="absolute bottom-0 right-0 h-14 w-14 border-b-[3px] border-r-[3px] border-primary rounded-br-2xl z-10" />

          {/* Inner scan area */}
          <div 
            className="absolute inset-6 rounded-lg bg-primary/5 cursor-pointer flex items-center justify-center group z-10"
            onClick={() => setScanning(!scanning)}
          >
            {!scanning && <span className="text-xs text-white bg-black/50 px-3 py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to simulate scan</span>}
          </div>

          {/* Scanning line */}
          {scanning && (
            <div className="absolute left-6 right-6 h-0.5 bg-primary shadow-[0_0_16px_rgba(3,114,231,0.8)] animate-scan-line z-20" />
          )}
        </div>
      </div>

      {/* Demo URL Input */}
      <div className="px-5 py-4 max-w-sm mx-auto w-full">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
          Enter URL to Test (Security Engine)
        </label>
        <div className="relative">
          <input 
            type="text"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
             <button 
              onClick={() => setDemoUrl("https://phish-login.com")}
              className="text-[9px] bg-destructive/10 text-destructive px-2 py-1 rounded hover:bg-destructive/20"
             >
              Phish
             </button>
             <button 
              onClick={() => setDemoUrl("https://bank-secure.xyz")}
              className="text-[9px] bg-warning/10 text-warning px-2 py-1 rounded hover:bg-warning/20"
             >
              Susp
             </button>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="px-5 pb-12 mt-auto text-center">
        <button
          onClick={() => onScanned(demoUrl)}
          disabled={!scanning && !demoUrl}
          className={`w-full max-w-sm px-10 py-5 rounded-xl font-bold transition-all text-base ${scanning || demoUrl ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25 active:scale-95' : 'bg-zinc-200 text-muted-foreground cursor-not-allowed'}`}
        >
          Confirm Scan
        </button>
      </div>
    </div>
  )
}

