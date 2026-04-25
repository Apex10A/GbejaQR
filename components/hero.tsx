"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, ShieldCheck, Camera, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] md:w-[320px]">
      <div className="relative rounded-[2.5rem] border-2 border-primary/20 bg-card p-3 animate-glow-blue">
        <div className="relative overflow-hidden rounded-[2rem] bg-background">
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <Image src="/Gbejadark.png" alt="GbejaQR Logo" width={55} height={55} />
          </div>
          <div className="flex flex-col items-center px-6 pt-6 pb-8">
            <h3 className="text-lg font-bold text-foreground font-sans mb-1">Scan QR Code</h3>
            <p className="text-[11px] text-muted-foreground text-center mb-6 leading-relaxed">
              Align the QR code within the frame to scan. Ensure you have good lighting.
            </p>
            <div className="relative w-48 h-48 mb-6">
              <div className="absolute top-0 left-0 h-10 w-10 border-t-3 border-l-3 border-primary rounded-tl-xl" />
              <div className="absolute top-0 right-0 h-10 w-10 border-t-3 border-r-3 border-primary rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 h-10 w-10 border-b-3 border-l-3 border-primary rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 h-10 w-10 border-b-3 border-r-3 border-primary rounded-br-xl" />
              <div className="absolute inset-4 rounded-lg bg-primary/5" />
              <div className="absolute left-4 right-4 h-0.5 bg-primary shadow-[0_0_12px_rgba(76,173,216,0.8)] animate-scan-line" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Camera className="h-6 w-6 text-primary/60" />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground text-center">
              Point your camera at the QR code to begin automatically
            </p>
            <div className="flex items-center gap-3 mt-5 w-full">
              <div className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-card py-2.5 text-[11px] font-medium text-foreground border border-border">
                <Camera className="h-3.5 w-3.5 text-primary" />
                Gallery
              </div>
              <div className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-card py-2.5 text-[11px] font-medium text-foreground border border-border">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                History
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -left-4 top-0 rounded-lg bg-safe/15 border border-safe/25 px-3 py-2 ">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-safe" />
          <span className="text-xs font-medium text-safe">Link Verified</span>
        </div>
      </div>
      <div className="absolute -right-4 bottom-0 rounded-lg bg-destructive/15 border border-destructive/25 px-3 py-2 " style={{ animationDelay: "1.5s" }}>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-destructive" />
          <span className="text-xs font-medium text-destructive">Threat Blocked</span>
        </div>
      </div>
    </div>
  )
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const duration = 2000
          const step = target / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-2xl lg:text-3xl font-bold text-primary font-sans">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function Hero({ onScanClick }: { onScanClick?: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-20">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary font-mono uppercase tracking-wider">
                Security-First QR Scanning
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl font-sans text-balance">
              Stay Safe Online.{" "}
              <span className="text-primary">Scan with Confidence.</span>
            </h1>

            <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground mx-auto lg:mx-0 lg:text-lg sm:text-base">
              GbejaQR is the trusted security layer between you and every QR code. We detect phishing, scams, malware, and fraudulent links before they can harm you.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              {onScanClick ? (
                <Button
                  size="lg"
                  onClick={onScanClick}
                  className="bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold text-base px-8 py-6 animate-glow-blue cursor-pointer"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Scanning
                </Button>
              ) : (
                <Link href="/scan">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold text-base px-8 py-6 animate-glow-blue cursor-pointer"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Start Scanning
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <PhoneMockup />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 sm:gap-6 rounded-2xl border border-border bg-card/50 p-6 sm:p-8 lg:grid-cols-4 lg:gap-8">
          <div className="text-center">
            <AnimatedCounter target={0} suffix="+" />
            <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">Scans Protected</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={0} suffix="+" />
            <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">Threats Blocked</p>
          </div>
          <div className="text-center">
            <AnimatedCounter target={0} />
            <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">African Countries</p>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary font-sans">
              {"<"}200ms
            </div>
            <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">Avg. Scan Time</p>
          </div>
        </div>
      </div>
    </section>
  )
}
