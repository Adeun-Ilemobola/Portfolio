import { IconType } from '@icons-pack/react-simple-icons';
import { LucideProps } from 'lucide-react';
import React from 'react';

export default function UtilityCard({ 
  name, 
  isLink, 
  url, 
  Icon ,
  size =24
}: { 
  name: string; 
  Icon?:  IconType | React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>; 
  isLink: boolean; 
  url?: string 
  size?: number; 
}) {
  const value = name === "Email" || name === "Phone" ? url: name;

  const content = (
    <div className={` 
      inline-flex flex-row gap-2 items-center min-w-max h-16 rounded-md whitespace-nowrap p-4 
    ${" border bg-background shadow-xs hover:bg-accent "}  
    hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-all
    `}>
        {Icon && <Icon size={size} className='opacity-80' />}
      <p className=' text-xl font-bold opacity-80'>{value}</p>
    </div>
  );

  return isLink && url ? (
    <a href={url} >{content}</a>
  ) : (
    content
  );
}
