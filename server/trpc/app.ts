import { z } from 'zod';
import { createTRPCRouter, PublicBase } from './init';

export const appRouter = createTRPCRouter({
  // 1. Basic Echo Test
  hello: PublicBase
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
        time: new Date().toLocaleTimeString(),
      };
    }),

  // 2. Math Test (Validates Zod inputs)
  add: PublicBase
    .input(z.object({ 
      a: z.number(), 
      b: z.number() 
    }))
    .mutation(({ input }) => {
      return { result: input.a + input.b };
    }),

  // 3. Async Test (Simulates a slow DB call)
  getLatestPost: PublicBase
    .query(async () => {
      // Simulate 2 second delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        id: 1,
        title: "This data came from the server after a delay!",
      };
    }),
});

export type AppRouter = typeof appRouter;