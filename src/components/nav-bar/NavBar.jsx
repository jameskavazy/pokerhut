import { auth } from '../../lib/auth'
import Link from "next/link";
import NavButton from './NavButton';
import CtaButton from '../home/CtaButton';
import DropDownBox from './DropDownBox';


export default async function NavBar() {

    const session = await auth();
    const user = session?.user;

    const options = [
        {id: 4, content: "Payout Calculator", link: `/payout-calculator`},
        {id: 1, content: "Profile", link: `/profile/${user?.username}`},
        {id: 2, content: "Settings", link: `/profile/settings`},
        {id: 3, content: "Sign Out", link: `/signout`},     
    ]




    return (
        <header className="sticky top-0 z-40 flex justify-around md:justify-center bg-gray-50 p-4 md:py-6 shadow-md w-full">
            <div className="p-2">
                <Link href="/">
                    <p className='font-bold lg:text-3xl'>pokerhut.co.uk</p>
                </Link>
            </div>
            
            <div className="sm:flex w-full md:w-3/4 justify-center gap-4 sm:visible hidden">
                <Link href="/">
                    <NavButton linkname={"/"}>Home</NavButton>
                </Link> 
                <Link href="/payout-calculator">
                    <NavButton linkname={"/payout-calculator"}>Payout Calculator</NavButton>
                </Link>
            </div> 
            <div>
                {!session && (
                        <Link href="/api/auth/signin">
                            <CtaButton>Sign In</CtaButton>
                        </Link>
                    )
                }
                {session && (
                    <DropDownBox user={user} options={options}></DropDownBox>
                )}    
            </div>
                           
                      
        </header>   
    );
}
