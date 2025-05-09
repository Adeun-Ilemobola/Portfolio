import React from 'react'
import z from 'zod'
import { zPorject } from '@server/ZodObject'
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { DateTime } from "luxon";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from './ui/badge';
import EditProjectRoute from '@/routes/ADMIN/EditProject';
import { ImageOff } from 'lucide-react';


interface ProjectCardProps {
    projectInfo: z.infer<typeof zPorject>,
    ModifyMode: boolean,
    del: (id: string | undefined) => void,
}
export default function ProjectCard({ projectInfo, ModifyMode, del }: ProjectCardProps) {
   const fData = DateTime.fromISO(projectInfo.publishedDate, { zone: "utc" }).toFormat("M/d/yyyy")
    return (
        <Card className=" w-[32rem] h-[28rem]  py-3">

            <CardContent className='px-3'>
                <div className='flex flex-col gap-2'>


                    <CardHeader className='px-1 flex flex-row justify-center  gap-2'>
                        <CardTitle className='text-2xl font-bold'>{projectInfo.name}</CardTitle>
                        <CardDescription className='flex-1 flex flex-col-reverse justify-center items-center'>
                            <Badge className='ml-auto text-[12px] ' variant={"destructive"}>{projectInfo.deploymentPlatform}</Badge>
                        </CardDescription>
                    </CardHeader>

                    <div className='flex flex-col gap-2'>

                        <div className='f w-full h-64 flex-1 flex flex-col justify-between items-center'>
                            {projectInfo.image[0]?.base64 ? (
                                <img src={projectInfo.image[0]?.base64} alt="project image" className='w-full h-72 object-cover rounded-md' />
                            ) : (
                                <ImageOff className=' text-4xl text-amber-500/70' />
                            )}


                        </div>
                        <Badge variant={"outline"}>{fData}</Badge>

                       
                    </div>

                    
                    <div className='flex items-center flex-row gap-2 mt-2'>
                        {projectInfo.tool.map((tool, index) => {
                            return (
                                <Badge key={index} variant={"secondary"}>{tool.name}</Badge>
                            )
                        })}

                    </div>



                </div>
            </CardContent>
            <CardFooter className='px-3'>





                {ModifyMode && (
                    <div className=' flex-1 flex flex-row-reverse gap-2'>
                        <Link
                            to={EditProjectRoute.to}
                            preload="intent"
                            params={{ id: projectInfo.id || "" }}

                        >

                            <Button className='' size={"sm"} variant={"purple"}>Edit</Button>

                        </Link>

                        <Button size={"sm"} onClick={() => { del(projectInfo.id) }} className='' variant={"destructive"}>Delete</Button>

                    </div>
                )}

            </CardFooter>
        </Card>
    )
}
