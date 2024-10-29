"use client"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { eventSearchSchema } from "../../lib/schemas/event-search/eventSearchSchema";

export default function Sidepanel(){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);


    const handleLocationSearch = useDebouncedCallback((query) => {
        
        const validatedParams = eventSearchSchema.parse({location: query}).location;

        if (query){
            params.set("location", validatedParams);

        } else {
            params.delete("location");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);


    return (
        <div className="w-1/6 bg-gray-50 p-12 h-screen">
            <h3>Filter</h3>

            <Link href="/events/my-events">
                <button className="text-xl font-bold mb-4 content-end">My events</button>
            </Link>
            
           <label>Location Search</label>
            <input className="border-slate-400 border-solid border p-1 rounded" onChange={(e) => {
                handleLocationSearch(e.target.value);
            }}/>
   
            <p className="text-xl font-bold mb-4 content-end">Friends select? maybe another search here... menu</p>
            <p>Date Range Filter?</p>

            <button onClick={() => {
                return replace("/?date=past")}}>Past Events</button>
        </div>
    )
}

