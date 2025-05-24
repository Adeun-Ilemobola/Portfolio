import { useState, useRef } from 'react';
import { createRoute } from '@tanstack/react-router';
import z from 'zod'
import RootRoute from '@/components/rootRoute';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zPorject } from "@server/ZodObject"
import ProjectCard from '@/components/ProjectCard';
import ProjectView from '@/components/ProjectView';
import ProjestMakeEdit from '@/components/ProjestMaleEdit';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { SessionGuard } from '@/components/SessionGuard';
type Project = z.infer<typeof zPorject>;

function CreateProject() {
  const [Preview, setPreview] = useState(false)
  const [projectInfo, setProjectInfo] = useState<Project>({
    name: "",
    image: [],
    repository: '',
    deploymentPlatform: '',
    url: '',
    tool: [],
    publishedDate: ""
  });

  const makeProject = useMutation({
      mutationFn: async (content: z.infer<typeof zPorject>) => {
        const { data } = await axios.post("/api/PROJECT", content)
  
  
        return data;
      }
    })


    function SendNewProject(data:Project){
      const  vailedData = zPorject.safeParse(data)
      if (!vailedData.success) {
        vailedData.error.errors.forEach((err) => {
          toast.error(err.message)
        })
        return
      }
      makeProject.mutate(data, {
        onSuccess: (data) => {
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
        onError: (err) => {
          toast.error("Error creating project")
        }
      })

    }





  return (
    <div className="flex flex-col min-h-screen p-2">
      <div className=' flex flex-row-reverse '>
        <Button onClick={() => {
          setPreview(!Preview)
        }} variant={"outline"} size={"lg"} className=' w-20'>Preview</Button>
      </div>

      {Preview ?
        (<>

          <Tabs defaultValue="preview" className="w-full">
            <TabsList className=" w-2/5 mx-auto">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="preview Card">preview Card</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <div className='flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold'>Preview</h1>
                <p className='text-lg'>This is the preview of the project</p>
              </div>
              <ProjectView project={projectInfo} />
            </TabsContent>
            <TabsContent className=' flex flex-col justify-center items-center' value="preview Card">

              <ProjectCard projectInfo={projectInfo} ModifyMode={false} del={(id: string | undefined) => { }} />

            </TabsContent>


          </Tabs>




        </>) : (<>
          <ProjestMakeEdit
            project={projectInfo}
            isPending={makeProject.isPending}
            onSubmit={SendNewProject}
            setProject={setProjectInfo}

          />

        </>)}




    </div>
  );
}

const CreateProjectRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/client/Admin/CreateProject',
  component: () => (<>
    <SessionGuard>
      <CreateProject />
    </SessionGuard>
  
    </>),
  
});

export default CreateProjectRoute;