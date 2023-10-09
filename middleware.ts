import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/in-development",
    "/about",
    "/contact",
    "/cookie-policies",
    "/impressum",
  ],
  /* beforeAuth: async (req: NextRequest) => {
    const regex = new RegExp("^/$");
    if (regex.test(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/in-development", req.nextUrl), {
        status: 302,
      });
    }
  }, */
  debug: true,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
