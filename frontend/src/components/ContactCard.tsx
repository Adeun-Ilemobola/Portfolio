import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';

interface ContactCardProps {
    children: React.ReactNode,
    showContact: boolean,
    setShowContact: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ContactCard({ children, setShowContact, showContact }: ContactCardProps) {
    const makeMesage = useMutation({
        mutationFn: async (data: { name: string, email: string, message: string }) => {
            try {
                toast.loading("Sending Message", {
                    description: "Please wait while we send your message.",
                    duration: 2000
                })
                const res = await axios.post('/api/sendContact', data);
                toast.dismiss();
                if (res.status === 200) {

                    return res.data;
                } else {
                    throw new Error("Failed to send message");
                }

            } catch (error) {
                console.error("Error sending message:", error);
                toast.error("Message Failed to send", {
                    description: "Please try again later.",
                    duration: 2000
                })


            }

        },
        onSuccess: () => {

            toast.success("Message Sent", {
                description: "Your message has been sent successfully.",
                duration: 2000
            })
            setTimeout(() => {
                toast.dismiss();
                setShowContact(false)
            }, 900)

        },
        onError: () => {
            toast.error("Message Failed to send", {
                description: "Please try again later.",
                duration: 2000
            })
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            message: formData.get('message') as string
        }

        makeMesage.mutate(data)
    }
    return (
        <Dialog open={showContact} onOpenChange={setShowContact}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Contact me by email</DialogTitle>
                    <form onSubmit={handleSubmit} className=' flex gap-3 flex-col h-full justify-center  '>

                        <div className=' flex gap-1  flex-col justify-center items-center  '>
                            <div className=' flex flex-row gap-6 h-full justify-center w-full'>

                                <div className='flex flex-col gap-1.5 w-[30%]'>
                                    <Label className='text-sm font-medium text-gray-200 ' htmlFor='name'>
                                        <span className=' text-red-500/60'>*<span className='text-gray-200'>Name:</span> </span>
                                    </Label>
                                    <Input disabled={makeMesage.isPending} type="text" id='name' name='name' required className='ring-1 ring-gray-500 block  text-gray-400 ' />

                                </div>
                                <div className='flex flex-col gap-1.5 w-[30%]'>
                                    <Label className='text-sm font-medium text-gray-200 ' htmlFor='email'>
                                        <span className=' text-red-500/60'>*<span className='text-gray-200'>Email:</span> </span>

                                    </Label>
                                    <Input disabled={makeMesage.isPending} type='email' id='email' name='email' required className='ring-1 ring-gray-500 block  text-gray-400 ' />

                                </div>




                            </div>

                            <div className='flex flex-col gap-1.5  flex-1 w-[90%]'>
                                <Label className='text-sm font-medium text-gray-200 ' htmlFor='message'>
                                    <span className=' text-red-500/60'>*<span className='text-gray-200'>Message:</span> </span>

                                </Label>
                                <Textarea disabled={makeMesage.isPending} id='message' name='message' required className=' h-28 ring-1 ring-gray-500   text-gray-400 resize-none p-1.5  ' />
                            </div>

                        </div>

                        <div className=' flex flex-row justify-center items-center gap-3 '>
                            <Button disabled={makeMesage.isPending} className='text-white bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-pink-500 hover:to-purple-700' type='submit'>
                                Send
                                {makeMesage.isPending && (<LoaderCircle className=' animate-spin' />)}
                            </Button>
                        </div>




                    </form>

                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
