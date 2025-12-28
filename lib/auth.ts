import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { magicLink } from "better-auth/plugins";
import { renderTemplate, resend } from "./emailTemp";
import { PrivateENV } from "./ENVserver"; 

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret:PrivateENV.BETTER_AUTH_SECRET,
  baseURL: PrivateENV.BETTER_AUTH_URL,
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
         await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: email,
         ...(renderTemplate("MagicLinkTemplate"  , {
            url: url,
            token: token,
            mode: "dark",
          })),
        })
      },
    }),
  ],
});
