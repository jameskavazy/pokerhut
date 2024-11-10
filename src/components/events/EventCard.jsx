import { auth } from "../../lib/auth";
import DateCard from "./DateCard";
import prisma from "../../lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import PlaceholderProfileImage from "../user/PlaceholderProfileImage";

export default async function EventCard({event}){

    const user = (await auth()).user;
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
        <div className="flex bg-gray-50 rounded-3xl p-6 shadow animate-fade">
             <div className="flex flex-col w-1/12 justify-center">
                <DateCard event={event}></DateCard>
            </div>

            <div className="flex flex-col w-5/12 ml-12">       
                <p className="font-bold">{event.title}</p>
                <div>
                    <span>
                        {event.host.image ? <img src={event.host.image} alt="user image" width={24} className="rounded-full"/> : <PlaceholderProfileImage/>}
                    </span>
                   
                    <p>{event.host.username}</p>
                </div>
                
                <p>{event.time.toLocaleString("en-gb", {hour: '2-digit', minute: "2-digit"})}</p>
                <p>{GAME_TYPE[event.gameType]}</p>
                <p>{BLINDS[event.blinds]}</p>
                <p>{LIMIT[event.limit]}</p>     
            </div>

            <div className="flex w-6/12 justify-between">
                <div className="flex flex-col">
                    <p>{event.location}</p>
                    {attendees.map((attendant) => {
                        return (
                        <Link key={attendant.id} href={`/profile/${attendant.username}`}>
                            <div className="flex gap-1 mt-1">
                                {attendant.image ? <img src={attendant.image} alt="user image" width={24} className="rounded-full"/> : <PlaceholderProfileImage/>}
                                <p >{attendant.username}</p>
                            </div>
                        </Link>
                    )
                    })}
                </div>
            
                <div className="flex flex-col justify-between justify-items-end gap-2">
                    {isAttending ? (
                            <form
                                action={async () => {
                                    "use server";
                                    await handleLeave(event);
                                }}
                            >
                                <button className="font-sans p-2 text-sm hover:shadow-md text-white bg-slate-700 rounded-full
                                hover:bg-slate-400 transition-colors duration-300" type="submit">Leave</button>
                            </form>
                        ) : (
                            <form
                                action={async () => {
                                    "use server";
                                    await handleJoin(event);
                                }}
                            >
                                <button className="font-sans text-white border-gray-500 p-2 text-sm hover:shadow-md bg-slate-700 rounded-full
                                hover:bg-slate-400 transition-colors duration-300" type="submit">Join</button>
                            </form>
                    )}

                    
                    
                        <Link href={`/events/${event.id}`}> 
                                <button className="font-sans p-2 text-sm hover:shadow-md text-white bg-indigo-700 rounded-full
                                hover:bg-gray-700 transition-colors duration-300" type="submit">{isHost ? "Manage Event" : "View Event"}</button>
                        </Link>
                </div>
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