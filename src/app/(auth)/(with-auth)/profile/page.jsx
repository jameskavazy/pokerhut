import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../../../../lib/auth";
import UpdateUsernameForm from "../../../../components/auth/profile/UpdateUsernameForm";



export default async function ProfileName(){
    const session = await auth();
    
    if (!session) {
        redirect('/api/auth/signin')
    }


   revalidatePath("/profile")
   
   
    return (
            <>
                {!session.user?.username && (
                    <p>Create your public username.</p>
                )} 
                <div className="mt-2">
                    <UpdateUsernameForm session={session}/> 
                </div>           
                
            </>
       ) 
}
