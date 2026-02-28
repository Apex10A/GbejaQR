"use client"

import { useEffect, useRef, useState } from "react"
import {
  Camera,
  FileImage,
  ShieldAlert,
  Link2,
  RotateCcw,
  FileText,
  EyeOff,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Camera Scan",
    description: "Point your phone camera at any QR code for instant analysis. Works right in your browser.",
  },
  {
    icon: FileImage,
    title: "Gallery Upload",
    description: "Upload screenshots or images containing QR codes. Perfect for codes shared in messages and chats.",
  },
  {
    icon: ShieldAlert,
    title: "Threat Detection",
    description: "AI-powered engine checks against databases of known phishing sites, scam domains, and malware hosts.",
  },
  {
    icon: Link2,
    title: "Link Safety Check",
    description: "Every destination URL is validated for SSL, domain age, registration details, and reputation score.",
  },
  {
    icon: RotateCcw,
    title: "Redirect Analysis",
    description: "We follow and expose hidden redirect chains that attackers use to mask malicious destinations.",
  },
  {
    icon: FileText,
    title: "Clear Explanations",
    description: "No technical jargon. Every result comes with a plain-language explanation of what we found and why.",
  },
  {
    icon: EyeOff,
    title: "Privacy First",
    description: "No sign-up required. No data stored. No tracking. Your scans are yours and yours alone.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Results in under 200ms. Our distributed analysis engine delivers verdicts before you blink.",
  },
]

export function Features() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" ref={ref} className="relative py-24 lg:py-32">
      {/* Subtle background accent */}
      <div className="absolute left-0 top-1/3 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-primary font-mono">
            Features
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl font-sans text-balance">
            Everything you need for safe scanning
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Built for the mobile-first user. Designed for the African market. Engineered for speed and trust.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-0.5 w-full bg-primary/0 group-hover:bg-primary/40 transition-colors" />
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground font-sans">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
