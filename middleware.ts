import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const method = req.method

    // Allow public POST to contact and quotes (form submissions)
    if (method === "POST" && (path === "/api/contact" || path === "/api/quotes")) {
      return NextResponse.next()
    }

    // Check if accessing CRM routes
    if (path.startsWith("/crm")) {
      // Only allow admin users to access CRM
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url))
      }
    }

    // Check if accessing customer portal
    if (path.startsWith("/portal")) {
      // Allow customers and admins
      if (!token || (token.role !== "customer" && token.role !== "admin")) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow public POST to contact and quotes (form submissions)
        if (req.method === "POST" && (req.nextUrl.pathname === "/api/contact" || req.nextUrl.pathname === "/api/quotes")) {
          return true
        }
        return !!token
      }
    },
  }
)

export const config = {
  matcher: [
    "/crm/:path*",
    "/portal/:path*",
    "/api/crm/:path*",
    "/api/portal/:path*",
    "/api/blog/:path*",
    "/api/contact",
    "/api/quotes/:path*"
  ]
}