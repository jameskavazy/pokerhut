"use client"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { eventDateSearchSchema, eventStringSearchSchema } from "../../lib/schemas/event-search/eventSearchSchema";
import { useEffect } from "react";


export default function Sidepanel({ user }){
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push, replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const today = new Date();
    const todayDate = today.toISOString("en-gb").substring(0, 10);
    const thirtyDays = new Date(today.setTime(today.getTime() + 30 * 24 * 60 * 60 * 1000));
    const thirtyDaysDate = thirtyDays.toISOString("en-gb").substring(0 , 10);


    const handleQuerySearch = useDebouncedCallback((query, field) => {
        if (query){
            params.set(field, query);

        } else {
            params.delete(field);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);


    

    return (
        <div className="w-1/6 bg-gray-50 p-12 h-screen">
            <label>Date From</label>
            <input type="date" defaultValue={todayDate} onChange={(e) => handleQuerySearch(e.target.value, "dateFrom")}></input>
            <label>Date To</label>
            <input type="date" defaultValue={thirtyDaysDate} onChange={(e) => handleQuerySearch(e.target.value, "dateTo")}></input>
    
            <button onClick={() => {
                params.set("myEvents", 1)
                replace(`${pathname}?${params.toString()}`);

            }} className="text-m font-bold mb-4 content-end">My events</button>
            <button onClick={() => {
                params.delete("myEvents")
                replace(`${pathname}?${params.toString()}`)
            }} className="text-m font-bold mb-4 content-end">All Events</button>
         
            
           <label>Location</label>
                <input className="border-slate-400 border-solid border p-1 rounded" onChange={(e) => {
                    handleQuerySearch(e.target.value, "location");
            }}/>

            <label>Hosts</label>
                <input 
                placeholder={`${searchParams.get("myEvents") === "1" ? user.username : ""} `}
                disabled={searchParams.get("myEvents") === "1"}
                 className={`border-slate-400 border-solid border p-1 rounded 
                ${searchParams.get("myEvents") === "1" && "bg-slate-200"}`} 
                onChange={(e) => {handleQuerySearch(e.target.value, "host");
            }}/>
   
        </div>
    )
}

