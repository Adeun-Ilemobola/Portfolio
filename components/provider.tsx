'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '@/lib/trpc';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { ThemeProvider } from './theme-provider';

function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  // We want to memoize the trpcClient so it's not recreated on every render
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  // Add a basic loading fallback for a "Notiony" feel
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {/* You can wrap with Suspense here for loading skeletons */}
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </api.Provider>
    </QueryClientProvider>
  );
}
