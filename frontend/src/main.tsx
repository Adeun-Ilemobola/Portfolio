import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {

  Navigate,
  RouterProvider,
  createRouter,

} from '@tanstack/react-router'
import IndexRoute from './routes/Index.tsx'
import AdminRoute from './routes/ADMIN/Admin.tsx'
import RootRoute from './components/rootRoute.tsx'
import './index.css';
import EditProjectRoute from './routes/ADMIN/EditProject.tsx'
import CreateProjectRoutRoute from './routes/ADMIN/CreateProjectRout.tsx'
import ProjectRoute from './routes/Project.tsx'


const routeTree = RootRoute.addChildren([
  IndexRoute , 
  AdminRoute,
  CreateProjectRoutRoute,
  EditProjectRoute,
  ProjectRoute
])

const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: () => <Navigate to={IndexRoute.to}/>,
})

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
