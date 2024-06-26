import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { CreateApartmentDto } from '../dto';

@Injectable()
export class ApartmentService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getApartments() {
        const apartments = await this.prismaService.apartment.findMany({
            include: {
                lessor: true,
                images: true
            },
        });
        return apartments.map(apartment => ({
            ...apartment,
            lessor: {
                ...apartment.lessor,
                phone: apartment.lessor.phone.toString()
            }
        }))
    }

    async getApartment(id: string) {
        const apartment = await this.prismaService.apartment.findUniqueOrThrow({
            where: {
                id
            },
            include: {
                lessor: true,
                images: true
            }
        });
        return {
            ...apartment,
            lessor: {
                ...apartment.lessor,
                phone: apartment.lessor.phone.toString()
            }
        }
    }

    createApartment(data: CreateApartmentDto, images: { id: string, url: string }[]) {
        return this.prismaService.apartment.create({
            data: {
                address: data.address,
                price: data.price,
                type: data.type,
                shortDescription: data.shortDescription,
                longDescription: data.longDescription,
                isPetFriendly: data.isPetFriendly,
                isSharedRoom: data.isSharedRoom,
                isSharedBathroom: data.isSharedBathroom,
                isSharedKitchen: data.isSharedKitchen,
                lat: data.lat,
                lng: data.lng,
                lessor: {
                    connectOrCreate: {
                        create: {
                            name: data.lessor.name,
                            email: data.lessor.email,
                            phone: data.lessor.phone
                        },
                        where: {
                            email: data.lessor.email
                        }
                    }
                },
                images: {
                    createMany: {
                        data: images
                    }
                }
            }
        });
    }

}
