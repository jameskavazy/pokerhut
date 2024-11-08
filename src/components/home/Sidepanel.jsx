"use client"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";


export default function Sidepanel({ user }){

    function handleToggle(event) {
        if (event.target.checked){
            params.set("myEvents", 1)
            replace(`${pathname}?${params.toString()}`)
        } else {
            params.delete("myEvents")
            replace(`${pathname}?${params.toString()}`)
        }
    }

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
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
        <div className="sticky top-24 h-screen w-1/6 p-12">
            {/* <h4 className=" text-3xl p-4">Filter Events</h4> */}

            <div className="flex flex-col justify-between">
                <label htmlFor="dateFrom">Date From</label>
                <input className="text-lg" id="dateFrom" type="date" defaultValue={todayDate} onChange={(e) => handleQuerySearch(e.target.value, "dateFrom")}></input>
                <label htmlFor="dateTo">Date To</label>
                <input className="text-lg" id="dateTo"type="date" defaultValue={thirtyDaysDate} onChange={(e) => handleQuerySearch(e.target.value, "dateTo")}></input>
            </div>
            
            <div className="flex flex-col pt-1 pb-2">  
                <span>My Events</span>          
                <label className="relative inline-block w-16 h-8"> 
                    <input type="checkbox" className="sr-only peer" onChange={handleToggle} />
                    <span
                    className="absolute inset-0 bg-gray-300 rounded-full transition duration-300 peer-checked:bg-blue-500"
                    ></span>
                    <span
                    className="absolute left-1 top-1 h-6 w-6 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-8"
                    ></span>
                    
                </label>
                
            </div>
         
            
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

