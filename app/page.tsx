"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Trust } from "@/components/trust"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="border-t border-border">
        <HowItWorks />
      </div>
      <div className="border-t border-border">
        <Trust />
      </div>
      <Footer />
    </main>
  )
}
