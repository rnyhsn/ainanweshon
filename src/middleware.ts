import { NextResponse } from "next/server";
import { auth } from "./utils/auth";


export default auth((req) => {

    const user = req.auth?.user;
    const isAuthenticated = !!user;
    const userRole = (user as {role?: string})?.role;

    if(!isAuthenticated && req.nextUrl.pathname.startsWith('/submission')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if(isAuthenticated) {
            if(req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith("/register")) {
                return NextResponse.redirect(new URL("/", req.url));
            }
            if(userRole !== 'ADMIN' && req.nextUrl.pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } else {
            if(userRole !== 'ADMIN' && req.nextUrl.pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }



})

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/dashboard/:path*",
        '/submission'
    ],
  }