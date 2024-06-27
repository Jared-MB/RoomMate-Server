import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { CreateUniversityDto } from '../dto/create-university.dto';

@Injectable()
export class UniversityService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    findAll() {
        return this.prismaService.university.findMany()
    }

    create(university: CreateUniversityDto) {
        return this.prismaService.university.create({
            data: university
        })
    }

}
