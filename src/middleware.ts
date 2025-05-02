import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./utils/auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";



const {auth} = NextAuth(authConfig);


export default async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const isAuthenticated = !!token;
    const userRole = token?.role;

    const { pathname } = req.nextUrl;

    console.log("Token:", token);
    console.log("Role:", userRole);

    // Protect submission page
    if (!isAuthenticated && pathname.startsWith("/submission")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect logged-in users away from login/register
    if (isAuthenticated && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect dashboard route for ADMIN only
    if (pathname.startsWith("/dashboard")) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/dashboard/:path*",
        '/submission',
        '/login',
        '/register'
    ],
  }