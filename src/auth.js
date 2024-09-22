
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak"
//import KeycloakProvider from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
        providers: [Keycloak],
        callbacks: {
                async jwt({ token, account }) {
                        if (account) {
                                token.idToken = account.id_token
                                token.accessToken = account.access_token
                                token.refreshToken = account.refresh_token
                                token.expiresAt = account.expires_at
                                return token
                        }

                        if (Date.now() < (token.expiresAt * 1000 - 60 * 1000)) {
                                return token
                        } else {
                                try {
                                        const response = await requestRefreshOfAccessToken(token)

                                        const tokens = await response.json();

                                        if (!response.ok) throw tokens;

                                        const updatedToken = {
                                                ...token,
                                                idToken: tokens.id_token,
                                                accessToken: tokens.access_token,
                                                expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in)),
                                                refreshToken: tokens.refresh_token ?? token.refreshToken,
                                              }
                                              return updatedToken;
                                        } catch (error) {
                                                console.error(`Error refreshing acces token ${error}`);
                                                return {...token, error: "RefreshTokenAccessError"}

                                        }
                                }
                        }
                },

                async session({ session, token }) {
                        session.accessToken = token.accessToken
                        return session
                }
});

export function requestRefreshOfAccessToken(token) {
        return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                        client_id: process.env.AUTH_KEYCLOAK_ID,
                        client_secret: process.env.AUTH_KEYCLOAK_SECRET,
                        grant_type: "refresh_token",
                        refresh_token: token.refreshToken,

                }),
                method: "POST",
                cache: "no-store"
        });
}

// export const authOptions = {
//         providers: [KeycloakProvider({
//                 clientId: process.env.KEYCLOAK_CLIENT_ID,
//                 clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
//                 issuer: process.env.KEYCLOAK_ISSUER
//         })]
// }

// export default NextAuth(authOptions)