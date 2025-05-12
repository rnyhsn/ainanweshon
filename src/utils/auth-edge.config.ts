import { NextAuthConfig } from "next-auth";


export const authEdgeConfig: NextAuthConfig = {
    session: {
        strategy: 'jwt'
    },
    providers: [],
    trustHost: true
}