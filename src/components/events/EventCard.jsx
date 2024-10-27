import DateCard from "./DateCard";

export default function EventCard({event}){

    const attendees = event.attendees;
    // console.log("attendees", attendees)

    return (
        <div className="flex bg-gray-50 rounded-3xl p-12 shadow animate-fade">
             <div className="w-1/12">
             {/* TODO Prop Drilling? Anti Pattern? */}
                <DateCard event={event}></DateCard>
            </div>

            <div className="flex w-11/12 justify-around">
                <span>
                    <p>{event.title}</p>
                    <p>{event.host.username}</p>
                    <p>{`${event.time.toLocaleString("en-gb", {hour: '2-digit', minute: "2-digit"})}`}</p>
                </span>

                <span>
                    <p>{event.location}</p>
                    {attendees.map((attendant) => {return (
                        <p key={attendant.id}>{attendant.username}</p>
                    )})}
                </span>
            </div>
        
            <div>
                <form action={async () => {
                    "use server"
                    await handleSubmit();
                }}>

                <button type="submit">Join</button>
                </form>
                
            </div>

        </div>  
    );
}

async function handleSubmit(){
    const response = await fetch("api/joinEvent");

    if (!response.ok) {
        return;
    }

    

}