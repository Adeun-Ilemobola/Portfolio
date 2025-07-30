"use client";
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import { FileUploadResult, toB64 } from '@/lib/utils';
import Image from 'next/image';

interface ImageDragDropProps {
  images: FileUploadResult[];
  setImages: React.Dispatch<React.SetStateAction<FileUploadResult[]>>;
  DeleteImages?: (paths: string , index: number) => Promise<void>;
 
}

function ImageDragDrop({ images, setImages, DeleteImages }: ImageDragDropProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const newImages = await Promise.all(
        acceptedFiles.map((file) => toB64(file))
      );
      setImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error processing images:', error);
    }
  }, [setImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

 

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="w-full max-w-[52rem] mx-auto p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
        <div className="border-2 border-dashed border-gray-500 rounded-md p-6 text-center bg-black/10">
          <p className="text-gray-300 text-base">Loading image uploader...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[52rem] mx-auto p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-500 rounded-md p-6 text-center transition-colors duration-200 cursor-pointer ${
          isDragActive ? 'border-blue-400 bg-blue-500/10' : 'bg-black/10 hover:bg-black/20'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-300 text-base">
          {isDragActive
            ? 'Drop images here...'
            : 'Drag & drop images, or click to select'}
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div className="flex space-x-4 pb-4">
            {images.map((image, index) => (
              <div
                key={`${image.supabaseID || 'new'}-${index}-${image.name}`}
                className="relative flex-shrink-0 w-48 bg-gray-800/40 rounded-md p-3 border border-gray-600 hover:border-blue-400 transition-all duration-200 group"
              >
                <div className="relative w-full h-32">
                  <Image
                    src={image.url}
                    alt={image.name || 'Uploaded image'}
                    fill
                    className="object-cover rounded-sm"
                    sizes="(max-width: 768px) 192px, 192px"
                    unoptimized={image.url.startsWith('data:')}
                  />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-gray-200 text-xs truncate max-w-[70%]">
                    {image.name || 'Unknown'}
                  </p>
                  <button
                    onClick={() => {
                      if (DeleteImages) {
                        DeleteImages(image.supabaseID, index);
                      }
                    }}
                    className="p-1 rounded-full bg-red-500/70 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                    aria-label={`Delete ${image.name || 'image'}`}
                    type="button"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageDragDrop;