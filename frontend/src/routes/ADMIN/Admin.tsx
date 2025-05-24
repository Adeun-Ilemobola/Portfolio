import { useState, useEffect } from 'react';
import { createRoute, Link, useNavigate } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import { Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import EditProjectRoute from './EditProject';
import CreateProjectRoute from './CreateProjectRout';
import { z } from 'zod';
import { zPorject } from '@server/ZodObject';
import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from "sonner"
import { LoaderCircle, ShieldAlert } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { SessionGuard } from '@/components/SessionGuard';


function Admin() {
  const queryClient = new QueryClient();

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
  const delProject = useMutation({
    mutationFn: async (id: string) => {
      const content = await axios.delete(`/api/PROJECT/${id}`);
      return content.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
      toast.success("Project Deleted", {
        duration: 2000
      })
    },
    retry: 2,
    onError: (error) => {
      toast.error("Error Deleting Project", {
        duration: 2000
      })
    }
  })
  const navigate = useNavigate();
  const [projects, setProjects] = useState<z.infer<typeof zPorject>[]>([

  ]);

  useEffect(() => {
    if (dbProjects) {
      setProjects(dbProjects);
    }
  }, [dbProjects]);




  function Del(id: string | undefined) {
    if (id) {
      delProject.mutate(id);
      toast.success("Project Deleted", {
        duration: 2000
      })
    }

  }

  return (
    <div className="flex flex-col min-h-screen p-2">
      <div className=' flex flex-row-reverse '>
        <Link to={CreateProjectRoute.to} preload="intent" >
          <Button className='min-w-[200px] px-6 py-3' variant={"green"} size={"lg"}>Create Project</Button>
        </Link>
      </div>

      <div className={`flex-1 flex w-full flex-wrap gap-3 p-4 justify-center overflow-y-auto ${isLoading || projects.length == 0  ? 'justify-center items-center' : ''}`}>
        {isLoading ?
          (
            <div className='flex gap-2 justify-center items-center-safe w-48 h-40'>
              <LoaderCircle size={50} className='  animate-spin' />
              <h2 className='text-4xl'>Loading Projects</h2>

            </div>
          ) : (
            <>
              {projects.length == 0 &&
                (
                  <div className='flex  gap-2 justify-center items-center-safe w-48 h-40'>
                    <ShieldAlert size={50} className=' text-fuchsia-500' />
                    <span className='text-4xl'>Project not found</span>

                  </div>

                )
              }

            </>
          )
        }
        

          {projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                projectInfo={project}
                ModifyMode={true}
                del={Del}
              />

            )
          })}
        

      </div>




    </div>

  );
}

const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/client/Admin',
  component: () => (<>
  <SessionGuard>
    <Admin />
  </SessionGuard>

  </>),

});

export default AdminRoute;