"use client"

import { useState } from "react"
import { Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
        <Image src="/GbejaLogoWhite.png" alt="Cybergbeja Logo" width={150} height={150} />        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            How It Works
          </a>
          <a href="#scan-results" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Scan Results
          </a>
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Features
          </a>
          <a href="#trust" className="text-sm text-muted-foreground transition-colors hover:text-primary">
            Why Cybergbeja
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold px-6">
            <Shield className="mr-2 h-4 w-4" />
            Scan Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex lg:hidden items-center justify-center text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="flex flex-col gap-4 border-t border-border/50 bg-background px-4 py-6 lg:hidden">
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
            How It Works
          </a>
          <a href="#scan-results" className="text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
            Scan Results
          </a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
            Features
          </a>
          <a href="#trust" className="text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
            Why Cybergbeja
          </a>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold mt-2">
            <Shield className="mr-2 h-4 w-4" />
            Scan Now
          </Button>
        </div>
      )}
    </nav>
  )
}
