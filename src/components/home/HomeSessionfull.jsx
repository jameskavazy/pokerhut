import prisma from "../../lib/db";
import { auth } from "../../lib/auth";
import Sidepanel from "./Sidepanel";
import Link from "next/link";
import CreateEventButton from "../events/CreateEventButton";
import EventCard from "../events/EventCard";
import CreateEventForm from "../events/CreateEventForm";
import { eventDateSearchSchema, eventStringSearchSchema } from "../../lib/schemas/event-search/eventSearchSchema";
export default async function HomeSessionfull({searchParams}){


  const session = await auth();
  const user = session.user;
  let events = await getEventsFromParams(searchParams, user);




  return (
    <>

      <div>
        
        <div className={`w-screen h-screen top-0 left-0 right-0 fixed bg-black bg-opacity-75 z-40 ${searchParams.createEvent ? "visible" : "hidden"}`}></div>
          
            <div className={`${searchParams.createEvent ? "visible z-50" : "hidden"} absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-16 rounded-md `}>
                <CreateEventForm></CreateEventForm>
            </div>
          
          

          <div className="flex bg-gray-50 mt-1 min-h-screen">  
            <div className="sticky top-24 h-screen w-1/6 ">
              <Sidepanel user={user}></Sidepanel>
            </div>
          
            <div className=" flex-grow bg-white p-12 space-y-4" >
              <h1 className="flex justify-center text-3xl">Discover Events</h1> 
              
                <div className="flex justify-end">
                {/* <Link href="/create"> */}
                  <CreateEventButton >Create Event</CreateEventButton>
                {/* </Link> */}
                </div>

                {/* TODO INSERT UPCOMING/PAST CARD/TOGGLE TABS */}
                {events.map((event) => {
                  return (
                  <EventCard key={event.id} event={event}></EventCard>
                )})}  
            </div>
            

        </div>
        
      </div>
    </>
   
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