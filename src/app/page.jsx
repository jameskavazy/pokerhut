import HomeSessionless from '../components/home/HomeSessionless';
import { auth } from '../lib/auth';
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { HomeSessionless } from "@/components/home/HomeSessionless"

export default async function Home() {

  const session = await auth();

  console.log("The Session is ", session);
  // const router = useRouter();

  // const registerRoute = () => {
  //   router.push("/register")
  // }


  return (
    session == null ? <HomeSessionless/> : <p>Session Available</p>
  )
  
  
}