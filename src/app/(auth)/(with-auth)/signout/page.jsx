import federatedLogout from "../../../../actions/auth/federatedLogout"
import { SignOut } from "../../../../components/auth/SignOut"

export default function Logout(){   
    return (
        <div className="flex flex-col items-center justify-center m-[-200px] h-screen">
            <h1 className="text-2xl">Are you sure you want to sign out?</h1>
            <br></br>
            <SignOut/>
        </div>
        
    )   
}