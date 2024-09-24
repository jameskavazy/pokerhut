import { Inter } from "next/font/google";
import "./globals.css";
import router from "next/navigation";
import Link from "next/link";
import {auth} from '@/auth'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Poker Cashout Calculator",
  description: "Created by JK",
};

export default async function RootLayout({ children }) {

  const session = await auth();

 

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="nav-bar">
            <Link href="/"><button className="nav-button">Home</button></Link> 
            <Link href="/payout-calculator"><button className="nav-button">Cash Game Payout Calculator</button></Link>
            <Link href="/leaderboard"><button className="nav-button">Leaderboard</button></Link>
            {session ? <Link href="/logout"><button className="nav-button">Log Out</button></Link> : <Link href="/login"><button className="nav-button">Log In</button></Link>}
            <Link href="/register"><button className="nav-button">Sign Up</button></Link>            
            <hr></hr>
            
        </header>   

        {children}

        <footer>
            <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
