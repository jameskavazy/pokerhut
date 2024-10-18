"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { usernameSchema } from "../../../lib/schemas/usernameSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";


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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("usernameChange")} 
            name="usernameChange"
            type="text" 
            id="usernameChange"
            placeholder="Username"
            onChange={() => setIsSuccess(false)}
            />
            <br></br>
            {errors.usernameChange && ( 
                <p>{errors.usernameChange.message}</p>
            )}
            {isSuccess && (
                <p>Profile updated successfully</p>
            )}
            <label htmlFor="usernameChange">Your public username</label><br></br>
            <button disabled={isSubmitting} type="submit">Update Username</button>
        </form>
    )    
}


