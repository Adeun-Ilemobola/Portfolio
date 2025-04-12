import { Hono } from 'hono'
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import ProjectRoute from './Project';
import { cors } from "hono/cors";
const app = new Hono()
app.use('*', logger());
app.use('*', cors());

const apiRoutes = app.basePath('/api')
.route("/project" , ProjectRoute);

const isProd = process.env.NODE_ENV === 'production';
console.log('NODE_ENV:', process.env.NODE_ENV);

if (isProd){
    console.log("production"); 
    app.use('*', serveStatic({ root: './public' }));
    app.use('*', serveStatic({ path: './public/index.html' }));
}else{
    console.log("Local development");
    app.use('*', serveStatic({ root: './frontend/dist' }));
    app.use('*', serveStatic({ path: './frontend/dist/index.html' }));
}



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
