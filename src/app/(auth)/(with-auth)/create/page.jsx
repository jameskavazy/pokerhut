import { redirect } from "next/navigation";
import { auth } from "../../../../lib/auth"
import Sidepanel from "../../../../components/home/Sidepanel";
import CreateEventForm from "../../../../components/create/CreateEventForm";

export default async function CreateEvent(){

    const session = await auth();
    if (!session) {
        redirect("/")
    }

    return (
        <>
            <div className="flex justify-center mt-12">
                <div className="mt-2 ml-4 max-w-md w-full">
                    <h1 className="text-3xl">Create An Event</h1>
                    <br></br>
                    <CreateEventForm/>
                </div>
                
            </div> 
            <br></br>
        </>
    )
}