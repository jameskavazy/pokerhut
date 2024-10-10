"use server"

import { redirect } from "next/navigation";
import prisma from "../../../../lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "../../../../lib/auth";



export default async function ProfileName(){
    const session = await auth();
    console.log(process.env.DATABASE_URL);
    const events = await prisma.event.findMany();
    // const events = await primsa.event.findMany();
    // revalidatePath("/profile");

    if (!session) {
        redirect('/login')
    }
    

    return (
        <div>
            <p>{session.user.name}</p>
           {events.map((event) => (
            <li key={event.id}>{event.title}</li>
           ))}
        </div>
    )
}


// auth/admin/realms/{realm-name}/users/{id}