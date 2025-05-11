import { Hono } from 'hono'
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import ProjectRoute from './Project';
import { cors } from "hono/cors";
import { zContact } from './ZodObject';
import { zValidator } from '@hono/zod-validator';
import { sendEmail } from './email';
import { z } from 'zod';
const dist = process.env.FRONTEND_DIST ?? '../frontend/dist';

const app = new Hono()
app.use('*', logger());
app.use('*', cors());

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);

const vValidateContent = zValidator(
    "json",
    zContact
)

const apiRoutes = app.basePath('/api')
.route("/PROJECT" , ProjectRoute)
.post("/sendContact", vValidateContent, async (c) => {
    console.log("EMAIL ENV:", process.env.GMAIL_USER, process.env.GMAIL_PASS ? 'PASS SET' : 'NO PASS');

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        console.error("Missing Gmail credentials in environment variables");
        throw new Error("Missing Gmail credentials in environment variables");
      }
      
    try {
        console.log("POST MAIL", {
            url: c.req.url,
            db: process.env.DATABASE_URL!
        });

        const body = c.req.valid("json") 

        if (!body) {
            return c.json({ error: "Invalid body" }, 400);
        }
        const { name, email, message } = body;
        
        const subjectc = `Contact from ${name} <${email}>`;
        const textc = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        const sender  = await sendEmail(
            {
                subject: subjectc,
                text: textc,
            }

        )
        console.log("Email sent:", sender);
        if (sender.rejected.length > 0) {
            return c.json({ error: "Failed to send email" }, 400);
        }
        return c.json({ message: "Email sent successfully" }, 200);
       
        
       
        
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to send email" }, 500);
        
    }
})


console.log('NODE_ENV:', process.env.NODE_ENV);

app.use('*', serveStatic({ root: dist }));
app.get('*', serveStatic({ root: dist, path: 'index.html' }));


export default { 
    port: 3000, 
    fetch: app.fetch, 
} 
export type APIRoutes = typeof apiRoutes;
