'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <App></App>

  );
}

function App(){
  const router = useRouter();

  const registerRoute = () => {
    router.push("/login")
  }

  
  return (
    <>
    <div className="container">
        <div className="home-screen-title">
          <h1>Full House Payouts</h1>
          <h2>Straight forward and simple payouts for home games</h2>
          <br></br>
          <button className="cta" onClick={registerRoute}>Get Started</button>
        </div>
      
        <div className="side-panel">
          {/* TODO IMAGE */}
        </div>
    </div>
    </>
  );
}
