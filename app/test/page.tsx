"use client";
import ImageDragDrop from '@/components/img'
import ImageDropzone from '@/components/imgx'
import SpaceLoadingScreen from '@/components/LoadingScreen';
import { DeleteImages } from '@/lib/supabase';
import { FileUploadResult } from '@/lib/utils';
import React from 'react'

export default function page() {
    const [images, setImages] = React.useState<FileUploadResult[]>([]);
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
