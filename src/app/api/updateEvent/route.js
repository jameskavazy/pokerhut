import { NextResponse } from "next/server";
import { auth } from "../../../lib/auth";
import { eventSchema } from "../../../lib/schemas/event-creation/eventSchema";
import prisma from "../../../lib/db";

export async function POST(request) {
    const body = await request.json();
    const result = await eventSchema.safeParseAsync(body);

    let zodErrors = {};
    let success = {};

    if (!result.success){
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        });
    } else {
        const session = await auth();
        if (session) {
            const user = session.user;
            if (user.id === result.data.hostId) {
                try {
                    await prisma.event.update({
                        where: {
                            id: result.data.id,
                        },
                        data: {
                            title: result.data.title,
                            time: new Date(result.data.datetime),
                            location: result.data.location,
                            limit: result.data.limit,
                            gameType: result.data.gameType,
                            blinds: result.data.blinds,
                        }
                    });              
                } catch (PrismaClientValidationError) {
                    return NextResponse.json({error: "Error updating event" }, {status: 500});
                }
            } else {
                throw new Error("Unauthorised")
            }
             
        } else {
            throw new Error("Unauthorised");
        }
    
        success = {message: "Event updated successfully"};
        // revalidatePath(`/events/${result.data.id}`)
    }

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
        ? {errors: zodErrors}
        : {success: success }
    );

}