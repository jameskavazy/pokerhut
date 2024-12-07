"use client"

export const PostCard = () => {
    return (
        <div className="flex">
            <div className="flex flex-col gap-4 border">
                <p>Post #1</p>
                <p>Username</p>
                <p>Time</p>
                <p>Avatar</p>
            </div>
            <div className="border m-2">
                <p>Hi all and thanks for joining, todays game is being hosted at 123 Fleet Street. Come on down</p>
            </div>
        </div>
    )
}