"use server"
import { auth } from "@/auth"
import { redirect } from "next/navigation";



export default async function ProfileName(){
    const session = await auth();
    
        if (!session) {
            redirect('/login')
        }
    

    return (
        <div>
            <p>{session.user.name}</p>
        </div>
    )
}