import { useEffect, useState } from 'react';
import { createRoute } from '@tanstack/react-router';
import RootRoute from '@/components/rootRoute'; 
import { useSessionStore } from '@/lib/sessionStore';
import InputBox from '@/components/InputBox';
import { Button } from '@/components/ui/button';


import { z } from 'zod';
import { toast } from 'sonner';


const zLogin = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    pass: z.string().min(1, { message: "Password is required" })
})

function Login() {
    const  {isLoading , data , setSession} = useSessionStore()
    const [info, setInfo] = useState({
        name: "",
        pass:""
    })


    function onSubmit() {
        const vailedData = zLogin.safeParse(info)
        if (!vailedData.success) {
            vailedData.error.errors.forEach((err) => {
                toast.error(err.message)
            })
            return
        }
        setSession(vailedData.data)
        
    }
  return (
    <div className="flex flex-col min-h-screen p-2 justify-center items-center">

        <InputBox
            disable={false} 
            size={30}  id={"name"} Name='name'
            value={info.name}
            set={(e) => setInfo({ ...info, name: e.target.value })}
        
        />

        <InputBox
            disable={false} 
            size={30}  id={"pass"} Name='pass'
            value={info.pass}
            set={(e) => setInfo({ ...info, pass: e.target.value })}
        />
        <Button
            disabled={isLoading}
        variant={"secondary"}
        >
            Login
        </Button>
      
    </div>
  );
}

const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: Login
});

export default LoginRoute;