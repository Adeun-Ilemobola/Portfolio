import { use, useEffect, useState } from 'react';
import { createRoute, useParams } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { zPorject } from '@server/ZodObject';
import axios from 'axios';
import ProjectView from '@/components/ProjectView';
import { LoaderCircle } from 'lucide-react';

function Project() {
    const { id } = ProjectRoute.useParams();
    const queryClient = new QueryClient()
    const [project, setProject] = useState<z.infer<typeof zPorject> | undefined>(undefined);
    const [mounted, setMounted] = useState(false);
    const getProject = useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const res = await axios.get(`/api/PROJECT/${id}`);
            const data = res.data;
            const parsedData = zPorject.parse(data);
            setProject(parsedData);
            return parsedData;
        },
        retry: 2

    })
    useEffect(() => {

        if (mounted!) {
            if (getProject.isSuccess) {
                setProject(getProject.data);
            } else {
                setProject(undefined);
            }
        }
        setMounted(true);

    }, [getProject.isSuccess, getProject.data]);

    return (
        <div className="flex flex-col min-h-screen">
            {getProject.isPending ? (<>
                <div className='flex gap-2 justify-center items-center-safe w-48 h-40'>
                    <LoaderCircle className=' text-2xl animate-spin' />
                    <h2 className='text-lg'>Loading Projects</h2>

                </div>

            </>) : (<>
                {
                    project ? (
                        <ProjectView project={project} />
                    ) : (
                        <div className='flex flex-col gap-2 justify-center items-center-safe w-full h-full'>
                            <h1 className='text-2xl'>Project Not Found</h1>
                            <p className='text-md'>The project you are looking for does not exist.</p>
                        </div>
                    )

                }

            </>)}

        </div>
    );
}

const ProjectRoute = createRoute({
    getParentRoute: () => RootRoute,
    path: '/Project/$id',
    component: Project
});

export default ProjectRoute;