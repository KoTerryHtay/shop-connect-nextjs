import { auth as proxy } from "@/auth";
import { NextResponse } from "next/server";

export default proxy(async function proxy(req) {
  const { pathname } = req.nextUrl;
  // console.log("req.nextUrl. proxy >>>", req.nextUrl.pathname);
  // console.log("req.nextUrl. proxy >>>", req.auth?.user);
  // console.log("req.nextUrl. proxy >>>", req.nextUrl.origin);

  if (!req.auth) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  if (req.auth?.user) {
    if (pathname === "/login" || pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: "/:path*",
  // matcher: "/about/:path*",
};
