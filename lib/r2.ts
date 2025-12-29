import 'server-only';
import { S3Client } from "@aws-sdk/client-s3"
import { PrivateENV } from "./ENVserver"; 
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { FileX_To_Blub } from './file';
import { FileX } from './type';


export const r2 = new S3Client({
  region: "auto",
  endpoint: PrivateENV.R2_ENDPOINT,
  credentials: {
    accessKeyId: PrivateENV.R2_ACCESS_KEY_ID!,
    secretAccessKey: PrivateENV.R2_SECRET_ACCESS_KEY!,
  },
})


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






