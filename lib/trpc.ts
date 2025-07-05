import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/trpc/routers/_app';

// This is your strongly-typed tRPC hook generator for use throughout the app
export const api = createTRPCReact<AppRouter>();
