'use client'

import { Button } from './ui/button';
import { motion } from "motion/react";
import { usePathname } from 'next/navigation'
import { IconBrandAuth0 } from '@tabler/icons-react';

export default function Nav() {
  const pathname = usePathname()
  return (
    <motion.div
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className=" fixed
         top-4 left-1/2 -translate-x-1/2 z-50
        flex items-center gap-2 p-1.5 px-6 rounded-full
        
        /* Glassmorphism Core: Blur (2px-10px) & Saturation */
        backdrop-blur-[8px] backdrop-saturate-150
        
        /* Light Mode: Primary [#ffffff] Surface */
        bg-[#ffffff]/70 
        border border-white/50 
        shadow-[0_4px_20px_rgba(0,0,0,0.08)]

        /* Dark Mode: Primary [#1f2937] Surface */
        dark:bg-[#1f2937]/60 
        dark:border-white/10 
        dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
      "
    >
      {['About', 'Projects', 'Skills'].map((label) => (
        <Button
          key={label}
          variant="ghost"
          onClick={() => {
            const section = document.getElementById(label.toLowerCase());
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
          className="
            relative h-9 px-4 text-sm font-medium tracking-wide transition-all duration-300 rounded-full
            
            /* Text Colors */
            text-gray-700 dark:text-gray-200

            /* Hover States - Accent Token: Light [#059669] | Dark [#6ee7b7] */
            hover:text-[#059669] hover:bg-[#059669]/10
            dark:hover:text-[#6ee7b7] dark:hover:bg-[#6ee7b7]/10

            /* Interactive Underline Animation */
            after:absolute after:bottom-1.5 after:left-1/2 after:-translate-x-1/2 
            after:h-[2px] after:w-0 after:rounded-full 
            after:transition-all after:duration-300 
            hover:after:w-1/2

            /* Underline Color - Highlight Token: Light [#e11d48] | Dark [#fda4af] */
            after:bg-[#e11d48] dark:after:bg-[#fda4af]
          "
        >
          {label}
        </Button>
      ))}


      {pathname.includes("Auth") && (
        <Button
          variant="ghost"
          size={"icon-lg"}
          onClick={() => {
         
          }}
          className="
            relative h-9 px-4 text-sm font-medium tracking-wide transition-all duration-300 rounded-full
            
            /* Text Colors */
            text-gray-700 dark:text-gray-200

            /* Hover States - Accent Token: Light [#059669] | Dark [#6ee7b7] */
            hover:text-[#059669] hover:bg-[#059669]/10
            dark:hover:text-[#6ee7b7] dark:hover:bg-[#6ee7b7]/10

            /* Interactive Underline Animation */
            after:absolute after:bottom-1.5 after:left-1/2 after:-translate-x-1/2 
            after:h-[2px] after:w-0 after:rounded-full 
            after:transition-all after:duration-300 
            hover:after:w-1/2 

            /* Underline Color - Highlight Token: Light [#e11d48] | Dark [#fda4af] */
            after:bg-[#e11d48] dark:after:bg-[#fda4af]
          "
        >
          <IconBrandAuth0 stroke={2} />
        </Button>
      )}      

    </motion.div>
  );
}