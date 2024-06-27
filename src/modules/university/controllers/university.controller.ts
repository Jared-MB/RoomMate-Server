import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUniversityDto } from '../dto/create-university.dto';
import { UniversityService } from '../services/university.service';

@Controller('university')
export class UniversityController {

    constructor(
        private readonly universityService: UniversityService
    ) { }

    @Get()
    async getUniversities() {
        return this.universityService.findAll()
    }

    @Post()
    async createUniversity(
        @Body() university: CreateUniversityDto
    ) {
        return this.universityService.create(university)
    }
}
