import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { Process } from '../models/process.entity';
import { AssignmentModule } from '../assignment/assignment.module';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';
import { HearingModule } from '../hearing/hearing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Process]),
    AssignmentModule,
    NotificationModule,
    UserModule,
    HearingModule,
  ],
  providers: [ProcessService],
  controllers: [ProcessController],
  exports: [ProcessService],
})
export class ProcessModule {}
