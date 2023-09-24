import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const regex = new RegExp("^/$");
  if (regex.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/in-development", request.nextUrl), {
      status: 302,
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
