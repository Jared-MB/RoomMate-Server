import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services';
import { CreateLessorDto } from '../dto/create-lessor.dto';

@Injectable()
export class LessorService {

    constructor(
        private readonly prismaService: PrismaService
    ) { }

    // createLessor(data: CreateLessorDto)

}
