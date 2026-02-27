"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, MapPin, Users, Lock, Globe, ShieldCheck } from "lucide-react"

const stats = [
  {
    value: "99.7%",
    label: "Detection Accuracy",
    description: "Near-perfect precision that learns from new attack patterns daily.",
  },
  {
    value: "34+",
    label: "African Countries",
    description: "Purpose-built for the African mobile ecosystem with regional intelligence.",
  },
  {
    value: "Zero",
    label: "Data Stored",
    description: "We never store your scan data. No logs, no profiles, no compromises.",
  },
  {
    value: "24/7",
    label: "Threat Monitoring",
    description: "Real-time database updates to keep pace with emerging scam campaigns.",
  },
]

const testimonials = [
  {
    quote: "Cybergbeja caught a fake mPesa payment QR that would have cost my business over 50,000 KES. It took less than a second.",
    name: "Amara O.",
    location: "Nairobi, Kenya",
    role: "Small Business Owner",
  },
  {
    quote: "I use QR codes daily for mobile money. Cybergbeja gives me the confidence to scan without worrying about scams.",
    name: "Chidi E.",
    location: "Lagos, Nigeria",
    role: "Logistics Manager",
  },
  {
    quote: "We integrated Cybergbeja into our fintech app and saw a 40% reduction in user-reported phishing incidents.",
    name: "Fatima M.",
    location: "Accra, Ghana",
    role: "CTO, PayWave",
  },
]

function AfricaMap() {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center lg:h-80 lg:w-80">
      <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
        {/* Africa continent outline */}
        <path
          d="M100,15 C90,15 78,22 72,32 C66,42 62,55 58,68 C54,78 48,88 45,100 C42,112 40,125 42,138 C44,150 48,162 55,172 C62,182 72,190 82,195 C90,198 98,200 105,197 C112,194 118,188 122,178 C126,168 130,155 134,142 C138,130 142,118 144,106 C146,94 148,82 145,70 C142,58 136,47 128,38 C120,29 112,22 105,18 C102,16 101,15 100,15 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/25"
        />
        {/* Fill */}
        <path
          d="M100,15 C90,15 78,22 72,32 C66,42 62,55 58,68 C54,78 48,88 45,100 C42,112 40,125 42,138 C44,150 48,162 55,172 C62,182 72,190 82,195 C90,198 98,200 105,197 C112,194 118,188 122,178 C126,168 130,155 134,142 C138,130 142,118 144,106 C146,94 148,82 145,70 C142,58 136,47 128,38 C120,29 112,22 105,18 C102,16 101,15 100,15 Z"
          fill="currentColor"
          className="text-primary/5"
        />
        {/* City dots */}
        {[
          { cx: 82, cy: 50, label: "Accra" },
          { cx: 90, cy: 58, label: "Lagos" },
          { cx: 115, cy: 75, label: "Nairobi" },
          { cx: 88, cy: 95, label: "Kinshasa" },
          { cx: 105, cy: 140, label: "Johannesburg" },
          { cx: 95, cy: 30, label: "Cairo" },
          { cx: 110, cy: 110, label: "Dar es Salaam" },
        ].map((dot) => (
          <g key={dot.label}>
            <circle cx={dot.cx} cy={dot.cy} r="8" className="fill-primary/8" />
            <circle cx={dot.cx} cy={dot.cy} r="4" className="fill-primary/20" />
            <circle cx={dot.cx} cy={dot.cy} r="2" className="fill-primary animate-pulse" />
          </g>
        ))}
        {/* Connection lines between cities */}
        <line x1="82" y1="50" x2="90" y2="58" stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
        <line x1="90" y1="58" x2="115" y2="75" stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
        <line x1="115" y1="75" x2="110" y2="110" stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
        <line x1="88" y1="95" x2="105" y2="140" stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
      </svg>
      <div className="absolute inset-0 rounded-full bg-primary/3 blur-[60px]" />
    </div>
  )
}

export function Trust() {
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
    <section id="trust" ref={ref} className="relative py-24 lg:py-32">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-primary font-mono">
            Why Cybergbeja
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl font-sans text-balance">
            Built in Africa, for Africa
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            QR code fraud is rising across the continent. Cybergbeja is the security layer Africa{"'"}s mobile-first economy deserves.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-20 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-2 text-3xl font-bold text-primary font-sans">{stat.value}</div>
              <div className="mb-2 text-sm font-semibold text-foreground font-sans">{stat.label}</div>
              <p className="text-xs leading-relaxed text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Regional intelligence + Africa map */}
        <div className="mb-20 flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-sans">Regional Intelligence</h3>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Our threat database includes region-specific scam patterns from across Africa, including fake mobile money links, counterfeit payment portals, and social engineering QR campaigns unique to the continent.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: "Local threat data" },
                  { icon: Users, text: "Community reports" },
                  { icon: Lock, text: "Privacy by default" },
                  { icon: MapPin, text: "Africa-focused" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5 rounded-lg bg-background border border-border px-3 py-2.5">
                    <item.icon className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <AfricaMap />
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${400 + i * 150}ms` }}
            >
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="h-1 w-6 rounded-full bg-primary/40" />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground italic">
                {'"'}{t.quote}{'"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary font-sans">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground font-sans">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} &middot; {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
