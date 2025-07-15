"use client";

import SpaceLoadingScreen from '@/components/LoadingScreen';
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col m-auto max-w-[85rem] items-center justify-center min-w-[85rem] min-h-screen relative'>

      <div className='flex flex-col  min-h-96 min-w-4xl '>
       <SpaceLoadingScreen
        fullScreen={false}
       />

      </div>
      
       
    </div>
  )
}
