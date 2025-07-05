import { z } from 'zod';
import {  createTRPCRouter } from '../init';

// Root API router, aggregate your subrouters here
export const appRouter = createTRPCRouter({
 
 
});
// Export type definition for tRPC hooks
export type AppRouter = typeof appRouter;
