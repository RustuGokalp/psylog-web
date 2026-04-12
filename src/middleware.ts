import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // /admin/login: if already authenticated redirect to post list
  if (pathname === "/admin/login") {
    if (token) {
      return NextResponse.redirect(new URL("/admin/posts", request.url));
    }
    return NextResponse.next();
  }

  // All other /admin/* routes: require token
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
