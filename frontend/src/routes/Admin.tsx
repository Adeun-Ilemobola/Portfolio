import { useState, useRef } from 'react';
import { createRoute } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import z from 'zod'
import { Button } from '@/components/ui/button';
import CreateProject from '@/View/createProject';
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

const zTool = z.object({
  name: z.string(),
  Description: z.string()

})
function Admin() {
  const [Preview, setPreview] = useState(false)
  const [projectInfo, setProjectInfo] = useState<z.infer<typeof zPorject>>({
    name: "",
    image: [],
    Repository: '',
    DeploymentPlatform: '',
    url: '',
    tool: [],
    PublishedDate: ""

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
            </TabsContent>
            <TabsContent className=' flex flex-col justify-center items-center' value="preview Card">

              <Card className="w-96 py-3">
            
                <CardContent className='px-3'>
                  <div className='flex flex-col gap-2'>


                    <CardHeader className='px-1 flex flex-row justify-center  gap-2'>
                      <CardTitle className='text-2xl font-bold'>{projectInfo.name}</CardTitle>
                      <CardDescription className='flex-1 flex flex-col-reverse justify-center'>
                        <Badge className=' text-[10px]' variant={"destructive"}>{projectInfo.DeploymentPlatform}</Badge>
                        </CardDescription>
                    </CardHeader>
                    
                  </div>
                </CardContent>
                <CardFooter className='px-3'>
                  <Button variant="outline">View Project</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>




        </>) : <CreateProject setProjectInfo={setProjectInfo} projectInfo={projectInfo} />}




    </div>
  );
}

const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/Admin',
  component: Admin
});

export default AdminRoute;