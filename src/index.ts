import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { join } from 'path' 

const app = new Hono();

// Logging middleware
app.use('*', logger());

// API route example
const apiRoutes = app.basePath('/api')
.get('/test', (c) => {
  return c.json({
    message: 'Hello from Bun + Hono!',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend
app.use('*', serveStatic({ root: './frontend/dist' }));
app.use('*', serveStatic({ path: './frontend/dist/index.html' }));


const port = Number(process.env.PORT || 3000)
Bun.serve({
  hostname: '0.0.0.0',
  port,
  fetch: app.fetch,
})

console.log(`Server is listening at http://localhost:${port}`)
export type APIRoutes = typeof apiRoutes;
