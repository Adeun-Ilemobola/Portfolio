"use client"
import React, { useState } from 'react'
import InputBox, { InputBoxProps } from './inputBox'
import clsx from 'clsx';
import { Button } from './ui/button';
import { ScanSearch } from 'lucide-react';

interface InputBtuProps {
    onSubmit: (value: string) => void;
    className?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export default function InputBtu({  onSubmit, className  , icon ,disabled }: InputBtuProps) {
    const [value, setValue] = useState<string>("");

  return (
    <div className={clsx("flex flex-row gap-1.5  items-center ", className)}>
        <InputBox
            value={value}
            onChange={setValue}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onSubmit(value);
                    setValue("");
                }
            }}
            placeholder="Type and press Enter"
          
        />
        <Button
            onClick={() => {
                onSubmit(value);
                setValue("");
            }}
            disabled={!value.trim() || disabled}
            variant={"outline"}
            size={"icon"}
        >
            {icon || <ScanSearch className="h-4 w-4" />}

        </Button>
        
    </div>
  )
}
