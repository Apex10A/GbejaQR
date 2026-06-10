"use client"

import { useState } from "react"
import { Loader2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { submitWaitlist } from "@/lib/waitlist"

const REFERRAL_SOURCES = [
  "Twitter",
  "LinkedIn",
  "Instagram",
  "Friend or colleague",
  "Search engine",
  "Blog or article",
  "Other",
]

interface WaitlistFormProps {
  onSuccess?: (firstName: string, email: string) => void
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [referralSource, setReferralSource] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim() || !firstName.trim() || !lastName.trim() || !referralSource) {
      setError("Please fill in all fields.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.")
      return
    }

    setLoading(true)

    const result = await submitWaitlist({
      email: email.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      referral_source: referralSource,
    })

    setLoading(false)

    if (result.success) {
      onSuccess?.(firstName.trim(), email.trim())
    } else {
      setError(result.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first-name" className="text-sm font-medium text-foreground">
            First name
          </Label>
          <Input
            id="first-name"
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name" className="text-sm font-medium text-foreground">
            Last name
          </Label>
          <Input
            id="last-name"
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loading}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
        />
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="referral-source" className="text-sm font-medium text-foreground">
          How did you hear about us?
        </Label>
        <Select value={referralSource} onValueChange={setReferralSource} disabled={loading}>
          <SelectTrigger id="referral-source" className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {REFERRAL_SOURCES.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="mt-4 text-sm text-destructive text-center">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/85 font-sans font-semibold py-5 text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining...
          </>
        ) : (
          <>
            <Users className="mr-2 h-4 w-4" />
            Join Waitlist
          </>
        )}
      </Button>
    </form>
  )
}
