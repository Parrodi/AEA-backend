import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.entity';

@Controller('users')
export class UserController {
  constructor(private serv: UserService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Post()
  public async post(@Body() user:User) {
    console.log(user);
    return this.serv.create(user);
  }
}
