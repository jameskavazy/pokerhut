'use client'

import { signOut } from '@/auth'
import federatedLogout from "@/app/(auth)/(with-auth)/logout/federatedLogout"

export default function SignOut(){
    return (
          <button onClick={() => federatedLogout()}>Sign Out</button>  
    )
}