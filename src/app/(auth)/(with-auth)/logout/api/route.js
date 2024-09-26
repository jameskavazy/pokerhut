// const { NextResponse } = require("next/server");
import { auth } from '@/auth'
import { NextResponse } from "next/server";
import { getToken } from '@auth/core/jwt'
// function logoutParams(token){
//     return {
//         id_token_hint: token.idToken,
//         post_logout_redirect_uri: process.env.NEXTAUTH_URL,
//     };
// }

// function handleEmptyToken(){
//     const response = {error: "No session present"};
//     const responseHeaders = {status: 400};
//     return NextResponse.json(response, responseHeaders);
// }

// function sendEndSessionEndpointToURL(token){
//     const endSessionEndPoint = new URL(`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`);
//     const params = logoutParams(token);
//     const response = { url: `${endSessionEndPoint.href}/?${endSessionParams}` };
//     return NextResponse.json(response);
// }

export async function GET(){
    const session = await auth();
    console.log(session);
    
//     try {
//         const session = await auth();
//         CognitoUserPoolsAuthorizer
//         if (session.idToken){
//             return NextResponse.json({token: session.idToken});
//         }
//         return NextResponse.json({error: "No session"}, {status: 400});

//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({error: "Unknown Error"}, {status: 500})
//     }
}