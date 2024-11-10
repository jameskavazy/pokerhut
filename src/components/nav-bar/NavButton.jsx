"use client"

import { usePathname } from "next/navigation"

export default function NavButton({children, linkname}) {
    const pathname = usePathname();
    

    return (
        <button className={`${pathname === linkname ? "rounded border border-[#363a4115]" : ""} 
         md:px-6 md:py-4 px-2 py-2 rounded-lg  hover:bg-gray-100 hover:shadow-md transition duration-300 `} >
                {children}
        </button>
    )
}
