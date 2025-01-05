import { NextResponse } from "next/server";

export default function middleware(request) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/auth/login", "/about"],
};
