"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface ResultActionProps {
  primaryLabel: string
  onPrimary: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  primaryVariant?: "default" | "destructive" | "outline" | "ghost" | "link"
  primaryColor?: string
  icon?: ReactNode
}

export function ResultAction({ 
  primaryLabel, 
  onPrimary, 
  secondaryLabel, 
  onSecondary,
  primaryVariant = "default",
  primaryColor = "bg-primary",
  icon 
}: ResultActionProps) {
  return (
    <div className="flex flex-col gap-3 px-6 pb-6 pt-2">
      <Button
        className={`w-full ${primaryVariant === 'default' ? primaryColor : ''} text-white hover:opacity-90 font-sans font-bold py-7 text-base shadow-lg active:scale-[0.98] transition-all`}
        onClick={onPrimary}
        variant={primaryVariant}
      >
        {primaryLabel}
        {icon && <span className="ml-2">{icon}</span>}
      </Button>
      
      {secondaryLabel && onSecondary && (
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground font-sans py-6 text-sm active:scale-[0.98]"
          onClick={onSecondary}
        >
          {secondaryLabel}
        </Button>
      )}
    </div>
  )
}
