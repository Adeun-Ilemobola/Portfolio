import { useState, useRef } from 'react';
import { createRoute } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import z from 'zod'
import { zPorject } from "@server/src/ZodObject"
import { Button } from '@/components/ui/button';
import InputBox from '@/components/InputBox';
import { toB64 } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';


const zTool = z.object({
  name: z.string(),
  Description: z.string()

})
function Admin() {
  const [projectInfo, setProjectInfo] = useState<z.infer<typeof zPorject>>({
    name: "",
    image: [],
    Repository: '',
    DeploymentPlatform: '',
    url: '',
    tool: [],
    PublishedDate: null

  });
  // const [session , setSession] = useState<z.infer<typeof zSession>>();
  const imgRefInput = useRef<HTMLInputElement | null>(null)
  const [tool, setTool] = useState<z.infer<typeof zTool>>({
    name: "",
    Description: ""
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
        console.log(toolInput.error);
        return;
      }

      setProjectInfo(prw => ({
        ...prw,
        tool: [...prw.tool, tool]
      }))

      setTool({
        name: "",
        Description: ""
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



      }

    }

  }

  function SendNewProject() {
    console.log(projectInfo);


  }



  return (
    <div className="flex flex-col min-h-screen p-2">
      <div className=' flex flex-row-reverse '>
        <Button variant={"outline"} size={"lg"} className=' w-20'>Preview</Button>
      </div>

      <div className=' w-full flex flex-col gap-4 justify-center items-center flex-1'>


        <InputBox disable={false} size={350} value={projectInfo.name} id={"name"} Name='name' set={formProject} />
        <InputBox disable={false} size={350} value={projectInfo.Repository} Name='Repository' id={"Repository"} set={formProject} />
        <InputBox disable={false} size={350} value={projectInfo.DeploymentPlatform} Name='DeploymentPlatform' id={"DeploymentPlatform"} set={formProject} />
        <InputBox disable={false} size={350} value={projectInfo.url} id={"url"} Name='url' set={formProject} />


        <div className=' flex flex-row gap-1.5 justify-center items-center'>



          <div className=' p-1 flex flex-col w-[33rem] justify-center  ring-1 ring-cyan-950 rounded-sm'>
            <div className=' flex flex-col gap-1.5 '>
              <InputBox disable={false} size={350} value={tool.name} id={"name"} Name='name' set={formTool} />


              <Label htmlFor='Description'>Description</Label>

              <Textarea
                className=' resize-none'
                value={tool.Description}
                onChange={formTool}
                name="Description"
                id="Description"
                placeholder="Description"
                rows={4}
              />
              <Button variant={"outline"} size={"lg"} onClick={() => formProjectList("tool")}> add tool</Button>
              <div className=' flex flex-row gap-1.5'>
                {projectInfo.tool.map((tool, index) => (
                  <Badge key={index} variant={"secondary"} onDoubleClick={() => {
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



          <div className=' flex flex-col gap-1.5 w-[33rem]'>
            <Input type="file"
              className='w-[300px]'
              accept="image/*"
              ref={imgRefInput}
              multiple={false}
              name="imageUpload"
              id="imageUpload"
              aria-label="Upload an image file"
              />
              <Button onClick={() => formProjectList("img")}>add Image</Button>
              <div className=' flex flex-row gap-1.5'>
                {projectInfo.image.map((tool, index) => (
                  <Badge key={index} variant={"secondary"} onDoubleClick={() => {
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

        <Button variant={"outline"} size={"lg"} onClick={SendNewProject}> create project</Button>

      </div>




    </div>
  );
}

const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/Admin',
  component: Admin
});

export default AdminRoute;