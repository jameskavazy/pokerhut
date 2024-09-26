// import { signIn } from  '@/auth'
import { signIn } from '@/auth'

export default function SignIn(){
    return (
        <form
            action={async () => {
                "use server"
            await signIn("keycloak", {redirect: true, redirectTo: "/"})
        }}
        >
          <button type="submit">Sign In</button>  
        </form>
    )
}