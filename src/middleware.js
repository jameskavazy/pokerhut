import { NextResponse } from "next/server"

// export function middleware(request){
//     const token = request.headers.get("Authorization");
//     if (token === null) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return NextResponse.next();

// }

// export {auth as middleware} from "@/auth"

// export const config = {
//     matcher: ["/api/:path*"],
// }


export function middleware(request){
    const token = request.headers.get("Authorization");
        // if (!token) {
        //     return NextResponse.redirect(new URL("/login", request.url));
        // }

        return NextResponse.next();
   
}
