"use client";
import ImageDragDrop from '@/components/img'
import ImageDropzone from '@/components/imgx'
import { DeleteImages } from '@/lib/supabase';
import { FileUploadResult } from '@/lib/utils';
import React from 'react'

export default function page() {
    const [images, setImages] = React.useState<FileUploadResult[]>([]);
  return (
    <div className='flex flex-col m-auto max-w-[85rem] min-w-[85rem] min-h-screen relative'>
        <ImageDragDrop 
            images={images}
            setImages={setImages}
            DeleteImages={async (paths) => {
                // Logic to delete images from Supabase
                console.log("Deleting images:", paths);
                await DeleteImages(paths);
            }}

        />
       
    </div>
  )
}
