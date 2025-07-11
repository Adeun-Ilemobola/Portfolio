"use client"

import InputBox from '@/components/inputBox'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function Page() {
    const [mode, setMode] = React.useState<'login' | 'register'>('login')
    return (
        <div className='flex flex-col m-auto max-w-[85rem] min-w-[85rem] justify-center items-center min-h-screen relative'>
            <div className='flex flex-col items-center justify-center w-2xl '>
                <Button variant={"destructive"} onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className=' ml-auto'>
                    {mode === 'login' ? 'Register' : 'Login'}
                </Button>

                {mode === 'login' ? <Login /> : <Register />}
            </div>

        </div>
    )
}


function Login() {
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    });
    const mLogin = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            // Replace with your login API call

            return new Promise((resolve) => setTimeout(resolve, 1000));
        },
        onSuccess: () => {
            console.log('Login successful');
        },
        onError: (error) => {
            console.error('Login failed:', error);
        }
    })
    const handleLogin = () => {
        // this kicks off the mutation and gives us back a Promise
        const p = mLogin.mutateAsync({ ...loginData })

        // wrap it in toast.promise
        toast.promise(p, {
            loading: 'Logging in…',
            success: 'Welcome back!',
            error: (err) => `Login failed: ${err.message}`,
        })
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

function Register() {
    // Registration logic goes here
    // You can use a similar approach as in the Login component
    const [registerData, setRegisterData] = React.useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const mRegister = useMutation({
        mutationFn: async (data: { email: string; password: string; confirmPassword: string }) => {
            // Replace with your registration API call

            return new Promise((resolve) => setTimeout(resolve, 1000));
        },
        onSuccess: () => {
            console.log('Registration successful');
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        }
    })
    const handleRegister = () => {
        // this kicks off the mutation and gives us back a Promise
        const p = mRegister.mutateAsync({ ...registerData })

        // wrap it in toast.promise
        toast.promise(p, {
            loading: 'Registering…',
            success: 'Registration successful!',
            error: (err) => `Registration failed: ${err.message}`,
        })
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