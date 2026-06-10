"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { CheckCircle2, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { WaitlistForm } from "@/components/waitlist-form"
import {
  hasDismissedWaitlist,
  hasJoinedWaitlist,
  hasPreviewAccess,
  isWaitlistMode,
  markWaitlistDismissed,
  markWaitlistJoined,
} from "@/lib/launch"

interface WaitlistContextValue {
  isWaitlistMode: boolean
  hasJoined: boolean
  openWaitlist: () => void
}

const WaitlistContext = createContext<WaitlistContextValue>({
  isWaitlistMode: false,
  hasJoined: false,
  openWaitlist: () => {},
})

export function useWaitlist() {
  return useContext(WaitlistContext)
}

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const waitlistMode = isWaitlistMode()
  const [hasJoined, setHasJoined] = useState(() => hasJoinedWaitlist())
  const [showSignup, setShowSignup] = useState(() => {
    if (!isWaitlistMode()) return false
    return !hasJoinedWaitlist() && !hasDismissedWaitlist() && !hasPreviewAccess()
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [joinedName, setJoinedName] = useState("")
  const [joinedEmail, setJoinedEmail] = useState("")

  const openWaitlist = useCallback(() => {
    if (!waitlistMode) return
    setShowSignup(true)
  }, [waitlistMode])

  const handleDismiss = () => {
    markWaitlistDismissed()
    setShowSignup(false)
  }

  const handleSuccess = (firstName: string, email: string) => {
    markWaitlistJoined()
    setHasJoined(true)
    setJoinedName(firstName)
    setJoinedEmail(email)
    setShowSignup(false)
    setShowSuccess(true)
  }

  return (
    <WaitlistContext.Provider value={{ isWaitlistMode: waitlistMode, hasJoined, openWaitlist }}>
      {children}

      {waitlistMode && (
        <>
          <Dialog
            open={showSignup}
            onOpenChange={(open) => {
              if (!open) handleDismiss()
            }}
          >
            <DialogContent className="w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:w-full sm:max-w-md p-0 overflow-hidden rounded-2xl border-border gap-0">
              <div className="bg-primary/10 px-6 py-6 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-white border border-border">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <DialogHeader className="text-center sm:text-center">
                  <DialogTitle className="text-xl font-bold text-foreground font-sans">
                    Join the Waitlist
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                    GbejaQR is launching soon. Sign up to get early access when we go live.
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="px-6 pb-6">
                <WaitlistForm onSuccess={handleSuccess} />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
            <DialogContent className="w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:w-full sm:max-w-md rounded-2xl border-border text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-safe/15 border border-safe/25">
                <CheckCircle2 className="h-8 w-8 text-safe" />
              </div>
              <DialogHeader className="text-center sm:text-center">
                <DialogTitle className="text-xl font-bold text-foreground font-sans">
                  You&apos;re on the waitlist!
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                  Thanks for signing up{joinedName ? `, ${joinedName}` : ""}. We&apos;ll notify you
                  {joinedEmail ? (
                    <>
                      {" "}at <span className="font-medium text-foreground">{joinedEmail}</span>
                    </>
                  ) : (
                    ""
                  )}{" "}
                  when GbejaQR is live.
                </DialogDescription>
              </DialogHeader>
              <Button
                onClick={() => setShowSuccess(false)}
                className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold"
              >
                Got it
              </Button>
            </DialogContent>
          </Dialog>
        </>
      )}
    </WaitlistContext.Provider>
  )
}
