import { Module } from '@nestjs/common';
import { ApartmentModule } from './apartment/apartment.module';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [ApartmentModule, UniversityModule],
})
export class ModulesModule { }
