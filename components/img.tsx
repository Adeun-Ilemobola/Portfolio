"use client";
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

interface FileUploadResult {
  supabaseID: string;
  name: string;
  url: string;
  size: number; // in bytes
  type: string;
  lastModified: number;
}

interface ImageDragDropProps {
  images: FileUploadResult[];
  setImages: React.Dispatch<React.SetStateAction<FileUploadResult[]>>;
  DeleteImages?: (paths: string[]) => Promise<void>;

}
  

function ImageDragDrop ({images , setImages , DeleteImages}:ImageDragDropProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: FileUploadResult[] = acceptedFiles.map((file, index) => ({
      supabaseID: ``,
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));

    setImages((prev) => [...prev, ...newImages]);
   
    
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const handleDelete = (ID: number) => {
    // Optionally, add Supabase delete logic here
    if (DeleteImages) {
      const pathsToDelete = images.filter((img , i) => i !== ID)
      .map(img => img.supabaseID);
      DeleteImages(pathsToDelete)
    }
     setImages((prev) => prev.filter((img , i) => i !== ID));
     
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-500 rounded-md p-6 text-center transition-colors duration-200 ${
          isDragActive ? 'border-blue-400 bg-blue-500/10' : 'bg-black/10'
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
            {images.map((image , index) => (
              <div
                key={image.supabaseID}
                className="relative flex-shrink-0 w-48 bg-gray-800/40 rounded-md p-3 border border-gray-600 hover:border-blue-400 transition-all duration-200 group"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-32 object-cover rounded-sm"
                />
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-gray-200 text-xs truncate max-w-[70%]">
                    {image.name}
                  </p>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-1 rounded-full bg-red-500/70 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label={`Delete ${image.name}`}
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
};

export default ImageDragDrop;