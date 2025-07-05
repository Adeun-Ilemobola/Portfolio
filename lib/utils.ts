import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface Base64FileResult {
 supabaseID: string;
  name: string;
  url: string;
  size: number; // in bytes
  type: string;
  lastModified: number;
  
}

export interface FileUploadResult {
  supabaseID: string;
  name: string;
  url: string;
  size: number; // in bytes
  type: string;
  lastModified: number;
}


export const toB64 = (file: File): Promise<FileUploadResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve({
        name: file.name,
        url: base64String,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        supabaseID: "",

      });
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


export function base64ToBlob(base64: string, contentType = ''): Blob {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

