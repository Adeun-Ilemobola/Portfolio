import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins";
import { PublicENV } from "./ENV";


export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: PublicENV.NEXT_PUBLIC_VERCEL_URL ,
    plugins: [
        magicLinkClient()
    ]
})