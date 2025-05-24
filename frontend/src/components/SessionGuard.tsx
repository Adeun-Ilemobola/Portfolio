import { useEffect, useState } from 'react';
import { Navigate } from '@tanstack/react-router';
import { useSessionStore } from '@/lib/sessionStore';
import { LoaderCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay
} from "@/components/ui/dialog"
import InputBox from './InputBox';
import { Button } from './ui/button';


interface Props {
    children: React.ReactNode;
}

const zLog = z.object({
    pass: z.string().min(5),
    name: z.string().min(3)
})

export const SessionGuard = ({ children }: Props) => {
    const { fetchSession, isLoading, isAuthenticated, setSession, error, data } = useSessionStore();
    const [auth, setAuth] = useState<z.infer<typeof zLog>>({
        pass: "",
        name: ""
    })
    const [showAuth, setShowAuth] = useState(false)
    useEffect(() => {
        if (!data) {
            fetchSession();
        }
        if (!isAuthenticated() || !data) {
            setShowAuth(true)
        }else{
             setShowAuth(false)
        }

    }, [data]);
    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error]);


    function submit() {
        const dat = zLog.safeParse(auth)
        if (!dat.success) {
            dat.error.errors.forEach(error => { toast.error(error.message) })
            return
        }
        setSession(dat.data)

    }




    if (isLoading) return (<>
        <div className="flex items-center justify-center h-screen">
            <LoaderCircle className=' text-2xl animate-spin' />
            <h2 className='text-lg'>Loading Session data</h2>
        </div>


    </>);

    return (<>



        <Dialog open={showAuth} onOpenChange={setShowAuth}>
            <DialogOverlay className='bg-black/50 backdrop-blur-md' />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login to authenticate</DialogTitle>
                    <DialogDescription>
                        To access any of the functionalities to create project update profile
                    </DialogDescription>
                </DialogHeader>


                <form onSubmit={(e) => {
                    e.preventDefault();
                    submit()

                }}
                    className=' flex flex-col gap-2 justify-center'
                >


                    <InputBox
                        set={(e) => {
                            setAuth(pre => ({ ...pre, name: e.target.value }))
                        }}
                        Name={"name"}
                        id={"name"}
                        value={auth.name}
                        size={28}
                        disable={isLoading}


                    />
                    <InputBox
                        set={(e) => {
                            setAuth(pre => ({ ...pre, pass: e.target.value }))
                        }}
                        Name={"psaa"}
                        id={"pass"}
                        value={auth.pass}
                        size={28}
                        disable={isLoading}


                    />


                    <Button type="submit">
                        Authenticate
                    </Button>



                </form>





            </DialogContent>
        </Dialog>




        {children}
    </>);
};
