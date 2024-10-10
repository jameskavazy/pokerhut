import { Inter } from "next/font/google";
import "./globals.css";
import router from "next/navigation";
import NavBar from "../components/NavBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Poker Cashout Calculator",
  description: "Created by JK",
};

export default function RootLayout({ children }) {

  

  return (
    <html lang="en">
      <body className={inter.className}>
        
        <NavBar></NavBar>
        {children}

        <footer>
            <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
