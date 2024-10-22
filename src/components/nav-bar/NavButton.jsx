"use client"

import { usePathname } from "next/navigation"

export default function NavButton({children, linkname}) {
    const pathname = usePathname();
    

    return (
        <button className={`${pathname === linkname ? "bg-gray-100 shadow-md" : ""} 
        md:text-base text-sm font-sans md:px-6 md:py-4 px-2 py-2 text-gray-800 rounded-full  hover:bg-gray-100 hover:shadow-md transition duration-300 `} >
                {children}
        </button>
    )
}
