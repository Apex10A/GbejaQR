"use client"

import { ReactNode } from "react"

interface BaseLayoutProps {
  children: ReactNode
  className?: string
}

export function BaseLayout({ children, className = "bg-zinc-50" }: BaseLayoutProps) {
  return (
    <div className={`flex min-h-screen items-center justify-center px-4 py-8 ${className}`}>
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
