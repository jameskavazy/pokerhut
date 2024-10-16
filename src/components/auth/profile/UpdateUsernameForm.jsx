"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { usernameSchema } from "../../../lib/schemas/usernameSchema";
import { useEffect } from "react";

export default function UpdateUsernameForm({session}){
    
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting, isSubmitSuccessful},
        reset,
        setError,
    } = useForm({
        defaultValues: {
            usernameChange: session.user.name,
        },
        resolver: zodResolver(usernameSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful && !isSubmitting){
            const timer = setTimeout(() => {
                reset({usernameChange: session.user.name});
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitSuccessful, isSubmitting, reset])

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
    
        // if (responseData.success) {
        // }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("usernameChange")} 
            name="usernameChange"
            type="text" 
            id="usernameChange"
            placeholder="Username"
            />
            <br></br>
            {errors.usernameChange && ( 
                <p>{errors.usernameChange.message}</p>
            )}
            {isSubmitSuccessful && !isSubmitting && (
                <p>Profile updated successfully</p>
            )}
            <label htmlFor="usernameChange">Your public username</label><br></br>
            <button disabled={isSubmitting} type="submit">Update Username</button>
        </form>
    )    
}


