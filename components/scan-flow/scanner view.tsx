"use client"

import { useEffect, useState } from "react"
import { Shield, Camera, Image, History } from "lucide-react"

interface ScannerViewProps {
  onScanned: () => void
  onCancel: () => void
}

export function ScannerView({ onScanned, onCancel, onUploadClick }: ScannerViewProps & { onUploadClick?: () => void }) {
  const [scanning, setScanning] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col bg-background">
      {/* Header bar removed as it's now a page */}
      
      {/* Title area */}
      <div className="px-5 pb-2 text-center pt-8">
        <h2 className="text-2xl font-bold text-foreground font-sans">Scan QR Code</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          Align the QR code within the frame to scan. If you're on desktop, you can upload an image instead.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 px-5 py-6">
        <button 
          onClick={onUploadClick}
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-primary/10 hover:border-primary/30"
        >
          <Image className="h-4 w-4 text-primary" />
          Upload Image
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-card/80">
          <History className="h-4 w-4 text-primary" />
          History
        </button>
      </div>

      {/* Viewfinder area */}
      <div className="flex flex-1 items-center justify-center px-8 py-6">
        <div className="relative aspect-square w-full max-w-[320px]">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 h-14 w-14 border-t-[3px] border-l-[3px] border-primary rounded-tl-2xl" />
          <div className="absolute top-0 right-0 h-14 w-14 border-t-[3px] border-r-[3px] border-primary rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 h-14 w-14 border-b-[3px] border-l-[3px] border-primary rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 h-14 w-14 border-b-[3px] border-r-[3px] border-primary rounded-br-2xl" />

          {/* Inner scan area */}
          <div 
            className="absolute inset-6 rounded-lg bg-primary/5 cursor-pointer flex items-center justify-center group"
            onClick={() => setScanning(!scanning)}
          >
            {!scanning && <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">Click to simulate scan</span>}
          </div>

          {/* Scanning line */}
          {scanning && (
            <div className="absolute left-6 right-6 h-0.5 bg-primary shadow-[0_0_16px_rgba(3,114,231,0.8)] animate-scan-line" />
          )}

          {/* Center camera icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Camera className="h-8 w-8 text-primary/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="px-5 pb-12 text-center">
        <button
          onClick={onScanned}
          disabled={!scanning}
          className={`px-10 py-4 rounded-xl font-bold transition-all ${scanning ? 'bg-primary text-white hover:bg-primary/90' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
        >
          Confirm Scan
        </button>
      </div>
    </div>
  )
}
