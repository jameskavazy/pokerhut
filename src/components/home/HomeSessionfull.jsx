import EventCard from "../events/EventCard";
import Sidepanel from "./Sidepanel";
export default function HomeSessionfull(){
    return (
        
        <div className="flex bg-gray-50 mt-1 min-h-screen">

        {/* Left Sidebar */}
          <div className="sticky top-0 h-screen w-1/6 ">
            <Sidepanel>
              <h3>Filter</h3>
              <p className="text-xl font-bold mb-4 content-end">My events</p>
              <p className="text-xl font-bold mb-4 content-end">Near you</p>
              <p className="text-xl font-bold mb-4 content-end">Friends</p>
            </Sidepanel>
          </div>
          

          {/* Main Content */}
          <div className=" flex-grow bg-white p-12 space-y-4" >
            <h2 className="text-2xl font-bold mb-4">Main Content</h2>
            {/* TODO INSERT UPCOMING/PAST CARD/TOGGLE TABS */}
            <EventCard></EventCard>
            <EventCard></EventCard>
            <EventCard></EventCard>
            <EventCard></EventCard>
            <EventCard></EventCard>
          </div>
      </div>
     
      );
}

