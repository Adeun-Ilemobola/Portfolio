import { toB64 } from '@/lib/utils';
import { zPorject } from '@server/ZodObject';
import { DateTime } from 'luxon';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import InputBox from './InputBox';
import { DatePickerDemo } from './ui/DatePickerDemo';
import { Badge } from './ui/badge';
import { LoaderCircle } from 'lucide-react';


type Project = z.infer<typeof zPorject>;

interface ProjestMaleEditProps {
    onSubmit: (data: Project) => void;
    project: Project;
    setProject: React.Dispatch<React.SetStateAction<Project>>;
    isPending: boolean;
    mode?: "create" | "edit";

}
export default function ProjestMakeEdit({ onSubmit, project, setProject, isPending , mode }: ProjestMaleEditProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [tool, setTool] = useState<z.infer<typeof zTool>>({
        name: "",
        description: "",

    })
    const zTool = z.object({
        name: z.string(),
        description: z.string()

    })





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
            const dateInput = DateTime.fromJSDate(date);
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





    return (
        <div className=' w-full flex flex-1 flex-col gap-2 justify-center '>


            <div className=' flex flex-row gap-2 justify-center '>


                <div className='w-[45%] flex flex-col gap-1.5'>
                    {/*Images box   */}
                    <div className='  h-[9rem] flex flex-col justify-center gap-2  ring-1 ring-emerald-900/65 rounded-s-sm p-2'>
                        <h3>Images</h3>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-row gap-1.5 overflow-x-auto '>
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
                            </div>


                            <Button onClick={() => fileRef.current?.click()} variant={"outline"} size={"lg"} className='w-32 h-24'>Add Image</Button>
                            <input ref={fileRef} type="file" id='hfjdks' onChange={(e) => formImage(e)} accept='image/*' className='hidden' />


                        </div>
                    </div>




                    {/*  Tool box   */}
                    <div className='  h-[16rem] flex flex-col justify-center gap-2  ring-1 ring-emerald-900/65 rounded-s-sm p-2'>
                        <div className=' flex flex-col gap-1.5 '>
                            <InputBox disable={isPending} size={32} value={tool.name} id={"name"} Name='name' set={formTool} />
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
                            <Button disabled={isPending} variant={"secondary"} size={"lg"} onClick={() => formProjectList("tool")}> add tool</Button>
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

                </div>


                {/*  Project info box   */}

                <div className='flex-1 flex flex-col justify-center gap-2  ring-1 ring-emerald-900/65 rounded-s-sm p-2'>
                    <h3>Project Info</h3>
                    <div className='flex flex-col gap-3'>
                        <InputBox disable={isPending} size={30} value={project.name} id={"name"} Name='name' set={formProject} />
                        <InputBox disable={isPending} size={30} value={project.repository} Name='repository' id={"repository"} set={formProject} />
                        <InputBox disable={isPending} size={30} value={project.deploymentPlatform} Name='deploymentPlatform' id={"deploymentPlatform"} set={formProject} />
                        <InputBox disable={isPending} size={30} value={project.url} id={"url"} Name='url' set={formProject} />


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

            <Button disabled={isPending} onClick={() => { onSubmit(project) }} variant={"purple"}>{mode ? mode : "Submit"}{isPending && (<LoaderCircle className=' animate-spin' />)}</Button>


        </div>
    )
}
