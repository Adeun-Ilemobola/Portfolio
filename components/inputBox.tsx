"use client";

import clsx from 'clsx';
import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Eye, EyeClosed } from 'lucide-react';

export interface InputBoxProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    type?: string;
    disabled?: boolean;
    maxLength?: number;
    readOnly?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    label?: string | React.ReactNode;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

}

export default function InputBox({ className, value, onChange, label, disabled ,type , ...other }: InputBoxProps) {
    const [showPassword, setShowPassword] = React.useState(true);
    return (
        <div className={clsx("flex flex-col gap-1.5 justify-center min-w-20", className)}>
            {label && <Label  className=" ml-1">{label}</Label>}
            <div className=' flex flex-row  gap-2'>
                <Input
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                type={type === 'password' ? (showPassword ? "text" : "password"): type || 'text'}
                {...other}
            />
                {type === 'password' && (
                    <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        variant={"outline"}
                        size={"icon"}
                       
                    >
                        {showPassword ? ( <EyeClosed  />): (<Eye />)}
                    </Button>
                )}
            </div>
            

        </div>
    )
}
