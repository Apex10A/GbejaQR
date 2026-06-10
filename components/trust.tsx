"use client"

import { useEffect, useRef, useState } from "react"

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

/*
function AfricaMap() {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center lg:h-80 lg:w-80">
      ...
    </div>
  )
}
*/

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
    <section id="trust" ref={ref} className="relative py-10 lg:py-20">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-primary font-mono">
            Why GbejaQR
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl font-sans text-balance">
            Built in Africa, for Africa
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            QR code fraud is rising across the continent. GbejaQR is the security layer Africa{"'"}s mobile-first economy deserves.
          </p>
        </div>

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

       
      </div>
    </section>
  )
}
