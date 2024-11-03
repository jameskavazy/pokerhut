import { auth } from "../../lib/auth";
import DateCard from "./DateCard";
import prisma from "../../lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function EventCard({event}){

    const user = (await auth()).user;
    // console.log(`Event card user session object is ${user.username}`);
    const attendees = event.attendees;
    const isHost = event.hostId === user.id;

    const isAttending = attendees.some((attendee) => {
        return attendee.id === user.id
    });
    
    //TODO 

    const BLINDS = {
        SB_010_BB_020: "£0.10/£0.20",
        SB_025_BB_050: "£0.25/£0.50",
        SB_050_BB_100: "£0.50/£1.00",
        SB_100_BB_200: "£1.00/£2.00"
    }

    const LIMIT = {
        NoLimit: "No Limit",
        Limit: "Limit"
    }

    const GAME_TYPE = {
        CashGame: "Cash Game",
        Tournament: "Tournament"
    }

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
                    <p>{event.time.toLocaleString("en-gb", {hour: '2-digit', minute: "2-digit"})}</p>
                    <p>{GAME_TYPE[event.gameType]}</p>
                    <p>{BLINDS[event.blinds]}</p>
                    <p>{LIMIT[event.limit]}</p>
                    
                    
                </span>

                <span>
                    <p>{event.location}</p>
                    {attendees.map((attendant) => {return (
                        <p key={attendant.id}>{attendant.username}</p>
                    )})}
                </span>
            </div>
        
            <div className="flex">
                {isAttending ? (
                        <form
                            action={async () => {
                                "use server";
                                await handleLeave(event);
                            }}
                        >
                            <button className="font-sans md:px-6 md:py-4 text-sm hover:shadow-md text-white bg-red-700 rounded-full
                             hover:bg-red-600 transition-colors duration-300" type="submit">Leave</button>
                        </form>
                    ) : (
                        <form
                            action={async () => {
                                "use server";
                                await handleJoin(event);
                            }}
                        >
                            <button className="font-sans md:px-6 md:py-4 text-sm hover:shadow-md text-white bg-green-700 rounded-full
                             hover:bg-green-600 transition-colors duration-300" type="submit">Join</button>
                        </form>
                )}

                {isHost && (
                    //TODO here we can start using URL params to pull state
                    <Link href={`/events/${event.id}`}> 
                            <button className="font-sans md:px-6 md:py-4 text-sm hover:shadow-md text-white bg-gray-800 rounded-full
                            hover:bg-gray-700 transition-colors duration-300" type="submit">Manage Event</button>
                    </Link>
               
                )}

            </div>

            

        </div>  
    );
}

async function handleJoin(event){
    const eventId = event.id;
    const user = (await auth()).user;

    try {
        await prisma.event.update({
            where: {id: eventId},
            data: {
                attendees: {
                    connect: {
                        id: user.id
                    }
                }
            } 
        });
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to add user", error);
    }
}

async function handleLeave(event){
    const eventId = event.id;
    const user = (await auth()).user;

    try {
        await prisma.event.update({
            where: {id: eventId},
            data: {
                attendees: {
                    disconnect: {id: user.id}
                }
            } 
        });
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to remove user", error);
    }

}