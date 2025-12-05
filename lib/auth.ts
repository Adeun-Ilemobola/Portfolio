import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { magicLinkEmailHtml } from "@/components/ResendTemplate/magicLinkHtml";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, ctx) => {
        const resend = new Resend(process.env.RESEND_API_KEY);
        console.log("the resend key : " + process.env.RESEND_API_KEY );
        
        if (email !== "adeunilemobola@gmail.com") return;
        await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: "adeunilemobola@gmail.com",
          subject: "hello world",
         html :magicLinkEmailHtml({
            url,
            token,
            mode: "dark",
         })
        
        });
      },
    }),
  ],
});
