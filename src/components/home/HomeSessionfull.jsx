import prisma from "../../lib/db";
import { auth } from "../../lib/auth";
import Sidepanel from "./Sidepanel";
import { redirect } from "next/navigation";
import CreateEventButton from "../events/CreateEventButton";
import EventCard from "../events/EventCard";
import CreateEventForm from "../events/CreateEventForm";
import { eventDateSearchSchema } from "../../lib/schemas/event-search/eventSearchSchema";
export default async function HomeSessionfull({ searchParams }){


  const session = await auth();
  const user = session?.user;

  // if (!session){
  //   redirect("/api/auth/signin");
  // } 

  let events = await getEventsFromParams(searchParams, user);


  return (
      <div className="bg-gray-50 flex" > 
          <CreateEventForm></CreateEventForm>

          
          <Sidepanel user={user}></Sidepanel>
          

        <div className="flex-grow p-12 bg-white " >
              <h1 className="text-center text-3xl">Discover Events</h1> 

              <div className="flex md:justify-end w-full">
                <CreateEventButton >Create Event</CreateEventButton>
              </div>

              <div className="p-1 md:p-8 space-y-4">
                {events.map((event) => {
                  return (
                  <EventCard key={event.id} event={event}></EventCard>
                )})}  
              </div>
          
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
    locationConditions.mode = 'insensitive';
    locationConditions.contains = searchParams.location;
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
    } else dateFrom = new Date();
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
              username: user?.username
            },             
          },
         {
            attendees: {
              some: {
                username: user?.username,
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