import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { auth } from '../../lib/auth';
import prisma from '@/lib/prisma';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { cache } from 'react';
import { headers } from 'next/headers'; // Import headers
export const createTRPCContext = cache(async (opts?: FetchCreateContextFnOptions) => {
    const heads = new Headers(opts?.req.headers ?? await headers());
  const session = await auth.api.getSession({
    headers: heads, 
  });
  return {
    session,
    prisma,
    headers: heads,
    // ... other context values
  };
});
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
const t = initTRPC.context<Context>().create({
    transformer:superjson
});
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { session: ctx.session } });
});
export const PrivateBase = t.procedure.use(isAuthed);

// ========================= Public =================

const NotAuthed = t.middleware(({ ctx, next }) => {
 
  return next({ ctx:{db:prisma} });
});

export const PublicBase = t.procedure.use(NotAuthed);
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
