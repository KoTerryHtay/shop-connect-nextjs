import { auth as proxy } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/api"];

export default proxy(async function proxy(req) {
  const { pathname } = req.nextUrl;
  // console.log("proxy req.nextUrl.pathname >>>", req.nextUrl.pathname);
  // console.log("proxy req.auth?.user >>>", req.auth?.user);

  // const { device } = userAgent(req);
  // console.log("proxy device >>>", device);

  const isProtectedRoutes = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!req.auth && isProtectedRoutes) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (req.auth?.user) {
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
  // matcher: ["/dashboard/:path*", "/login", "/register"],
};
