"use client"
import React from 'react'
import { motion , Variants } from "framer-motion";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay
} from "@/components/ui/dialog"
import { ProjectForm } from './ProjectForm';
export default function AuthSel() {
    const [sel , setSel] = React.useState<"newProject"| "newSkill" | "newMessage" | null>(null);
    const [open , setOpen] = React.useState(false);
    // Animation variant for the "Zero-G" floating effect
  const floatVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i:any) => ({
      opacity: 1,
      y: [0, -15, 0], // Floating up and down
      transition: {
        delay: i * 0.2, // Stagger effect
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5 },
      },
    }),
  };
  function ChangeView(params:"newProject"| "newSkill" | "newMessage") {
    setSel(params); 
    if (sel) setOpen(true);
  }
  function Close() {
    setOpen(false);
    setSel(null);
    
  }

  return (
    <>
    <div className="flex w-full p-8 flex-row flex-wrap items-center justify-center gap-8 overflow-hidden ">
         {/* Card 1: Rose Nebula */}
   
        <motion.div
        onClick={()=>ChangeView("newProject")}
          custom={0}
          initial="hidden"
          animate="visible"
          variants={floatVariant}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(225, 29, 72, 0.4)" }}
          className={
            "relative flex min-h-[250px] min-w-[350px] items-center justify-center rounded-3xl p-8 " +
            // Glass Specs: High Blur (18px), Low Opacity (More see-through)
            "backdrop-blur-md transition-all duration-500 " +
            // Edges: Crisp thin border for glass realism
            "border border-white/60 dark:border-white/10 " +
            // Surface: Very low opacity for 'see-through' effect
            "bg-rose-500/5 hover:bg-rose-500/10 dark:bg-rose-400/5 dark:hover:bg-rose-400/10"
          }
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest text-rose-900 drop-shadow-md dark:text-rose-100 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              CREATE
              <br />
              PROJECT
            </h1>
          </div>
        </motion.div>
      

      {/* Card 2: Fuchsia Void */}
      
        <motion.div
         onClick={()=>ChangeView("newSkill")}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={floatVariant}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(192, 38, 211, 0.4)" }}
          className={
            "relative flex min-h-[250px] min-w-[350px] items-center justify-center rounded-3xl p-8 " +
            "backdrop-blur-md transition-all duration-500 " +
            "border border-white/60 dark:border-white/10 " +
            "bg-fuchsia-500/5 hover:bg-fuchsia-500/10 dark:bg-fuchsia-400/5 dark:hover:bg-fuchsia-400/10"
          }
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest text-fuchsia-900 drop-shadow-md dark:text-fuchsia-100 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              ADD NEW
              <br />
              SKILL
            </h1>
          </div>
        </motion.div>
  

      {/* Card 3: Teal Aurora */}
      
        <motion.div
         onClick={()=>ChangeView("newMessage")}
          custom={2}
          initial="hidden"
          animate="visible"
          variants={floatVariant}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(13, 148, 136, 0.4)" }}
          className={
            "relative flex min-h-[250px] min-w-[350px] items-center justify-center rounded-3xl p-8 " +
            "backdrop-blur-md transition-all duration-500 " +
            "border border-white/60 dark:border-white/10 " +
            "bg-teal-500/5 hover:bg-teal-500/10 dark:bg-teal-400/5 dark:hover:bg-teal-400/10"
          }
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest text-teal-900 drop-shadow-md dark:text-teal-100 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              VIEW
              <br />
              REQUESTS
            </h1>
          </div>
        </motion.div>
      
    </div>

    <Dialog open={open} onOpenChange={Close}>
         <DialogOverlay
            data-slot="dialog-overlay"
            className="backdrop-blur-sm  bg-black/50 animate-in fade-in"
            onClick={Close}
            
          />
         <DialogContent

          showCloseButton={false}
            className=" min-w-[55vw] animate-in fade-in-0 zoom-in-95 duration-300 sm:zoom-in-100"
            data-slot="dialog-content"
            onClick={e=>e.stopPropagation}
            onDoubleClick={e=>e.stopPropagation}
          >
           <SelMode sel={sel} Clo={Close}/>
         </DialogContent>
    </Dialog>
     
      
    </>
  )
}




function SelMode({sel , Clo}:{sel:"newProject" | "newSkill" | "newMessage" | null , Clo:()=>void}) {
  switch(sel){
    case "newProject": return <NewProject Finish={()=>Clo}/>
    case "newSkill": return <NewSkill Finish={()=>Clo}/>
    case "newMessage": return <NewMessage Finish={()=>Clo}/>
    default: return null;
  }
    
}



function NewProject({Finish}:{Finish:()=>void}) {
  return(
    <div className=' '>
        <ProjectForm end={()=>{
            Finish()
        }}/>
    </div>
  )
}

function NewSkill({Finish}:{Finish:()=>void}){
  return(
    <div>New Skill Form</div>
  )
}

function NewMessage({Finish}:{Finish:()=>void}){
  return(
    <div>New Message View</div>
  )
}
