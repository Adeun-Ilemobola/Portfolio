import { Hono } from 'hono'
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import ProjectRoute from './Project';
import { cors } from "hono/cors";
import { zContact } from './ZodObject';
import { zValidator } from '@hono/zod-validator';
import { sendEmail } from './email';
import { z } from 'zod';
import { DateTime } from "luxon";
const dist = process.env.FRONTEND_DIST ?? '../frontend/dist';
const app = new Hono()
app.use('*', logger());
app.use('*', cors());
// 🔒 Global middleware — runs before every route
app.use('*', async (c, next) => {
  console.log('Middleware ran for route:', c.req.path)
  await next()
})

console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);

const vValidateContent = zValidator(
    "json",
    zContact
)

const apiRoutes = app.basePath('/api')
    .route("/PROJECT", ProjectRoute)
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
            const date = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");

            const subjectc = `📬 New message from ${name} (${email}) via your website`;
            const textc = `
        You have received a new message through your portfolio contact form.
        
        👤 Name: ${name}
        ✉️ Email: ${email}
        📅 Date: ${date}
        
        📝 Message:
        ${message}
        
        --
        This email was sent from your portfolio site.
        `;


            const htmlc = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="margin-bottom: 0.5rem;">📬 New Message via Portfolio Contact Form</h2>
    <p><strong>👤 Name:</strong> ${name}</p>
    <p><strong>✉️ Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>📅 Date:</strong> ${new Date().toLocaleString()}</p>
    <hr />
    <p><strong>📝 Message:</strong></p>
    <p style="white-space: pre-line;">${message}</p>
    <br />
    <p style="font-size: 0.85rem; color: #666;">—<br>This email was sent from your portfolio site.</p>
  </div>
`;
            const sender = await sendEmail(
                {
                    subject: subjectc,
                    text: textc,
                    html: htmlc,
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

app.onError((err, c) => {
  console.error('Unhandled Error:', err)
  return c.json({ error: 'Something went wrong.' }, 500)
})






export default {
    port: 3000,
    fetch: app.fetch,
}
export type APIRoutes = typeof apiRoutes;
