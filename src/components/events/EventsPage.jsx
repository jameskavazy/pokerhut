import Sidepanel from "../home/Sidepanel";
import Link from "next/link";
import EventCard from "./EventCard";
import CreateEventButton from "./CreateEventButton";


export default function EventsPage({user, events}){
    return (

        <div className="flex bg-gray-50 mt-1 min-h-screen">       
          <div className="sticky top-0 h-screen w-1/6 ">
            <Sidepanel user={user}></Sidepanel>
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