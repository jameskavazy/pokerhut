
import NextAuth from "next-auth";
// import Keycloak from "next-auth/providers/keycloak"
import prisma from "./db";
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";


export const { handlers, signIn, signOut, auth } = NextAuth({
        adapter: PrismaAdapter(prisma),
        providers: [Google({
                authorization: "https://accounts.google.com/o/oauth2/auth/authorize?response_type=code&prompt=login",
        })],
        callbacks: {
                async signIn({user, account, profile}){
                        const existingUser = await prisma.user.findUnique({
                                where: {email: user.email}
                        });
                        if (!existingUser) {
                                
                        }

                        return true
                }
        }
});