export interface ApartmentQuery {
    isHouse?: 'true'
    isApartment?: 'true'
    isSharedRoom?: 'true'
    isSharedBathroom?: 'true'
    isSharedKitchen?: 'true'
    isPetFriendly?: 'true'
    minPrice?: string
    maxPrice?: string
}

export interface ApartmentSearch {
    isHouse?: boolean
    isApartment?: boolean
    isSharedRoom?: boolean
    isSharedBathroom?: boolean
    isSharedKitchen?: boolean
    isPetFriendly?: boolean
    minPrice?: number
    maxPrice?: number | 0
}