/**
import { NextAuthConfig } from "next-auth";
import { connectToDB } from "./db";
import { User } from "./model/user.model";


export const authConfig: NextAuthConfig =  {
    session: {
        strategy: 'jwt'
    },
    providers: [],
    callbacks: {
        async signIn({user, account}) {
            await connectToDB();
            const exist = await User.findOne({email: user.email});

            if(!exist) {
                // (user as {role: string}).role = 'USER';
                user.role = 'USER';
                const newUser = new User({
                    name: user.name,
                    email: user.email,
                    provider: account?.provider,
                    role: 'USER'
                })
                await newUser.save();
            } else {
                // (user as {role: string}).role = exist.role
                user.role = 'USER';
            }

            return true;
        },
        async jwt({token, user}) {
            // if(user && 'role' in user) {
            //     // token.role = (user as any).role;
            //     token.role = user.role;
            // }
            // token.role = token.role || "USER";  // fallback
            // return token;
            if (user && "role" in user) {
                token.role = (user as any).role;
              }
              // Fallback in case role was missed
              token.role ??= "USER";
              return token;
        },
        async session({session, token}) {
            if (session.user.role) {
                session?.user? .role = token?.role || "USER";
              }
              return session;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login'
    }
}

**/

import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectToDB } from "./db";
import { User } from "./model/user.model";
import bcrypt from "bcryptjs";


export const authConfig: NextAuthConfig = {
    // secret: process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                await connectToDB();
                const {email, password} = credentials;
                if(!email || !password) {
                    throw new Error("E-mail and Password is required");
                }
                const user = await User.findOne({email});
                if(!user || !user.password) {
                    throw new Error("Invalid Email or password");
                }
                const isValid = await bcrypt.compare(password as string, user.password);
                if(!isValid) {
                    throw new Error("Wrong credentials");
                }
                return user;
            }
        })
    ],
    callbacks: {
        async signIn({user, account}) {
            await connectToDB();
            const existingUser = await User.findOne({email: user.email});
            if(!existingUser) {
                const newUser = new User({
                    name: user.name,
                    email: user.email,
                    provider: account?.provider,
                    role: "USER"
                });
                await newUser.save();
            } else {
                user.role = existingUser.role;
            }
            return true;
        },
        async jwt({token, user}) {
            if(user && 'role' in user) {
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}) {
            if(session.user) {
                session.user.role = String(token.role)  || "USER";
            }
            return session;
        }
    },
    pages: {
        signIn: "/login"
    }
}