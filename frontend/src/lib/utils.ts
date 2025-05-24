import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import platform from "platform";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface Base64FileResult {
  name: string;
  base64: string;
  size: number; // in bytes
  type: string;
  lastModified: number;
}

export const toB64 = (file: File): Promise<Base64FileResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      resolve({
        name: file.name,
        base64: base64String,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      });
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};


 export const getClientInfo = async () => {
  const ipInfo = await fetch('https://ipwho.is/').then(res => res.json());
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    date: new Date().toISOString(),
    ip: ipInfo.ip,
    timezone,
    browser: navigator.userAgent,
    os: platform.os?.family || navigator.platform,
    device: platform.description,
    country: ipInfo.country,
    city: ipInfo.city,
    region: ipInfo.region,
    gps: `${ipInfo.latitude},${ipInfo.longitude}`
  };
};
 