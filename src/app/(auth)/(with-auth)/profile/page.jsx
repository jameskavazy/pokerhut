"use server"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import primsa from "@/lib/db"
import { revalidatePath } from "next/cache";



export default async function ProfileName(){
    const session = await auth();
    
    // const events = await primsa.event.findMany();
    // revalidatePath("/profile");

    if (!session) {
        redirect('/login')
    }
    

    return (
        <div>
            <p>{session.user.name}</p>
           {/* {events.map((event) => (
            <li key={event.id}>{event.title}</li>
           ))} */}
        </div>
    )
}


// auth/admin/realms/{realm-name}/users/{id}