import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookieCache } from "better-auth/cookies";
import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from "./lib/auth";  // adjust path to your auth config

const handler = toNextJsHandler(auth);

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
    headers: request.headers, // equivalent to await headers() here
  });
    const  path = request.nextUrl.pathname;
    const isAuth = path==='/Auth' 
    const isLogin = path.startsWith('/Auth/login')
    console.log("[PROXY] incoming request:", {
    url: request.url,
    pathname: request.nextUrl.pathname,
    searchParams: Object.fromEntries(request.nextUrl.searchParams.entries()),
    cookies: request.cookies.getAll().map(c => ({ name: c.name, value: c.value })),
    session
  });


  
    if (path.startsWith('api')){
        return NextResponse.next();
    }
    if(!session && isAuth){
        const loginUrl = new URL('/Auth/login', request.url);
        return NextResponse.redirect(loginUrl);
        
    }

    if (session && isLogin){
        const homeUrl = new URL('/Auth', request.url);
        return NextResponse.redirect(homeUrl);
    }
   return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}