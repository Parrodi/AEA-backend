import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HearingService } from './hearing.service';
import { HearingController } from './hearing.controller';
import { Hearing } from '../models/hearing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hearing])],
  providers: [HearingService],
  controllers: [HearingController],
  exports: [HearingService]
})
export class HearingModule {}
