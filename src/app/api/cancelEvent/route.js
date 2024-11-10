import { NextResponse } from "next/server";
import prisma from "../../../lib/db";


export async function DELETE(request){

    const body = await request.json();

    try {
        await prisma.event.delete({
            where: {
                id: Number(body.eventId),
            },
        });
    } catch (PrismaClientValidationError) {
        return NextResponse.json({message: "Error cancelling event"}, {status: 500})
    }
    
    return NextResponse.json({message: "OK"}, {status: 200})
}