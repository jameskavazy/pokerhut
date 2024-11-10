"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function CancelEventButton() {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams);

    const handleClick = (e) => {
        params.set("cancelEvent", "1");
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <button className=" flex justify-center border-2 border-rose-500 rounded-full p-2 hover:bg-rose-200 hover:shadow-sm" 
        onClick={handleClick}>Cancel Event</button>
    )
}