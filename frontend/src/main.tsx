import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {

  Navigate,
  RouterProvider,
  createRoute,
  createRouter,

} from '@tanstack/react-router'
import IndexRoute from './routes/Index.tsx'
import AdminRoute from './routes/ADMIN/Admin.tsx'
import RootRoute from './components/rootRoute.tsx'
import './index.css';
import EditProjectRoute from './routes/ADMIN/EditProject.tsx'
import CreateProjectRoutRoute from './routes/ADMIN/CreateProjectRout.tsx'
import ProjectRoute from './routes/Project.tsx'


const RedirectToClient =  createRoute({
  getParentRoute: () => RootRoute,
  path: '/', // this is the root path
  component: () => <Navigate to={IndexRoute.to}/>,
})


const routeTree = RootRoute.addChildren([
  RedirectToClient,
  IndexRoute , 
  AdminRoute,
  CreateProjectRoutRoute,
  EditProjectRoute,
  ProjectRoute
])

const router = createRouter({ 
  routeTree

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
