"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usernameSchema } from "../../../lib/schemas/username/usernameSchema";


export default function UpdateUsernameForm({session}){
    const [isSuccess, setIsSuccess] = useState(false);

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setError,
    } = useForm({
        defaultValues: {
            usernameChange: session.user.username,
        },
        resolver: zodResolver(usernameSchema),
    });

    
    
    async function onSubmit(data){
        console.log("onSubmit reached")
    
        const response = await fetch("api/updateUsername", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            setError("usernameChange", {
                type: "server",
                message: response.statusText,
            });
            return;
        }
    
        const responseData = await response.json();
    
        if (responseData.errors){
            const errors = responseData.errors;
            console.log(errors)
    
            if (errors.usernameChange) {
                setError("usernameChange", {
                    type: "server",
                    message: errors.usernameChange,
                })
            } else {
                alert("Unknown error has occured. Please try again later.");
            }
            return;    
        }
        setIsSuccess(true);
        router.refresh();
    }

    return (
        <>
            <div className="flex flex-col justify-center justify-items-center">
                <div className="flex w-1/6">
                </div>
                <div className="md:flex md:w-5/6 md:p-2" >
                    
                    <p className="md:p-8 ml-8 mr-8 md:border-r-2 md:text-center">
                        <span className="md:block">Change</span>
                        <span className="md:block">username</span> 
                    </p>
                    
                    
                    <form className="md:ml-12 ml-8 md:p-2" onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("usernameChange")} 
                        className={`${errors.usernameChange?.message ? "border-2 border-rose-600 focus:outline-none" : "border-slate-400 border-solid border"} p-1 rounded`} 
                        name="usernameChange"
                        type="text" 
                        id="usernameChange"
                        placeholder="Username"
                        onChange={() => setIsSuccess(false)}
                        />
                        <br></br>
                        {errors.usernameChange && ( 
                            <p className={`${errors.usernameChange?.message && "text-rose-600"}`}>{errors.usernameChange.message}</p>
                        )}
                        <label className="text-slate-700 text-sm" htmlFor="usernameChange">Your public username</label><br></br>
                        {isSuccess && (
                            <p className="text-green-500">Profile updated successfully.</p>
                        )}
                        <br></br>
                        <button className="font-sans px-6 py-4 hover:shadow-md text-white
                        bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300" 
                        disabled={isSubmitting} type="submit">Update Username</button>
                    </form>
                </div>
            </div>
        </>
        
        
    )    
}


