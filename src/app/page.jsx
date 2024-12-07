import HomeSessionless from '../components/home/HomeSessionless';
import { auth } from '../lib/auth';
import { redirect } from "next/navigation";
import HomeSessionfull from '../components/home/HomeSessionfull';


export default async function Home({ searchParams }) {

  const session = await auth();
  
  if (session && !session?.user?.username) {
    redirect("/profile/settings")
  }
 

  return (
    <main>
      {session == null ? <HomeSessionless/> : <HomeSessionfull searchParams={searchParams}/>}
    </main>
  );
}