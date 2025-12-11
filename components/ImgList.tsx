import Image from "next/image";
import { IconHeadphones, IconSquareRotatedForbid } from "@tabler/icons-react";
import { IconClipboardText } from "@tabler/icons-react";
import { IconVideoMinus } from "@tabler/icons-react";
import { IconSquareRotatedOff, IconWashDry1, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { File_To_FileXList } from "@/lib/file";
import { cn } from "@/lib/utils"; 
import { FileX } from "@/lib/ZodObject";
import { toast } from "sonner";
type ImgListProps = {
    files: FileX[];
   
    removeFile: (file: FileX) => void;
   
    updataFiles: (files: FileX[]) => void;
    className?: string;
    disabled?: boolean
};

export default function ImgList(
    { files, updataFiles, removeFile , className , disabled }: ImgListProps,
) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    function preventDefault(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }
    async function GetFiles(e: React.ChangeEvent<HTMLInputElement>) {
        const input = fileInputRef.current;
        if (input?.files) {
            setIsLoading(true);
            const files = Array.from(input.files);
            
            const fileXList = await File_To_FileXList(files);
            updataFiles(fileXList);
            setIsDragOver(false);
            setIsLoading(false);
        }
    }

    function makeFileMain( targetFile:FileX) {
        if (disabled) return;
        const tempList = files.map((file) => {
            if (file === targetFile) {
                return {
                    ...file,
                    tags: [...file.tags, "XmainTagitypeperX"],
                };
            }
            return {
                ...file,
                tags: file.tags.filter((tag) => tag !== "XmainTagitypeperX"),
            };
        });
        updataFiles(tempList);    
        
        
    }
    
    const handleDivClick = () => {
        fileInputRef.current?.click();
        toast.success("File input opened");
    };

    return (
        <Card
            onClick={(e) => {
                
                e.stopPropagation();
                handleDivClick();
            }}
            onDragOver={(e) => {
                preventDefault(e);
                setIsDragOver(true);
            }}
            onDragExit={() => {
                setIsDragOver(true);
            }}
            onDragLeave={() => {
                setIsDragOver(false);
            }}
            onDrop={async (e) => {
                setIsLoading(true);
                preventDefault(e);
                const files = Array.from(e.dataTransfer.files);
                const fileXList = await File_To_FileXList(files);
                updataFiles(fileXList);
                setIsDragOver(false);
                setIsLoading(false);
            }}
            className={ cn(+` flex flex-col gap-2 rounded-lg shadow-lg  bg-white/30 dark:bg-gray-800/30 backdrop-blur-xs border border-gray-200 dark:border-gray-700 ${
                isDragOver
                    ? "border-dashed border-emerald-400 dark:border-emerald-600"
                    : ""

            }`,
            "py-2 px-2",
            className
        )}
            
        >
            <input disabled={disabled} ref={fileInputRef} type="file" multiple className="hidden" onChange={GetFiles} />
            {isLoading && <div className="p-4 text-center">Loading...</div>}
            {isDragOver && !isLoading && (
                <div className="p-4 text-center">Drop files here</div>
            )}
            {!isLoading && !isDragOver && (
                <>
                    {files.map((file, index) => (
                        <FileCard
                            removeFile={removeFile}
                            key={index}
                            file={file}
                            main={file.tags.includes("XmainTagitypeperX")}
                            chageFile={makeFileMain}
                        />
                    ))}
                </>
            )}

            {files.length === 0 && !isDragOver && !isLoading && (
                <div className="p-4 text-center">Drag and drop files here</div>
            )}
        </Card>
    );
}

function FileCard(
    { file, main, chageFile, removeFile }: {
        file: FileX;
        main: boolean;
        chageFile: (file: FileX) => void;
        removeFile: (file: FileX) => void;
    },
) {
    function FileType() {
        switch (file.type) {
            case "image":
                return (
                    <div className="flex items-center justify-center w-12 h-12 ml-4 mb-2 mt-2 rounded-sm overflow-hidden  ">
                        <Image
                            src={file.link}
                            alt={file.name}
                            width={40}
                            height={40}
                            className="object-contain "
                        />
                    </div>
                );
            case "video":
                return (
                    <IconVideoMinus
                        size={40}
                        className="m-2 text-gray-600 dark:text-gray-300"
                    />
                );
            case "document":
                return (
                    <IconClipboardText
                        size={40}
                        className="m-2 text-gray-600 dark:text-gray-300"
                    />
                );
            case "audio":
                return (
                    <IconHeadphones
                        size={40}
                        className="m-2 text-gray-600 dark:text-gray-300"
                    />
                );
            default:
                return (
                    <IconWashDry1
                        size={40}
                        className="m-2 text-gray-600 dark:text-gray-300"
                    />
                );
        }
    }

    return (
        <div 
        onClick={(e)=>{
            e.stopPropagation()
        }}
        className=" flex flex-row rounded-md items-center hover:bg-white/55 hover:dark:bg-gray-800/55 
     bg-white/70 dark:bg-gray-800/70 border border-emerald-200/90 dark:border-emerald-700/90 
     ">
            <div className="flex flex-row items-center gap-1 min-w-0 flex-1">
                <FileType />
                <h2 className=" truncate">{file.name}</h2>
            </div>

            <div className=" flex flex-row items-center ml-auto gap-2 mr-2">
                <Button
                  type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={() => chageFile(file)}
                >
                    {main
                        ? (
                            <IconSquareRotatedForbid
                                size={20}
                                className="text-emerald-600 dark:text-emerald-300"
                            />
                        )
                        : (
                            <IconSquareRotatedOff
                                size={20}
                                className="text-gray-600 dark:text-gray-300"
                            />
                        )}
                </Button>

                <Button
                type="button"
                    onClick={() => removeFile(file)}
                    variant="outline"
                    size="icon-sm"
                    className=""
                >
                    <IconX
                        size={20}
                        className="text-rose-600 dark:text-rose-300"
                    />
                </Button>
            </div>
        </div>
    );
}
