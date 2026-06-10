import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url))
  response.cookies.delete("gbeja_preview")
  response.cookies.delete("gbeja_preview_visible")
  return response
}
