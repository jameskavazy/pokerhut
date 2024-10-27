import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "../../../../lib/auth";
import UpdateUsernameForm from "../../../../components/auth/profile/UpdateUsernameForm";



export default async function ProfileName(){
    const session = await auth();
    
    if (!session) {
        redirect('/api/auth/signin');
    }

   revalidatePath("/profile");
   
    return (
                
                <div className=" mt-2 md:p-0 p-1">
                    <h1 className="md:hidden visible flex justify-center p-20 text-3xl border-b-2">Profile</h1>
                    {!session.user?.username && (
                    <p>Create your public username.</p>
                    )} 
                    <br></br>
                    <UpdateUsernameForm session={session}/> 
                    <br></br>
                </div>           
       );
}
