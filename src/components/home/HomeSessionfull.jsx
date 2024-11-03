import prisma from "../../lib/db";
import { auth } from "../../lib/auth";
import EventsPage from "../events/EventsPage";
import Sidepanel from "./Sidepanel";
import Link from "next/link";
import CreateEventButton from "../events/CreateEventButton";
import EventCard from "../events/EventCard";
import { eventDateSearchSchema, eventStringSearchSchema } from "../../lib/schemas/event-search/eventSearchSchema";
export default async function HomeSessionfull({searchParams}){


  const session = await auth();
  const user = session.user;
 
  
  let events = await getEventsFromParams(searchParams, user);


//https://www.youtube.com/watch?v=ukpgxEemXsk&t=45s

  return (
    <div className="flex bg-gray-50 mt-1 min-h-screen">  
          <div className="sticky top-0 h-screen w-1/6 ">
            <Sidepanel user={user}></Sidepanel>
          </div>
          
          <div className=" flex-grow bg-white p-12 space-y-4" >
            <h1 className="flex justify-center text-3xl">Discover Events</h1> 
            <Link href="/create">
            <div className="flex justify-end">
              <CreateEventButton >Create Event</CreateEventButton>
            </div>

            </Link>
            
            {/* TODO INSERT UPCOMING/PAST CARD/TOGGLE TABS */}
            {events.map((event) => {
              return (
              <EventCard key={event.id} event={event}></EventCard>
            )})}
            
          </div>
      </div>
    
  );
}


async function getEventsFromParams(searchParams, user){
  let events;
  let dateFrom;
  let dateTo; 
  let locationConditions = {};
  let dateConditions = {};
 

  if (searchParams.location) {
    locationConditions.mode = 'insensitive'
    locationConditions.contains = searchParams.location
  }

  if (searchParams.date === "past") {
    dateConditions.lt = new Date();
  } else {
    dateConditions.gte = new Date();
  }


  if (searchParams.dateFrom){
    const validateDateFrom = eventDateSearchSchema.safeParse(searchParams.dateFrom);
    if (validateDateFrom.success){
      dateFrom = new Date(validateDateFrom.data);
    } else dateFrom = new Date(); //searchParams.dateFrom;
  } else {
    dateFrom = new Date();
  }

  if (searchParams.dateTo){
    const validateDateTo = eventDateSearchSchema.safeParse(searchParams.dateTo);
    if (validateDateTo.success){
      dateTo = new Date(validateDateTo.data);

      dateTo.setTime(dateTo.getTime() + 24 * 60 * 60 * 1000);
      console.log(dateTo)
    } else dateTo = new Date();
  } else {
    const future = new Date();
    const t = future.setTime(future.getTime() + 30 * 24 * 60 * 60 * 1000);
    dateTo = new Date(t)
  }

  if (searchParams.myEvents === "1"){
    events = await prisma.event.findMany({
      include: {
        attendees: true,
        host: true,
      },
      where: {
        location: locationConditions,
        AND: [
          {
            time: {
              gte: dateFrom
            }
          },
          {
            time: {
              lte: dateTo
            }
          }
        ],
        OR: [
          {
            host: {
              username: user.username
            },             
          },
         {
            attendees: {
              some: {
                username: user.username,
              }
            }
         }
        ],
       
      },
      orderBy: {
        time: 'asc'
      }
    });
  } else {
    events = await prisma.event.findMany({
      include: {
        attendees: true,
        host: true,
      },
      where: {
        location: locationConditions,
        AND: [
          {
            time: {
              gte: dateFrom
            }
          },
          {
            time: {
              lte: dateTo
            }
          }
        ],
        host: {
          username: {
            contains: searchParams.host
          } 
        }
      },
      orderBy: {
        time: 'asc'
      }
    });
  }

  
  return events;
}