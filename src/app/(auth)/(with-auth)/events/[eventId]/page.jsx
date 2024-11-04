import { redirect } from "next/navigation";
import EventSettingsPanel from "../../../../../components/events/EventSettingsPanel";
import { auth } from "../../../../../lib/auth";
import prisma from "../../../../../lib/db";
import { revalidatePath } from "next/cache";

export default async function EventPage({params}){
   


   const {eventId} = params;
   const session = await auth();
   const user = session.user;
   let isHost = false;
   
  
    const event = await prisma.event.findUnique({
            where: {
                id: Number(eventId)
            },
            include:{
                host: true,
                attendees: true
            }
    });

    if (event) {
        isHost = event.hostId === user.id;
    }

    
    return ( event ? 
            <>
                <div className="flex">
                    <div className="text-xl flex flex-col justify-items-center ml-80 w-2/3 p-2 border-r-2 border-black" >
                        <div>
                            <h1>{event.title}</h1>
                            <h2>{event.time.toLocaleString("en-gb", {hour: '2-digit', minute: "2-digit"})}</h2>
                            <h2>{event.time.getDate("en-gb")}</h2>
                            <h2>{new Date(event.time).toLocaleString('default', {month: 'short', year: 'numeric'})}</h2>
                            <p>Host: {event.host.username}</p>

                            
                        </div>

                        
                        {isHost && <form action={async () => {
                                "use server"
                                if (isHost){
                                await prisma.event.delete({
                                    where: {
                                        id: Number(eventId)
                                    }
                                })}
                                redirect("/")
                            }}>
                                <button>Delete Event</button>
                            </form>}
                        
                        <div className="mt-20">
                            <h3>Attendees</h3>
                            {(event.attendees).map((attendee) => { 
                                return (
                                    <div className="flex mt-2">
                                        <p key={attendee.id} className="text-black">{attendee.username}</p> 
                                        <form action={async () => { 
                                            "use server"
                                            if (event.hostId === user.id) {
    
                                                await prisma.event.update({
                                                    where: {
                                                        id: Number(eventId),
                                                    },
                                                    data: {
                                                        attendees: {
                                                            disconnect: {
                                                                id: attendee.id
                                                            }
                                                        }
                                                    }
                                                });
                                            }                                    
                                            revalidatePath(`/events/${eventId}`)
                                        }}>
                                            {(attendee.id === user.id && 
                                                <button key={attendee.id}>Leave</button>)}    
                                            {(event.hostId === user.id && event.hostId !== attendee.id) && (
                                                <button key={attendee.id}>Kick</button>)}
                                            
                                        </form>                             
                                        
                                    </div>
                                    
                                )
                            })}
                        </div>
                       
                    </div>
                    
                    <div className="w-1/3 p-8">
                        {
                            isHost && <EventSettingsPanel event={event} />
                        }    
                        
                    </div>
    
                </div>     
            </>

            :
                    
            <p className="text-3xl text-center p-40"> 404 | Event not found</p>
        ) 
}

    
    
    


