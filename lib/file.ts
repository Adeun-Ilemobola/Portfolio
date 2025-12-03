import { r2 } from "./r2";
import { PutObjectCommand } from "@aws-sdk/client-s3"

import { FileX } from "./ZodObject";
function normalizeType(file: File): FileX["type"] {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    if (file.type.includes("pdf")) return "document";
    return "other";
}
function FileToBase64(params: File): Promise<FileX> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(params);
        reader.onload = () => {
            const fileX: FileX = {
                type: normalizeType(params),
                mime: params.type,
                name: params.name,
                size: params.size,
                link: reader.result as string,
                createdAt: params.lastModified
                    ? new Date(params.lastModified)
                    : new Date(),
                updatedAt: new Date(),
                tags: [],
                path: "",
            };
            resolve(fileX);
        };
        reader.onerror = (error) => reject(error);
    });
}
export async function File_To_FileXList(params: File[]) {
    return Promise.all(params.map((file) => FileToBase64(file)));
}
export function FileX_To_Blub(FileList: FileX[]): FileX[][] {
    const result: FileX[][] = [];
    let temp: FileX[] = [];
    const maxTemp = 3;
    FileList.forEach((file, index) => {
        temp.push(file);
        if (temp.length === maxTemp || index === FileList.length - 1) {
            result.push(temp);
            temp = [];
        }
    });
    return result;
}

export async function FilesToCloud(filesT: FileX[]): Promise<FileX[]> {
    const filesToUpload = FileX_To_Blub(filesT);
    const uploadedFiles: FileX[] = [];

    for (const fileGroup of filesToUpload) {
        const uploadPromises = fileGroup.map(async (file) => {
            const filePath = `uploads/${Date.now()}-${file.name}`;

            const command = new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME!,
                Key: filePath,
                Body: Buffer.from(file.link.split(",")[1], "base64"),
                ContentType: file.mime,
            });

            const response = await r2.send(command);

            if (!response.$metadata.httpStatusCode?.toString().startsWith("2")) {
                throw new Error("Failed to upload file to R2");
            }

            return {
                ...file,
                path: filePath,
                link: `${process.env.R2_PUBLIC_BASE_URL}/${filePath}`,
            };
        });

        const uploadedGroup = await Promise.all(uploadPromises);
        uploadedFiles.push(...uploadedGroup);
    }

    return uploadedFiles;
}

