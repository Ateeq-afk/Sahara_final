import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow login page
        if (req.nextUrl.pathname === "/crm/login") {
          return true;
        }
        
        // Require authentication for all other CRM routes
        if (req.nextUrl.pathname.startsWith("/crm")) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/crm/:path*"],
};