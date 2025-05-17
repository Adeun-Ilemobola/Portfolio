import { Button } from '@/components/ui/button'
import UtilityCard from '@/components/utilityCard'
import { SiMailboxdotorg, SiGithub } from '@icons-pack/react-simple-icons';
import AnimatedTechnologies from '@/components/AnimatedTechnologies';
import WaveBorderWrapper from '@/components/GradientBorderWrapper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';


const Contact = [
     { name: "Email", value: 'your-email@example.com', Icon: SiMailboxdotorg, },
     { name: "LinkedIn", value: 'https://www.linkedin.com/in/example/' },
     { name: "Github", value: 'https://github.com/example', Icon: SiGithub }
]


export default function Intro() {
     const [showContact, setShowContact] = useState(false)
    
     return (
          <div className=' min-w-full h-[900px]   '>
               {/* grid root */}
               <div className=' flex flex-row gap-2  w-full p-1 '>
                    {/* Picture of me */}
                    <div className=' flex flex-col justify-center items-center ring ring-indigo-600/40  rounded-sm p-0.5 '>
                         <div className='flex flex-col gap-1.5'>
                              <h2 className='text-3xl font-bold'>Hello, I'm Adeun!</h2>
                              <WaveBorderWrapper >
                                   {/* Your profile picture here */}
                                   <img className='h-[500px] w-[355px] object-cover' src='/joshua-hanson-e616t35Vbeg-unsplash.jpg' alt='profile picture' />


                              </WaveBorderWrapper>

                         </div>


                    </div>
                    {/* About me */}
                    <div className=' flex flex-col gap-2 col-start-3 col-end-6 row-start-1 row-end-3 p-3  ring ring-indigo-600/40 rounded-sm '>
                         <h2 className='text-xl font-bold'>About Me</h2>
                         <p className='text-lg'>
                              <span className=' text-xl text-amber-600'>A</span> developer with a focused interest in web and software development and a forward-looking mindset about where technology is headed. I take pride in building clean, maintainable solutions—whether that means crafting responsive interfaces or implementing reliable backend systems. My approach combines technical precision with a strong sense of purpose, and I'm always eager to contribute to projects that prioritize innovation, usability, and long-term impact. I'm looking to connect with teams and organizations that value clear communication, thoughtful execution, and the drive to build meaningful digital experiences.

                         </p>
                    </div>
               </div>

               {/* Tools */}

               <div className=' flex flex-col gap-1.5 ring ring-indigo-600/40 overflow-hidden rounded-sm p-2'>
                    <h1> skills and Technology</h1>

                         <AnimatedTechnologies />
               </div>


               <div className='flex flex-col gap-1.5 ring ring-cyan-500/40  overflow-hidden rounded-sm p-2'>



                    {/* Contact résumé, gethub and other important links */}
                    <div className=' flex flex-col gap-1.5'>
                         <h2 className='text-2xl font-extrabold'>Contact:</h2>
                         <div className=' flex flex-row justify-center items-center gap-2 '>
                         {Contact.map(contact => {
                              const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/;
                              const matches = urlRegex.test(contact.value)
                              if (matches) {
                                   return <UtilityCard name={contact.name} isLink={true} url={contact.value} Icon={contact.Icon} />
                              } else {
                                   return <UtilityCard name={contact.name} url={contact.value} isLink={false} Icon={contact.Icon} />
                              }

                         })}
                    </div>
                    </div>



               </div>

          </div>
     )
}
