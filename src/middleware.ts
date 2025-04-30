import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./utils/auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";



const {auth} = NextAuth(authConfig);


export default async function middleware(req: NextRequest) {

    const token = await getToken({req, secret: process.env.AUTH_SECRET })
    console.log("Token", token);
    const isAuthenticated = !!token;
    const userRole = token?.role;
    console.log("Role", userRole);
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



}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/dashboard/:path*",
        '/submission'
    ],
  }