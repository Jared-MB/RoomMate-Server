import { Injectable } from '@nestjs/common';
import { R2Service } from 'src/services';

@Injectable()
export class ImageService {

    constructor(
        private readonly r2Service: R2Service
    ) { }

    async upload(data: any): Promise<{ url: string, id: string } | null> {
        const [image] = data;
        const filedImage = new File([image.buffer], image.originalname, { type: image.mimetype });
        return await this.r2Service.uploadImage(filedImage);
    }

}
