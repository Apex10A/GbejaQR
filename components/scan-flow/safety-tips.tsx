"use client"

import { useState } from "react"
import { Search, Link2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SafetyTipsProps {
  onContinue: (skipFor7Days: boolean) => void
}

const tips = [
  {
    icon: Search,
    title: "Check the Source",
    description: "Only scan codes from trusted business or official event signage.",
  },
  {
    icon: Link2,
    title: "Avoid unexpected links",
    description: "Be wary of codes that prompt you to enter passwords or payment details immediately.",
  },
  {
    icon: ShieldCheck,
    title: "Look for the green Shield.",
    description: "Our system automatically highlights verified secure links with a green badge.",
  },
]

export function SafetyTips({ onContinue }: SafetyTipsProps) {
  const [skipFor7Days, setSkipFor7Days] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 bg-zinc-50">
      <div className="w-full max-w-md md:max-w-lg">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          {/* Header */}
          <div className="bg-primary/10 px-6 py-6 text-center">
            {/* QR icon area */}
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-white border border-border">
              <div className="grid h-12 w-12 grid-cols-3 grid-rows-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      i === 4
                        ? "bg-primary"
                        : [0, 2, 6, 8].includes(i)
                          ? "bg-primary/60"
                          : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <h2 className="text-xl font-bold text-foreground font-sans">
              Stay Safe Online
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
             Learn how to stay protected while scanning 
QR codes. 
            </p>
          </div>

          {/* Tips area */}
          <div className="px-6 py-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground font-sans uppercase tracking-wider">
              QR Code Safety Tips
            </h3>

            <div className="flex flex-col gap-3">
              {tips.map((tip, index) => (
                <div
                  key={tip.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                    <tip.icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground font-sans">
                      {tip.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <div className="mb-6 flex items-center justify-center space-x-2">
              <Checkbox 
                id="skip-tips" 
                checked={skipFor7Days}
                onCheckedChange={(checked) => setSkipFor7Days(!!checked)}
              />
              <Label htmlFor="skip-tips" className="text-sm text-muted-foreground cursor-pointer">
                Don&apos;t show these tips for the next 7 days
              </Label>
            </div>
            <p className="mb-4 text-center text-xs text-muted-foreground">
              Your Security is our priority.
            </p>
            <Button
              onClick={() => onContinue(skipFor7Days)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold py-5 text-sm"
            >
              Got it, Let{"'"}s Scan.
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
