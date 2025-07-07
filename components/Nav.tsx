import React from 'react'
import { Button } from './ui/button'

export default function Nav() {
    return (
        <div
            className="
        sticky top-0 left-0 w-full h-20 p-5
        bg-gradient-to-b
          from-slate-50/60 to-transparent
        dark:from-gray-900/80 dark:to-transparent
        backdrop-blur-md
        border-b border-slate-200/[0.05] dark:border-gray-800/[0.2]
        z-50
      "
        >


            <div className='flex flex-row gap-11 justify-center items-center  w-[25rem] ml-auto'>
                <Button
                    variant='link'
                    className='text-xl ml-auto '
                    onClick={() => {

                    }}
                >
                    About
                </Button>


                <Button
                    className='text-xl ml-auto  '
                    variant='link'
                    onClick={() => {

                    }}
                >
                    Projects
                </Button>


                <Button
                    className='text-xl ml-auto '
                    variant='link'
                    onClick={() => {

                    }}
                >
                    Contact
                </Button>

            </div>


        </div>
    )
}
