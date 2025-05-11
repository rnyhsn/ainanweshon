/*
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectToDB } from "./db";
import { User } from "./model/user.model";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";


export const {auth, signIn, signOut, handlers} = NextAuth({
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        Credentials({
            authorize: async(credentials) => {
                // console.log( "Credentials: ", credentials);
                await connectToDB();
                let user = null;
                
                const userExist = await User.findOne({email: credentials.email});
                if(!userExist) {
                    throw new Error("Invalid Email or Password");
                } else {
                    if(userExist.password) {
                        const passCompare = await bcrypt.compare(credentials.password as string, userExist.password);
                        if(passCompare) {
                            user = userExist;
                        } else {
                            throw new Error("Wrong credentials");
                        }
                    }
                }
                return user;
            }
        })
    ],
 
    trustHost: true
})

*/

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { signIn, signOut, handlers, auth } = NextAuth(authConfig);