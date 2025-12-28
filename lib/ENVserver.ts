import 'server-only';
import z from "zod"

const PrivateENVSchema = z.object({

    DATABASE_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
    R2_ACCOUNT_ID: z.string(),
    R2_ACCESS_KEY_ID: z.string(),
    R2_SECRET_ACCESS_KEY: z.string(),
    R2_BUCKET_NAME: z.string(),
    R2_Token_value: z.string(),
    R2_ENDPOINT: z.string(),
    RESEND_API_KEY: z.string(),
})

export const PrivateENV = PrivateENVSchema.parse({
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID!,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID!,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY!,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME!,
    R2_ENDPOINT: process.env.R2_ENDPOINT!,
    R2_Token_value: process.env.R2_Token_value!,
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,
    DATABASE_URL: process.env.DATABASE_URL!,
})