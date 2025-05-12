import { NextRequest, NextResponse } from "next/server";
import { authEdgeConfig } from "./utils/auth-edge.config";
import NextAuth from "next-auth";

const {auth} = NextAuth(authEdgeConfig);

export default async function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;
    const session = await auth();
    console.log("Token: ", session?.user);
    const isAuthenticated = !!session?.user;
    console.log("authenticated:", isAuthenticated);
    
    if(!isAuthenticated && ['/submission'].some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if(isAuthenticated) {
        if(['/login', '/register'].includes(pathname)) {
            return NextResponse.redirect(new URL('/', req.url));
        }
       
    }
    return NextResponse.next();
}


export const config = {
  matcher: [
            "/submission", 
            "/login", 
            "/register"
        ],
};