/*
import { NextRequest, NextResponse } from "next/server";

import { auth } from "./utils/auth";
// import { authConfig } from "./utils/auth.config";



// const {auth} = NextAuth(authConfig);


export default async function middleware(req: NextRequest) {
    const session = await auth(req as any); // Works more reliably than getToken()

    const isAuthenticated = !!session;
    console.log("isAuthenticated", isAuthenticated);
    const userRole = session?.user?.role;

    const { pathname } = req.nextUrl;

    console.log("Token:", session?.user);
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


*/

/*

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./utils/auth";
import { getToken } from "next-auth/jwt";


export default async function middleware(req: NextRequest) {

    // const session = await auth(req as any);
    const session = await getToken({ req, secret: process.env.AUTH_SECRET });
    
    console.log("Session in middleware:", session);
    const isAuthenticated = !!session;
    console.log("isAuthenticated:", isAuthenticated);
    const role = session?.role;
    console.log("Role:", role);
    const { pathname } = req.nextUrl;
    if(!isAuthenticated && ['/dashboard', '/submission'].some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if(isAuthenticated) {
        if(['/login', '/register'].includes(pathname)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        if(pathname.startsWith('/dashboard') && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
  matcher: [
            "/((?!api|_next/static|_next/image|favicon.ico).*)",
            "/dashboard/:path*", 
            "/submission", 
            "/login", 
            "/register"
        ],
};

*/

// import { NextRequest } from "next/server";
// import { authConfig } from "./utils/auth.config";
// import NextAuth from "next-auth";

// const { auth } = NextAuth(authConfig);

// export async function middleware(request: NextRequest) {
//     const session = await auth();
//     console.log("user:", session);
// }


import { NextRequest, NextResponse } from "next/server";
// import { authEdgeConfig } from "./utils/auth-edge.config";
// import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";



// export default auth(async function middleware(req) {
//     const auth = req.auth;
//     console.log(auth);
// })

export default async function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;
  
    const token = await getToken({req, secret: process.env.AUTH_SECRET ?? '9c0gXFghyQB/5KS45a64Dd3D6U2I1GGPbtt2VxQhn0c'});
    console.log("Token: ", token);
    const isAuthenticated = !!token;
    console.log("authenticated:", isAuthenticated);
    const role = token?.role;
    console.log("Role:", role);
    if(!isAuthenticated && ['/dashboard', '/submission'].some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if(isAuthenticated) {
        if(['/login', '/register'].includes(pathname)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        if(pathname.startsWith('/dashboard') && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
    return NextResponse.next();
}


export const config = {
  matcher: [
            "/((?!api|_next/static|_next/image|favicon.ico).*)",
            "/dashboard/:path*", 
            "/submission", 
            "/login", 
            "/register"
        ],
};