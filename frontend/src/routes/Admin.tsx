import { useEffect, useState } from 'react';
import { createRoute } from '@tanstack/react-router';
import RootRoute from '@/lib/routeConfig/rootRoute';

function Admin() {
  return (
    <div className="flex flex-col min-h-screen">
        Admin
      
    </div>
  );
}

const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/Admin',
  component: Admin
});

export default AdminRoute;