"use client"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { eventSchema } from "../../lib/schemas/event-creation/eventSchema";
import { revalidatePath } from "next/cache";


export default function EventSettingsPanel({event}){

    const [isSuccess, setIsSuccess] = useState(false);


    const {refresh} = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm({
        defaultValues: {
            title: event.title,
            location: event.location,
            datetime: event.time.toISOString().substring(0, 16),
            limit: event.limit,
            gameType: event.gameType,
            blinds: event.blinds,
            id: event.id,
            hostId: event.hostId,   
        },
        resolver: zodResolver(eventSchema),
    });




    async function onSubmit(data) {
        //TODO handle submit
        console.log("Submitted Data = ", data);
      

        const response = await fetch("/api/updateEvent" , {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            setError("title", {
                type: "server",
                message: response.statusText,
            });
            return;
        }

        const responseData = await response.json();

        if (responseData.errors) {
            const errors = responseData.errors;
            if (errors.title) {
                setError("title", {
                    type: "server",
                    message: errors.title,
                });
            } else if (responseData.location){
                setError("location", {
                    type: "server",
                    message: errors.location,
                });
            } else if (responseData.datetime){
                setError("datetime", {
                    type: "server",
                    message: errors.datetime,
                });
            } else if (responseData.limit){
                setError("limit", {
                    type: "server",
                    message: errors.limit,
                });
            } else if (responseData.gameType){
                setError("gameType", {
                    type: "server",
                    message: errors.gameType,
                });
            } else if (responseData.blinds){
                setError("blinds", {
                    type: "server",
                    message: errors.blinds,
                });
            } else {
                alert("Unknown error has occured. Please try again later.")
            }
            return;
        }
        setIsSuccess(true);
        refresh(`/events/${event.id}`)
        
    }


    return (
        <div className="flex flex-col">

            <form className="flex flex-col space-y-1" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">Event Title</label>
                <input {...register("title")} 
                    id="title"
                    className={`${errors.title?.message ? 
                        "border-2 border-rose-600 focus:outline-none" : "border-slate-400 border-solid border"} p-1 rounded`}
                    name="title" 
                    type="text" 
                    />
                {errors.title && (
                    <p className={`${errors.title.message && "text-rose-600"}`}>
                            {errors.title.message}
                    </p>
                )}
                <label htmlFor="location">Location</label>
                <input {...register("location")} 
                    className={`${errors.location?.message ? 
                        "border-2 border-rose-600 focus:outline-none" : "border-slate-400 border-solid border"} p-1 rounded`}
                    id="location"
                    name="location" 
                    type="location"
                  />
                
                {errors.location && (
                    <p className={`${errors.location.message} && text-rose-600`}>
                        {errors.location.message}
                    </p>
                )}

                <label htmlFor="datetime">When</label>
                <input {...register("datetime")}
                className={`${errors.datetime?.message ? 
                    "border-2 border-rose-600 focus:outline-none" : "border-slate-400 border-solid border"} p-1 rounded`}
                id="datetime"
                name="datetime"
                type="datetime-local"
                />

                {errors.datetime && (
                    <p className={`${errors.datetime.message} && text-rose-600`}>{errors.datetime.message}</p>
                )}
                <label htmlFor="limit">Limit</label>
                <select {...register("limit")} 
                    className={`${errors.limit?.message ? 
                        "border-2 border-rose-600 focus:outline-none" : "border-slate-400 border-solid border"} p-1 rounded`}
                    id="limit" 
                    name="limit"
                    >
                        <option value="NoLimit">No Limit</option>
                        <option value="Limit">Limit</option>
                </select> 

                {errors.limit && (
                    <p className={`${errors.limit.message} && text-rose-600`}>{errors.limit.message}</p>
                )}
                <label htmlFor="gameType">Game Type</label>
                <select {...register("gameType")}
                className={`${errors.gameType?.message ? 
                    "border-2 border-rose-600 focus:outline-none" : "border-slate-400 border-solid border"} p-1 rounded`}
                    id="gameType"
                    name="gameType"
                    >

                    <option value="CashGame">Cash Game</option>
                    <option value="Tournament">Tournament</option>
                
                </select>

                {errors.gameType && (
                    <p className={`${errors.gameType.message} && text-rose-600`}>{errors.gameType.message}</p>
                )}
                <label htmlFor="blinds">Blinds/Buy In</label>
                <select {...register("blinds")} id="blinds" name="blinds" className={`${errors.blinds?.message ? 
                    "border-2 border-rose-600 focus:outline-none" : "border-slate-400 border-solid border"} p-1 rounded`}
                    >
                    <option value="SB_010_BB_020">£0.10/£0.20</option>
                    <option value="SB_025_BB_050">£0.25/£0.50</option>
                    <option value="SB_050_BB_100">£0.50/£1.00</option>
                    <option value="SB_100_BB_200">£1.00/£2.00</option>  
                </select>

                {errors.blinds && (
                    <p className={`${errors.blinds.message} && text-rose-600`}> {errors.blinds.message}</p>
                )}

                <br></br>
                <button className="font-sans px-6 py-2 md:px-6 md:py-4 text-sm hover:shadow-md text-white
                 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300" type="submit">Update</button>
                {isSuccess && (<p className="text-green-500">Event updated successfully.</p>)}
            </form>
        </div>
    )
        
        
}