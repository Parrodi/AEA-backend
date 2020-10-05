import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../models/user.entity';
import { AssignmentModule } from '../assignment/assignment.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AssignmentModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
