"use client"

import { useEffect, useState } from "react"
import { hasPreviewAccess } from "@/lib/launch"

export function usePreviewAccess() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(hasPreviewAccess())
  }, [])

  return active
}
