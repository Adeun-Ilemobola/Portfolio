import z from "zod"


const PublicENVSchema = z.object({
    NEXT_PUBLIC_VERCEL_URL: z.string(),
    NEXT_PUBLIC_R2_PUBLIC_BASE_URL: z.string(),
  

})

export const PublicENV = PublicENVSchema.parse({
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL!,
    NEXT_PUBLIC_R2_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL!,
})

