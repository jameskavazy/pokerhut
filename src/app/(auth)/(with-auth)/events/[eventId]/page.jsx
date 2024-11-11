import { redirect } from "next/navigation";
import EventSettingsPanel from "../../../../../components/events/EventSettingsPanel";
import { auth } from "../../../../../lib/auth";
import prisma from "../../../../../lib/db";
import { revalidatePath } from "next/cache";
import { FaClock, FaCalendar, FaUser, FaRegUser, FaCoins, FaTrophy, FaBan } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbDoorExit } from "react-icons/tb";
import { IoCashOutline } from "react-icons/io5";
import CancelEventButton from "../../../../../components/events/CancelEventButton";
import CancelEventModal from "../../../../../components/events/CancelEventModal";

export default async function EventPage({params}){
   
    const {eventId} = params;
    const session = await auth();
    const user = session.user;
    let isHost = false;

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
            <CancelEventModal params={params}/>
            <h1 className="mt-6 ml-20 text-3xl text-center">{event.title}</h1>  

            <div className="flex justify-between border-2 p-2 mt-6"> 
                <div className="flex w-full justify-center p-2 gap-12">
                    <div className="text-xl flex flex-col ">
                            <div className="flex items-center gap-2">
                                <FaClock ></FaClock>
                                <h2>{event.time.toLocaleString("en-gb", {hour: '2-digit', minute: "2-digit"})}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendar ></FaCalendar>
                                <h2>{event.time.getDate("en-gb")}</h2>
                                <h2>{new Date(event.time).toLocaleString('default', {month: 'short', year: 'numeric'})}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUser />
                                <p>{event.host.username}</p>   
                            </div>
                            <div className="flex items-center gap-2">
                                <FaLocationDot />
                                <p>{event.location}</p>
                            </div>
                    </div>

                    <div className="flex flex-col text-xl mr-20 ">                            
                            <div className="flex flex-col">
                                <span className="flex items-center">
                                    <FaRegUser className="z-10 opacity-40"  />
                                    <FaRegUser className="-translate-x-2"/>
                                    <h3>Attendees</h3>
                                </span>
                                {(event.attendees).map((attendee) => { 
                                    return (
                                        <div className="flex mt-2 gap-4" key={attendee.id}>
                                            <span className="flex items-center gap-2">
                                                <img src={attendee.image} className="rounded-full size-6"></img>
                                                <p  className="text-black">{attendee.username}</p> 
                                            </span>
                                            
                                            <form action={async () => { 
                                                "use server"
                                                if (event.hostId === user.id || attendee.id === user.id) {
        
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
                                                <button key={attendee.id} className="flex rounded-full gap-2 ml-1 mr-1 pl-1 pr-1 text-ellipsis items-center">
                                                    <TbDoorExit/> Leave
                                                </button>)}    
                                            {(event.hostId === user.id && event.hostId !== attendee.id) && (
                                                <button key={attendee.id} className="flex rounded-full gap-2 items-center">
                                                    <FaBan /> Kick
                                                </button>)}
                                                
                                            </form>                             
                                            
                                        </div>
                                        
                                    )
                                })}
                            </div>
                    </div>

                    <div className="flex flex-col text-xl gap-2">
                        <span className="flex items-center gap-2">
                            <FaCoins/>
                            <p>{BLINDS[event.blinds]}</p>
                        </span>
                        
                        <span className="flex items-center gap-2">
                            {event.gameType === "CashGame" && <IoCashOutline />}
                            {event.gameType === "Tournament" && <FaTrophy />}
                            <p>{GAME_TYPE[event.gameType]}</p>
                        </span>
                    </div>

                </div> 
                {isHost &&  
                    <div className="flex flex-col w-1/3 p-4 gap-2 border-l-2">
                        <div className="flex justify-between  pb-2">
                            <p className="text-3xl mb-2">Settings</p>
                            <CancelEventButton/>
                        </div>                           
                        <EventSettingsPanel event={event}/>
                    </div>
                }     
            </div>
        </>
            :
                    
            <p className="text-3xl text-center p-40"> 404 | Event not found</p>
    );
}

    
    
    


