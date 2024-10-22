import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/nav-bar/NavBar";
import Sidepanel from "../components/home/Sidepanel";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PokerHut",
  description: "Created by JK",
};

export default function RootLayout({ children }) {
    


  return (
    <html lang="en">
      <body className={inter.className}>

        <NavBar></NavBar>
        {children}

        <footer>
            <p className="font-extralight text-center text-zinc-500">All rights reserved</p>
        </footer>
      </body>
    </html>
  );
}
