import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';

// Creates context for each request (attaches user session, etc)
export const createTRPCContext = async () => {
  // console.log("------- createTRPCContext -------" , opts);
  
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      return { session };
 
};
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Initialize tRPC helpers, router, and middleware
const t = initTRPC.context<Context>().create();

// Middleware for protected routes (require login)
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { user: ctx.session.user } });
});

// Export for router usage
export const protectedProcedure = t.procedure.use(isAuthed);
export const baseProcedure = t.procedure;
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
