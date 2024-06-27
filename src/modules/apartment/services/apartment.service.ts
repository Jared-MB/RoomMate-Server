import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { CreateApartmentDto } from '../dto';
import { ApartmentSearch } from '../interfaces/apartment-query';

@Injectable()
export class ApartmentService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    async getApartments(query: ApartmentSearch) {
        const { maxPrice, minPrice, isApartment, isHouse, ...search } = query
        const type = []
        if (isApartment) {
            type.push('APARTMENT')
        }
        if (isHouse) {
            type.push('HOUSE')
        }
        if (!isApartment && !isHouse) {
            type.push('APARTMENT', 'HOUSE')
        }
        let apartments = []
        if (Object.keys(query).length === 0) {
            apartments = await this.prismaService.apartment.findMany({
                include: {
                    lessor: true,
                    images: true,
                    universities: true
                }
            });
        }
        else {
            apartments = await this.prismaService.apartment.findMany({
                where: {
                    ...search,
                    price: {
                        gte: minPrice,
                        lte: maxPrice
                    },
                    type: {
                        in: type
                    }
                },
                include: {
                    lessor: true,
                    images: true,
                    universities: true
                }
            });
        }
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
                images: true,
                universities: {
                    select: {
                        lat: true,
                        id: true,
                        lng: true
                    }
                }
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

    createApartment(data: CreateApartmentDto, images: { id: string, url: string }[], universities: { lat: number, lng: number }[]) {
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
                rooms: +data.rooms,
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
                },
                universities: {
                    createMany: {
                        data: universities
                    }
                }
            }
        });
    }

}
