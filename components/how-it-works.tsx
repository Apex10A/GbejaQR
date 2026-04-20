"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, Search, ShieldCheck, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Camera,
    title: "Scan",
    description:
      "Point your camera at any QR code or upload an image. GbejaQR captures the encoded data instantly.",
    detail: "Tap to start",
  },
  {
    icon: Search,
    title: "Analyze",
    description:
      "Our security engine checks the URL against known threats, suspicious patterns, and redirect chains in real time.",
    detail: "Verifying...",
  },
  {
    icon: ShieldCheck,
    title: "Get Result",
    description:
      "Receive a clear security verdict: safe, suspicious, or malicious -- with a plain-language explanation.",
    detail: "Link Verified",
  },
]

export function HowItWorks() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={ref} className="relative py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-primary font-mono">
            How It Works
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl font-sans text-balance">
            Three steps to a safer scan
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            No sign-up required. No data stored. Just point, scan, and get a clear answer.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/40 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-primary/20 group-hover:bg-primary/50 transition-colors" />

              <div className="p-8">
                {/* Step number badge */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary font-mono">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-foreground font-sans">{step.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{step.description}</p>

                {/* Mini status indicator matching the app screens */}
                <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 border border-border">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground font-mono">{step.detail}</span>
                </div>
              </div>

              {/* Connecting arrow (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:block z-10">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
