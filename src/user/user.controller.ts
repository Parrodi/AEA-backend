import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../models/user.entity';

@Controller('users')
export class UserController {
  constructor(private serv: UserService) {}

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }

  @Get(':id')
  public async get(@Param('id') id: string) {
    return await this.serv.get(id);
  }

  @Post()
  public async post(@Body() user: User) {
    return await this.serv.create(user);
    console.log(user);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.serv.delete(id);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() user: any) {
    return await this.serv.update(id, user);
  }

  @Get('assignments/:id')
  public async getAssignments(@Param('id') id: string) {
    return await this.serv.getAssignments(id);
  }
}
