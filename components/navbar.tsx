"use client"

import { useState } from "react"
import { Shield, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar({ onScanClick, onHistoryClick }: { onScanClick?: () => void; onHistoryClick?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleScanClick = () => {
    if (onScanClick) {
      onScanClick()
    }
  }

  const handleHistoryClick = () => {
    if (onHistoryClick) {
      onHistoryClick()
    }
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (pathname === "/") {
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-white border backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/Gbejadark.png" alt="GbejaQR Logo" width={150} height={150} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link 
            href="/#how-it-works" 
            className="text-sm font-medium text-secondary transition-colors hover:text-primary"
            onClick={(e) => scrollToSection(e, "how-it-works")}
          >
            How it works
          </Link>
          {onHistoryClick ? (
            <button onClick={handleHistoryClick} className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              History
            </button>
          ) : (
            <Link href="/scan?step=history" className="text-sm font-medium text-secondary transition-colors hover:text-primary">
              History
            </Link>
          )}
          <Link 
            href="/#trust" 
            className="text-sm font-medium text-secondary transition-colors hover:text-primary"
            onClick={(e) => scrollToSection(e, "trust")}
          >
            Why GbejaQR
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          {onScanClick ? (
            <Button 
              onClick={handleScanClick}
              className="bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold px-6"
            >
              <Shield className="mr-2 h-4 w-4" />
              Scan Now
            </Button>
          ) : (
            <Link href="/scan">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold px-6">
                <Shield className="mr-2 h-4 w-4" />
                Scan Now
              </Button>
            </Link>
          )}
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
        <div className="flex flex-col gap-1 border-t border-border/50 bg-background px-4 py-6 lg:hidden shadow-xl animate-in slide-in-from-top duration-300">
          <Link 
            href="/#how-it-works" 
            className="flex py-3 text-sm font-medium text-secondary hover:text-primary active:bg-zinc-100 rounded-lg px-2 transition-colors" 
            onClick={(e) => {
              scrollToSection(e, "how-it-works")
              setMobileOpen(false)
            }}
          >
            How it works
          </Link>
          {onHistoryClick ? (
            <button 
              className="flex py-3 text-sm font-medium text-secondary hover:text-primary active:bg-zinc-100 rounded-lg px-2 transition-colors text-left" 
              onClick={() => {
                handleHistoryClick()
                setMobileOpen(false)
              }}
            >
              History
            </button>
          ) : (
            <Link href="/scan?step=history" className="flex py-3 text-sm font-medium text-secondary hover:text-primary active:bg-zinc-100 rounded-lg px-2 transition-colors" onClick={() => setMobileOpen(false)}>
              History
            </Link>
          )}
          <Link 
            href="/#trust" 
            className="flex py-3 text-sm font-medium text-secondary hover:text-primary active:bg-zinc-100 rounded-lg px-2 transition-colors" 
            onClick={(e) => {
              scrollToSection(e, "trust")
              setMobileOpen(false)
            }}
          >
            Why GbejaQR
          </Link>
          <div className="pt-4">
          {onScanClick ? (
            <Button 
              onClick={() => {
                handleScanClick()
                setMobileOpen(false)
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold py-6 text-base"
            >
              <Shield className="mr-2 h-5 w-5" />
              Scan Now
            </Button>
          ) : (
            <Link href="/scan" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold py-6 text-base">
                <Shield className="mr-2 h-5 w-5" />
                Scan Now
              </Button>
            </Link>
          )}
          </div>
        </div>
      )}
    </nav>
  )
}
