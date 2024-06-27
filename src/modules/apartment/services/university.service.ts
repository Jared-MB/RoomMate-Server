import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';

@Injectable()
export class UniversityService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }


}
