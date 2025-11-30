import React from 'react'
import { motion } from "motion/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { IconBrandJavascript, IconCornerDownLeft } from '@tabler/icons-react';
import { Button } from './ui/button';

type Props = {
    setShowContact: React.Dispatch<React.SetStateAction<boolean>>,
    showContact: boolean
}

export default function ContactSlide({ setShowContact, showContact }: Props) {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 25 }}
      className='
        fixed top-20 right-0 z-50
        h-[80vh] w-[65vw]
        flex flex-col gap-6 items-center justify-center
        rounded-3xl
        
        /* Glassmorphism Surface & Blur */
        bg-[#ffffff]/70 dark:bg-[#1f2937]/60
        backdrop-blur-[18px]
        
        /* Edge Lighting (Border) */
        border border-white/50 dark:border-white/10
    
        
        /* Depth */
        shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]
      '
    >
        <Button
        onClick={() => {
          setShowContact(!showContact)
        }}
        className='absolute top-4 right-4'
        >
          <IconCornerDownLeft size={30} />
        </Button>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight drop-shadow-sm">
        Contact Us
      </h1>

      <div className='flex flex-col gap-4 w-full max-w-2xl px-8'>
        
        {/* Email Input */}
        <InputGroup className=' overflow-hidden' >
          <InputGroupInput className="shadow-sm" />
          <InputGroupAddon align={"inline-start"}>
            <InputGroupText className='gap-0.5   '>
              <span className='text-[#e11d48] dark:text-[#fda4af]'>*</span>Email 
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <div className='flex flex-row gap-4 items-center w-full'>
          {/* Name Input */}
          <InputGroup className="flex-1  ">
            <InputGroupInput className='min-w-[233px] ' />
            <InputGroupAddon align={"inline-start"}>
              <InputGroupText className='gap-0.5 '>
                <span className='text-[#e11d48] dark:text-[#fda4af]'>*</span>Name
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          {/* Company Input */}
          <InputGroup className="flex-1 ">
            <InputGroupInput className='min-w-[233px]' />
            <InputGroupAddon align={"inline-start"}>
              <InputGroupText className='gap-0.5 '>
                Company
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Message Area */}
        <InputGroup className="shadow-sm overflow-hidden rounded-lg border border-white/20 dark:border-white/5">
          <InputGroupAddon align="block-start" className="border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md">
            <InputGroupText className="font-mono font-medium text-xs text-gray-600 dark:text-gray-300">
              <IconBrandJavascript size={16} className="mr-2" />
              Message Payload
            </InputGroupText>
          </InputGroupAddon>

          <InputGroupTextarea
            id="textarea-code-32"
            placeholder="Start a message..."
            className="min-h-[200px] bg-white/30 dark:bg-black/20 border-none resize-none text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0"
          />

          <InputGroupAddon align="block-end" className="border-t border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md p-2">
            <InputGroupText className="text-xs text-gray-500 dark:text-gray-400 bg-transparent border-none">
              Line 1, Column 1
            </InputGroupText>
            
            <InputGroupButton 
              size="sm" 
              className="ml-auto bg-[#059669] hover:bg-[#047857] dark:bg-[#6ee7b7] dark:hover:bg-[#34d399] text-white dark:text-gray-900 font-medium border-none shadow-md transition-all" 
            >
              Send <IconCornerDownLeft size={16} className="ml-1" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

      </div>
    </motion.div>
  )
}