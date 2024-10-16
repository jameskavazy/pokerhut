"use server"
import prisma from "../db";


export default async function isUsernameAvailable(username){
    return await prisma.user.findMany({
        where: {
            name: username
        }
    });    
}