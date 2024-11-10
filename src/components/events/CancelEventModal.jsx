"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";

export default function CancelEventModal({ params }) {
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const customParams = new URLSearchParams(searchParams);
    const pathname = usePathname();

    const handleEventCancel = async () => {
        const {eventId} = params;
        const response = await fetch("/api/cancelEvent", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventId: eventId,
            })
        });
        setLoadingSpinner(false);

        if (!response.ok){
            alert("reponse not OK _ handeEventCancel" , response)
            return;
        }
        replace("/")
    }

    return (
        <div className={`w-screen h-screen top-0 left-0 right-0 fixed bg-black bg-opacity-75 z-10 ${searchParams.get("cancelEvent") ? "visible" : "hidden"}`}
             onClick={() => {
                customParams.delete("cancelEvent");
                replace(`${pathname}?${customParams.toString()}`);
             }}>
            <div className="bg-white flex flex-col items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-16 rounded-md"
                onClick={(e) => e.stopPropagation()}>
                <p>Are you sure?</p>
                <span className="flex gap-2 py-4 px-2">
                    <button className="text-white border-2 bg-red-600 rounded-full py-2 px-4 hover:bg-red-500 hover:shadow-sm"
                    onClick={() => {
                        setLoadingSpinner(true);
                        handleEventCancel();
                    }}>Cancel event</button>
                    <button className="border-2 rounded-full py-2 px-4 hover:bg-gray-200"
                    onClick={() => {
                        console.log("on go back clicked")
                        customParams.delete("cancelEvent")
                        replace(`${pathname}?${customParams.toString()}`)
                    }}>Go Back</button>
                </span>
                <span className={`animate-spin text-3xl ${loadingSpinner ? "visible" : "hidden"}`}>
                    <AiOutlineLoading/>
                </span>
            </div>
        </div>
    );
}