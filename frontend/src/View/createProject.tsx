import { useState, useRef } from 'react';
import { createRoute } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import z from 'zod'
import { zPorject } from "@server/ZodObject"
import { Button } from '@/components/ui/button';
import InputBox from '@/components/InputBox';
import { toB64 } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from "sonner"
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';


import axios from 'axios';
import { DatePickerDemo } from '@/components/ui/DatePickerDemo';

const zTool = z.object({
  name: z.string(),
  description: z.string()

})
import React from 'react'
import { log } from 'console';
import { DateTime } from 'luxon';

interface Props {
  setProjectInfo: React.Dispatch<React.SetStateAction<z.infer<typeof zPorject>>>,
  projectInfo: z.infer<typeof zPorject>
}



export default function CreateProjectNode({ projectInfo, setProjectInfo }: Props) {
  const makeProject = useMutation({
    mutationFn: async (content: z.infer<typeof zPorject>) => {
      const { data } = await axios.post("/api/PROJECT", content)


      return data;
    }
  })


  // const [session , setSession] = useState<z.infer<typeof zSession>>();
  const imgRefInput = useRef<HTMLInputElement | null>(null)
  const [tool, setTool] = useState<z.infer<typeof zTool>>({
    name: "",
    description: ""
  })


  function formProject(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setProjectInfo((prw: typeof projectInfo) => ({
      ...prw,
      [name]: value
    }))

  }
  function formTool(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { value, name } = e.target;

    setTool((prw: typeof tool) => ({
      ...prw,
      [name]: value
    }))
  }
  async function formProjectList(Location: "tool" | "img") {
    if (Location == "tool") {
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


      setProjectInfo(prw => ({
        ...prw,
        tool: [...prw.tool, tool]
      }))

      setTool({
        name: "",
        description: ""
      })

    }
    if (Location == "img") {
      const imgInput = imgRefInput.current;
      if (imgInput && imgInput.files) {
        const files = Array.from(imgInput.files);
        const base64Files = await Promise.all(files.map(toB64));;
        setProjectInfo(prw => ({
          ...prw,
          image: [...prw.image, ...base64Files]
        }))
        if (imgRefInput.current?.value) {
          imgRefInput.current.value = "";
        }

      }

    }

  }

  function SendNewProject() {
    if (projectInfo.publishedDate == null) {
      setProjectInfo(prw => ({
        ...prw,
        PublishedDate: new Date().toISOString()
      }))
        ;
    }
    console.log(projectInfo);
    const projectInput = zPorject.safeParse(projectInfo);
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
    makeProject.mutate(projectInfo, {
      onSuccess: () => {
        toast.success("Project Created")
        setProjectInfo({
          name: "",
          image: [],
          repository: '',
          deploymentPlatform: '',
          url: '',
          tool: [],
          publishedDate: ""
        })
      },
      onError: (error) => {
        console.log(error);

        toast.error("Error creating project")
      }
    })


  }

  function setDate(date: Date | undefined) {
    const dateInput = DateTime.fromISO(date?.toString() || "");

    if (date) {
      setProjectInfo(prw => ({
        ...prw,
        PublishedDate: dateInput.toFormat("yyyy-MM-dd")
      }))
    }

  }



  return (
    <div className="flex-1">


      <div className=' w-full flex flex-col gap-12 justify-center items-center  flex-1'>

        <div className=' flex flex-col gap-2'>
          <InputBox disable={makeProject.isPending} size={33} value={projectInfo.name} id={"name"} Name='name' set={formProject} />
          <InputBox disable={makeProject.isPending} size={33} value={projectInfo.repository} Name='repository' id={"repository"} set={formProject} />
          <InputBox disable={makeProject.isPending} size={33} value={projectInfo.deploymentPlatform} Name='deploymentPlatform' id={"deploymentPlatform"} set={formProject} />
          <InputBox disable={makeProject.isPending} size={33} value={projectInfo.url} id={"url"} Name='url' set={formProject} />


          <div className={`flex flex-col gap-1 w-[${33}rem]  `}>
            <Label htmlFor='publishedDate'>Published Date</Label>
            <DatePickerDemo setDate={setDate} date={projectInfo.publishedDate} />
          </div>




        </div>




        <div className=' flex flex-row gap-3 '>
          <div className='  flex flex-col w-[33rem] ring-1 ring-cyan-950 rounded-sm p-1.5'>
            <div className=' flex flex-col gap-1.5 '>
              <InputBox disable={makeProject.isPending} size={32} value={tool.name} id={"name"} Name='name' set={formTool} />
              <Label htmlFor='Description-a'>Description</Label>
              <Textarea
                className=' resize-none'
                disabled={makeProject.isPending}
                value={tool.description}
                onChange={formTool}
                name="description"
                id="description-a"
                placeholder="description"
                rows={4}
              />
              <Button disabled={makeProject.isPending} variant={"secondary"} size={"lg"} onClick={() => formProjectList("tool")}> add tool</Button>
              <div className=' flex flex-row flex-wrap gap-1.5 overflow-scroll'>
                {projectInfo.tool.map((tool, index) => (
                  <Badge key={index} className=' text-[14px]' variant={"green"} onDoubleClick={() => {
                    setProjectInfo(prw => ({
                      ...prw,
                      tool: prw.tool.filter((_, i) => i !== index)
                    }))
                  }}>
                    {tool.name}
                  </Badge>
                ))}
              </div>


            </div>

          </div>



          <div className=' flex flex-col gap-1.5 w-[26rem] ring-1 ring-cyan-950 rounded-sm p-1.5'>
            <Input type="file"
              className='w-[100%] '
              disabled={makeProject.isPending}
              accept="image/*"
              ref={imgRefInput}
              multiple={false}
              name="imageUpload"
              id="imageUpload"
              aria-label="Upload an image file"
            />
            <Button disabled={makeProject.isPending} onClick={() => formProjectList("img")}>add Image</Button>
            <div className=' flex flex-row flex-wrap gap-1.5 overflow-scroll h-full'>
              {projectInfo.image.map((tool, index) => (
                <Badge key={index} className=' text-[15px]' variant={"green"} onDoubleClick={() => {
                  setProjectInfo(prw => ({
                    ...prw,
                    image: prw.image.filter((_, i) => i !== index)
                  }))
                }}>
                  {tool.name}
                </Badge>
              ))}
            </div>


          </div>

        </div>

        <Button disabled={makeProject.isPending} variant={"outline"} size={"lg"} onClick={SendNewProject}> create project {makeProject.isPending && (<LoaderCircle className=' animate-spin' />)}</Button>

      </div>




    </div>
  );
}