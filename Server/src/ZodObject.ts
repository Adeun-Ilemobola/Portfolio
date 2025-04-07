
import { z } from 'zod'


export const zPorject = z.object({
    name: z.string().min(3),
    image: z.array(
        z.object({
            name: z.string(),
            base64: z.string(),
            size: z.number(),
            type: z.string(),
            lastModified: z.string(),
        })
    ).min(1).max(10),
    Repository: z.string(),
    DeploymentPlatform: z.string(),
    url: z.string(),
    tool: z.array(
        z.object({
            name: z.string().min(2),
            Description: z.string().min(3).max(200),
        })
    ),
    PublishedDate: z.string().nullable()

})