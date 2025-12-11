import {
    IconCheck,
    IconInfoCircle,
    IconNewSection,
    IconPlus,
} from "@tabler/icons-react";
import { ArrowUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "sonner";
type ToolInputProps = {
    onUpdate: Dispatch<SetStateAction<string[]>>;
    result: string[];
    className?: string;
    maxItems?: number;
    disabled?: boolean;
};

export default function TooLInput(
    { onUpdate, result, className, maxItems = 6 , disabled }: ToolInputProps,
) {
    const [isSended, setIsSended] = useState(false);
    const [text, setText] = useState("");
    const firstThreeItems = result.slice(0, maxItems);
    const getRemainingItems = result.slice(maxItems, result.length);
    function Add() {
        if (result.includes(text)) {
            toast.error("This item already exists.");
            return
        };


        if (text.trim() === "") return;
        setIsSended(!isSended);
        onUpdate([...result, text]);
        setText("");
        setTimeout(() => {
            setIsSended(false);
        }, 2000);
    }
    function remove(item:string) {
        onUpdate(result.filter((i) => i !== item)); 
    }

    return (
        <InputGroup className={cn(className, "p-0.5 , gap-1")}>
            <InputGroup className="p-0.5">
                <InputGroupInput
                    disabled ={disabled}

                    type="text"
                    value={text}
                    placeholder="Enter your text here..."
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Tab") {
                            Add();
                        }
                    }}
                />

                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                            disabled ={disabled}
                        aria-label="Add"
                        title="Add"
                        size="icon-xs"
                        variant={"outline"}
                        onClick={() => {
                            Add();
                        }}
                    >
                        {isSended
                            ? <IconCheck stroke={2} size={14} />
                            : <IconNewSection stroke={2} size={14} />}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>

            <InputGroupAddon
                align="block-end"
                className="border-t-[0.8px] flex flex-wrap gap-1"
            >
                {result.length > 8
                    ? (
                        <>
                            {firstThreeItems.map((res, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className=" text-[.815rem]"
                                >
                                    <IconInfoCircle size={16} />
                                    <span>{res}</span>
                                </Badge>
                            ))}

                            <HoverCard>
                                <HoverCardTrigger>
                                    <Badge
                                        variant="secondary"
                                        className="space-x-2 text-[.815rem]"
                                    >
                                        <IconPlus size={16} />
                                        <span>{result.length - 8}</span>
                                    </Badge>
                                </HoverCardTrigger>
                                <HoverCardContent className=" grid grid-cols-[repeat(auto-fit,minmax(85px,1fr))] gap-0.5 w-97">
                                    {getRemainingItems.map((res, index) => {
                                        const globalIndex = index + maxItems;
                                        return (
                                            <Badge
                                                key={globalIndex}
                                                variant="secondary"
                                                className="space-x-2 text-[.8rem] hover:cursor-pointer hover:underline"
                                                onClick={() => remove(res)}
                                            >
                                                <IconInfoCircle size={16} />
                                                <span>{res}</span>
                                            </Badge>
                                        );
                                    })}
                                </HoverCardContent>
                            </HoverCard>
                        </>
                    )
                    : (
                        <>
                            {result.map((res, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="space-x-2 text-[.815rem] hover:cursor-pointer hover:underline"
                                    onClick={() => remove(res)}
                                >
                                    <IconInfoCircle size={16} />
                                    <span>{res}</span>
                                </Badge>
                            ))}
                        </>
                    )}
            </InputGroupAddon>
        </InputGroup>
    );
}
