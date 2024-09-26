"use server"
import { auth } from '@/auth'

export default async function getProfile() {
    const session = await auth();
    return session;  
}