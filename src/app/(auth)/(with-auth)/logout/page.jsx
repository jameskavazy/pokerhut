"use client"

import federatedLogout from "@/actions/auth/federatedLogout"
export default function SignOut(){   
    return (
        <button onClick={() => federatedLogout()}>Sign Out</button>
    )   
}