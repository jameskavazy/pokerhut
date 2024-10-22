import DateCard from "./DateCard";

export default function EventCard(){
    return (
        <div className="flex bg-gray-50 rounded-3xl p-12 shadow animate-fade">
             <div className="w-1/12">
                <DateCard></DateCard>
            </div>

            <div className="flex w-11/12 justify-around">
                <span>
                    <p>Title</p>
                    <p>Time</p>
                </span>

                <span>
                    <p>Location</p>
                    <p>Attendees</p>
                </span>
            </div>
        </div>  
    );
}