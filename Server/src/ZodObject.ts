
import {z} from 'zod'


export const zPorject = z.object({
    id: z.string().optional(),
    name: z.string().min(3),
    image: z.array(
        z.object({
            id: z.string().optional(),
            projectId: z.string().optional(),
            name: z.string(),
            base64: z.string(),
            size: z.number(),
            type: z.string(),
            lastModified: z.number(),
        })
    ).min(1).max(10),
    repository: z.string(),
    deploymentPlatform: z.string(),
    url: z.string(),
    tool: z.array(
        z.object({
            id: z.string().optional(),
            projectId: z.string().optional(),
            name: z.string().min(2),
            description: z.string().min(3).max(200),
        })
    ),
    publishedDate: z.string()

})


export const zSession = z.object({
    id:z.string(),
    expire:z.string(),
})



export const zContact = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    message: z.string().min(3).max(500),
})