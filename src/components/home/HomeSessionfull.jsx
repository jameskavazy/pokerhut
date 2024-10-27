import Link from "next/link";
import prisma from "../../lib/db";
import EventCard from "../events/EventCard";
import CreateEventButton from "./CreateEventButton";
import Sidepanel from "./Sidepanel";
export default async function HomeSessionfull(){


  // const primsaUser = await prisma.user.findUnique({
  //   where: {
  //     id: user.id,
  //   },
  //   include: {
  //     followedBy: true,
  //     following: true,
  //   }
  // })
 

  // console.log("this is prisma user: " , primsaUser);

//  await prisma.event.create({
//     data: {
//       title: "Test",
//       time: new Date(),
//       host: {
//         connect: {
//           id: user.id,
//         }
//       },
//       location: "Manchester",
//       limit: "Limit",
//       gameType: "CashGame",
//       blinds: "SB_100_BB_200"
//     }
//   })

  // const users = await prisma.user.findMany();
  const events = await prisma.event.findMany({
    include: {
      attendees: true,
      host: true,
    }
  });

    return (

        <div className="flex bg-gray-50 mt-1 min-h-screen">       
          <div className="sticky top-0 h-screen w-1/6 ">
            <Sidepanel>
              <h3>Filter</h3>
              <p className="text-xl font-bold mb-4 content-end">My events</p>
              <p className="text-xl font-bold mb-4 content-end">Location (should be a select menu)</p>
              <p className="text-xl font-bold mb-4 content-end">Friends select menu</p>
            </Sidepanel>
          </div>
          
          <div className=" flex-grow bg-white p-12 space-y-4" >
            
            <Link href="/create">
              <CreateEventButton>Create Event</CreateEventButton>
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