"use client"

import federatedLogout from "@/app/actions/auth/federatedLogout"
export default function SignOut(){   
    return (
        <button onClick={() => federatedLogout()}>Sign Out</button>
    )   
}