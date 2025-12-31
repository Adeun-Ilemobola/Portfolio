import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { trpc as api } from '@/lib/client';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { IconBrandJavascript, IconCornerDownLeft, IconX } from '@tabler/icons-react';
import { Button } from './ui/button';
import { ContactSchema, ContactType } from '@/lib/ZodObject';
import { toast } from 'sonner';

type Props = {
  setShowContact: React.Dispatch<React.SetStateAction<boolean>>,
  showContact: boolean
}

export default function ContactSlide({ setShowContact, showContact }: Props) {
  const [formData, setFormData] = useState<ContactType>({
    name: "",
    email: "",
    company: "",
    message: ""
  })

  const sendMessage = api.SendMesage.useMutation({
    onSuccess: (data) => {
      toast.success("Message sent successfully!", { id: "send-message" });
      setFormData({ name: "", email: "", company: "", message: "" });
      
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.", { id: "send-message" });
    },
    onMutate: () => {
      toast.loading("Sending Message...", { id: "send-message" });
    }
  });

  return (
    <AnimatePresence>
      {showContact && (
        <>
          {/* 1. Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContact(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          {/* 2. Sliding Form Container */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className='
              fixed top-4 right-4 bottom-4 z-50
              w-full md:w-[600px]
              flex flex-col gap-6 items-center justify-center
              rounded-3xl
              overflow-hidden
              
              /* Glassmorphism Surface */
              bg-[#ffffff]/80 dark:bg-[#1f2937]/80
              backdrop-blur-[24px]
              
              /* Edge Lighting & Depth */
              border border-white/50 dark:border-white/10
              shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]
            '
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowContact(false)}
              className='absolute top-6 right-6 hover:bg-black/5 dark:hover:bg-white/10 rounded-full'
            >
              <IconX size={24} className="text-gray-500" />
            </Button>

            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight drop-shadow-sm">
                Get in touch
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fill out the payload below to execute send.
              </p>
            </div>

            <div className='flex flex-col gap-5 w-full max-w-lg px-6 md:px-8'>

              {/* Email Input */}
              <InputGroup className='overflow-hidden shadow-sm transition-transform focus-within:scale-[1.01]'>
                <InputGroupInput 
                   disabled={sendMessage.isPending} 
                   value={formData.email} 
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
                <InputGroupAddon align={"inline-start"}>
                  <InputGroupText className='gap-0.5 min-w-[4rem] justify-center'>
                    <span className='text-[#e11d48] dark:text-[#fda4af]'>*</span>Email
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              <div className='flex flex-col md:flex-row gap-5 items-center w-full'>
                {/* Name Input */}
                <InputGroup className="flex-1 w-full shadow-sm transition-transform focus-within:scale-[1.01]">
                  <InputGroupInput 
                    disabled={sendMessage.isPending} 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  />
                  <InputGroupAddon align={"inline-start"}>
                    <InputGroupText className='gap-0.5 min-w-[4rem] justify-center'>
                      <span className='text-[#e11d48] dark:text-[#fda4af]'>*</span>Name
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {/* Company Input */}
                <InputGroup className="flex-1 w-full shadow-sm transition-transform focus-within:scale-[1.01]">
                  <InputGroupInput 
                    disabled={sendMessage.isPending}
                    value={formData.company || ""} 
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                  />
                  <InputGroupAddon align={"inline-start"}>
                    <InputGroupText className='gap-0.5 min-w-[5rem] justify-center'>
                      Company
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>

              {/* Message Area (Code Editor Style) */}
              <InputGroup className="shadow-lg overflow-hidden rounded-xl border border-white/30 dark:border-white/10 transition-all focus-within:ring-2 ring-[#059669]/20">
                <InputGroupAddon align="block-start" className="border-b border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md">
                  <InputGroupText className="font-mono font-medium text-xs text-gray-600 dark:text-gray-300 flex w-full justify-between">
                    <span className="flex items-center">
                      <IconBrandJavascript size={16} className="mr-2 text-[#facc15]" />
                      payload.json
                    </span>
                    <span className="opacity-50 text-[10px]">READ-WRITE</span>
                  </InputGroupText>
                </InputGroupAddon>

                <InputGroupTextarea
                  id="textarea-code-32"
                  placeholder="// Type your message here..."
                  className="min-h-[220px] font-mono text-sm bg-white/40 dark:bg-black/20 border-none resize-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500/70 dark:placeholder:text-gray-500 focus:ring-0 leading-relaxed"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={sendMessage.isPending}
                />

                <InputGroupAddon align="block-end" className="border-t border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/30 backdrop-blur-md p-2">
                  <div className="flex justify-between items-center w-full">
                    <InputGroupText className="text-[10px] text-gray-500 dark:text-gray-400 bg-transparent border-none font-mono">
                      Ln {formData.message.split("\n").length}, Col {formData.message.length - formData.message.lastIndexOf("\n")}
                    </InputGroupText>

                    <InputGroupButton
                      size="sm"
                      className="
                        bg-[#059669] hover:bg-[#047857] 
                        dark:bg-[#6ee7b7] dark:hover:bg-[#34d399] dark:text-gray-900 
                        text-white font-medium border-none shadow-md transition-all
                        flex items-center gap-2 px-4
                      "
                      disabled={sendMessage.isPending}
                      onClick={() => {
                        const Validation = ContactSchema.safeParse(formData);
                        if (!Validation.success) {
                          Validation.error.issues.forEach((issue) => {
                            console.error(`Validation error in ${issue.path.join('.')}: ${issue.message}`);
                            toast.error(`Validation error in ${issue.path.join('.')}: ${issue.message}`);
                          })
                          return;
                        }
                        console.log("Form Data Validated:", formData);
                        
                        sendMessage.mutate({
                          email: formData.email,
                          name: formData.name,
                          company: formData.company,
                          message: formData.message
                        })
                      }}
                    >
                      {sendMessage.isPending ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          Execute <IconCornerDownLeft size={16} />
                        </>
                      )}
                    </InputGroupButton>
                  </div>
                </InputGroupAddon>
              </InputGroup>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}