import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/sonner"

import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import '@/index.css'
import {
  Outlet,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const queryClient = new QueryClient()

const RootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster richColors />
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
    </QueryClientProvider>
  ),
})


export default RootRoute;