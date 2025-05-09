import { useState, useRef } from 'react';
import { createRoute } from '@tanstack/react-router';
import z from 'zod'
import RootRoute from '@/components/rootRoute';

import { Button } from '@/components/ui/button';
import CreateProjectNode from '@/View/createProject';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zPorject } from "@server/ZodObject"
import { Badge } from '@/components/ui/badge';
import AdminRoute from './Admin';
import ProjectCard from '@/components/ProjectCard';
import ProjectView from '@/components/ProjectView';

function CreateProject() {
  const [Preview, setPreview] = useState(false)
    const [projectInfo, setProjectInfo] = useState<z.infer<typeof zPorject>>({
      name: "",
      image: [],
      repository: '',
      deploymentPlatform: '',
      url: '',
      tool: [],
      publishedDate: ""
  
    });
  
  
  
  
  
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
  
               <ProjectCard projectInfo={projectInfo}  ModifyMode={false} del={(id: string | undefined)=>{}}/>

              </TabsContent>


            </Tabs>
  
  
  
  
          </>) : <CreateProjectNode setProjectInfo={setProjectInfo} projectInfo={projectInfo} />}
  
  
  
  
      </div>
    );
}

const CreateProjectRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/Admin/CreateProject',
  component: CreateProject
});

export default CreateProjectRoute;