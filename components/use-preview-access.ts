"use client"

import { useState } from "react"
import { hasPreviewAccess } from "@/lib/launch"

export function usePreviewAccess() {
  const [active] = useState(() => hasPreviewAccess())
  return active
}
