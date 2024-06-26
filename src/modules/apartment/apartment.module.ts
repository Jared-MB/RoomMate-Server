import { Module } from '@nestjs/common';
import { ApartmentController } from './controllers/apartment.controller';
import { ApartmentService } from './services/apartment.service';
import { PrismaService, R2Service } from 'src/services';
import { LessorService } from './services/lessor.service';
import { ImageService } from './services/image.service';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService, PrismaService, LessorService, R2Service, ImageService]
})
export class ApartmentModule { }
