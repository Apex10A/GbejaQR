export interface WaitlistPayload {
  email: string
  first_name: string
  last_name: string
  referral_source: string
}

export interface WaitlistResult {
  success: boolean
  message: string
}

export async function submitWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  const apiUrl = process.env.NEXT_PUBLIC_WAITLIST_API_URL

  if (!apiUrl) {
    return {
      success: false,
      message: "Waitlist is not configured yet. Please try again later.",
    }
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      const detail =
        data?.message ||
        data?.detail ||
        (typeof data?.error === "string" ? data.error : null)

      return {
        success: false,
        message: detail || "Something went wrong. Please try again.",
      }
    }

    return {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    }
  } catch {
    return {
      success: false,
      message: "Failed to connect. Please check your connection and try again.",
    }
  }
}
