import { Module } from '@nestjs/common';
import { ApartmentController } from './controllers/apartment.controller';
import { ApartmentService } from './services/apartment.service';
import { PrismaService, R2Service } from 'src/services';
import { LessorService } from './services/lessor.service';
import { ImageService } from './services/image.service';
import { UniversityService } from './services/university.service';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService, PrismaService, LessorService, R2Service, ImageService, UniversityService]
})
export class ApartmentModule { }
