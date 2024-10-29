import prisma from "../../lib/db";
import { auth } from "../../lib/auth";
import EventsPage from "../events/EventsPage";
import { date } from "zod";
export default async function HomeSessionfull({searchParams}){

  
  const session = await auth();
  const user = session.user;

  let locationConditions = {};
  let dateConditions = {}

  if (searchParams.location) {
    locationConditions.mode = 'insensitive'
    locationConditions.contains = searchParams.location
  }

  if (searchParams.date === "past") {
    dateConditions.lt = new Date()
  } else {
    dateConditions.gte = new Date();
  }

  console.log(dateConditions);

  let events = await prisma.event.findMany({
    include: {
      attendees: true,
      host: true,
    },
    where: {
      location: locationConditions,
      time: dateConditions
    },
    orderBy: {
      time: 'asc'
    }
  });

//https://www.youtube.com/watch?v=ukpgxEemXsk&t=45s

  return (
    <EventsPage searchParams={searchParams} user={user} events={events}></EventsPage>
  );
}