import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
  createRouter,

} from '@tanstack/react-router'
import IndexRoute from './routes/Index.tsx'
import AdminRoute from './routes/Admin.tsx'
import RootRoute from './lib/routeConfig/rootRoute.tsx'



const routeTree = RootRoute.addChildren([IndexRoute , AdminRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
