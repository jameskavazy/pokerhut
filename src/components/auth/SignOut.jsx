import { signOut } from "../../lib/auth"

export function SignOut(){
    return (
        <form
            action={async () => {
                "use server"
                await signOut({redirect: true, redirectTo: "/"})
            }} 
        >
            <button className="font-sans px-6 py-4 text-sm hover:shadow-md text-white
             bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300" type="submit">Sign Out</button>
        </form>
    )
}