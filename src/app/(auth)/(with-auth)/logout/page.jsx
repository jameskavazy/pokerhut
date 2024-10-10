"use client"

import federatedLogout from "../../../../actions/auth/federatedLogout"

//TODO maybe use a form here and make this a server function
export default function SignOut(){   
    return (
        <button onClick={() => federatedLogout()}>Sign Out</button>
    )   
}