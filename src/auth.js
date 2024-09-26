
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak"
//import KeycloakProvider from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
        providers: [Keycloak],
        session: {
                strategy: "jwt",
                maxAge: 60 * 30
        },
        callbacks: {
                async jwt({ token, account }) {
                        if (account) {
                                // First-time login, save the `access_token`, its expiry and the `refresh_token`
                                token.idToken = account.id_token;
                                token.accessToken = account.access_token;
                                token.refreshToken = account.refresh_token;
                                token.expiresAt = account.expires_at;
                                return token;
                        }

                        if (Date.now() < (token.expiresAt * 1000 - 60 * 1000)) {
                                // Subsequent logins, but the `access_token` is still valid
                                return token
                        } else {
                          // Subsequent logins, but the `access_token` has expired, try to refresh it
                                try {
                                        const response = await requestRefreshOfAccessToken(token);

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
                                                console.error(`Error refreshing access token ${error}. At src/auth.js`);
                                                return {...token, error: "RefreshTokenAccessError"}

                                        }
                                }
                        },

                        async session({ session, token }) {
                                if (session.user){
                                        session.user.id = token.sub;
                                        session.user.idToken = token.idToken;
                                }
                                // session.error = token.error;
                                // // console.log({sessionToken: token,
                                //         session,
                                // });
                                return session;
                              },
                },

});

function requestRefreshOfAccessToken(token) {
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


