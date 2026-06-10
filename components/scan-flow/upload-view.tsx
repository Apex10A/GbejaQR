"use client"

import { useCallback, useState, useRef } from "react"
import { Upload, Image as ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadViewProps {
  onUploaded: (url: string) => void
  onCancel: () => void
}

export function UploadView({ onUploaded, onCancel }: UploadViewProps) {
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return
      setFileName(file.name)
    },
    []
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      handleFile(e.dataTransfer.files?.[0])
    },
    [handleFile]
  )

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/20">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground font-sans">Upload QR Code</h2>
                <p className="text-xs text-muted-foreground">Upload an image of a QR code to verify its safety</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Drop zone */}
          <div className="px-6 pb-6">
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all cursor-pointer ${
                dragging
                  ? "border-primary bg-primary/10"
                  : fileName
                    ? "border-safe/40 bg-safe/5"
                    : "border-border hover:border-primary/40 hover:bg-primary/5"
              }`}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                className="sr-only"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              {fileName ? (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-safe/15 mb-4">
                    <ImageIcon className="h-7 w-7 text-safe" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-foreground font-sans">{fileName}</p>
                  <p className="mt-1 text-xs text-safe">QR code uploaded successfully</p>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      // For demo, if filename contains "phish" or "malicious", use that URL
                      let url = "https://google.com"
                      if (fileName.toLowerCase().includes("phish")) url = "https://phish-login.com"
                      if (fileName.toLowerCase().includes("bank")) url = "https://bank-secure.xyz"
                      onUploaded(url)
                    }}
                    className="mt-6 bg-primary text-white hover:bg-primary/90 font-sans w-full py-6"
                  >
                    Continue to Verification
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <Upload className="h-7 w-7 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground font-sans">
                    {dragging ? "Drop your image here" : "Click or drag to upload"}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    PNG, JPG, SVG, or WebP
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-primary/30 text-primary hover:bg-primary/10 font-sans text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      inputRef.current?.click()
                    }}
                  >
                    Browse Files
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
