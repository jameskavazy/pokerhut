"use server"
import { signOut } from '../../lib/auth';
import { auth } from '../../lib/auth';
import { redirect } from "next/navigation"

export default async function federatedLogout() {
    const session = await auth();

    var endSessionEndPoint;
        try {
            const endSessionParams = new URLSearchParams({
                id_token_hint: session.user.idToken,
                post_logout_redirect_uri: `http://localhost:3000/`
        
            });
            endSessionEndPoint = `http://localhost:8080/realms/myrealm/protocol/openid-connect/logout/?${endSessionParams}`;
            
        } catch (error) {
            console.error(error);
        } finally {
            if (endSessionEndPoint){
                await signOut({redirect: false}).then(() => redirect(endSessionEndPoint));
            }
            
        }
    
}