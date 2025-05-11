import { useEffect, useState, useRef } from 'react';
import { createRoute, useParams , useNavigate } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zPorject } from '@server/ZodObject';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from "sonner"
import { Label } from '@/components/ui/label';
import { toB64 } from '@/lib/utils';
import AdminRoute from './Admin';
import InputBox from '@/components/InputBox';
import { DatePickerDemo } from '@/components/ui/DatePickerDemo';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import CreateProjectRoute from './CreateProjectRout';
import { LoaderCircle, ShieldAlert } from 'lucide-react';
import { DateTime } from 'luxon';

function EditProject() {
    const navigate = useNavigate();
    const { id } = EditProjectRoute.useParams()
    const queryClient = new QueryClient()

    const fileRef = useRef<HTMLInputElement>(null);
    const { data } = useQuery({
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
    const zTool = z.object({
        name: z.string(),
        description: z.string()

    })

    const [project, setProject] = useState<z.infer<typeof zPorject>>();
    const [tool, setTool] = useState<z.infer<typeof zTool>>({
        name: "",
        description: "",

    })
    useEffect(() => {
        if (data) {
            console.log(data);

            setProject(data);
        }
    }, [data]);

    function formProject(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setProject((prw) => {
            if (prw) {
                return {
                    ...prw,
                    [name]: value
                }
            }
            return prw;
        })

    }

    async function formImage(e: React.ChangeEvent<HTMLInputElement>) {
        const { files } = e.target;
        if (files) {
            const fils = Array.from(files);
            const base64Files = await Promise.all(
                fils.map(async (file) => {
                    return await toB64(file);

                })
            )

            setProject((prw) => {
                if (prw) {
                    return {
                        ...prw,
                        image: [...prw.image, ...base64Files]
                    }
                }
                return prw;
            })


        }
    }
    function setDate(date: Date | undefined) {
        if (date) {
            const dateInput =  DateTime.fromJSDate(date);
            setProject(prw => {
                if (prw) {
                    return {
                        ...prw,
                        publishedDate: dateInput.toFormat("yyyy-MM-dd")
                    }
                }
                return prw;
            })
        }

    }


    async function formProjectList(Location: "tool" | "img") {

        const toolInput = zTool.safeParse(tool);
        if (!toolInput.success) {
            toolInput.error.errors.forEach((error) => {
                console.log(error);
                toast.error(error.path[0], {
                    description: error.message,

                }
                )

            })
            return;
        }


        setProject(prw => {
            if (prw) {
                return {
                    ...prw,
                    tool: [...prw.tool, tool]
                }
            }
            return prw;
        })

        setTool({
            name: "",
            description: ""
        })


    }

    function formTool(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { value, name } = e.target;

        setTool((prw: typeof tool) => ({
            ...prw,
            [name]: value
        }))
    }

    async function handleUpdate() {
        if (project) {
            const projectInput = zPorject.safeParse(project);
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
            updatateProject.mutate(project)
            navigate({
                to: AdminRoute.to,   
            })
        } else {
            toast.error("Project not found")
        }

    }


    return (
        <div className={`flex flex-col gap-2   min-h-screen`}>
            <div className=' w-full flex flex-row-reverse items-center gap-2'>
                <Link to={CreateProjectRoute.to} preload="intent" className=' ml-auto'> 
                    <Button className='min-w-[200px] px-6 py-3' variant={"green"} size={"lg"}>Create Project</Button>
                </Link>
            </div>
            <div className={`flex-1 w-ful flex flex-col gap-2 items-center  ${project === undefined && "justify-center"}  `}>

                {
                    project ?

                        (<>


                            <div className='w-[75%] flex flex-col gap-2 justify-center '>
                                <div className='flex flex-col justify-center gap-2  ring-1 ring-emerald-900/65 rounded-s-sm p-2'>
                                    <h3>Images</h3>
                                    <div className='flex flex-row gap-2'>
                                        {project.image.map((image, index) => {
                                            return (
                                                <div key={index} className='w-32 h-24 bg-slate-200 rounded-md flex justify-center items-center' 
                                                onDoubleClick={() => {
                                                    setProject(prw => {
                                                        if (prw) {
                                                            return {
                                                                ...prw,
                                                                image: prw.image.filter((_, i) => i !== index)
                                                            }
                                                        }
                                                        return prw;
                                                    })
                                                }}>
                                                    <img src={image.base64} alt="project image" className='w-full h-full object-cover' />
                                                </div>
                                            )
                                        })}


                                        <Button onClick={() => fileRef.current?.click()} variant={"outline"} size={"lg"} className='w-32 h-24'>Add Image</Button>
                                        <input ref={fileRef} type="file" id='hfjdks' onChange={(e) => formImage(e)} accept='image/*' className='hidden' />


                                    </div>
                                </div>


                                <div className='flex flex-col justify-center gap-2  ring-1 ring-emerald-900/65 rounded-s-sm p-2'>
                                    <div className=' flex flex-col gap-1.5 '>
                                        <InputBox disable={updatateProject.isPending} size={32} value={tool.name} id={"name"} Name='name' set={formTool} />
                                        <Label htmlFor='description-a'>Description</Label>
                                        <Textarea
                                            className=' resize-none'
                                            disabled={false}
                                            value={tool.description}
                                            onChange={formTool}
                                            name="description"
                                            id="description-a"
                                            placeholder="Description"
                                            rows={4}
                                        />
                                        <Button disabled={updatateProject.isPending} variant={"secondary"} size={"lg"} onClick={() => formProjectList("tool")}> add tool</Button>
                                        <div className=' flex flex-row flex-wrap gap-1.5 overflow-scroll'>
                                            {project?.tool.map((tool, index) => (
                                                <Badge key={index} className=' text-[14px]' variant={"green"} onDoubleClick={() => {
                                                    setProject(prw => {
                                                        if (prw) {
                                                            return {
                                                                ...prw,
                                                                tool: prw.tool.filter((_, i) => i !== index)
                                                            }
                                                        }
                                                        return prw;
                                                    })
                                                }}>
                                                    {tool.name}
                                                </Badge>
                                            ))}
                                        </div>


                                    </div>

                                </div>

                                <div className='flex flex-col justify-center gap-2  ring-1 ring-emerald-900/65 rounded-s-sm p-2'>
                                    <h3>Project Info</h3>
                                    <div className='flex flex-col gap-3'>
                                        <InputBox disable={updatateProject.isPending} size={30} value={project.name} id={"name"} Name='name' set={formProject} />
                                        <InputBox disable={updatateProject.isPending} size={30} value={project.repository} Name='repository' id={"repository"} set={formProject} />
                                        <InputBox disable={updatateProject.isPending} size={30} value={project.deploymentPlatform} Name='deploymentPlatform' id={"deploymentPlatform"} set={formProject} />
                                        <InputBox disable={updatateProject.isPending} size={30} value={project.url} id={"url"} Name='url' set={formProject} />


                                        <div className={`flex flex-col gap-1 w-[${30}rem]  `}>
                                            <Label htmlFor='publishedDate'>Published Date</Label>
                                            <DatePickerDemo 
                                            setDate={setDate} 
                                            date={
                                                project.publishedDate
                                                ? DateTime.fromISO(project.publishedDate).toJSDate()
                                                : DateTime.now().toJSDate()
                                            } 
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <Button disabled={updatateProject.isPending} onClick={() => { handleUpdate() }} variant={"purple"}>Update{updatateProject.isPending && (<LoaderCircle className=' animate-spin' />)}</Button>



                        </>) :
                        (
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
    path: '/Admin/Project/$id',
    component: EditProject
});
// Admin/Project/8obmxPWcOVxZUqOfX6W2L

export default EditProjectRoute;