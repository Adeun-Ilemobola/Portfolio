import { Hono } from 'hono';
import { ClientInfoSchema, zPorject } from './ZodObject';
import { zValidator } from '@hono/zod-validator'
import { projects, projectTools, projectImages, admin, sessions } from './db/schema';
import { nanoid } from 'nanoid';
import { eq } from "drizzle-orm";
import { db } from './db';
import { z } from 'zod';
import bcrypt from "bcrypt";




const VLogin = zValidator(
    "json",
    z.object({

        client: z.object({
            name: z.string().min(1),
            pass: z.string().min(1),

        }),

        clientDeep: ClientInfoSchema

    })
)
function looksLikeBcryptHash(str: string): boolean {
    return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(str);
}

const SessionsRoute = new Hono();


SessionsRoute.post("/", VLogin, async (c) => {
    try {
        const data = c.req.valid("json")
        if (!data) {
            return c.text("invalid data", 401)
        }
        console.log(
            data.client

        );
        

        const [authUeser] = await db.select().from(admin).where(eq(admin.username, data.client.name));

        if (!authUeser) {
            // Send an email to me overtime of login and the location
            return c.json({ message: "You are not authorized to access" }, 401)
        }


        // Early development

        if (!looksLikeBcryptHash(authUeser.password_hash)) {
            if (data.client.pass === authUeser.password_hash) {
                const newPass = await bcrypt.hash(authUeser.password_hash ,15)
                await db.update(admin).set({
                    password_hash:newPass
                }).where(eq(admin.id ,authUeser.id))

            } else {
                // Send an email to me of the location of the attempt of the incorrect signing when the password is the default password
                return c.json({ message: "Incorrect password" }, 401)
            }

        }

        const isHash = await bcrypt.compare(data.client.pass,authUeser.password_hash )

        if (!isHash){
             // Send an email to me overtime of login and the location
            return c.json({ message: "You are not authorized to access" }, 401)

        }

        const [newSession]  = await db.insert(sessions).values([
            {
                ...data.clientDeep,
                adminId:authUeser.id,
                token: `${nanoid()}-${nanoid()}_xc4`,
                id:nanoid(),
                name:data.client.name
            }
        ]).returning()



        return c.json(newSession, 200)

    } catch (error) {
        console.error(`${error}`)
        return c.text(`Something went wrong at  ${c.req.url}`, 500)

    }
})















export default SessionsRoute;