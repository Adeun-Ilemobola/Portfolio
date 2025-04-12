import { useEffect, useState } from 'react';
import RootRoute from '@/components/rootRoute';
import Intro from '@/View/Intro';
import {  createRoute } from '@tanstack/react-router'


function Index() {
  const [data, setData] = useState<{ message: string; timestamp: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
     
    
    };

    fetchData();
    return () => {
      setData(null);
    }; // Clean up function to prevent memory leaks
  }, []);

  return (
    <div className="flex flex-col  min-h-screen p-4">
      <Intro/>
     

      
    </div>
  );
}

const IndexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: Index
})

export default IndexRoute;