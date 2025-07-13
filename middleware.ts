import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const Rount = {
    auth: ["/admin"],
    main: ["/admin/dashboard"],
};

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;
    console.log("------- middleware -------");

    const isLoginPage = pathname === "/admin";
    const isDashboardPage = pathname.startsWith("/admin/dashboard");
    const session = getSessionCookie(request);
    console.log({
        isLoginPage,
        isDashboardPage,
        session,
        pathname,
    });

    if (request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next();
    }
    if (isLoginPage && session) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // 2) If I’m on the dashboard (or any protected) and I *don’t* have a session → go login
    if (isDashboardPage && !session) {
        return NextResponse.redirect(new URL("/admin", request.url));
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
};
