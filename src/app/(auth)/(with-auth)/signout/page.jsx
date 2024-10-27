import federatedLogout from "../../../../actions/auth/federatedLogout"
import { SignOut } from "../../../../components/auth/SignOut"

export default function Logout(){   
    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <h1 className="text-2xl md:m-0 m-4">Are you sure you want to sign out?</h1>
            <br></br>
            <SignOut/>
        </div>
    )   
}
