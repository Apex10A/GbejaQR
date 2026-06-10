"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { isWaitlistMode } from "@/lib/launch"
import { usePreviewAccess } from "@/components/use-preview-access"

function PreviewAccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const previewActive = usePreviewAccess()
  const [showUnlockDialog, setShowUnlockDialog] = useState(() => {
    if (typeof window === "undefined") return false
    return new URLSearchParams(window.location.search).get("preview_unlocked") === "1"
  })
  const waitlistMode = isWaitlistMode()

  useEffect(() => {
    if (searchParams.get("preview_unlocked") === "1") {
      router.replace("/", { scroll: false })
    }
  }, [searchParams, router])

  useEffect(() => {
    if (previewActive && waitlistMode) {
      document.body.dataset.previewBanner = "true"
    } else {
      delete document.body.dataset.previewBanner
    }
    return () => {
      delete document.body.dataset.previewBanner
    }
  }, [previewActive, waitlistMode])

  if (!waitlistMode) return null

  return (
    <>
      {previewActive && (
        <div className="fixed top-[73px] left-0 right-0 z-40 border-b border-primary/20 bg-primary/10 px-4 py-2">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <span>
                <span className="font-semibold text-foreground">Team preview active</span>
                <span className="hidden sm:inline"> — Scan &amp; History are unlocked for testing</span>
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a href="/api/preview/exit">
                <Button size="sm" variant="ghost" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                  <X className="mr-1 h-3.5 w-3.5" />
                  Exit
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
        <DialogContent className="max-w-md rounded-2xl border-border text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 border border-primary/20">
            <Eye className="h-8 w-8 text-primary" />
          </div>
          <DialogHeader className="text-center sm:text-center">
            <DialogTitle className="text-xl font-bold text-foreground font-sans">
              Team preview enabled
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              You now have full access to Scan and History while the public waitlist is active.
              A banner at the top will remind you preview mode is on.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function PreviewAccess() {
  return (
    <Suspense fallback={null}>
      <PreviewAccessContent />
    </Suspense>
  )
}
