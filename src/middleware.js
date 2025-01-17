import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "../utils/sessions";
// Can not be access without authentication
const protectedRoots = ["/"];
//Can be access without authentication
const publicRoots = ["/auth/login"];

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  //isProtectedRoute - is boolean that tells us if the route is protected
  const isProtectedRoute = protectedRoots.includes(path);
  //isPublicRoute - is boolean that tells us if the route is public
  const isPublicRoute = publicRoots.includes(path);
  // If the route isn't protected or public, just continue
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie); // JWT token or undefined
  if (isProtectedRoute && !session?.userId) {
    // return NextResponse.redirect("/auth/login"); //Next js function that redirects to the login page. JS alternative to window.location.href
    console.log("Redirecting to the login page");
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }
  if (isPublicRoute && session?.userId) {
    // return NextResponse.redirect("/");
    console.log("Redirecting to the dashboard");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all paths except static files and API routes
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
