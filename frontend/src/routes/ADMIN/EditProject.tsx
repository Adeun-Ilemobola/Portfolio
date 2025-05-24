import { useEffect, useState, useRef } from 'react';
import { createRoute, useParams , useNavigate } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zPorject } from '@server/ZodObject';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from "sonner"
import AdminRoute from './Admin';
import { Link } from '@tanstack/react-router';
import CreateProjectRoute from './CreateProjectRout';
import { LoaderCircle, ShieldAlert } from 'lucide-react';
import ProjestMakeEdit from '@/components/ProjestMaleEdit';
import { SessionGuard } from '@/components/SessionGuard';
type Project = z.infer<typeof zPorject>;

function EditProject() {
    const navigate = useNavigate();
    const { id } = EditProjectRoute.useParams()
    const queryClient = new QueryClient()

    const { data , isLoading } = useQuery({
        queryKey: ['project'],
        queryFn: async () => {
            try {
                toast.loading('Loading project...');
                // Simulate a delay
                const { data } = await axios.get<z.infer<typeof zPorject>>(`/api/PROJECT/${id}`)
                toast.dismiss();
                toast.success('Project loaded successfully');
                return data;
            } catch (error) {
                console.error('Error fetching project:', error);
                toast.error('Error fetching project');
                throw error;
            }

        },
        refetchOnWindowFocus: false,
        retry: 1,
    })
    const updatateProject = useMutation({
        mutationFn: async (project: z.infer<typeof zPorject>) => {
            try {
                const { data } = await axios.put<z.infer<typeof zPorject>>(`/api/PROJECT`, project)
                navigate({
                    to: AdminRoute.to,   
                })
                return data;
            } catch (error) {
                console.error('Error updating project:', error);
                toast.error('Error updating project');
                throw error;
            }
        },
        onSuccess: (data) => {
            toast.success('Project updated successfully');
            console.log(data);
        },
        retry: 2,
        onMutate: async (variables) => {
            const previousData = queryClient.getQueryData(['project']);
            // queryClient.setQueryData(['project'], (old: any) => {
            //     if (old) {
            //         return {
            //             ...old,
            //             ...variables
            //         }
            //     }
            //     return old;
            // })
            return { previousData };

        }
    })

    const [project, setProject] = useState<Project>({
        name: "",
        image: [],
        repository: '',
        deploymentPlatform: '',
        url: '',
        tool: [],
        publishedDate: ""
    } );

    
    useEffect(() => {
        if (data) {
            console.log(data);

            setProject(data);
        }
    }, [data]);

   

   

    async function handleUpdate(data: z.infer<typeof zPorject>) {
        if (data) {
            const projectInput = zPorject.safeParse(data);
            if (!projectInput.success) {
                projectInput.error.errors.forEach((error) => {
                    console.log(error);
                    toast.error(error.path[0], {
                        description: error.message,

                    }
                    )

                })
                return;
            }
            updatateProject.mutate(data)

        } else {
            toast.error("Project not found")
        }

    }


    return (
        <div className={`flex flex-col gap-2 p-1.5  min-h-screen`}>
            <div className=' w-full flex flex-row-reverse items-center gap-2'>
                <Link to={CreateProjectRoute.to} preload="intent" className=' ml-auto'> 
                    <Button className='min-w-[200px] px-6 py-3' variant={"green"} size={"lg"}>Create Project</Button>
                </Link>
            </div>
            <div className={`flex-1 w-ful flex flex-col gap-1  justify-center  items-center  `}>

                {
                    project && !isLoading ?

                        (<>

                        <ProjestMakeEdit
                            project={project}
                            isPending={updatateProject.isPending}
                            setProject={setProject}
                            onSubmit={handleUpdate}
                           
                        />

                        </>
                        ) : (
                            <div className='flex gap-2 justify-center items-center-safe w-48 h-40'>
                                <LoaderCircle className=' text-2xl animate-spin' />
                                <h2 className='text-lg'>Loading Projects</h2>

                            </div>
                        )

                }
            </div>

        </div>
    );

}

const EditProjectRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/client/Admin/Project/$id',
    component: () => (<>
        <SessionGuard>
          <EditProject />
        </SessionGuard>
      
        </>),
});

export default EditProjectRoute;