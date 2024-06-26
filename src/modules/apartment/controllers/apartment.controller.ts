import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApartmentService } from '../services/apartment.service';
import { CreateApartmentDto } from '../dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';

@Controller('apartment')
export class ApartmentController {

    constructor(
        private readonly apartmentService: ApartmentService,
        private readonly imageService: ImageService
    ) { }

    @Get()
    async getApartments() {
        return await this.apartmentService.getApartments()
    }

    @Get(':id')
    async getApartment(
        @Param('id') id: string
    ) {
        try {
            return await this.apartmentService.getApartment(id)
        }
        catch (e) {
            throw new NotFoundException()
        }
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
    ]))
    async createApartment(
        @UploadedFiles() files, @Body() createApartmentDto: CreateApartmentDto
    ) {
        const lessor = {
            ...JSON.parse(createApartmentDto.lessor as any),
            phone: BigInt(JSON.parse(createApartmentDto.lessor as any).phone)
        }

        const [image1, image2, image3] = Object.values(files)

        const savedImage = await this.imageService.upload(image1)
        let savedImage2;
        let savedImage3;

        const images = [savedImage]
        if (image2) {
            savedImage2 = await this.imageService.upload(image2)
            savedImage2 && images.push(savedImage2)
        }
        if (image3) {
            savedImage3 = await this.imageService.upload(image3)
            savedImage3 && images.push(savedImage3)
        }

        const apartment = await this.apartmentService.createApartment({
            ...createApartmentDto,
            lat: +createApartmentDto.lat,
            lng: +createApartmentDto.lng,
            price: +createApartmentDto.price,
            isPetFriendly: (createApartmentDto.isPetFriendly as any) === 'true',
            isSharedRoom: (createApartmentDto.isSharedRoom as any) === 'true',
            isSharedBathroom: (createApartmentDto.isSharedBathroom as any) === 'true',
            isSharedKitchen: (createApartmentDto.isSharedKitchen as any) === 'true',
            lessor
        }, images)


        return apartment
    }

}
