import { signIn } from "../../lib/auth";

export default function SignIn(){
    return (
        <form
            action={async () => {
                "use server"
            await signIn();//{redirect: true, redirectTo: "/"}
        }}
        >
          <button type="submit">Sign In</button>  
        </form>
    )
}