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
               setShowContact(false)
               toast.success("Message Sent", {
                    description: "Your message has been sent successfully.",
                    duration: 2000
               })
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
          <div className=' min-w-full h-[800px]   '>
               {/* grid root */}
               <div className=' grid grid-cols-5 grid-rows-5 gap-2 p-0.5 h-full  '>
                    {/* Picture of me */}
                    <div className=' flex flex-col justify-center items-center ring ring-indigo-600/40 col-start-1 col-end-3 row-start-1 row-end-6 rounded-sm p-0.5 '>
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
                         <p className='text-xs'>
                              I am a dedicated and adaptable professional with a passion for technology, multimedia, and problem-solving. With a strong foundation in JavaScript, TypeScript, CSS, and HTML, I have experience developing web applications using React, Next.js, and Prisma (ORM). My technical proficiency extends to MS Word, Excel, Photoshop, and Lightroom, complementing my ability to work in multimedia, including photography, videography, and audiovisual operations.

                              Currently studying at Douglas College, I am continuously expanding my knowledge in game development and web technologies. Beyond my technical expertise, I thrive in team collaborations, communicate effectively with diverse audiences, and take pride in my strong work ethic and ability to work independently.
                         </p>
                         <p className='text-xl'> 🔗 Let's connect and create something impactful together!</p>

                    </div>
                    {/* Technologies that I know */}
                    <div className=' flex flex-col gap-1 col-start-3 col-end-6 row-start-3 row-end-6 ring ring-indigo-600/40 overflow-hidden rounded-sm p-2'>


                         <div className=" relative w-full  flex flex-col   ">
                              <h2 className=' text-2xl font-extrabold'>skills:</h2>
                              <AnimatedTechnologies />
                         </div>


                         {/* Contact résumé, gethub and other important links */}
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



                         {showContact ?
                              <>

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
                                             {makeMesage.isPending &&  (<LoaderCircle className=' animate-spin' />)}
                                             </Button>
                                        </div>




                                   </form>
                              </>

                              :
                              <>
                                   <div className='flex flex-row gap-2 justify-center items-center h-full '>
                                        <Button onClick={() => setShowContact(!showContact)}>
                                             Contact me by email Through the website
                                        </Button>
                                   </div>

                              </>


                         }


                    </div>



               </div>

          </div>
     )
}
