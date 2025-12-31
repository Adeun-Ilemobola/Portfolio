"use client"
import React, { useState , useEffect } from 'react'
import { trpc as api } from '@/lib/client';

import { IconBuilding, IconMail, IconHash, IconCopy } from '@tabler/icons-react';
import { motion } from "framer-motion";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,

  DialogContent,

  DialogOverlay
} from "@/components/ui/dialog"
import { ProjectForm } from './ProjectForm';
import { category, CategoryString, ContactIDType, size, Skill, SkillSchema } from '@/lib/ZodObject';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';
import { Input } from './ui/input';
import { set } from 'better-auth';
export default function AuthSel() {
  const [sel, setSel] = React.useState<"newProject" | "newSkill" | "newMessage" | null>(null);
  const [open, setOpen] = React.useState(false);
  // Animation variant for the "Zero-G" floating effect
  const floatVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
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
  function ChangeView(params: "newProject" | "newSkill" | "newMessage") {
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
          onClick={() => ChangeView("newProject")}
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
          onClick={() => ChangeView("newSkill")}
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
          onClick={() => ChangeView("newMessage")}
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
          onClick={e => e.stopPropagation}
          onDoubleClick={e => e.stopPropagation}
        >
          <SelMode sel={sel} Clo={Close} />
        </DialogContent>
      </Dialog>


    </>
  )
}




function SelMode({ sel, Clo }: { sel: "newProject" | "newSkill" | "newMessage" | null, Clo: () => void }) {
  switch (sel) {
    case "newProject": return <NewProject Finish={() => Clo} />
    case "newSkill": return <SkillView Finish={() => Clo} />
    case "newMessage": return <NewMessage Finish={() => Clo} />
    default: return null;
  }

}



function NewProject({ Finish }: { Finish: () => void }) {
  return (
    <div className=' '>
      <ProjectForm end={() => {
        Finish()
      }} />
    </div>
  )
}

function SkillView({ Finish }: { Finish: () => void }) {
  const  SkillList  = api.getSills.useQuery(undefined , {
    refetchOnWindowFocus: false,
  });
  const deleteSkill = api.RemoveSkill.useMutation({
    onSuccess: () => {
      SkillList.refetch();
      toast.success("Skill Removed Successfully!" , { id: "remove-skill" });
    },
    onError: (error) => {
      toast.error("Error Removing Skill: " + error.message , { id: "remove-skill" });
    },
    onMutate: () => {
      toast.loading("Removing Skill..." , { id: "remove-skill" });
    }
  });
  const CreateSkill = api.AddSkill.useMutation({
    onSuccess: () => {
      SkillList.refetch();
      toast.success("Skill Added Successfully!" , { id: "add-skill" });
    },
    onError: (error) => {
      toast.error("Error Adding Skill: " + error.message , { id: "add-skill" });
    },
    onMutate: () => {
      toast.loading("Adding Skill..." , { id: "add-skill" });
    }
  });
  const [SkillForm, setSkillForm] = useState<Skill>({
    name: "",
    category: "Backend",
    size: "small",
  });


  function AddNewSkill() {
    const valid = SkillSchema.safeParse(SkillForm);
    if (!valid.success) {
      valid.error.issues.forEach((issue) => {
        console.error(`Validation error in ${issue.path.join('.')}: ${issue.message}`);
        toast.error(`Validation error in ${issue.path.join('.')}: ${issue.message}`);
      })
      return;
    }
    CreateSkill.mutate(SkillForm);
  }
  function RemoveSkill(id: string) {
    deleteSkill.mutate({ id: id });

  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='. flex flex-col border-b border-b-green-300 pb-2'>

        <div className='flex flex-row gap-2 justify-center '>

          <Field>
            <FieldLabel htmlFor="name">Name of Skill</FieldLabel>
            <Input disabled={CreateSkill.isPending} placeholder='Skill Name' value={SkillForm.name} onChange={(e) => setSkillForm(pre => ({ ...pre, name: e.target.value }))} />
           
          </Field>

          <Field>
            <FieldLabel>Category</FieldLabel>
            <Select
             disabled={CreateSkill.isPending}
              value={SkillForm.category}
              onValueChange={(val) => setSkillForm(pre => ({ ...pre, category: val as CategoryString }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(category.options).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>
              Select the category of the skill
            </FieldDescription>
          </Field>


          <Field>
            <FieldLabel>Size</FieldLabel>
            <Select
            disabled={CreateSkill.isPending}
              value={SkillForm.size}
              onValueChange={(val) => setSkillForm(pre => ({ ...pre, size: val as typeof SkillForm.size }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose department" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(size.options).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldDescription>
              Select the display size of the skill
            </FieldDescription>
          </Field>



        </div>
        <Button variant={CreateSkill.isPending ? "outline" : "secondary"} disabled={CreateSkill.isPending} onClick={AddNewSkill} className=' ml-auto'>
         {CreateSkill.isPending ? "Adding..." : "Add New Skill"}
        </Button>

      </div>
      {SkillList.isLoading && (<div className='flex flex-1 justify-center items-center'>
        <Spinner className=' size-9' />
      </div>)
      }

      {
        !SkillList.isLoading && SkillList.data?.value.length === 0 && (
        <div className=' flex-1 text-3xl text-center py-10 text-gray-500'>
          No Skills Added Yet.
        </div>
      )
      }

       {
        !SkillList.isLoading && SkillList.data?.value && SkillList.data?.value.length > 0 && (
        <div className=' flex-1 flex flex-col gap-2 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded scrollbar-track-rounded'>
          {SkillList.data?.value.map((skill , i) => (
            <div key={i} className=' flex flex-row justify-between items-center border-b border-b-gray-300 pb-1'>
              <div className=' flex flex-col'>
                <span className=' font-bold text-lg'>{skill.name}</span>
                <span className=' text-sm text-gray-600'>Category: {skill.category} | Size: {skill.size}</span>
              </div>
              <Button variant={"destructive"} size={"sm"} onClick={() => RemoveSkill(skill.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )
      }
    </div>
  )
}

function NewMessage({ Finish }: { Finish: () => void }) {
  const fetchMessages = api.getALlSendMesage.useQuery(undefined , {
    refetchOnWindowFocus: false,
  });
  const [searchTerm , setSearchTerm] = useState<string>("");
  const [messages , setMessages] = useState<ContactIDType[]>([]);
  useEffect(() => {
    if(fetchMessages.data){
      setMessages( fetchMessages.data);
    }
  } , [fetchMessages.data]);


  function filter() {
    if (searchTerm.trim() === "") {
      setMessages(fetchMessages.data || []);
      return;
    }
    const filtered = fetchMessages.data?.filter((msg) => 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    ) || [];
    setMessages(filtered);
    setSearchTerm("");
    
  }

  return (
    <div className=' flex flex-col gap-1'>
      <h1>All Messages</h1>
      <div className=' flex flex-row-reverse gap-2'>
        <Input placeholder='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={filter}>Filter</Button>
      </div>
      <div className=' p-1 flex flex-col gap-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 scrollbar-thumb-rounded scrollbar-track-rounded'>
        {fetchMessages.isLoading && (
          <div className=' flex flex-1 justify-center items-center'>
            <Spinner className=' size-9' />
          </div>
        )}
        {
          !fetchMessages.isLoading && messages.length === 0 && (
            <div className=' flex-1 text-3xl text-center py-10 text-gray-500'>
              No Messages Found.
            </div>
          )
        }
        {
          !fetchMessages.isLoading && messages.map((msg , i) => (
            <ContactCard key={i} id={msg.id} name={msg.name} email={msg.email} message={msg.message} company={msg.company} />
          ))
        } 

      </div>
    </div>
  )
}

function ContactCard({ name, id, email, message, company }: ContactIDType) {
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className='
        group relative
        flex flex-col gap-4 
        p-5 rounded-2xl
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-800
        hover:border-gray-300 dark:hover:border-gray-700
        shadow-sm hover:shadow-md
        transition-all duration-200
      '
    >
      {/* Header Section */}
      <div className='flex flex-row justify-between items-start gap-4'>
        
        {/* User Info */}
        <div className='flex flex-col gap-1'>
          <h3 className='font-bold text-lg text-gray-900 dark:text-gray-100 tracking-tight leading-none'>
            {name}
          </h3>
          
          <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-1'>
            
            {/* Email with copy */}
            <button 
              onClick={() => copyToClipboard(email)}
              className='flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors'
              title="Copy Email"
            >
              <IconMail size={14} />
              {email}
            </button>

            {company && (
              <>
                <span className='hidden sm:inline text-gray-300 dark:text-gray-700'>|</span>
                <div className='flex items-center gap-1'>
                  <IconBuilding size={14} />
                  {company}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ID Badge */}
        <div className='flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-mono text-gray-500'>
          <IconHash size={12} className="opacity-50"/>
          {id.slice(0, 8)}...
        </div>
      </div>

      {/* Message Body - Styled like code block to match input form */}
      <div className='relative'>
        <div className='
          p-4 rounded-xl 
          bg-gray-50 dark:bg-black/30 
          border border-gray-100 dark:border-white/5
          text-sm text-gray-700 dark:text-gray-300
          font-mono leading-relaxed
        '>
           {/* Visual "quote" marker */}
           <div className="absolute top-4 left-0 w-1 h-8 bg-[#059669] rounded-r-full" />
           {message}
        </div>
      </div>

      {/* Hover Action (Optional - e.g. Reply) */}
      <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity'>
         <button 
           onClick={() => copyToClipboard(message)}
           className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white"
         >
           <IconCopy size={16} />
         </button>
      </div>

    </motion.div>
  )
}