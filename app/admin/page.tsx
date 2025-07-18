"use client"
import InputBox from '@/components/inputBox'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
const zLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
const zRegister = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match"
}
)
export default function Page() {
    const [mode, setMode] = React.useState<'login' | 'register'>('login')
    const [, setLoading] = React.useState(false)
   
    return (
        <div className='flex flex-col m-auto max-w-[85rem] min-w-[85rem] justify-center items-center min-h-screen relative'>
            <div className='flex flex-col items-center justify-center w-2xl '>
                <Button variant={"destructive"} onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className=' ml-auto'>
                    {mode === 'login' ? 'Register' : 'Login'}
                </Button>

                {mode === 'login' ? <Login setLoading={setLoading} /> : <Register setMode={setMode} />}
            </div>

        </div>
    )
}


function Login({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {

    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    });
    const mLogin = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            toast.loading('Logging in...' , { id: 'login' }); 
            try {
                const signInPromise = await authClient.signIn.email({
                    email: data.email,
                    password: data.password,
                    callbackURL: '/admin/dashboard',
                });
                if (signInPromise.error) {
                    console.error('Login failed:', signInPromise.error);
                    throw signInPromise.error; // Re-throw to let useMutation handle it
                }

                toast.success('Login successful', { id: 'login' });
                return signInPromise;
            } catch (error) {

                console.error('Login failed:', error);
                 toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
                throw error; // Re-throw to let useMutation handle it
            }
        },

        onError: (error) => {
            console.error('Login failed:', error);
            toast.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);

        }
    })
    const handleLogin = async () => {
        // this kicks off the mutation and gives us back a Promise
        setLoading(true);
        const loginValidation = zLogin.safeParse(loginData);
        if (!loginValidation.success) {
           if (loginValidation.error.issues.length > 0) {
               loginValidation.error.issues.forEach((error) => {
                   toast.error(error.message);
               })
            }
            return;
        }
        await mLogin.mutateAsync({ ...loginData })
        new Promise((resolve) => setTimeout(resolve, 1000));

        setLoginData({
            email: '',
            password: ''
        });
        setLoading(false);

    }

    return (

        <>

            <h1 className='text-3xl font-bold mb-4'>Login</h1>
            <div className='flex flex-col gap-4 w-full justify-center items-center'>
                <InputBox
                    label='Email'
                    type='email'
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e })}
                    placeholder='Enter your email'
                    className='w-full max-w-md'

                />
                <InputBox
                    label='Password'
                    type='password'
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e })}
                    placeholder='Enter your password'
                    className='w-full max-w-md'
                />
            </div>
            <Button onClick={handleLogin} className='mt-4'>
                {mLogin.isPending ? (<> <LoaderCircle className=" animate-spin" />{'Logging in...'}</>) : 'Login'}
            </Button>

        </>
    )

}

function Register({ setMode }: { setMode: React.Dispatch<React.SetStateAction<"login" | "register">> }) {
    // Registration logic goes here
    // You can use a similar approach as in the Login component
    const [registerData, setRegisterData] = React.useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const mRegister = useMutation({
        mutationFn: async (data: { email: string; password: string; confirmPassword: string }) => {
            toast.loading('Registering...', { id: 'register' });
            try {
                const s = await authClient.signUp.email({
                    email: data.email,
                    password: data.password,
                    name: data.email.slice(0, data.email.indexOf("@")),
                })
                if (s.error) {
                    console.error('Registration failed:', s.error);
                    throw s.error; // Re-throw to let useMutation handle it
                }
                toast.success('Registration successful', { id: 'register' });
                setMode('login');
                return s;

            } catch (error) {
                console.log("error", error);
                toast.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);


            }

        },
        onSuccess: () => {
            console.log('Registration successful');

        },
        onError: (error) => {
            toast.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    })
    const handleRegister = () => {
        // this kicks off the mutation and gives us back a Promise
        const registerValidation = zRegister.safeParse(registerData);
        if (!registerValidation.success) {
            toast.error(`Registration failed: ${registerValidation.error.message}`);
            return;
        }
        const p = mRegister.mutateAsync({ ...registerData })

        // wrap it in toast.promise
        toast.promise(p, {
            loading: 'Registering…',
            error: (err) => `Registration failed: ${err.message}`,
        })
        setRegisterData({
            email: '',
            password: '',
            confirmPassword: ''
        });
    }
    return (
        <>
            <h1 className='text-3xl font-bold mb-4'>Register</h1>
            {/* Add your registration form here */}
            <div className='flex flex-col gap-4 w-full justify-center items-center'>



                <InputBox
                    label='Email'
                    type='email'
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e })}
                    placeholder='Enter your email'
                    className='w-full max-w-md'
                />
                <InputBox
                    label='Password'
                    type='password'
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e })}
                    placeholder='Enter your password'
                    className='w-full max-w-md'
                />
                <InputBox
                    label='Confirm Password'
                    type='password'
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e })}
                    placeholder='Confirm your password'
                    className='w-full max-w-md'
                />
            </div>
            <Button onClick={handleRegister} className='mt-4'>
                {mRegister.isPending ? (<> <LoaderCircle className=" animate-spin" />
                    {'Registering...'}</>) : 'Register'}
            </Button>
        </>
    )
}