import { Hono } from 'hono';
import { ClientInfoSchema, zPorject } from './ZodObject';
import { zValidator } from '@hono/zod-validator'
import { projects, projectTools, projectImages } from './db/schema';
import { nanoid } from 'nanoid';
import { eq } from "drizzle-orm";
import { db } from './db';
import { z } from 'zod';




const VLogin = zValidator(
    "json",
    z.object({

        client: z.object({
            name: z.string().min(1),
            pass: z.string().min(1),

        }),

        clientDeep:ClientInfoSchema
    
    })
)

const SessionsRoute = new Hono();


SessionsRoute.post("/" ,VLogin , async (c)=>{
    try {
        const data = c.req.valid("json")
        if (!data){
            return c.text("invalid data" , 401)
        }

        const newS = {
           data:{...data.clientDeep},
           token:`${nanoid()}-${nanoid()}`
        }





        return c.json(newS,200)
        
    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)
        
    }
})















export default SessionsRoute;