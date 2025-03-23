import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';

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

// Start server
Bun.serve({
     port: 3000,
     fetch: app.fetch,

})
console.log("Server is listening at http://localhost:3000"); 
export type APIRoutes = typeof apiRoutes;
