import { useEffect, useState } from 'react';
import RootRoute from '@/components/rootRoute';
import Intro from '@/View/Intro';
import { createRoute, Link } from '@tanstack/react-router'
import { z } from 'zod';
import { zPorject } from '@server/ZodObject';
import { toast } from 'sonner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/ProjectCard';
import ProjectRoute from './Project';
import ContactCard from '@/components/ContactCard';
import { Button } from '@/components/ui/button';


function Index() {
  const { data: dbProjects, isLoading } = useQuery({
    queryKey: ['projectList'],
    queryFn: async () => {
      toast.loading("Loading Projects", {

      })
      const content = await axios.get('/api/PROJECT');
      toast.dismiss();
      toast.success("Projects Loaded", {
        duration: 2000
      })
      return content.data;
    },
    select: (data) => z.array(zPorject).parse(data),
    retry: 2


  });
  const [data, setData] = useState<{ message: string; timestamp: string } | null>(null);
  const [projects, setProjects] = useState<z.infer<typeof zPorject>[]>([]);
       const [showContact, setShowContact] = useState(false)
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/PROJECT');
        const parsedData = z.array(zPorject).parse(response.data);
        setProjects(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    };

    fetchData();
    return () => {
      setData(null);
    }; // Clean up function to prevent memory leaks
  }, []);

  return (
    <div className="flex flex-col gap-2.5  min-h-screen p-3">

      <ContactCard   setShowContact={setShowContact} showContact={showContact} > 
        <Button variant={"secondary"} onClick={()=> setShowContact(true)} className=' z-50 absolute bottom-0 right-0 m-4'>
          Contact me
        </Button>
      </ContactCard>


      <Intro />
      <div className='flex-1 flex w-full flex-wrap gap-6 p-3 justify-center overflow-y-auto rounded-md   '>
        {projects.map((project, index) => {
          return (
            <Link key={index} to={ProjectRoute.to} params={{ id: project.id ?? "" }} >
             <ProjectCard
              projectInfo={project}
              ModifyMode={false}
              del={(DelId) => { }}
            />
            </Link>
           

          )
        })}

      </div>




    </div>
  );
}

const IndexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/client',
  component: Index
})

export default IndexRoute;