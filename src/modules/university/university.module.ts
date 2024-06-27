import { Module } from '@nestjs/common';
import { UniversityController } from './controllers/university.controller';
import { UniversityService } from './services/university.service';
import { PrismaService } from 'src/services';

@Module({
  controllers: [UniversityController],
  providers: [UniversityService, PrismaService]
})
export class UniversityModule { }
