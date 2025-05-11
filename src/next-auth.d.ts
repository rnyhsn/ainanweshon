import NextAuth, { DefaultSession } from "next-auth";
// import NextAuth from "next-auth";

// declare module "next-auth" {
//     interface Session {
//         name?: string,
//         email?: string,
//         image?: string,
//         role?: string
//     }

//     interface User {
//         role?: string
//     }
//     interface JWT {
//         role?: string
//     }
// }

declare module "next-auth" {
    interface Session {
        user: {
            name?: string|null,
            email?: string|null,
            image?: string|null,
            role?: string
        }
    }

    interface User {
        role?: string
    }

    interface JWT {
        role?: string
    }
}