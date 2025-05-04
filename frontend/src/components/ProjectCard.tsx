import React from 'react'
import z from 'zod'
import { zPorject } from '@server/ZodObject'
import { Button } from '@/components/ui/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from './ui/badge';


interface ProjectCardProps {
    projectInfo: z.infer<typeof zPorject>,
    ModifyMode: boolean,
}
export default function ProjectCard({ projectInfo, ModifyMode }: ProjectCardProps) {
    return (
        <Card className=" w-[36rem] py-3">

            <CardContent className='px-3'>
                <div className='flex flex-col gap-2'>


                    <CardHeader className='px-1 flex flex-row justify-center  gap-2'>
                        <CardTitle className='text-2xl font-bold'>{projectInfo.name}</CardTitle>
                        <CardDescription className='flex-1 flex flex-col-reverse justify-center items-center'>
                            <Badge className='ml-auto text-[12px] ' variant={"destructive"}>{projectInfo.deploymentPlatform}</Badge>
                        </CardDescription>
                    </CardHeader>

                    <div className='flex flex-col gap-2'>

                        <div className=' w-full h-72 flex flex-row-reverse justify-between'>
                            {projectInfo.image[0]?.base64 ? (
                                <img src={projectInfo.image[0]?.base64} alt="project image" className='w-full h-72 object-cover rounded-md' />
                            ) : (
                                <h2> no image</h2>
                            )}


                        </div>

                        <Badge variant={"outline"}>{projectInfo.publishedDate}</Badge>
                    </div>



                </div>
            </CardContent>
            <CardFooter className='px-3'>


                <div className='flex justify-center flex-row gap-2'>
                    {projectInfo.tool.map((tool, index) => {
                        return (
                            <Badge key={index} variant={"secondary"}>{tool.name}</Badge>
                        )
                    })}

                </div>


                {ModifyMode && (
                    <div className='flex flex-row-reverse gap-2'>
                        <Button className='ml-auto' variant={"purple"}>Edit</Button>
                        <Button className='ml-auto' variant={"destructive"}>Delete</Button>

                    </div>
                )}

            </CardFooter>
        </Card>
    )
}
