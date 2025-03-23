import { Button } from '@/components/ui/button'
import UtilityCard from '@/components/utilityCard'
import {  SiMailboxdotorg, SiGithub } from '@icons-pack/react-simple-icons';
import AnimatedTechnologies from '@/components/AnimatedTechnologies';
import WaveBorderWrapper from '@/components/GradientBorderWrapper';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


const Contact = [
     { name: "Email", value: 'your-email@example.com', Icon: SiMailboxdotorg, },
     { name: "LinkedIn", value: 'https://www.linkedin.com/in/example/' },
     { name: "Github", value: 'https://github.com/example', Icon: SiGithub }
]


export default function Home() {
     return (
          <div className=' min-w-full h-[800px]   '>
               {/* grid root */}
               <div className=' grid grid-cols-5 grid-rows-5 gap-2 p-0.5 h-full  '>
                    {/* Picture of me */}
                    <div className=' flex flex-col justify-center items-center ring ring-indigo-600 col-start-1 col-end-3 row-start-1 row-end-6 rounded-sm p-0.5 '>
                         <div className='flex flex-col gap-1.5'>
                              <h2 className='text-3xl font-bold'>Hello, I'm Adeun!</h2>
                              <WaveBorderWrapper >
                                   {/* Your profile picture here */}
                                   <img className='h-[500px] w-[355px] object-cover' src='/joshua-hanson-e616t35Vbeg-unsplash.jpg' alt='profile picture' />


                              </WaveBorderWrapper>

                         </div>


                    </div>
                    {/* About me */}
                    <div className=' col-start-3 col-end-6 row-start-1 row-end-3  ring ring-amber-800 rounded-sm p-0.5'>

                    </div>
                    {/* Technologies that I know */}
                    <div className=' flex flex-col gap-3 col-start-3 col-end-6 row-start-3 row-end-6 ring ring-emerald-500 overflow-hidden rounded-sm p-2'>


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




                         <form className=' flex gap-5 flex-col h-full justify-center  '>

                              <div className=' flex gap-2  flex-row h-5/6 '>
                                   <div className=' flex flex-col gap-1.5 h-full justify-center w-[28%]'>

                                        <div className='flex flex-col gap-1.5'>
                                             <Label className='text-sm font-medium text-gray-200 ' htmlFor='name'>
                                                  <span className=' text-red-500/60'>*<span className='text-gray-200'>Name:</span> </span>
                                             </Label>
                                             <Input type="text" id='name' name='name' required className='ring-1 ring-gray-500 block  text-gray-400 ' />

                                        </div>
                                        <div className='flex flex-col gap-1.5'>
                                             <Label className='text-sm font-medium text-gray-200 ' htmlFor='email'>
                                                  <span className=' text-red-500/60'>*<span className='text-gray-200'>Email:</span> </span>

                                             </Label>
                                             <Input type='email' id='email' name='email' required className='ring-1 ring-gray-500 block  text-gray-400 ' />

                                        </div>




                                   </div>

                                   <div className='flex flex-col gap-1.5 h-full flex-1 w-[60%]'>
                                        <Label className='text-sm font-medium text-gray-200 ' htmlFor='message'>
                                             <span className=' text-red-500/60'>*<span className='text-gray-200'>Message:</span> </span>

                                        </Label>
                                        <textarea id='message' name='message' required className=' h-full ring-1 ring-gray-500   text-gray-400 resize-none p-1.5  ' />
                                   </div>

                              </div>

                              <div className=' flex flex-row justify-center items-center gap-3 '>
                                   <Button className='text-white bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-pink-500 hover:to-purple-700' type='submit'>Submit</Button>
                              </div>




                         </form>



                    </div>



               </div>

          </div>
     )
}
