"use server"
import EventCard from "../../../../../components/events/EventCard";
import prisma from "../../../../../lib/db";
import { auth } from "../../../../../lib/auth";
import { revalidatePath } from "next/cache";

export default async function ProfilePage({params}){
    
    const username = params.profileId;
    const session = await auth();

    const sessionUser = await prisma.user.findUnique({
        include:{
            followedBy: true,
            following: true,
        },
        where: {
            username: session.user.username,
        }
    });

    const profileUser = await prisma.user.findUnique({
        include:{
            followedBy: true,
            following: true,
        },
        where: {
            username: username,
        }
    });

    const hostedEvents = await prisma.event.findMany({
        include: {
            host: true,
            attendees: true
        },
        where: {
           hostId: profileUser.id,
        },
        orderBy: {
            time: "desc"
        }
    });

    console.log(`Session User: ${sessionUser.username} Profile User: ${profileUser.username}`);

    return (
        <div className="flex md:flex-row flex-col md:justify-between">
            <div className="p-4 ml-12 flex flex-row md:flex-col justify-around md:justify-start">
                <img src={profileUser.image} size="24" className="rounded-full" ></img>
                <div className="p-2 ">
                    <p>{profileUser.username}</p>

                    {sessionUser.username !== profileUser.username && (

                        
                    
                        sessionUser.following.some((following) => {
                            return following.username === profileUser.username;
                            }) ?    
                            (<form action={async () => {
                                "use server"
                                handleUnfollow(sessionUser, profileUser);
                                revalidatePath(`/profile/${profileUser.username}`);
                            }}>
                                <button className="border text-sm md:text-base text-white border-[#363a4115] px-4 py-1 flex rounded shadow-sm hover:shadow-md hover:bg-[#4651f1a6] bg-[#4651f1c0] transition duration-300"> Unfollow</button>
                            </form>) 
                            
                            :
                            
                            (<form action={async () => {
                                "use server"
                                handleFollow(sessionUser, profileUser);
                                revalidatePath(`/profile/${profileUser.username}`);
                            }}>
                                <button className="border text-sm md:text-base text-white border-[#363a4115] px-4 py-1 flex rounded shadow-sm hover:shadow-md hover:bg-[#4651f1a6] bg-[#4651f1c0] transition duration-300">Follow</button>
                            </form>))
                    }

                    
                </div>
                <div className="flex flex-col">
                    <p>{(profileUser.followedBy).length} followers</p>
                    <p>{(profileUser.following.length)} following</p>
                    <p>Events hosted: {hostedEvents.length}</p>
                </div>

               

            </div>

            

            <div className="p-1 mx-4 md:p-8 space-y-4 md:w-4/5">
                <h2 className="text-center">{`${username}'s events`}</h2>
                {hostedEvents.map((event) => {
                    return (
                        <EventCard key={event.id} event={event}/>
                    );
                })}
            </div>
        </div>
    );
}

const handleUnfollow = async (sessionUser, profileUser) => {
    await prisma.user.update({
        where: {
            username: sessionUser.username,
        },
        data: {
            following: {
                disconnect: {
                    username: profileUser.username,
                }
            }
        }
    });
    revalidatePath(`/profile/${profileUser.username}`);
}


const handleFollow = async (sessionUser, profileUser) => {
    if (sessionUser.username === profileUser.username) return;
    await prisma.user.update({
        where: {
            username: sessionUser.username,
        },
        data: {
            following: {
                connect: {
                    username: profileUser.username,
                }
            }
        }
    });
    
}