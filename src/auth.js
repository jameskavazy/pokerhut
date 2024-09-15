
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak"
//import KeycloakProvider from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
        providers: [Keycloak],  
})

// export const authOptions = {
//         providers: [KeycloakProvider({
//                 clientId: process.env.KEYCLOAK_CLIENT_ID,
//                 clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
//                 issuer: process.env.KEYCLOAK_ISSUER
//         })]
// }

// export default NextAuth(authOptions);