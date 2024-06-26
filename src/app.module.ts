import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ModulesModule, ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  })],
})
export class AppModule { }
