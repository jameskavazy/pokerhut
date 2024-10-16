import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../../../../lib/auth";
import UpdateUsernameForm from "../../../../components/auth/profile/UpdateUsernameForm";
import ProfilePage from "./ProfilePage";



export default async function ProfileName(){
    const session = await auth();
    
    if (!session) {
        redirect('/login')
    }
    
   revalidatePath("/profile")
   
    return (
            <>
                <UpdateUsernameForm session={session}/> 
            </>
       ) 
}
