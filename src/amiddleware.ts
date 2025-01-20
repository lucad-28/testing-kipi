import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  console.log("IN MIDDLEWARE");
  console.log(req.nextauth.token);
  if (!req.nextauth.token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
