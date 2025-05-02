
import {z} from 'zod'


export const zPorject = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(3),
    image: z.array(
        z.object({
            id: z.string().uuid().optional(),
            name: z.string(),
            base64: z.string(),
            size: z.number(),
            type: z.string(),
            lastModified: z.number(),
        })
    ).min(1).max(10),
    Repository: z.string(),
    DeploymentPlatform: z.string(),
    url: z.string(),
    tool: z.array(
        z.object({
            id: z.string().uuid().optional(),
            name: z.string().min(2),
            Description: z.string().min(3).max(200),
        })
    ),
    PublishedDate: z.string().nullable()

})


export const zSession = z.object({
    id:z.string(),
    expire:z.string(),
})