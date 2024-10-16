import { signOut } from "../../lib/auth"

export function SignOut(){
    return (
        <form
            action={async () => {
                "use server"
                await signOut({redirect: true, redirectTo: "/"})
            }} 
        >
            <button type="submit">Sign Out</button>
        </form>
    )
}