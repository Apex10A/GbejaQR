export const WAITLIST_JOINED_KEY = "gbeja_waitlist_joined"
export const WAITLIST_DISMISSED_KEY = "gbeja_waitlist_dismissed"

export function isWaitlistMode(): boolean {
  return process.env.NEXT_PUBLIC_LAUNCH_MODE === "waitlist"
}

export function hasJoinedWaitlist(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(WAITLIST_JOINED_KEY) === "true"
}

export function hasDismissedWaitlist(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem(WAITLIST_DISMISSED_KEY) === "true"
}

export function markWaitlistJoined(): void {
  localStorage.setItem(WAITLIST_JOINED_KEY, "true")
  localStorage.removeItem(WAITLIST_DISMISSED_KEY)
}

export function markWaitlistDismissed(): void {
  localStorage.setItem(WAITLIST_DISMISSED_KEY, "true")
}

export function hasPreviewAccess(): boolean {
  if (typeof document === "undefined") return false
  return document.cookie.split("; ").some((c) => c.startsWith("gbeja_preview_visible=1"))
}
