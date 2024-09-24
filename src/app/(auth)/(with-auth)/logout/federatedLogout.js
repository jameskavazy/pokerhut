import { signOut } from "next-auth/react";

export default async function federatedLogout() {
    await signOut({ redirect: true, redirectTo: '/'});
    window.location.href = new URL('http://localhost:8080/realms/myrealm/protocol/openid-connect/logout');
}