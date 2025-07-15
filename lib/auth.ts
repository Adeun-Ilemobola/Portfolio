import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./database";

import { admin } from "better-auth/plugins"
import { schema } from "./auth-schema";



export  const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
    baseUrl: process.env.BETTER_AUTH_URL!,
     trustedOrigins: [
    'http://localhost:3000',                   // keep local dev
    'https://portfolio‑972t.onrender.com',     // your Render production URL
  ],
  database: drizzleAdapter(db, {
    provider:"pg", // or "pg" or "mysql"
     schema: {
      ...schema,
      user: schema.user,
    },
   
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin(),
  ],
 

});