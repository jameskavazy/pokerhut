import Link from 'next/link'

export default function HomeSessionless({registerRoute}){
    return (
        <>
        <div className="container">
            <div className="home-screen-title">
              <h1>Pokerhut</h1>
              <h2>Free All-In-One Homegame Tool</h2>
              <br></br>
              <Link href={"/register"}><button className="cta">Get Started</button></Link>
              <Link href={"/login"}><button className="cta">Sign In</button></Link>
            </div>
          
            <div className="side-panel">
              {/* TODO IMAGE */}
            </div>
        </div>
        </>
      );
}
