import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { ScanResults } from "@/components/scan-results"
import { Features } from "@/components/features"
import { Trust } from "@/components/trust"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="border-t border-border">
        <HowItWorks />
      </div>
      <div className="border-t border-border">
        <ScanResults />
      </div>
      <div className="border-t border-border">
        <Features />
      </div>
      <div className="border-t border-border">
        <Trust />
      </div>
      <Footer />
    </main>
  )
}
