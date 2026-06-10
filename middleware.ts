import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const LAUNCH_MODE = process.env.NEXT_PUBLIC_LAUNCH_MODE ?? "live"
const PREVIEW_SECRET = process.env.PREVIEW_SECRET
const PREVIEW_COOKIE_DAYS = Number(process.env.PREVIEW_COOKIE_DAYS ?? "7")
const PREVIEW_MAX_AGE = 60 * 60 * 24 * PREVIEW_COOKIE_DAYS

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/waitlist") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (LAUNCH_MODE !== "waitlist") {
    return NextResponse.next()
  }

  const preview = request.nextUrl.searchParams.get("preview")
  if (preview && PREVIEW_SECRET && preview === PREVIEW_SECRET) {
    const url = request.nextUrl.clone()
    url.searchParams.delete("preview")
    url.searchParams.set("preview_unlocked", "1")
    const response = NextResponse.redirect(url)
    response.cookies.set("gbeja_preview", "1", {
      maxAge: PREVIEW_MAX_AGE,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    })
    response.cookies.set("gbeja_preview_visible", "1", {
      maxAge: PREVIEW_MAX_AGE,
      path: "/",
      sameSite: "lax",
    })
    return response
  }

  const hasPreview = request.cookies.get("gbeja_preview")?.value === "1"

  if (pathname.startsWith("/scan") && !hasPreview) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/scan/:path*", "/waitlist"],
}
