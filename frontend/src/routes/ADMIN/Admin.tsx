import { useState } from 'react';
import { createRoute, Link } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import { Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import EditProjectRoute from './EditProject';
import CreateProjectRoute from './CreateProjectRout';


function Admin() {
  return (
    <div className="flex flex-col min-h-screen p-2">
      <div className=' flex flex-row-reverse '>
        <Link to={CreateProjectRoute.to} preload="intent" >
          <Button className='min-w-[200px] px-6 py-3' variant={"green"} size={"lg"}>Create Project</Button>
        </Link>
      </div>



      <Button className='' variant={"purple"} >Edit Project</Button>
      <Button className='' variant={"destructive"} >Delete Project</Button>

      

    </div>

  );
}

const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/Admin',
  component: Admin,

});

export default AdminRoute;