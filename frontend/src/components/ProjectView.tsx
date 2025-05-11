import { Base64FileResult } from '@/lib/utils'
import { zPorject } from '@server/ZodObject'
import React from 'react'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { Badge } from './ui/badge'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


interface ProjectViewProps {
    project: z.infer<typeof zPorject>

}
export default function ProjectView({ project }: ProjectViewProps) {
    const [PreviewImg, setPreviewImg] = useState<Base64FileResult>({} as Base64FileResult)
    useEffect(() => {
        if (project.image.length > 0) {
            setPreviewImg(project.image[0])
        }
    }, [project.image])


    function SelImg(id: string | undefined) {
        const img = project.image.find((img) => img.id === id)
        if (img) {
            setPreviewImg(img)
        }

    }
    return (
        <div className='flex flex-1 w-full flex-col gap-1.5 p-1.5 '>

            <div className='flex flex-row gap-2 justify-center'>
                <h1 className=' text-2xl'>{project.name}</h1>
                <div className='flex flex-row gap-2 ml-auto'>
                    <Badge className='text-md text-slate-500'>{project.publishedDate}</Badge>
                    <Badge className='text-sm text-slate-500'>{project.deploymentPlatform}</Badge>
                </div>


            </div>


            <div className='flex flex-col gap-2'>
                <div className='flex flex-col w-full h-[22rem] justify-center items-center'>
                    <img src={PreviewImg.base64} alt={PreviewImg.name} className='w-1/2 h-full object-cover rounded-lg' />

                </div>

                <div className='flex flex-row gap-2 p-1.5'>
                    {project.image.map((img) => (
                        <div className='w-32 h-24  ring-1 ring-slate-200 rounded-md flex justify-center items-center overflow-hidden' key={img.id} onClick={() => SelImg(img.id)}>
                            <img src={img.base64} alt={img.name} className='w-full h-full object-cover' onClick={() => SelImg(img.id)} />
                        </div>
                    ))}

                </div>






            </div>
            <div className='flex flex-row gap-2'>
                <h1 className='text-lg font-bold'>Tools:</h1>
                <div className='flex flex-row gap-2'>
                    {project.tool.map((tool) => (
                        <HoverCard>
                            <HoverCardTrigger>
                                <Badge key={tool.id} className='text-md text-slate-500'>{tool.name}</Badge>
                            </HoverCardTrigger>
                            <HoverCardContent>
                              {tool.description}
                            </HoverCardContent>
                        </HoverCard>
                    ))}

                </div>

            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-lg font-bold'>Description:</h1>
                <p className='text-md text-slate-500'>{ }</p>
            </div>






        </div>
    )
}
