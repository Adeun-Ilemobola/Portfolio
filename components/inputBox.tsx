

import clsx from 'clsx';
import React from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';

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

export default function InputBox({ className, value, onChange, label, disabled, ...other }: InputBoxProps) {
    return (
        <div className={clsx("flex flex-col gap-1.5 justify-center min-w-20", className)}>
            {label && <Label  className=" ml-1">{label}</Label>}
            <Input
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                {...other}
            />

        </div>
    )
}
