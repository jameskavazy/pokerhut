import { auth } from '../../lib/auth'
import Link from "next/link";
import NavButton from './NavButton';
import NavButtonPrimary from './NavButtonPrimary';
import CtaButton from '../home/CtaButton';
export default async function NavBar(){

    const session = await auth();
    const user = session?.user;

    return (
        <header className="sticky top-0 z-10 flex justify-around md:justify-center bg-gray-50 p-4 md:py-6 shadow-md w-full">
            <div className="flex w-full md:w-3/4 justify-around">
                <Link href="/">
                    <NavButton linkname={"/"}>Home</NavButton>
                </Link> 
                <Link href="/payout-calculator">
                    <NavButton linkname={"/payout-calculator"}>Cash Game Payout Calculator</NavButton>
                </Link>
                {session ? (
                        <Link href="/signout">
                            <NavButton>Log Out</NavButton>
                        </Link> 
                    ) : ( 
                        <Link href="/api/auth/signin">
                            <CtaButton>Sign In</CtaButton>
                        </Link>
                    )
                }
                {session && (
                    <Link href="/profile">
                        <NavButtonPrimary>
                            Welcome {user.username || user.name}
                        </NavButtonPrimary>
                    </Link>
                )}
            </div>            
        </header>   
    )
    
}
