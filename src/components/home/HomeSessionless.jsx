import Link from 'next/link'
import { signIn } from '../../lib/auth';
import CtaButton from './CtaButton';

export default function HomeSessionless(){
    return (
        <div className='flex flex-col md:flex-row min-h-screen'>
              <div className="bg-white p-6 md:p-20 md:w-3/4 md:mt-60 mt-32">
                
                <h1 className='text-xl md:text-3xl'>Pokerhut</h1>
                <h2 className='text-lg md:text-3xl'>Free All-In-One Homegame Tool</h2>
                <br></br>
                <Link href={"/api/auth/signin"}>
                  <CtaButton>Get Started</CtaButton>
                </Link>
              </div>
                
              <div className="w-full  md:w-1/4 p-6 md:p-12 bg-gradient-to-r from-blue-500 to-purple-500" >
                {/* TODO IMAGE */}
              </div>
              
        </div>
        
      );


}

