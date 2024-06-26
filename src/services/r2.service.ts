import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class R2Service {

    r2 = new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
    })

    async uploadImage(file: File): Promise<null | { id: string, url: string }> {
        if (file.size <= 0) {
            return
        }

        const id = randomUUID()

        const buffer = (await file.arrayBuffer()) as any
        console.log()
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: id,
            Body: buffer,
            ContentType: file.type,
        })

        try {

            await this.r2.send(command)
            return {
                id,
                url: `https://example.kristall.app/${id}`,
            }
        }
        catch (error) {
            console.error(error)
            return null
        }
    }

}
