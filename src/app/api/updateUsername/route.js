import { NextResponse } from "next/server";
import { usernameSchema } from "../../../lib/schemas/username/usernameSchema";
import { auth } from '../../../lib/auth'
import prisma from "../../../lib/db";


export const revalidate = true;

export async function POST(request){
    const body = await request.json();

    const result = await usernameSchema.safeParseAsync(body);
    

    let zodErrors = {};
    let success = {}
    if (!result.success){
        result.error.issues.forEach((issue) => {
            zodErrors = {...zodErrors, [issue.path[0]]: issue.message };
        });
    } else {
        const session = await auth();
        if (session) {
            try {
                await prisma.user.update({
                    where: {
                        id: session.user.id
                    },
                    data: {
                        username: result.data.usernameChange,
                    }
                },);
            } catch (PrismaClientKnownRequestError){
                return NextResponse.json({error: "Internal server error" }, {status: 500});
            }
        } else {
            throw Error("Unauthorised")
        }
        success = {message: "Profile updated successfully"}
    }

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
        ? {errors: zodErrors}
        : {success: success }
    );
}