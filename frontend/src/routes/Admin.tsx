import {  useState , useRef } from 'react';
import { createRoute } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute';
import z from 'zod'
import {zPorject } from "@server/src/ZodObject"
import { Button } from '@/components/ui/button';
import InputBox from '@/components/InputBox';


const zTool =z.object({
  name:z.string(),
  Description:z.string()

})
function Admin() {
  const [projectInfo , setProjectInfo] = useState<z.infer<typeof zPorject>>({
    name: "",
    image: [],
    Repository: '',
    DeploymentPlatform: '',
    url: '',
    tool:[],
    PublishedDate:null

  });
  // const [session , setSession] = useState<z.infer<typeof zSession>>();
  const imgRefInput= useRef<HTMLInputElement | null>(null)
  const [tool , setTool] =useState<z.infer<typeof zTool>>({
    name:"",
    Description:""
  })


  function formProject(e:React.ChangeEvent<HTMLInputElement>){
    const {value , name}=e.target;

    setProjectInfo((prw: typeof projectInfo) => ({
      ...prw,
      [name]: value
    }))

  }

  function formProjectList(Location:"tool" | "img") {
    if (Location == "tool"){



     
      setTool({
        name:"",
        Description:""
      })
    
    }
    if (Location == "img"){
      const imgInput = imgRefInput.current; 
    }
    
  }

  function SendNewProject() {
    console.log(projectInfo);
    
    
  }



  return (
    <div className="flex flex-col min-h-screen p-2">
      <div className=' flex flex-row-reverse '>
        <Button variant={"outline"}  size={"lg"}  className=' w-20'>Preview</Button>
      </div>

      <div className=' w-full flex flex-col gap-12 justify-center items-center flex-1'>
        <div className=' flex flex-row gap-1.5 justify-center items-center'>

        <div className=' p-2 flex flex-col w-[30rem] justify-center  ring-1 ring-cyan-950 rounded-sm'>
          <InputBox disable={false} size={350} value={projectInfo.name} id={"name"} Name='name' set={formProject}/>
          <InputBox disable={false} size={350} value={projectInfo.Repository} Name='Repository' id={"Repository"} set={formProject}/>
          <InputBox disable={false} size={350} value={projectInfo.DeploymentPlatform} Name='DeploymentPlatform' id={"DeploymentPlatform"} set={formProject}/>
          <InputBox disable={false} size={350} value={projectInfo.url} id={"url"} Name='url' set={formProject}/>
        </div>


        <div className=' p-1 flex flex-col w-[30rem] justify-center  ring-1 ring-cyan-950 rounded-sm'>
        
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