import { Hono } from 'hono'
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import ProjectRoute from './Project';
import { cors } from "hono/cors";
const app = new Hono()
app.use('*', logger());
app.use('*', cors());

const apiRoutes = app.basePath('/api').route("/project" , ProjectRoute)

app.use('*', serveStatic({ root: './frontend/dist' }));
app.use('*', serveStatic({ path: './frontend/dist/index.html' }));
// app.use(
//     '*',
//     serveStatic({
//       root: './frontend/dist',
//       rewriteRequestPath: (path) => (path === '/' ? '/index.html' : path),
//     }),
//   )

export default { 
    port: 3000, 
    fetch: app.fetch, 
} 
export type APIRoutes = typeof apiRoutes;
