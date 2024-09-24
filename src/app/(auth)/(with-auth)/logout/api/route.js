const { NextResponse } = require("next/server");

function logoutParams(token){
    return {
        id_token_hint: token.idToken,
        post_logout_redirect_uri: process.env.NEXTAUTH_URL,
    };
}

function handleEmptyToken(){
    const response = {error: "No session present"};
    const responseHeaders = {status: 400};
    return NextResponse.json(response, responseHeaders);
}

function sendEndSessionEndpointToURL(token){
    const endSessionEndPoint = new URL(`${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`);
    const params = logoutParams(token);
    const response = { url: `${endSessionEndPoint.href}/?${endSessionParams}` };
    return NextResponse.json(response);
}