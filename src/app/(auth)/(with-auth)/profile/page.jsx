import { auth } from "@/auth"

export default async function ProfileName(){
    const session = await auth();

    if (!session.user) return null;

    return (
        <div>
            <p>{session.user.name}</p>
        </div>
    )
}