import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';




import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { ProcessModule } from './process/process.module';
import { HearingModule } from './hearing/hearing.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, NotificationModule, ProcessModule, HearingModule, AssignmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
