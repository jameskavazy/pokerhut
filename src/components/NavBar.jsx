import { auth } from '../lib/auth'
import Link from "next/link";

export default async function NavBar(){

    const session = await auth();
    const user = session?.user;

    return (
        <header className="nav-bar">
            <Link href="/"><button className="nav-button">Home</button></Link> 
            <Link href="/payout-calculator"><button className="nav-button">Cash Game Payout Calculator</button></Link>
            <Link href="/leaderboard"><button className="nav-button">Leaderboard</button></Link>
            {session ? <Link href="/logout"><button className="nav-button">Log Out</button></Link> : <Link href="/api/auth/signin"><button className="nav-button">Log In</button></Link>}
            {session && <Link href="/profile"><button className="nav-button">Welcome {user.name}</button></Link>}           
        </header>   
    )
    
}
