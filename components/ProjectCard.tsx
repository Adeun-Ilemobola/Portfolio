import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import { ProjectType } from "@/lib/ZodObject";
import {
    IconInfoCircle,
    IconPlus,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { da } from "zod/v4/locales";

type ProjectCardProps = {
    data: ProjectType;
    url?: string;
    eidtMode: boolean;
};

export default function ProjectCard({ data, url, eidtMode }: ProjectCardProps) {
    const skillSet = data.technologies.map((tech) => tech.name);
    const maxItemsToShow = 4;
    const firstThreeItems = skillSet.slice(0, maxItemsToShow);
    const getRemainingItems = skillSet.slice(
        maxItemsToShow,
        data.technologies.length,
    );

    // Glassmorphism Token Classes
    const glassSurface = "bg-[#ffffff]/60 dark:bg-[#1f2937]/60 backdrop-blur-[4px] border border-white/40 dark:border-white/10 shadow-lg";
    const glassBadge = "bg-[#059669]/10 dark:bg-[#6ee7b7]/10 text-[#059669] dark:text-[#6ee7b7] border-white/20 dark:border-white/5 hover:bg-[#059669]/20 dark:hover:bg-[#6ee7b7]/20 transition-colors";
    const highlightColor = "text-[#e11d48] dark:text-[#fda4af]";
    const dividerGradient = "bg-gradient-to-r from-transparent via-[#e11d48]/40 dark:via-[#fda4af]/40 to-transparent";

    return (
        <IsEidtMode is={eidtMode} url={url}>
            <Card className={`p-0 overflow-hidden flex flex-col gap-2 relative transition-all duration-300 w-120 h-78 hover:shadow-xl hover:-translate-y-1 ${glassSurface}`}>
                
                {/* Edit Button with Highlight Token */}
                <Button 
                    className={`absolute top-4 right-4 z-10 ${highlightColor} hover:bg-white/30 dark:hover:bg-black/20`} 
                    variant="outline"
                    size={"icon-lg"}
                >
                    <IconEdit stroke={2} />
                </Button>

                <div className="flex items-center justify-center flex-1 overflow-hidden">
                    <Image
                        src={data.images[0].link}
                        alt={data.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
                
                <div className="flex flex-col p-4 gap-1 relative z-0">
                    {/* Title with subtle shadow for legibility on glass */}
                    <h2 className="text-2xl font-bold text-ellipsis overflow-hidden text-gray-800 dark:text-gray-100 drop-shadow-sm">
                        {data.title}
                    </h2>

                    {/* Aesthetic Divider using Highlight Token */}
                    <div className={`w-full h-[1px] my-1 ${dividerGradient}`}></div>

                    <div className="flex flex-row flex-wrap gap-1 mt-2">
                        {data.technologies.length > maxItemsToShow ? (
                            <>
                                {firstThreeItems.map((res, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className={`text-[.815rem] backdrop-blur-[2px] ${glassBadge}`}
                                    >
                                        <IconInfoCircle size={16} className="mr-1 opacity-70" />
                                        <span>{res}</span>
                                    </Badge>
                                ))}

                                <HoverCard>
                                    <HoverCardTrigger>
                                        <Badge
                                            variant="outline"
                                            className={`space-x-2 text-[.815rem] cursor-pointer backdrop-blur-[2px] ${glassBadge}`}
                                        >
                                            <IconPlus size={16} />
                                            <span>
                                                {data.technologies.length - maxItemsToShow}
                                            </span>
                                        </Badge>
                                    </HoverCardTrigger>
                                    {/* Glassmorphism applied to HoverCard Content */}
                                    <HoverCardContent className={`flex flex-row flex-wrap gap-1 w-96 ${glassSurface}`}>
                                        {getRemainingItems.map((res, index) => {
                                            const globalIndex = index + maxItemsToShow;
                                            return (
                                                <Badge
                                                    key={globalIndex}
                                                    variant="outline"
                                                    className={`space-x-2 text-[.8rem] justify-center ${glassBadge}`}
                                                >
                                                    <IconInfoCircle size={16} className="mr-1 opacity-70" />
                                                    <span>{res}</span>
                                                </Badge>
                                            );
                                        })}
                                    </HoverCardContent>
                                </HoverCard>
                            </>
                        ) : (
                            <>
                                {skillSet.map((res, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className={`space-x-2 text-[.815rem] backdrop-blur-[2px] ${glassBadge}`}
                                    >
                                        <IconInfoCircle size={16} className="mr-1 opacity-70" />
                                        <span>{res}</span>
                                    </Badge>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </Card>
        </IsEidtMode>
    );
}

function IsEidtMode({
    is,
    url,
    children,
}: {
    children: React.ReactNode;
    is: boolean;
    url?: string;
}) {
    if (url && !is) {
        return (
            <Link href={url} className="block h-full">
                {children}
            </Link>
        );
    }
    return <>{children}</>;
}