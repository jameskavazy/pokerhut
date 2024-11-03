import prisma from "../../../../../lib/db";

export default async function EventPage({params}){
   
    
   const {eventId} = params;

  
   const event = await prisma.event.findUnique({
        where: {
            id: Number(eventId)
        }
   })

   
    return (
        <>
            <div className="flex">
                <div className="flex justify-center w-2/3 p-2" >
                    <div>
                        <h1>{event.title}</h1>
                        <h2>{event.time.toLocaleString("en-gb", {hour: '2-digit', minute: "2-digit"})}</h2>
                        <h2>{event.time.getDate("en-gb")}</h2>
                        <h2>{new Date(event.time).toLocaleString('default', {month: 'short', year: 'numeric'})}</h2>
                    </div>
                    <div>
                        <h3>Manage Attendees</h3>
                    </div>
                   
                </div>
              
               
                
                <div className="w-1/3 p-2">
                    <p>Settings</p>
                </div>

            </div>     
        </>
    )
    
}