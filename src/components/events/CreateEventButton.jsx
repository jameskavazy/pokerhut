"use client"

import { useSearchParams } from "next/navigation";
import { useState } from "react"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CreateEventButton({children}) {

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();


   

    //TODO set URL search params into URL for dialog=1 or dialogue = 0

    return (
        <button onClick={() => {
            params.set("createEvent", "1");
            replace(`${pathname}?${params.toString()}`)}} className="font-sans md:px-6 md:py-4 text-sm hover:shadow-md text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300" >
                {children}
        </button>
    )
}

