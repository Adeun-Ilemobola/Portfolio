import { Hono } from 'hono'
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import ProjectRoute from './Project';
import { cors } from "hono/cors";
const dist = process.env.FRONTEND_DIST ?? '../frontend/dist';

const app = new Hono()
app.use('*', logger());
app.use('*', cors());

import { drizzle } from 'drizzle-orm/postgres-js'
import * as postgres from 'postgres';

async function main() {
    const client = postgres(process.env.DATABASE_URL!)
    const db = drizzle({ client });
}

main();


const apiRoutes = app.basePath('/api')
.route("/project" , ProjectRoute);

console.log('NODE_ENV:', process.env.NODE_ENV);

app.use('*', serveStatic({ root: dist }));
app.get('*', serveStatic({ root: dist, path: 'index.html' }));


export default { 
    port: 3000, 
    fetch: app.fetch, 
} 
export type APIRoutes = typeof apiRoutes;
