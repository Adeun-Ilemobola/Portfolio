"use client";

import clsx from 'clsx';
import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Eye, EyeClosed } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MultipleSelector from './MultipleSelector';
import { Textarea } from './ui/textarea';

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
        <div className={clsx("flex flex-col gap-2.5 justify-center min-w-20", className)}>
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


export function SelectBox({
    className,
    value,
    onChange,
    label,
    options,
    disabled,
}: {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    label?: string | React.ReactNode;
    options: { value: string; label: string }[];
    disabled?: boolean;
}) {
    return (
        <div className={clsx("flex flex-col gap-1 justify-center min-w-20", className)}>
            {label && <Label className="ml-1">{label}</Label>}
            <Select
                value={value}
                onValueChange={onChange}
                disabled={disabled}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
       
    );
}





export function SelectorBox({
    className,
    value,
    onChange,
    label,
    options,
    disabled,
    placeholder = "Select options",
}: {
    className?: string;
    value?: string[];
    onChange?: (value: string[]) => void;
    label?: string | React.ReactNode;
    options: { value: string; label: string }[];
    disabled?: boolean;
    placeholder?: string;
}) {
    return (
        <div className={clsx("flex flex-col gap-1 justify-center min-w-20", className)}>
            {label && <Label className="ml-1">{label}</Label>}
           <MultipleSelector
                value={value?.map(v => ({ value: v, label: v }))}
                onChange={(selected) => onChange?.(selected.map(s => s.value))}
                options={options}
                disabled={disabled}
                creatable
                placeholder={placeholder}
                emptyIndicator={<p className="text-gray-500 text-sm">
                    No options available. Please add some.
                </p>}
           />
        </div>
       
    );
}







export function TextAreaBox({
    className,
    value,
    onChange,
    label,
    disabled,
    placeholder = "Enter text here...",
}: {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    label?: string | React.ReactNode;
    disabled?: boolean;
    placeholder?: string;
}) {
    return (
        <div className={clsx("flex flex-col gap-1 justify-center min-w-20", className)}>
            {label && <Label className="ml-1">{label}</Label>}
            <Textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
              
            />
        </div>
    );
}

