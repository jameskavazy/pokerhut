import EventsPage from "../../../../../components/events/EventsPage";
import { auth } from "../../../../../lib/auth";
import prisma from "../../../../../lib/db";

export default async function MyEvents({ searchParams }){
    
    const session = await auth();
    const user = session.user;

    let events;

    if (searchParams.location){
        events = await prisma.event.findMany({
            include: {
                host: true,
                attendees: true,
            },
            where: {
                OR: [ 
                        {
                            host: {
                                username: user.username,
                            },
                        },
                        {
                            attendees: {
                                some: {
                                    username: user.username
                                }
                            }
                        }
    
                    ], 
                AND: [
                    {
                        location: {
                            mode: 'insensitive',
                            contains: searchParams.location
                        }
                    }
                ]    
               
            }
        });

    } else {
        events = await prisma.event.findMany({
            include: {
                host: true,
                attendees: true,
            },
            where: {
                OR: [ 
                        {
                            host: {
                                username: user.username,
                            },
                        },
                        {
                            attendees: {
                                some: {
                                    username: user.username
                                }
                            }
                        }
    
                    ], 
                
            }        
        });
    }
    

    return (
        <EventsPage user={user} events={events}></EventsPage>
    );
}