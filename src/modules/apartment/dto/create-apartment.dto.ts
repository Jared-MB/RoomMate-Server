import { CreateLessorDto } from "./create-lessor.dto"

enum ApartmentType {
    HOUSE = 'HOUSE',
    APARTMENT = 'APARTMENT',
}

export class CreateApartmentDto {
    address: string
    price: number
    type: ApartmentType
    isPetFriendly: boolean
    isSharedRoom: boolean
    isSharedBathroom: boolean
    isSharedKitchen: boolean
    lat: number
    lng: number
    lessor: CreateLessorDto
    shortDescription: string
    longDescription: string
}