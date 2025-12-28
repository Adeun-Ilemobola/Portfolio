"use server"
import { S3Client } from "@aws-sdk/client-s3"
import { PrivateENV } from "./ENVserver"; 


export const r2 = new S3Client({
  region: "auto",
  endpoint: PrivateENV.R2_ENDPOINT,
  credentials: {
    accessKeyId: PrivateENV.R2_ACCESS_KEY_ID!,
    secretAccessKey: PrivateENV.R2_SECRET_ACCESS_KEY!,
  },
})




